import config
import flask_cors
import flask
import json
import typing
import uuid
import time
from flask_socketio import SocketIO, emit
import pathlib
from dataProvider import DataProvider
from workflow import ResearchWorkflow, ResearchWorkflowManager
import logger

app = flask.Flask(__name__, static_folder='./static')
cors = flask_cors.CORS(app)
socket = SocketIO(app, cors_allowed_origins='*', async_mode='gevent')


def check_if_authenticated():
    return 'authenticated' in flask.session


def Result(status, data):
    return {
        'status': status,
        'data': data
    }


def codegen():
    return uuid.uuid4().hex


@app.before_request
def before_request():
    # save the origin to the session
    flask.session['origin'] = flask.request.headers.get('Origin', None)


@app.after_request
def add_header(response):
    # read from origin header
    response.headers['Access-Control-Allow-Origin'] = flask.session.get(
        'origin', '*')
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    # commit db
    DataProvider.db.db.commit()
    return response


@app.route('/api/v1/authenticate', methods=['POST'])
def authenticate():
    json_data = flask.request.get_json()
    if 'secret' not in json_data:
        return Result(False, 'Invalid request')
    config = DataProvider.getConfig()
    if json_data['secret'] == config['secret']:
        flask.session['authenticated'] = True
        return Result(True, 'Authenticated')
    return Result(False, 'Invalid secret')


@app.route('/api/v1/config/<string:key>/get', methods=['POST'])
def get_config(key):
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    config = DataProvider.getConfig()
    if key not in config:
        return Result(False, 'Invalid key')
    return Result(True, config[key])


@app.route('/api/v1/config/<string:key>/set', methods=['POST'])
def set_config(key):
    json_data = flask.request.get_json()
    if 'value' not in json_data:
        return Result(False, 'Invalid request')
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    config = DataProvider.getConfig()
    config[key] = json_data['value']
    DataProvider.setConfig(config)
    return Result(True, f'Updated configuration: {key} = {json_data["value"]}')


@app.route('/api/v1/research_history', methods=['POST'])
def research_history():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    return Result(True, DataProvider.getAllResearchHistory())


@app.route('/api/v1/research_history/get', methods=['POST'])
def get_research_history():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'id' not in data:
        return Result(False, 'Invalid request')
    return Result(True, DataProvider.getResearchHistory(data['id']))


@app.route('/api/v1/research_history/delete', methods=['POST'])
def delete_research_history():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'id' not in data:
        return Result(False, 'Invalid request')
    DataProvider.deleteResearchHistory(data['id'])
    return Result(True, 'Deleted')


@app.route('/api/v1/research/create', methods=['POST'])
def create_research():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'prompt' not in data:
        return Result(False, 'Invalid request')
    DataProvider.addResearchHistory('Untitled Research', [])
    return Result(True,
                  {
                      'id': DataProvider.getResearchHistory(DataProvider.getAllResearchHistory()[-1]['id'])['id'],
                      'workflow_session': ResearchWorkflowManager.create_workflow(data['prompt'])
                  })


def route_workflow_new_message(session: str, message: dict[str, typing.Any]) -> None:
    if session not in ResearchWorkflowManager.workflows:
        return
    client_sid = ResearchWorkflowManager.get_client_id(session)
    socket.emit('new_message', message, namespace='/session', to=client_sid)


def route_workflow_research_initiated(session: str) -> None:
    if session not in ResearchWorkflowManager.workflows:
        return
    client_sid = ResearchWorkflowManager.get_client_id(session)
    socket.emit('research_initiated', namespace='/session', to=client_sid)


def route_workflow_research_finished(session: str) -> None:
    if session not in ResearchWorkflowManager.workflows:
        return
    client_sid = ResearchWorkflowManager.get_client_id(session)
    socket.emit('research_finished', namespace='/session', to=client_sid)


def route_workflow_research_step_finished(session: str) -> None:
    if session not in ResearchWorkflowManager.workflows:
        return
    client_sid = ResearchWorkflowManager.get_client_id(session)
    socket.emit('research_step_finished', namespace='/session', to=client_sid)


def route_workflow_title_suggested(session: str, title: str) -> None:
    if session not in ResearchWorkflowManager.workflows:
        return
    client_sid = ResearchWorkflowManager.get_client_id(session)
    socket.emit('title_suggested', title, namespace='/session', to=client_sid)


def route_workflow_error(session: str, error_msg: str) -> None:
    if session not in ResearchWorkflowManager.workflows:
        return
    client_sid = ResearchWorkflowManager.get_client_id(session)
    socket.emit('error', error_msg, namespace='/session', to=client_sid)
    logger.Logger.log(f"Error in session {session}: {error_msg}")


@socket.on('connect', namespace='/session')
def connect():
    flask.session['sid'] = flask.request.sid
    logger.Logger.log(f"Client connected: {flask.session['sid']}")


@socket.on('initiate', namespace='/session')
def initiate(data):
    # get client id
    client_sid = flask.session.get('sid', None)

    # get workflow session
    session = data['session']
    ResearchWorkflowManager.bind_client_id(session, client_sid)

    # get workflow
    workflow = ResearchWorkflowManager.get_workflow(session)
    workflow.initiate()


@socket.on(message="conduct", namespace='/session')
def conduct(data):
    # get client id
    client_sid = flask.session.get('sid', None)

    # get workflow
    workflow = ResearchWorkflowManager.get_workflow_by_client_id(client_sid)
    if not workflow:
        return

    workflow.conduct()


@app.route('/api/v1/info', methods=['GET'])
def root():
    return Result(True, {
        "api_version": 'v1',
        'api_codename': 'castorice',
        'initialized': DataProvider.checkIfInitialized(),
        "status": "online",
    })


if __name__ == '__main__':
    ResearchWorkflowManager.add_event(
        "new_message", route_workflow_new_message)
    ResearchWorkflowManager.add_event(
        "research_initiated", route_workflow_research_initiated)
    ResearchWorkflowManager.add_event(
        "research_finished", route_workflow_research_finished)
    ResearchWorkflowManager.add_event(
        "research_step_finished", route_workflow_research_step_finished)
    ResearchWorkflowManager.add_event(
        "title_suggested", route_workflow_title_suggested)
    ResearchWorkflowManager.add_event(
        "error", route_workflow_error)
    if not DataProvider.checkIfInitialized():
        DataProvider.initialize()
    app.secret_key = config.SECRET_KEY
    socket.run(app, host='0.0.0.0', port=5012, debug=False)

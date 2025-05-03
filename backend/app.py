import config
import flask_cors
import flask
import json
import tools
import typing
import uuid
import time
from flask_socketio import SocketIO, emit
import pathlib
import dataProvider
from workflow import ResearchWorkflow, ResearchWorkflowManager
import logger

app = flask.Flask(__name__, static_folder='./static')
cors = flask_cors.CORS(app)
socket = SocketIO(app, cors_allowed_origins='*', async_mode='threading')


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
    dataProvider.DataProvider.db.db.commit()
    return response


@app.route('/api/v1/authenticate', methods=['POST'])
def authenticate():
    json_data = flask.request.get_json()
    if 'secret' not in json_data:
        return Result(False, 'Invalid request')
    config = dataProvider.DataProvider.getConfig()
    if json_data['secret'] == config['secret']:
        flask.session['authenticated'] = True
        return Result(True, 'Authenticated')
    return Result(False, 'Invalid secret')


@app.route('/api/v1/config/<string:key>/get', methods=['POST'])
def get_config(key):
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    config = dataProvider.DataProvider.getConfig()
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
    config = dataProvider.DataProvider.getConfig()
    config[key] = json_data['value']
    dataProvider.DataProvider.setConfig(config)
    return Result(True, f'Updated configuration: {key} = {json_data["value"]}')


@app.route('/api/v1/research_history', methods=['POST'])
def research_history():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    return Result(True, dataProvider.DataProvider.getAllResearchHistory())


@app.route('/api/v1/research_history/get', methods=['POST'])
def get_research_history():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'id' not in data:
        return Result(False, 'Invalid request')
    return Result(True, dataProvider.DataProvider.getResearchHistory(data['id']))


@app.route('/api/v1/research_history/delete', methods=['POST'])
def delete_research_history():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'id' not in data:
        return Result(False, 'Invalid request')
    dataProvider.DataProvider.deleteResearchHistory(data['id'])
    return Result(True, 'Deleted')


@app.route('/api/v1/research/create', methods=['POST'])
def create_research():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'prompt' not in data:
        return Result(False, 'Invalid request')
    hid = dataProvider.DataProvider.addResearchHistory('Untitled Research', [])
    return Result(True,
                  {
                      'id': hid,
                      'workflow_session': ResearchWorkflowManager.create_workflow(data['prompt'], hid, dataProvider.DataProvider.getConfig()['google_api_key'], dataProvider.DataProvider.getAllEnabledUserScripts(), dataProvider.DataProvider.getAllEnabledExtraInfos())
                  })


@app.route('/api/v1/extra_info', methods=['POST'])
def extra_info():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    
    return Result(True, dataProvider.DataProvider.getExtraInfoList())


@app.route('/api/v1/extra_info/create', methods=['POST'])
def create_extra_info():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'name' not in data or 'description' not in data or 'author' not in data or 'enabled' not in data or 'content' not in data:
        return Result(False, 'Invalid request')
    ei_id = dataProvider.DataProvider.createExtraInfo(data['name'], data['description'], data['author'], data['content'], data['enabled'])
    return Result(True, ei_id)


@app.route('/api/v1/extra_info/get', methods=['POST'])
def get_extra_info():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'id' not in data:
        return Result(False, 'Invalid request')
    # return Result(True, dataProvider.DataProvider.getExtraInfo(data['id']))
    r = dataProvider.DataProvider.getExtraInfo(data['id'])
    if r is None:
        return Result(False, 'Invalid id')
    return Result(True, r)


@app.route('/api/v1/extra_info/delete', methods=['POST'])
def delete_extra_info():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'id' not in data:
        return Result(False, 'Invalid request')
    dataProvider.DataProvider.deleteExtraInfo(data['id'])
    return Result(True, 'Deleted')


@app.route('/api/v1/extra_info/update', methods=['POST'])
def update_extra_info():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'id' not in data or 'name' not in data or 'description' not in data or 'author' not in data or 'enabled' not in data or 'content' not in data:
        return Result(False, 'Invalid request')
    dataProvider.DataProvider.updateExtraInfo(data['id'], data['name'], data['description'], data['author'], data['content'], data['enabled'])
    return Result(True, 'success')


@app.route('/api/v1/user_script', methods=['POST'])
def user_script():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    return Result(True, dataProvider.DataProvider.getUserScriptList())


@app.route('/api/v1/user_script/create', methods=['POST'])
def create_user_script():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'name' not in data or 'content' not in data or 'enabled' not in data:
        return Result(False, 'Invalid request')
    us_id = dataProvider.DataProvider.createUserScript(data['name'], data['content'], data['enabled'])
    return Result(True, us_id)


@app.route('/api/v1/user_script/get', methods=['POST'])
def get_user_script():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'id' not in data:
        return Result(False, 'Invalid request')
    r = dataProvider.DataProvider.getUserScript(data['id'])
    if r is None:
        return Result(False, 'Invalid id')
    return Result(True, r)

@app.route('/api/v1/user_script/delete', methods=['POST'])
def delete_user_script():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'id' not in data:
        return Result(False, 'Invalid request')
    dataProvider.DataProvider.deleteUserScript(data['id'])
    return Result(True, 'Deleted')


@app.route('/api/v1/user_script/update', methods=['POST'])
def update_user_script():
    if not check_if_authenticated():
        return Result(False, 'Not authenticated')
    data = flask.request.get_json()
    if 'id' not in data or 'name' not in data or 'content' not in data or 'enabled' not in data:
        return Result(False, 'Invalid request')
    dataProvider.DataProvider.updateUserScript(data['id'], data['name'], data['content'], data['enabled'])
    return Result(True, 'success')


def route_workflow_new_message(session: str, message: dict[str, typing.Any]) -> None:
    logger.Logger.log(f'Emitted new_message in session {session}: {str(message)[0: 100]}')
    if session not in ResearchWorkflowManager.workflows:
        return
    client_sid = ResearchWorkflowManager.get_client_id(session)
    hid = ResearchWorkflowManager.get_history_id(session)
    history = dataProvider.DataProvider.getResearchHistory(hid)
    history['history'].append(message)
    dataProvider.DataProvider.updateResearchHistory(hid, history['history'])
    socket.emit('new_message', message, namespace='/session', to=client_sid)


def route_workflow_research_initiated(session: str) -> None:
    logger.Logger.log(f'Emitted research_initiated in session {session}')
    if session not in ResearchWorkflowManager.workflows:
        return
    client_sid = ResearchWorkflowManager.get_client_id(session)
    socket.emit('research_initiated', namespace='/session', to=client_sid)


def route_workflow_research_finished(session: str) -> None:
    logger.Logger.log(f'Emitted research_finished in session {session}')
    if session not in ResearchWorkflowManager.workflows:
        return
    client_sid = ResearchWorkflowManager.get_client_id(session)
    socket.emit('research_finished', namespace='/session', to=client_sid)


def route_workflow_research_step_finished(session: str) -> None:
    logger.Logger.log(f'Emitted research_step_finished in session {session}')
    if session not in ResearchWorkflowManager.workflows:
        return
    client_sid = ResearchWorkflowManager.get_client_id(session)
    socket.emit('research_step_finished', namespace='/session', to=client_sid)


def route_workflow_title_suggested(session: str, title: str) -> None:
    logger.Logger.log(f'Emitted title_suggested in session {session}')
    if session not in ResearchWorkflowManager.workflows:
        return
    
    dataProvider.DataProvider.updateResearchHistoryTitle(ResearchWorkflowManager.get_history_id(session), title)
    client_sid = ResearchWorkflowManager.get_client_id(session)
    socket.emit('title_suggested', title, namespace='/session', to=client_sid)


def route_workflow_error(session: str, error_msg: str) -> None:
    logger.Logger.log(f"Error in session {session}: {error_msg}")
    if session not in ResearchWorkflowManager.workflows:
        return
    client_sid = ResearchWorkflowManager.get_client_id(session)
    socket.emit('error', error_msg, namespace='/session', to=client_sid)
    logger.Logger.log(f"Error in session {session}: {error_msg}")


def route_workflow_token_count(session: str, count: int) -> None:
    logger.Logger.log(f"Token count in session {session}: {count}")
    if session not in ResearchWorkflowManager.workflows:
        return
    client_sid = ResearchWorkflowManager.get_client_id(session)
    socket.emit('token_count', count, namespace='/session', to=client_sid)


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
    th = tools.ThreadProvider(lambda: workflow.initiate())


@socket.on(message="conduct", namespace='/session')
def conduct(data):
    # get client id
    client_sid = flask.session.get('sid', None)

    # get workflow
    workflow = ResearchWorkflowManager.get_workflow_by_client_id(client_sid)
    if not workflow:
        return

    th = tools.ThreadProvider(lambda: workflow.conduct())


@socket.on(message="next_step", namespace='/session')
def next_step(data):
    # get client id
    client_sid = flask.session.get('sid', None)

    # get workflow
    workflow: ResearchWorkflow = ResearchWorkflowManager.get_workflow_by_client_id(client_sid)
    if not workflow:
        return

    th = tools.ThreadProvider(lambda: workflow.next_step())


@socket.on(message="interact", namespace='/session')
def interact(data):
    # get client id
    client_sid = flask.session.get('sid', None)

    # get workflow
    workflow: ResearchWorkflow = ResearchWorkflowManager.get_workflow_by_client_id(client_sid)
    if not workflow:
        return

    prompt = data
    th = tools.ThreadProvider(lambda: workflow.interact(prompt))


@app.route('/api/v1/info', methods=['GET'])
def root():
    return Result(True, {
        "api_version": 'v1',
        'api_codename': 'castorice',
        'initialized': dataProvider.DataProvider.checkIfInitialized(),
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
    ResearchWorkflowManager.add_event(
        "token_count", route_workflow_token_count)
    if not dataProvider.DataProvider.checkIfInitialized():
        dataProvider.DataProvider.initialize()
    app.secret_key = dataProvider.DataProvider.getConfig()['secret']
    socket.run(app, host='0.0.0.0', port=5012, debug=False)

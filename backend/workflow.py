import bs4
import dataProvider
import logger
import time
import chatModel
import config
import tools
import uuid
import workflowTools
import typing
import prompts
import json
from userScript import UserScript
from workflowTools import ToolResponse


class ResearchWorkflow():
    class JSONEncoder(json.JSONEncoder):
        def default(self, obj: typing.Any) -> typing.Any:
            if isinstance(obj, ToolResponse):
                return obj.asReadableObject()
            return super().default(obj)

    def __init__(self, prompt: str, noHistoryMode: typing.Optional[bool] = False, enabled_tools: list[typing.Callable] = workflowTools.AvailableTools(), enabledUserScripts: list[dict[str, str]] = [], enabledExtraInfos: list[dict[str, str]] = [], api_key: str = None) -> None:
        """
        Initiate a deep research workflow with a given prompt and enabled tools.

        Args:
            prompt (str): The prompt given for research plan generation.
            enabled_tools (list[str], optional): The list of enabled tools for research plan generation. Defaults to [].
            api_key (str, optional): The API key for Google's generative AI. Defaults to None.
        """
        self.initiate_prompt = prompt
        self.parsed_user_scripts: list[UserScript] = []
        self.noHistoryMode = noHistoryMode

        self.generated_tool_descriptions = ''.join(
            [workflowTools.GetToolReadableDescription(i) for i in enabled_tools])

        self.enabled_user_script_tool_mapping = {}

        for i in enabledUserScripts:
            name, content = i['name'], i['content']
            script = UserScript(name, content)
            self.parsed_user_scripts.append(script)

            for tool in script.getAllInvocables():
                self.enabled_user_script_tool_mapping[tool] = script.getInvocable(
                    tool)

            self.generated_tool_descriptions += script.getReadableInformation()

        logger.Logger.log(f'Enabled user scripts: {self.parsed_user_scripts}')
        logger.Logger.log(
            f'Enabled user script tool mapping: {self.enabled_user_script_tool_mapping}')

        self.parsed_extra_infos = '\n'.join(f'''\
# {i['name']}

{i['content']}
''' for i in enabledExtraInfos)

        self.system_prompt = prompts.Prompt(prompts.SYSTEM_PROMPT, {
            "initiate_prompt": prompt,
            'generated_tool_descriptions': self.generated_tool_descriptions,
            'extra_infos': self.parsed_extra_infos,
        })
        logger.Logger.log(self.system_prompt)
        api_keys = api_key.split(';')
        self.llm = chatModel.ChatGoogleGenerativeAI(
            dataProvider.DataProvider.getConfig()["deep_research_model"], thinking_budget=int(dataProvider.DataProvider.getConfig()["thinking_token_budget"]), system_prompt=self.system_prompt, api_key_pool=api_keys)
        self.history = []
        self.hooks = {
            "research_initiated": [],
            "research_step_finished": [],
            "research_finished": [],
            "title_suggested": [],
            "new_message": [],
            "error": [],
            "token_count": [],
        }
        self.enabled_tools = enabled_tools
        self.enabled_tools_mapping = {
            i.__name__: i for i in self.enabled_tools}
        self.current_step = 1

    def trigger_hook(self, hook_name: str, *args, **kwargs) -> None:
        """
        Trigger a hook with the given arguments.

        Args:
            hook_name (str): The name of the hook to trigger.
            *args: The arguments to pass to the hook.
            **kwargs: The keyword arguments to pass to the hook.
        """
        logger.Logger.log(f'Triggering hook {hook_name}')
        if hook_name in self.hooks:
            for hook in self.hooks[hook_name]:
                hook(*args, **kwargs)

    def append_system_history(self, msg: str | list[dict[str, str]] | dict[str, str] | list[ToolResponse]) -> None:
        """
        Append a system message to the history.

        Args:
            msg (str | list[dict[str, str]] | dict[str, str]): The system message to append.
        """
        logger.Logger.log(f'Appending system message...')
        if isinstance(msg, str):
            self.history.append({
                "role": "system",
                "content": msg,
                "content_type": "text",
            })
        elif isinstance(msg, list) or isinstance(msg, dict):

            logger.Logger.log(f'Appending system message...')
            self.history.append({
                "role": "system",
                "content": json.loads(json.dumps(msg, cls=ResearchWorkflow.JSONEncoder)),
                "content_type": "json",
            })
        self.trigger_hook("new_message", self.history[-1])
        self.trigger_hook("token_count", self.llm.count_tokens())

    def append_bot_history(self, msg: str) -> None:
        """
        Append a bot message to the history.

        Args:
            msg (str): The bot message to append.
        """
        logger.Logger.log(f'Appending system message...')
        self.history.append({
            "role": "bot",
            "content": msg,
            "content_type": "json",
        })
        self.trigger_hook("new_message", self.history[-1])
        self.trigger_hook("token_count", self.llm.count_tokens())

    def append_user_history(self, msg: str) -> None:
        """
        Append a user message to the history.

        Args:
            msg (str): The user message to append.
        """
        logger.Logger.log(f'Appending user message...')
        self.history.append({
            "role": "user",
            "content": msg,
            "content_type": "text",
        })
        self.trigger_hook("new_message", self.history[-1])
        self.trigger_hook("token_count", self.llm.count_tokens())

    def initiate(self) -> str:
        """
        Initiate the research workflow by generating the research plan.

        Returns:
            str: The generated research plan.
        """
        self.append_user_history(self.initiate_prompt)
        prompt = prompts.Prompt(prompts.GENERATE_RESEARCH_PLAN_PROMPT, )
        self.append_system_history(prompt)
        plan = self.llm.initiate(prompt)
        parsed_plan = self.parseResponse(plan)
        if parsed_plan['intents']:
            # suggest title
            for i in parsed_plan['intents']:
                self.handleIntent(i["name"], i["content"])
        self.append_bot_history(parsed_plan)
        self.trigger_hook("research_initiated")
        return plan

    def parseResponse(self, response: str) -> dict[str, str]:
        """
        Parse bot response to extract information and intents from the response.

        Args:
            response (str): The bot response to parse.
            thinking (str): The thinking message generated by the chat model.

        Returns:
            dict[str, str]: The extracted information and intents.
        """
        print(response)
        if '<intents>' in response:
            intents = response[response.index(
                '<intents>'):response.index('</intents>')+10]
            # exclude the intents content from the response
            response = response[:response.index(
                '<intents>')] + response[response.index('</intents>')+10:]
            print(intents)
            parsed_intents = bs4.BeautifulSoup(intents, 'html.parser')
            # find out all invocation tags
            tags = []
            try:
                for i in parsed_intents.find_all('intents')[0].findChildren():
                    try:
                        tags.append({
                            'name': i.name,
                            'content': json.loads(i.text)
                        })
                    except:
                        tags.append({
                            'name': i.name,
                            'content': i.text
                        })
            except Exception as e:
                raise e
                return {
                    "response": f"Failed to parse intents: {e}",
                    "intents": {},
                }
            return {
                "response": response,
                "intents": tags,
            }
        else:
            return {
                "response": response,
                "intents": {},
            }

    def throwError(self, error_msg: str) -> None:
        """
        Raise an error event with given error message.

        Args:
            error_msg (str): The error message to raise.
        """
        self.trigger_hook("error", error_msg)

    def handleIntent(self, intent: str, args: dict[str, str]) -> dict[str, str] | None:
        """
        Handle an intent by calling the corresponding tool, and return the response generated by the tool.

        Intents handled by the chat model:
            - "invocation": call the corresponding tool with the given arguments, and return the result.
            - "completed": invoke the "research_finished" hook.
            - "step_completed": invoke the "research_step_finished" hook.

        Args:
            intent (dict[str, str]): The intent to handle.
            args (dict[str, str]): The arguments supplied for the intent.

        Returns:
            dict[str, str] | None: The response generated by the tool, or None if the intent is not handled.
        """
        match intent:
            case "invocation":
                params = args.get('params', {})
                try:
                    if args['tool'] in self.enabled_tools_mapping:
                        invocation_result = self.enabled_tools_mapping[args['tool']](
                            **params)
                    elif args['tool'] in self.enabled_user_script_tool_mapping:
                        invocation_result = self.enabled_user_script_tool_mapping[args['tool']](
                            **params)
                    else:
                        invocation_result = {
                            "status": "failed",
                            "message": f"Invalid tool: {args['tool']}, available tools are: {list(self.enabled_tools_mapping.keys()) + list(self.enabled_user_script_tool_mapping.keys())}",
                        }
                except Exception as e:
                    invocation_result = {
                        "status": "failed",
                        "message": f"Failed to invoke tool: {e}",
                    }
                logger.Logger.log(
                    f'Handling intent {intent} with params {params} and result {invocation_result}')
                return {
                    "invocation": args,
                    "result": invocation_result,
                }
            case "completed":
                # invoke hook
                logger.Logger.log(f'Handling intent {intent}')
                self.trigger_hook("research_finished")
                return None
            case "step_completed":
                # invoke hook
                logger.Logger.log(f'Handling intent {intent}')
                self.current_step += 1
                self.trigger_hook("research_step_finished")
                # do not influence the chat model, no result generated
                return None
            case "suggested_title":
                # invoke hook
                logger.Logger.log(
                    f'Handling intent {intent} with title {args}')
                self.trigger_hook("title_suggested", args)
                return None
            case _:
                # do not handle other intents
                pass

    def conduct(self) -> str:
        """
        Conduct the research workflow.

        Returns:
            str: The next message generated by the chat model.
        """
        prompt = prompts.Prompt(prompts.BEGIN_RESEARCH_PROMPT)

        while True:
            self.append_system_history(prompt)
            result = self.llm.chat(prompt if isinstance(
                prompt, str) else json.dumps(prompt, cls=ResearchWorkflow.JSONEncoder))
            parsed_result = self.parseResponse(result)
            if 'intents' in parsed_result:
                intent_result = []
                for i in parsed_result['intents']:
                    response = self.handleIntent(
                        i['name'], i['content'])
                    if response:
                        intent_result.append(response)

                self.append_bot_history(parsed_result)
                if intent_result:
                    # supply to llm again for further processing
                    res = [r.asModelInput() if isinstance(
                        r, workflowTools.ToolResponse) else r for r in intent_result]
                    prompt = res
                else:
                    # no intents found, end of research
                    break
            else:
                self.append_bot_history(parsed_result)
                break
        return parsed_result

    def next_step(self) -> str:
        """
        Proceed the next step of the research plan.

        Returns:
            str: The next step of the research plan.
        """
        prompt = prompts.Prompt(prompts.RESEARCH_STEP_PROMPT, {
            "step_number": self.current_step,
        })

        while True:
            self.append_system_history(prompt)
            result = self.llm.chat(prompt if isinstance(
                prompt, str) else json.dumps(prompt, cls=ResearchWorkflow.JSONEncoder))
            parsed_result = self.parseResponse(result)
            if 'intents' in parsed_result:
                intent_result = []
                for i in parsed_result['intents']:
                    response = self.handleIntent(
                        i['name'], i['content'])
                    if response:
                        intent_result.append(response)

                self.append_bot_history(parsed_result)
                if intent_result:
                    # supply to llm again for further processing
                    res = [r.asModelInput() if isinstance(
                        r, workflowTools.ToolResponse) else r for r in intent_result]
                    prompt = res
                else:
                    # no intents found, end of research
                    break
            else:
                self.append_bot_history(parsed_result)
                break
        return parsed_result

    def interact(self, prompt: str) -> str:
        """
        Interact with the chat model and return the response generated by the chat model.

        Args:
            prompt (str): The prompt to send to the chat model.

        Returns:
            str: The response generated by the chat model.
        """

        first = True
        while True:
            if first:
                self.append_user_history(prompt)
                first = False
            else:
                self.append_system_history(prompt)
            result = self.llm.chat(prompt if isinstance(
                prompt, str) else json.dumps(prompt))
            parsed_result = self.parseResponse(result)
            if 'intents' in parsed_result:
                intent_result = []
                for i in parsed_result['intents']:
                    response = self.handleIntent(
                        i['name'], i['content'])
                    if response:
                        intent_result.append(response)

                self.append_bot_history(parsed_result)
                if intent_result:
                    # supply to llm again for further processing
                    res = [r.asModelInput() if isinstance(
                        r, workflowTools.ToolResponse) else r for r in intent_result]
                    prompt = res
                else:
                    # no intents found, end of research
                    break
            else:
                self.append_bot_history(parsed_result)
                break
        return parsed_result

    def add_hook(self, hook_name: str, hook: typing.Callable) -> None:
        """
        Add a hook to the research workflow.

        Args:
            hook_name (str): The name of the hook to add.
            hook (typing.Callable): The hook function to add.

        Raises:
            ValueError: If the hook name is not valid.
        """
        if hook_name not in self.hooks:
            raise ValueError(f"Invalid hook name: {hook_name}")

        self.hooks[hook_name].append(hook)

    def remove_hook(self, hook_name: str, hook: typing.Callable) -> None:
        """
        Remove a hook from the research workflow.

        Args:
            hook_name (str): The name of the hook to remove.
            hook (typing.Callable): The hook function to remove.

        Raises:
            ValueError: If the hook name is not valid.
        """
        if hook_name not in self.hooks:
            raise ValueError(f"Invalid hook name: {hook_name}")

        self.hooks[hook_name].remove(hook)


class _ResearchWorkflowManager():
    def __init__(self) -> None:
        """
        Initiate a research workflow manager.
        """
        self.workflows: dict[str, str | float | ResearchWorkflow] = {}
        self.registered_event: dict[str, list[typing.Callable]] = {}

    def add_event(self, event_name: str, event_handler: typing.Callable) -> None:
        """
        Add an event handler to the research workflow manager.

        Args:
            event_name (str): The name of the event to add.
            event_handler (typing.Callable): The event handler function to add.

        Raises:
            ValueError: If the event name is not valid.
        """
        if event_name not in self.registered_event:
            self.registered_event[event_name] = []
        self.registered_event[event_name].append(event_handler)

    def remove_event(self, event_name: str, event_handler: typing.Callable) -> None:
        """
        Remove an event handler from the research workflow manager.

        Args:
            event_name (str): The name of the event to remove.
            event_handler (typing.Callable): The event handler function to remove.

        Raises:
            ValueError: If the event name is not valid.
        """
        if event_name not in self.registered_event:
            raise ValueError(f"Invalid event name: {event_name}")
        self.registered_event[event_name].remove(event_handler)

    def trigger_event(self, event_name: str, *args, **kwargs) -> None:
        """
        Trigger an event by calling all event handlers registered for the event.

        Args:
            event_name (str): The name of the event to trigger.
            *args: The arguments to pass to the event handlers.
            **kwargs: The keyword arguments to pass to the event handlers.

        Raises:
            ValueError: If the event name is not valid.
        """
        if event_name not in self.registered_event:
            raise ValueError(f"Invalid event name: {event_name}")
        for event_handler in self.registered_event[event_name]:
            event_handler(*args, **kwargs)

    def create_workflow(self, prompt: str, history_id: int, api_key: str, no_history_mode: typing.Optional[bool] = False, enabled_user_scripts: list[dict[str, str]] = [], enabled_extra_infos: list[dict[str, str]] = []) -> str:
        session = uuid.uuid4().hex
        self.workflows[session] = {
            'title': "",
            'workflow': ResearchWorkflow(prompt, api_key=api_key, noHistoryMode=no_history_mode, enabledUserScripts=enabled_user_scripts, enabledExtraInfos=enabled_extra_infos),
            'created_at': time.time(),
            'history_id': history_id,
            'client_id': None,
        }

        def event_title_suggested(title: str) -> None:
            self.workflows[session]['title'] = title
            self.trigger_event("title_suggested", session, title)

        workflow: ResearchWorkflow = self.workflows[session]['workflow']
        workflow.add_hook("title_suggested", event_title_suggested)
        workflow.add_hook("research_finished", lambda: self.trigger_event(
            "research_finished", session))
        workflow.add_hook("research_step_finished", lambda: self.trigger_event(
            "research_step_finished", session))
        workflow.add_hook("new_message", lambda msg: self.trigger_event(
            "new_message", session, msg))
        workflow.add_hook("research_initiated", lambda: self.trigger_event(
            "research_initiated", session))
        workflow.add_hook("error", lambda error_msg: self.trigger_event(
            "error", session, error_msg))
        workflow.add_hook("token_count", lambda count: self.trigger_event(
            "token_count", session, count))
        return session

    def bind_client_id(self, session: str, client_id: str) -> None:
        if session not in self.workflows:
            raise ValueError(f"Invalid session: {session}")
        self.workflows[session]['client_id'] = client_id

    def unbind_client_id(self, session: str) -> None:
        if session not in self.workflows:
            raise ValueError(f"Invalid session: {session}")
        del self.workflows[session]['client_id']

    def get_history_id(self, session: str) -> int:
        if session not in self.workflows:
            raise ValueError(f"Invalid session: {session}")
        return self.workflows[session]['history_id']

    def get_client_id(self, session: str) -> str | None:
        if session not in self.workflows:
            raise ValueError(f"Invalid session: {session}")
        return self.workflows[session].get('client_id', None)

    def get_workflow(self, session: str) -> ResearchWorkflow:
        if session not in self.workflows:
            raise ValueError(f"Invalid session: {session}")
        return self.workflows[session]['workflow']

    def get_workflow_by_client_id(self, client_id: str) -> ResearchWorkflow | None:
        for session in self.workflows:
            if self.workflows[session].get('client_id', None) == client_id:
                return self.workflows[session]['workflow']
        return None

    def get_workflow_title(self, session: str) -> str:
        if session not in self.workflows:
            raise ValueError(f"Invalid session: {session}")
        return self.workflows[session]['title']

    def get_workflow_history(self, session: str) -> list[dict[str, str]]:
        if session not in self.workflows:
            raise ValueError(f"Invalid session: {session}")
        return self.workflows[session]['workflow'].history

    def get_workflow_created_at(self, session: str) -> float:
        if session not in self.workflows:
            raise ValueError(f"Invalid session: {session}")
        return self.workflows[session]['created_at']

    def delete_workflow(self, session: str) -> None:
        if session not in self.workflows:
            raise ValueError(f"Invalid session: {session}")
        del self.workflows[session]


ResearchWorkflowManager = _ResearchWorkflowManager()

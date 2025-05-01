import mimetypes
from typing import Any
import typing
# import google.generativeai as genai # Old import
# import google.generativeai.types.content_types # Old import

from google import genai  # New import
from google.genai import types  # New import for type definitions

import logger  # Assuming this is a custom logger


class ChatGoogleGenerativeAI():
    """
    A class for chatting with Google's Generative AI models using the google-genai library.

    Attributes:
        client (genai.Client): The Generative AI client.
        model_name (str): The name of the Generative AI model to use for chatting.
        temperature (float): The temperature to use for generating responses.
        safety_settings (Any): Safety settings for the model.
        system_prompt (str): The system prompt to use for the chat.
        tools (list[typing.Any]): Tools to use for the chat.
        chat_session (genai.ChatSession | None): The active chat session.
    """

    def __init__(self, model: str, with_thinking: bool = False, temperature: float = 0.9, safety_settings: Any = None, system_prompt: str | None = None, tools: list[typing.Any] = [], api_key: str = None) -> None:
        self.client = genai.Client(api_key=api_key)
        self.model_name = model
        self.temperature = temperature
        self.safety_settings = safety_settings
        self.system_prompt = system_prompt
        self.tools = tools
        self.chat_session = None
        self.with_thinking = with_thinking

    def initiate(self, begin_msg: list[dict[str, str]], streamed: bool = False) -> str | types.GenerateContentResponse | typing.Iterator[types.GenerateContentResponse]:
        if self.chat_session is None:
            chat_config = types.GenerateContentConfig(
                temperature=self.temperature,
                safety_settings=self.safety_settings,
                tools=self.tools,
                system_instruction=self.system_prompt,
                thinking_config=types.ThinkingConfigDict(
                    include_thoughts=self.with_thinking)
            )

            self.chat_session = self.client.chats.create(
                model=self.model_name,
                config=chat_config
            )

        if not streamed:
            resp = self.chat_session.send_message(begin_msg)
            return resp.text
        else:
            # Use send_message_stream for streaming
            return self.chat_session.send_message_stream(begin_msg)

    def chat(self, user_msg: list[dict[str, str]], streamed: bool = False) -> str | typing.Iterator[types.GenerateContentResponse]:
        if self.chat_session is None:
            raise ValueError(f'{__name__}: Chat session not initiated')

        # chat with user message
        if not streamed:
            resp = self.chat_session.send_message(user_msg)
            return resp.text
        else:
            return self.chat_session.send_message_stream(user_msg)

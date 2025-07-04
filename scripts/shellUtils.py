import pathlib
import mimetypes
import workflowTools
from workflowTools import ImageResponse, TextResponse
import subprocess


def executeShellCommandWithOutput(command: str) -> str:
    """
    Execute a shell command and return the output as a str.

    Args:
        command (str): The shell command to execute.

    Returns:
        str: The output of the shell command as a str.
    """

    process = subprocess.Popen(
        command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, error = process.communicate()

    if process.returncode == 0:
        return TextResponse(output.decode())
    else:
        return TextResponse(f"Error executing command: {error.decode()}")


def register():
    return {
        "executeShellCommandWithOutput": executeShellCommandWithOutput,
    }

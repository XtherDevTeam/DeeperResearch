import pathlib
import mimetypes
import workflowTools

def localfileView(path: str) -> str:
    """
    View the text content of a local file.
    This shall be invoked when you are required to be familiar with the local readable text files or codes.
    You shall not use this to read binary files except image and audio.

    Args:
        path (str): The file path to read.

    Returns:
        str: The content of the file or an error message.
    """
    try:
        if mimetypes.guess_type(path)[0].startswith('image/'):
            return workflowTools.ImageResponse(path, mimetypes.guess_type(path)[0])
        elif mimetypes.guess_type(path)[0].startswith('audio/'):
            return workflowTools.AudioResponse(path, mimetypes.guess_type(path)[0])
        else:
            text = pathlib.Path(path).read_text()
            return text
    except Exception as e:
        return f"Error reading file: {e}"


def localfileUpdate(path: str, content: str) -> str:
    """
    Update the content of a local file.
    This shall be invoked when you are required to update the local readable text files or codes.

    Args:
        path (str): The file path to update.
        content (str): The new content to write to the file.

    Returns:
        str: A success message or an error message.
    """
    try:
        with open(path, 'w+') as f:
            f.write(content)
        return "File updated successfully."
    except Exception as e:
        return f"Error updating file: {e}"


def localfileDir(path: str) -> list[str]:
    """
    List the files and directories in a local directory.
    This shall be invoked when you are required to list the files and directories in a local directory.

    Args:
        path (str): The directory path to list.

    Returns:
        list[str]: A list of file and directory names or an error message.
    """
    try:
        return [f.name for f in pathlib.Path(path).iterdir()]
    except Exception as e:
        return [f"Error listing directory: {e}"]


def register():
    return {
        'localfileView': localfileView,
        'localfileUpdate': localfileUpdate,
        'localfileDir': localfileDir
    }
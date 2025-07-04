import pathlib
import mimetypes
import workflowTools
from workflowTools import ImageResponse, TextResponse
import time
import numpy
import PIL.Image
import PIL.ImageDraw
import io

mss = workflowTools.loadOrReportMissingImport('mss')

pynput = workflowTools.loadOrReportMissingImport('pynput')

def grabScreenContent() -> ImageResponse:
    """
    Captures the current screen content.

    Returns:
        ImageResponse: The captured screen content as an image response.
    """
    with mss.mss() as sct:
        image = sct.grab(sct.monitors[-1]) # whole image
        # convert captured image to ndarray as captured_image
        captured_image = numpy.array(image)
        bytearray_image = io.BytesIO()
        PIL.Image.fromarray(captured_image).save(bytearray_image, format='JPG')
        return ImageResponse(bytearray_image.getvalue())

def mouseMove(x: int, y: int) -> TextResponse:
    """
    Moves the mouse cursor to the specified position.

    Args:
        x (int): The x coordinate of the desired position in relative screen coordinates.
        y (int): The y coordinate of the desired position in relative screen coordinates.
    """

    mouse = pynput.mouse.Controller()
    mouse.move(x, y)
    return TextResponse(f"Mouse moved to ({x}, {y})")

def mouseClick(key: str = 'left') -> TextResponse:
    """
    Simulates a mouse click.

    Args:
        key (str, optional): The mouse button to click. Defaults to 'left'. Available options are 'left', 'right', and 'middle'.
    """
    mouse = pynput.mouse.Controller()
    # mapping key to Button.xxx
    button = {
        'left': pynput.mouse.Button.left,
        'right': pynput.mouse.Button.right,
        'middle': pynput.mouse.Button.middle
    }.get(key, pynput.mouse.Button.left)
    mouse.click(button=button)
    return TextResponse(f"Mouse clicked {key}")

def mousePosition() -> ImageResponse:
    """
    This function retrieves the current position of the mouse cursor as a tuple (x, y).

    Returns:
        ImageResponse: The current mouse position highlighted with a 50px rect box as an image response.
    """
    mouse = pynput.mouse.Controller()
    with mss.mss() as sct:
        image = sct.grab(sct.monitors[-1]) # whole image
        # convert captured image to ndarray as captured_image
        captured_image = numpy.array(image)
        image = PIL.Image.fromarray(numpy.array(captured_image)).convert('RGB')
        # draw a 50px box near mouse
        draw = PIL.ImageDraw.Draw(image)
        x, y = mouse.position
        draw.rectangle([x - 25, y - 25, x + 25, y + 25], outline="red", width=2)
        # draw a text indicating mouse position
        draw.text((x - 25, y - 25), f"({x}, {y})", fill="red")
        bytearray_image = io.BytesIO()
        image.save(bytearray_image, format='JPG')
        return ImageResponse(bytearray_image.getvalue())

def keyboardPress(key: list[str], duration: int = 0) -> TextResponse:
    """
    Simulates a keyboard key press.

    Args:
        key (list[str]): The key to press. E.g. `['a']`, `['shift', 'a']`. Available keys and combinations are the same as `pynput` library in Python 3.
        duration (int, optional): The duration to hold the key press in milliseconds. Defaults to 0.

    Returns:
        TextResponse: A response indicating the key press action.
    """
    if not duration:
        for k in key:
            pynput.keyboard.Controller().press(k)
            pynput.keyboard.Controller().release(k)
    else:
        for k in key:
            pynput.keyboard.Controller().press(k)
        time.sleep(duration / 1000)
        for k in key:
            pynput.keyboard.Controller().release(k)

    return TextResponse(f"Key pressed: {key}")

def keyboardWrite(text: str) -> TextResponse:
    """
    Simulates typing text.

    Args:
        text (str): The text to type.

    Returns:
        TextResponse: A response indicating the text typing action.
    """
    pynput.keyboard.Controller().type(text)
    return TextResponse(f"Text written: {text}")

def register():
    return {
        'grabScreenContent': grabScreenContent,
        'mouseMove': mouseMove,
        'mouseClick': mouseClick,
        'mousePosition': mousePosition,
        'keyboardPress': keyboardPress,
        'keyboardWrite': keyboardWrite,
    }
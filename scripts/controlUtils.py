import pathlib
import mimetypes
import workflowTools
from workflowTools import ImageResponse, TextResponse
import time
import numpy
import PIL.Image
import PIL.ImageDraw
import io
import mss

# mss = workflowTools.loadOrReportMissingImport('mss')
sct = mss.mss()
sct.with_cursor = True  # Capture the mouse cursor in the screenshot
pynput = workflowTools.loadOrReportMissingImport('pynput')
mouse = pynput.mouse.Controller()
keyboard = pynput.keyboard.Controller()


def grabScreenContent() -> ImageResponse:
    """
    Captures the entire virtual screen content, encompassing all monitors.

    Returns:
        ImageResponse: The captured screen content as an image response.
    """

    sct_img = sct.grab(sct.monitors[0])

    img = PIL.Image.frombytes("RGB", sct_img.size, sct_img.bgra, "raw", "BGRX")

    bytearray_image = io.BytesIO()
    img.save(bytearray_image, format='JPEG')
    pathlib.Path('screenshot.jpg').write_bytes(bytearray_image.getvalue())
    return ImageResponse(bytearray_image.getvalue())


def mouseMove(x: int, y: int) -> TextResponse:
    """
    Moves the mouse cursor to the specified relative position on the virtual screen.

    Args:
        x (int): The relative x coordinate on the virtual screen.
        y (int): The relative y coordinate on the virtual screen.
    """

    mouse.move(x, y)
    return TextResponse(f"Mouse moved to relative position ({x}, {y})")


def mouseClick(key: str = 'left') -> TextResponse:
    """
    Simulates a mouse click.

    Args:
        key (str, optional): The mouse button to click. Defaults to 'left'. Available options are 'left', 'right', and 'middle'.
    """
    button = {
        'left': pynput.mouse.Button.left,
        'right': pynput.mouse.Button.right,
        'middle': pynput.mouse.Button.middle
    }.get(key, pynput.mouse.Button.left)
    mouse.click(button)
    return TextResponse(f"Mouse clicked {key}")


def mousePosition() -> ImageResponse:
    """
    Captures the screen and highlights the current mouse position with a 50px red box.
    This works correctly across multiple monitors.

    Returns:
        ImageResponse: An image of the entire virtual screen with the mouse position highlighted.
    """

    monitor_bbox = sct.monitors[0]

    sct_img = sct.grab(monitor_bbox)

    image = PIL.Image.frombytes(
        "RGB", sct_img.size, sct_img.bgra, "raw", "BGRX")

    draw = PIL.ImageDraw.Draw(image)

    x_abs, y_abs = mouse.position

    x_rel = x_abs - monitor_bbox['left']
    y_rel = y_abs - monitor_bbox['top']

    box_size = 25
    draw.rectangle(
        [x_rel - box_size, y_rel - box_size, x_rel + box_size, y_rel + box_size],
        outline="red",
        width=3
    )

    text = f"({int(x_abs)}, {int(y_abs)})"

    draw.text((x_rel + box_size + 5, y_rel), text, fill="red")

    bytearray_image = io.BytesIO()
    image.save(bytearray_image, format='JPEG')
    pathlib.Path('screenshot.jpg').write_bytes(bytearray_image.getvalue())
    return ImageResponse(bytearray_image.getvalue())


def keyboardPress(keys: list[str], duration: int = 0) -> TextResponse:
    """
    Simulates a keyboard key press.

    Args:
        key (list[str]): The keys to press. E.g. `['a']`, `['shift', 'a']`. Available keys and combinations are the same as `pynput` library in Python 3.
        duration (int, optional): The duration to hold the key press in milliseconds. Defaults to 0.

    Returns:
        TextResponse: A response indicating the key press action.
    """
    parsed_keys = [pynput.keyboard.Key[k]
                   if k in pynput.keyboard.Key._member_names_ else k for k in keys]

    for k in parsed_keys:
        keyboard.press(k)

    if duration > 0:
        time.sleep(duration / 1000)

    for k in reversed(parsed_keys):
        keyboard.release(k)

    return TextResponse(f"Key(s) pressed: {keys}")


def keyboardWrite(text: str) -> TextResponse:
    """
    Simulates typing text.

    Args:
        text (str): The text to type.

    Returns:
        TextResponse: A response indicating the text typing action.
    """
    keyboard.type(text)
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

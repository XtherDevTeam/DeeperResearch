import pathlib
import mimetypes
import workflowTools
from workflowTools import ImageResponse, TextResponse
import math
import numpy

def evaluate_expression(expression: str) -> str:
    """
    Evaluate python mathematical expressions with `math` and `numpy` support.

    Args:
        expression (str): The mathematical expression to evaluate.

    Returns:
        str: The result of the evaluation or an error message.
    """
    try:
        result = eval(expression, globals())
        return TextResponse(f"Result: {result}")
    except Exception as e:
        return TextResponse(f"Error: {str(e)}")

def register():
    return {
        "evaluate_expression": evaluate_expression,
    }
# Extensions

This section will contain information about the extensions that are available for DeeperResearch.

There are two types of extensions:

1. **Extra Info**: A piece of information that will be integrated into the system prompt when initiating a research session.
2. **User Script**: A python script that can be run by the model to perform a specific task.

## Extra Info

Extra Info extensions consist of a Markdown text that will be prompted along with the system prompt. It can be used to provide additional information to the model or to guide the model in a specific way.

To create an Extra Info extension, you may write a Markdown text containing the following information:

```markdown
# Title

## Description

You may briefly describe the purpose and background of this extension.

## Information

A guidance on completing a specific task for the model.

## Example

Here is an example of how to:

...

Provide a specific scenario of completing a task with the information provided.
```

## User Script

User Script extensions consist of a Python script that can be run by the model to perform a specific task.

During runtime, DeeperResearch will run the script in a sandbox environment isolated from the rest of the application. `import` statements are **allowed** in the script.

**Structure of a User Script Extension**: The script should be a python module that contains a function called `entry()`. This function will be called when initializing the extension.

`entry()` function should return a dictionary containing the following keys:

- `name`: The invocation name that will be invoked by the model, e.g. `script_name`. There will not be any spaces in the name.
- `func`: The function that actually performs the task.

DeeperResearch will extract the necessary information (e.g. args, result_type, description) from the `func` function signature. So please make sure to follow the correct function signature format.

**Example of a User Script Extension**:

```python
def example_script(arg1: int, arg2: int) -> int:
    """
    This is an example script that takes two arguments and returns their sum.

    Args:
        arg1 (int): The first argument.
        arg2 (int): The second argument.

    Returns:
        int: The sum of the two arguments.
    """
    return arg1 + arg2

def entry():
    return {
        "name": "example_script",
        "func": example_script
    }
```

In this example, the `example_script` function takes two integer arguments and returns their sum. The `entry()` function returns a dictionary containing the `name` and `func` keys. The `name` key is set to `example_script` and the `func` key is set to the `example_script` function.


import chatModel
import requests
import bs4
import googleapiclient.discovery
import urllib.parse
import typing
import dataProvider


def WebsiteReader(url: str) -> dict[str, list[dict] | str]:
    """
    Tool for reading website readable content.

    Args:
        url (str): The website url to read.

    Returns:
        dict[str, list[dict] | str]: A dictionary containing the website content and links as a list of dictionaries.
        For key `content`, the value is the text content of the website. For key `links`, the value is a list of dictionaries
    """

    content = requests.get(url).content
    soup = bs4.BeautifulSoup(content, 'html.parser')
    text = soup.get_text()

    gathered_links = []
    for link in soup.find_all('a'):
        text = link.parent.get_text()
        href = link.get('href')
        if href:
            if href.startswith('http'):
                gathered_links.append({
                    'content': text,
                    'url': href,
                })
            elif href.startswith('/'):
                # extract the host from url and add the href to it
                new_url = urllib.parse.urljoin(url, href)
                gathered_links.append({
                    'content': text,
                    'url': new_url,
                })
            else:
                # ignore relative links
                pass

    return {
        'content': text,
        'links': gathered_links,
    }


def SearchEngine(query: str, page: int = 1) -> list[dict[str, str]]:
    """
    Tool for searching for information on the internet.
    You may use this to find related information with user's given instruction. 
    After gathering brief information through this tool, you should find out a list of websites that are related to the user's instruction, and access them to provide more information.

    Args:
        query (str): The query to search for.
        page (int): The page number to search for. Defaults to 1.

    Returns:
        list[dict[str, str]]: A list of dictionaries containing the search results.
    """

    # Set up the Google Custom Search API
    api_key = dataProvider.DataProvider.getConfig("google_search_engine_key")
    cse_id = dataProvider.DataProvider.getConfig("google_search_engine_cx_id")
    service = googleapiclient.discovery.build(
        'customsearch', 'v1', developerKey=api_key)

    # Search for the query
    res = service.cse().list(q=query, cx=cse_id, num=10, start=10*(page-1)).execute() # support page indexing
    results = []
    for item in res['items']:
        title = item['title']
        link = item['link']
        snippet = item['snippet']
        results.append({'title': title, 'link': link, 'snippet': snippet})
    return results


def AvailableTools() -> list[typing.Callable]:
    """
    Returns a list of available tools.

    Returns:
        list[typing.Callable]: A list of available tools.
    """

    return [
        WebsiteReader,
        SearchEngine,
    ]


def ConvertTypeToStr(type_obj: typing.Any) -> str:
    """
    Convert a type object to a string representation.

    Args:
        type_obj (typing.Any): The type object to convert.

    Returns:
        str: The string representation of the type object.
    """

    if type_obj == str:
        return 'str'
    elif type_obj == int:
        return 'int'
    elif type_obj == float:
        return 'float'
    elif type_obj == bool:
        return 'bool'
    elif type_obj == list:
        return 'list'
    elif type_obj == dict:
        return 'dict'
    else:
        return str(type_obj)


def GetToolDescription(tool: typing.Callable) -> dict[str, str] | None:
    """
    Extract the method name, parameters and return type and description of a tool from callable definition.
    Args:
        tool (typing.Callable): The tool to extract the description from.

    Returns:
        dict[str, str] | None: A dictionary containing the method name, parameters and return type and description of the tool.
    """

    # Extract the method name, parameters and return type
    method_name = tool.__name__
    parameters = {}
    for parameter in tool.__annotations__.items():
        if parameter[0] == 'return':
            continue
        parameters[parameter[0]] = ConvertTypeToStr(parameter[1])
    return_type = ConvertTypeToStr(tool.__annotations__.get('return'))

    # Extract the description from the docstring
    docstring = tool.__doc__
    if docstring is None:
        return None
    description = docstring.strip()

    return {
        'tool': method_name,
        'params': parameters,
        'return_type': return_type,
        'description': description,
    }
    

def GetToolReadableDescription(tool: typing.Callable) -> str:
    """
    Extract the method name, parameters and return type and description of a tool from callable definition and format it as a readable string.
    Args:
        tool (typing.Callable): The tool to extract the description from.

    Returns:
        str: A string containing the method name, parameters and return type and description of the tool.
    """

    description = GetToolDescription(tool)
    desc = f'### {description['tool']}\n\n'
    desc += f'**Invocation name**: `{description["tool"]}`\n\n'
    desc += f'**Params**: \n'
    for param_name, param_type in description['params'].items():
        desc += f'  - `{param_name}` ({param_type})\n'
    desc += '\n'
    desc += f'**Return type**: {description["return_type"]}\n\n'
    desc += f'**Description**: {description["description"]}\n\n'
    desc += '\n'
    return desc
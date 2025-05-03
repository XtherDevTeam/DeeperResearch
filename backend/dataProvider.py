import os
from datetime import timedelta
import json
import sqlite3
import threading
import time
import typing
import logger
import hashlib
import pathlib
import tools
import chatModel
import threading


class DatabaseObject:
    """
    Class representing a database connection object.

    Args:
        dbPath (str): Path to the SQLite database file.

    Methods:
        query(query, args=(), one=False):
            Execute an SQL query on the database.
        runScript(query):
            Execute an SQL script on the database.
        close():
            Close the database connection.
    """

    def __init__(self, dbPath: str) -> None:
        self.db = sqlite3.connect(dbPath, check_same_thread=False)
        self.lock = threading.Lock()

    def query(self, query, args=(), one=False) -> list[dict[str | typing.Any]] | dict[str | typing.Any]:
        """
        Execute an SQL query on the database.

        Args:
            query (str): The SQL query to be executed.
            args (tuple, optional): Query parameters. Defaults to ().
            one (bool, optional): Return only one result. Defaults to False.

        Returns:
            list[dict[str | typing.Any]] | dict[str | typing.Any]: Query result.
        """

        with self.lock:
            cur = self.db.execute(query, args)
            rv = [dict((cur.description[idx][0], value)
                       for idx, value in enumerate(row)) for row in cur.fetchall()]
            lastrowid = cur.lastrowid
            cur.close()
            if query.startswith('insert'):
                return lastrowid
            else:
                return (rv[0] if rv else None) if one else rv

    def runScript(self, query: str):
        """
        Execute an SQL script on the database.

        Args:
            query (str): The SQL script to be executed.
        """
        self.db.executescript(query)
        self.db.commit()
        return None

    def close(self):
        """Close the database connection."""
        self.db.close()


class _DataProvider:
    def __init__(self, db_path: str = './blob/database.db'):
        self.db = DatabaseObject(db_path)
        if not self.checkIfInitialized():
            logger.Logger.log('Database not initialized')
        pass

    def checkIfInitialized(self):
        """
        Check if the database is initialized.

        Returns:
            bool: True if initialized, False otherwise.
        """
        try:
            return len(self.db.query("select 1 from config")) != 0
        except:
            logger.Logger.log('Running initialization script')
            with open(f'./init.sql', 'r') as file:
                self.db.runScript(file.read())
                self.db.db.commit()

    def initialize(self):
        """
        Initialize the database.
        """
        if os.environ.get("GOOGLE_API_KEY"):
            self.db.query('insert into config (google_api_key) values (?)',
                          (os.environ.get("GOOGLE_API_KEY"),))
            self.db.db.commit()
        else:
            logger.Logger.log(
                'No GOOGLE_API_KEY found in environment variables, using null value')
            self.db.query(
                'insert into config (google_api_key) values (?)', ("",))
            self.db.db.commit()

    def getConfig(self) -> dict[str, str]:
        """
        Get the configuration.

        Returns:
            dict[str, str]: Configuration.
        """
        return self.db.query("select * from config")[0]

    def setConfig(self, config: dict[str, str]):
        """
        Set the configuration.

        Args:
            config (dict[str, str]): Configuration.
        """
        self.db.query("update config set deep_research_model = ?, secret = ?, google_search_engine_key = ?, google_search_engine_cx_id = ?, google_api_key = ?",
                      (config['deep_research_model'], config['secret'], config['google_search_engine_key'], config['google_search_engine_cx_id'], config['google_api_key']))
        return self.getConfig()

    def getAllResearchHistory(self) -> list[dict[str, str]]:
        """
        Get the research history.

        Returns:
            list[dict[str, str]]: Research history.
        """
        return self.db.query("select id, name, created_at from research_history")

    def addResearchHistory(self, name: str, history: list[dict[str, str]]):
        """
        Add a research history.
        """
        self.db.query("insert into research_history (name, history, created_at) values (?,?,?)",
                      (name, json.dumps(history), int(time.time())))
        return self.db.query("select last_insert_rowid()")[0]['last_insert_rowid()']

    def getResearchHistory(self, id: int) -> dict[str, str]:
        """
        Get a research history.

        Args:
            id (int): ID of the research history.

        Returns:
            dict[str, str]: Research history.
        """
        r = self.db.query(
            "select * from research_history where id = ?", (id,), one=True)
        if r is None:
            return None
        r['history'] = json.loads(r['history'])
        return r

    def deleteResearchHistory(self, id: int):
        """
        Delete a research history.

        Args:
            id (int): ID of the research history.
        """
        self.db.query("delete from research_history where id = ?", (id,))
        return self.getAllResearchHistory()

    def updateResearchHistoryTitle(self, id: int, title: str):
        """
        Update a research history title.

        Args:
            id (int): ID of the research history.
            title (str): New title.
        """
        self.db.query(
            "update research_history set name = ? where id = ?", (title, id))

    def updateResearchHistory(self, id: int, history: list[dict[str, str]]):
        """
        Update a research history.

        Args:
            id (int): ID of the research history.
            history (list[dict[str, str]]): New history.
        """
        self.db.query(
            "update research_history set history = ? where id = ?", (json.dumps(history), id))

    def createExtraInfo(self, name: str, description: str, author: str, content: str, enabled: bool = True):
        """
        Create an extra info in database.

        Args:
            name (str): Name of the extra info.
            description (str): Description of the extra info.
            author (str): Author of the extra info.
            content (str): Content of the extra info.
            enabled (bool, optional): Whether the extra info is enabled. Defaults to True.
        """

        self.db.query("insert into extra_infos (name, description, author, content, enabled) values (?,?,?,?,?)",
                      (name, description, author, content, enabled))
        return self.db.query("select last_insert_rowid()")[0]['last_insert_rowid()']

    def getExtraInfo(self, id: int) -> dict[str, str]:
        """
        Get an extra info from database.

        Args:
            id (int): ID of the extra info.

        Returns:
            dict[str, str]: Extra info.
        """
        r = self.db.query(
            "select * from extra_infos where id = ?", (id,), one=True)
        if r is None:
            return None
        return r

    def getExtraInfoList(self) -> list[dict[str, str]]:
        """
        Get all extra info from database.

        Returns:
            list[dict[str, str]]: List of extra info.
        """
        return self.db.query("select name, description, author, enabled, id, content from extra_infos")

    def updateExtraInfo(self, id: int, name: str, description: str, author: str, content: str, enabled: bool):
        """
        Update an extra info in database.

        Args:
            id (int): ID of the extra info.
            name (str): Name of the extra info.
            description (str): Description of the extra info.
            author (str): Author of the extra info.
            content (str): Content of the extra info.
            enabled (bool): Whether the extra info is enabled.
        """
        self.db.query("update extra_infos set name = ?, description = ?, author = ?, content = ?, enabled = ? where id = ?",
                      (name, description, author, content, enabled, id))
        return self.db.query("select last_insert_rowid()")[0]['last_insert_rowid()']

    def deleteExtraInfo(self, id: int):
        """
        Delete an extra info from database.

        Args:
            id (int): ID of the extra info.
        """
        self.db.query("delete from extra_infos where id = ?", (id,))
        return self.getExtraInfoList()

    def createUserScript(self, name: str, content: str, enabled: bool = True):
        """
        Create a user script in database.

        Args:
            name (str): Name of the user script.
            content (str): Content of the user script.
            enabled (bool, optional): Whether the user script is enabled. Defaults to True.
        """

        self.db.query("insert into user_scripts (name, content, enabled) values (?,?,?)",
                      (name, content, enabled))
        return self.db.query("select last_insert_rowid()")[0]['last_insert_rowid()']

    def getUserScript(self, id: int) -> dict[str, str]:
        """
        Get a user script from database.

        Args:
            id (int): ID of the user script.

        Returns:
            dict[str, str]: User script.
        """
        r = self.db.query(
            "select * from user_scripts where id = ?", (id,), one=True)
        if r is None:
            return None
        return r

    def getUserScriptList(self) -> list[dict[str, str]]:
        """
        Get all user script from database.

        Returns:
            list[dict[str, str]]: List of user script.
        """
        return self.db.query("select name, enabled, id, content from user_scripts")

    def updateUserScript(self, id: int, name: str, content: str, enabled: bool):
        """
        Update a user script in database.

        Args:
            id (int): ID of the user script.
            name (str): Name of the user script.
            content (str): Content of the user script.
            enabled (bool): Whether the user script is enabled.
        """
        self.db.query("update user_scripts set name = ?, content = ?, enabled = ? where id = ?",
                      (name, content, enabled, id))
        return self.db.query("select last_insert_rowid()")[0]['last_insert_rowid()']

    def deleteUserScript(self, id: int):
        """
        Delete a user script from database.

        Args:
            id (int): ID of the user script.
        """
        self.db.query("delete from user_scripts where id = ?", (id,))
        return self.getUserScriptList()
    
    
    def getAllEnabledExtraInfos(self) -> list[dict[str, str]]:
        """
        Get all enabled extra infos from database.

        Returns:
            list[dict[str, str]]: List of enabled extra infos.
        """
        return self.db.query("select name, description, author, content, id from extra_infos where enabled = 1")

    def getAllEnabledUserScripts(self) -> list[dict[str, str]]:
        """
        Get all enabled user scripts from database.

        Returns:
            list[dict[str, str]]: List of enabled user scripts.
        """
        return self.db.query("select name, content, id from user_scripts where enabled = 1")


DataProvider = _DataProvider()

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
            self.db.query('insert into config (google_api_key) values (?)', (os.environ.get("GOOGLE_API_KEY"),))
            self.db.db.commit()
        else:
            logger.Logger.log('No GOOGLE_API_KEY found in environment variables, using null value')
            self.db.query('insert into config (google_api_key) values (?)', ("",))
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
        self.db.query("update config set deep_research_model = ?, secret = ?, google_search_engine_key = ?, google_search_engine_cx_id = ?, google_api_key = ?", (config['deep_research_model'], config['secret'], config['google_search_engine_key'], config['google_search_engine_cx_id'], config['google_api_key']))
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
        self.db.query("insert into research_history (name, history, created_at) values (?,?,?)", (name, json.dumps(history), int(time.time())))
        return self.getAllResearchHistory()
    
    
    def getResearchHistory(self, id: int) -> dict[str, str]:
        """
        Get a research history.

        Args:
            id (int): ID of the research history.

        Returns:
            dict[str, str]: Research history.
        """
        r = self.db.query("select * from research_history where id = ?", (id,))
        if len(r) == 0:
            return None
        r[0]['history'] = json.loads(r[0]['history'])
        return r[0]
    
    
    def deleteResearchHistory(self, id: int):
        """
        Delete a research history.

        Args:
            id (int): ID of the research history.
        """
        self.db.query("delete from research_history where id = ?", (id,))
        return self.getAllResearchHistory()
    
    
DataProvider = _DataProvider()
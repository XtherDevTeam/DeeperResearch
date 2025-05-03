import logger
import workflowTools

class UserScript():
    def __init__(self, name, script):
        logger.Logger.info(f'[Script/{name}]: Creating user script environment')
        self.globals = {}
        self.locals = {}
        self.script = script
        self.name = name
        self.bc = compile(script, f'<string>', 'exec')
        exec(self.bc, self.globals, self.locals)
        logger.Logger.info(f'[Script/{name}]: User script environment created')
        if 'entry' not in self.locals:
            logger.Logger.error(f'[Script/{name}]: No entry function found in user script')
            raise NotImplementedError('No entry function found in user script')
        
        info = self.locals['entry']()
        if not callable(info):
            logger.Logger.error(f'[Script/{name}]: Entry function is not callable')
            raise TypeError('Entry function is not callable')
        
        self.func = info
        self.readable_information = workflowTools.GetToolReadableDescription(self.func)
        
    def getReadableInformation(self):
        return self.readable_information
    
    def getFunc(self):
        return self.func
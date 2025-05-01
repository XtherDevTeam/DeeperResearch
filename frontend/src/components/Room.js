import React from 'react';
import * as Mui from '../Components'
import RoomObject from './RoomObject';
import Api from '../Api'
import Message from './Message';
import Markdown from 'react-markdown'
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { darkTheme } from '@uiw/react-json-view/dark';
import theme from '../theme';

function MessageRendered({ message, index }) {
  const [currentTheme, setCurrentTheme] = React.useState(theme.getCurrentThemeMode())
  const [showIntent, setShowIntent] = React.useState(false)

  React.useEffect(() => {
    const handleThemeChange = () => {
      setCurrentTheme(theme.getCurrentThemeMode())
    }
    theme.listenToThemeModeChange(handleThemeChange)
  }, [])

  React.useEffect(() => {
    console.log('rendering message', message)
  }, [message])

  switch (message.role) {
    case 'info': {
      // centered message
      return <Mui.Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 50 }}>
        <Mui.Typography variant='body1' sx={{ color: 'text.secondary' }}>{message.content.response}</Mui.Typography>
      </Mui.Box>
    }
    case 'bot': {
      // left aligned
      return <Mui.Box key={index} sx={{ display: 'flex', justifyContent: 'flex-start', margin: 50 }}>
        {/* use primary color for bot message */}
        <Mui.Paper sx={{ p: 2, mb: 1, mr: 2, bgcolor: 'surfaceContainer.main', width: '80%', padding: 10 }}>
          {message.content_type === 'text' && <Mui.Typography variant='body1'><Markdown>{message.content}</Markdown></Mui.Typography>}
          {message.content_type === 'json' && <>
            <Mui.ListItemButton onClick={() => {
              setShowIntent(!showIntent)
            }}>
              <Mui.ListItemIcon>
                <Mui.Icons.Code />
              </Mui.ListItemIcon>
              <Mui.ListItemText primary={showIntent ? 'Hide intents' : 'Show intents'} />
            </Mui.ListItemButton>
            <Mui.Collapse in={showIntent} timeout="auto" unmountOnExit>
              <JsonView value={message.content?.intents} theme={currentTheme === 'dark' ? darkTheme : lightTheme} collapse={true} />
            </Mui.Collapse>
            <Mui.Typography variant='body1'><Markdown>{message.content.response}</Markdown></Mui.Typography>
          </>}
          {/* TODO: intents parsed here */}
        </Mui.Paper>
      </Mui.Box>
    }
    case 'user': {
      // right aligned
      return <Mui.Box key={index} sx={{ display: 'flex', justifyContent: 'flex-end', margin: 50 }}>
        <Mui.Paper sx={{ p: 2, mb: 1, ml: 2, bgcolor: 'surfaceContainer.main', width: '80%', padding: 10 }}>
          {message.content_type === 'text' && <Mui.Typography variant='body1'><Markdown>{message.content}</Markdown></Mui.Typography>}
        </Mui.Paper>
      </Mui.Box>
    }
    case 'system': {
      return <Mui.Box key={index} sx={{ display: 'flex', justifyContent: 'flex-end', margin: 50 }}>
        <Mui.Paper sx={{ p: 2, mb: 1, ml: 2, bgcolor: 'surfaceContainer.main', width: '80%', padding: 10 }}>
          {message.content_type === 'text' && <Mui.Typography variant='body1'><Markdown>{message.content}</Markdown></Mui.Typography>}
          {message.content_type === 'json' && <Mui.Typography variant='body1'>
            <JsonView value={message.content} theme={currentTheme === 'dark' ? darkTheme : lightTheme} collapse={true} />
          </Mui.Typography>}
        </Mui.Paper>
      </Mui.Box>
    }
    default: {
      // unknown message role
      return <Mui.Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', margin: 50 }}>
        <Mui.Typography variant='body1' sx={{ color: 'text.secondary' }}>{message.content.response}</Mui.Typography>
        {message.content_type === 'json' && <Mui.Typography variant='body1'>{JSON.stringify(message.content)}</Mui.Typography>}
      </Mui.Box>
    }
  }
}

function Room({ inputEvent, token, connect, onErr, onTitle, ref, sx }) {
  const room = React.useRef(null)
  const [title, setTitle] = React.useState(null)
  const [researchCompleted, setResearchCompleted] = React.useState(false)

  const [messagesRendered, setMessagesRendered] = React.useState([])
  const messagesRef = React.useRef([])
  const [readyToConduct, setReadyToConduct] = React.useState(false)
  const [readyToNextStep, setReadyToNextStep] = React.useState(false)

  // alert related
  const [messageTitle, setMessageTitle] = React.useState(null)
  const [messageContent, setMessageContent] = React.useState(null)
  const [messageType, setMessageType] = React.useState(null)
  const [messageOpen, setMessageOpen] = React.useState(false)

  const addImpendingMessage = React.useCallback((message) => {
    console.log('adding impending message', message, messagesRef.current, messagesRendered, [...messagesRef.current])
    messagesRef.current.push(message)
    setMessagesRendered([...messagesRef.current])
  }, [messagesRendered])

  React.useEffect(() => {
    console.log('rendering messages', messagesRef.current, messagesRendered)
  }, [messagesRendered])

  React.useEffect(() => {
    if (inputEvent && inputEvent.content && room.current) {
      room.current.interact(inputEvent.content)
    }
  }, [inputEvent])

  React.useEffect(() => {
    if (connect) {
      if (token) {
        // connect to room with token
        console.log('connecting to room with token', token)
        room.current = new RoomObject(token, Api.getServerUrl())
        room.current.on_research_initiated((data) => {
          addImpendingMessage({
            'role': 'info', 'content': {
              'response': 'Research initiated.',
              'intents': null
            }, 'content_type': 'json'
          })
          setReadyToConduct(true)
        })
        room.current.on_title_suggested((data) => {
          console.log('title suggested', data)
          setTitle(data)
          onTitle(data)
        })
        room.current.on_new_message((data) => {
          console.log('new message', data)
          addImpendingMessage(data)
        })
        room.current.on_research_finished((data) => {
          addImpendingMessage({
            'role': 'info', 'content': {
              'response': 'Research finished.',
              'intents': null
            }, 'content_type': 'json'
          })
        })
        room.current.on_research_step_finished((data) => {
          addImpendingMessage(
            {
              'role': 'info', 'content': {
                'response': 'Step finished.',
                'intents': null
              }, 'content_type': 'json'
            }
          )
          setReadyToNextStep(true)
        })
        room.current.connect()
      }

    } else {
      onErr('Invalid token')
    }

  }, [connect])

  return <Mui.Box sx={{ ...sx }} ref={ref}>
    <Message title={messageTitle} message={messageContent} type={messageType} open={messageOpen} dismiss={() => setMessageOpen(false)} />
    {messagesRendered.map((message, index) => <MessageRendered key={index} message={message} index={index} />)}
    <Mui.Box key={114514191981 + 'qwq'} sx={{ height: 100 }}>
    </Mui.Box>
    {/* FAB with "Conduct" text */}
    {readyToConduct && <Mui.Fab color='primary' variant="extended" aria-label='Conduct' sx={{ position: 'fixed', bottom: 'calc(10vh + 50px)', right: 50 }} onClick={() => {
      if (room.current) {
        room.current.conduct()
        setReadyToConduct(false)
      }
    }}>
      <Mui.Icons.Send />
      <Mui.Typography variant='body1' sx={{ ml: 1 }}>Conduct</Mui.Typography>
    </Mui.Fab>}

    {/* FAB with "Next Step" text */}
    {readyToNextStep && !researchCompleted && <Mui.Fab color='primary' variant="extended" aria-label='Next Step' sx={{ position: 'fixed', bottom: 'calc(10vh + 50px)', right: 50 }} onClick={() => {
      if (room.current) {
        room.current.next_step()
        setReadyToNextStep(false)
      }
    }}>
      <Mui.Icons.Send />
      <Mui.Typography variant='body1' sx={{ ml: 1 }}>Next Step</Mui.Typography>
    </Mui.Fab>}
  </Mui.Box>
}

export default Room;
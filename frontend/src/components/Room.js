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
import MessageRendered from './MessageRendered';


const Room = React.forwardRef(({ token, connect, inputEvent, onErr, onTitle, onUpdateTokenCount, sx, autoNextStep }, ref) => {
  const room = React.useRef(null)
  const [title, setTitle] = React.useState(null)
  const [researchCompleted, setResearchCompleted] = React.useState(false)

  const [messagesRendered, setMessagesRendered] = React.useState([])
  const messagesRef = React.useRef([])
  const [readyToConduct, setReadyToConduct] = React.useState(false)
  const [readyToNextStep, setReadyToNextStep] = React.useState(false)
  const dummyMessageRef = React.useRef(null)

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
    if (room.current && readyToNextStep) {
      console.log(`ready to next step with autoNextStep state: ${autoNextStep}`)
      if (autoNextStep) {
        console.log('automatically proceeding to next step')
        room.current.next_step()
        setReadyToNextStep(false)
      }
    }
  }, [readyToNextStep, autoNextStep])

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
          setTimeout(() => {
            console.log('scrolling to bottom')
            dummyMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        })
        room.current.on_research_finished((data) => {
          addImpendingMessage({
            'role': 'info', 'content': {
              'response': 'Research finished.',
              'intents': null
            }, 'content_type': 'json'
          })
          setResearchCompleted(true)
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
        room.current.on_token_count((data) => {
          onUpdateTokenCount(data)
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
    <Mui.Box key={114514191981 + 'qwq'} sx={{ height: 100 }} ref={dummyMessageRef} />
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
})

export default Room;
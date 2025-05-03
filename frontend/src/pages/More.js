import React from 'react';
import About from './About';
import * as Mui from '../Components'
import Api from '../Api';
import Message from '../components/Message';
import ContentEditDialog from '../components/ContentEditDialog';

function More() {
  const [messageTitle, setMessageTitle] = React.useState('')
  const [messageContent, setMessageContent] = React.useState('')
  const [messageType, setMessageType] = React.useState('success')
  const [messageOpen, setMessageOpen] = React.useState(false)
  const [showAboutPage, setShowAboutPage] = React.useState(false)
  const [serverUrl, setServerUrl] = React.useState(Api.getServerUrl())
  const [deepResearchModel, setDeepResearchModel] = React.useState('gemini-2.0-flash-thinking-exp-01-21')
  const [secret, setSecret] = React.useState(Api.getSecret())
  const [googleSearchEngineKey, setGoogleSearchEngineKey] = React.useState('')
  const [googleSearchEngineCxId, setGoogleSearchEngineCxId] = React.useState('')
  const [googleApiKey, setGoogleApiKey] = React.useState('')
  const [thinkingTokenBudget, setThinkingTokenBudget] = React.useState(0)

  function handleServiceInfoRefresh() {
    Api.getServiceInfo(serverUrl).then(r => {
      console.log(r)
      if (r.data.status) {
        console.log('Service info refreshed successfully')
        Api.getConfig('deep_research_model').then(r => {
          if (r.status) {
            setDeepResearchModel(r.data)
          }
        })
        Api.getConfig('secret').then(r => {
          if (r.status) {
            setSecret(r.data)
          }
        })
        Api.getConfig('google_search_engine_key').then(r => {
          if (r.status) {
            setGoogleSearchEngineKey(r.data)
          }
        })
        Api.getConfig('google_search_engine_cx_id').then(r => {
          if (r.status) {
            setGoogleSearchEngineCxId(r.data)
          }
        })
        Api.getConfig('google_api_key').then(r => {
          if (r.status) {
            setGoogleApiKey(r.data)
          }
        })
        Api.getConfig('thinking_token_budget').then(r => {
          if (r.status) {
            setThinkingTokenBudget(r.data)
          }
        })
      } else {
        setMessageTitle('Error')
        setMessageContent(r.data.data)
        setMessageType('error')
        setMessageOpen(true)
      }
    })
  }


  React.useEffect(() => {
    if (secret) {
      if (secret !== Api.getSecret()) {
        Api.setSecret(secret)
        Api.authenticate(secret).then(r => {
          console.log('result', r)
          if (r.status) {
            handleServiceInfoRefresh()
            setMessageContent(`Authenticated successfully`)
            setMessageType('success')
            setMessageOpen(true)
            setMessageTitle('Success')
          } else {
            setMessageTitle('Error')
            setMessageContent(r.data.data)
            setMessageType('error')
            setMessageOpen(true)
          }
        })
      } else {
        handleServiceInfoRefresh()
      }
    }
  }, [secret])


  React.useEffect(() => {
    if (serverUrl && serverUrl !== Api.getServerUrl()) {
      Api.setServerUrl(serverUrl)
      handleServiceInfoRefresh()
    }
  }, [serverUrl])


  return <>{!showAboutPage && <Mui.Box sx={{ height: '100%', width: 'calc(100% - 30px)', marginLeft: 30, paddingRight: 30 }}>
    <Message title={messageTitle} message={messageContent} type={messageType} open={messageOpen} dismiss={() => setMessageOpen(false)} />
    <Mui.Box data-overlayscrollbars-initialize sx={{ height: '100%', overflowY: 'scroll' }}>
      <Mui.List style={{ marginTop: 30 }}>
        <ContentEditDialog title="Server URL" description={'Edit Remote server URL'} defaultValue={serverUrl} onOk={(value) => {
          setServerUrl(value)
        }} icon={<Mui.Icons.Storage />} />
        <ContentEditDialog title="Secret" description={'Edit Secret Key'} defaultValue={secret} onOk={(value) => {
          setSecret(value)
        }} icon={<Mui.Icons.VpnKey />} secret={true} />
        <ContentEditDialog title="DeepResearch Model" description={'Model used for generating research content'} defaultValue={deepResearchModel} onOk={(value) => {
          setDeepResearchModel(value)
          Api.setConfig('deep_research_model', value).then(r => {
            console.log(r)
            if (r.status) {
              setMessageContent(`Updated DeepResearch Model suceessfully`)
              setMessageType('success')
              setMessageOpen(true)
              setMessageTitle('Success')
            } else {
              setMessageTitle('Error')
              setMessageContent(r.data.data)
              setMessageType('error')
              setMessageOpen(true)
            }
          })
        }} icon={<Mui.Icons.ModelTraining />} />
        <ContentEditDialog title="Google Search Engine Key" description={'Google API Key for Google custom search engine'} defaultValue={googleSearchEngineKey} onOk={(value) => {
          setGoogleSearchEngineKey(value)
          Api.setConfig('google_search_engine_key', value).then(r => {
            console.log(r)
            if (r.status) {
              setMessageContent(`Updated Google Search Engine Key suceessfully`)
              setMessageType('success')
              setMessageOpen(true)
              setMessageTitle('Success')
            } else {
              setMessageTitle('Error')
              setMessageContent(r.data.data)
              setMessageType('error')
              setMessageOpen(true)
            }
          })
        }} icon={<Mui.Icons.Search />} secret={true} />
        <ContentEditDialog title="Google Search Engine CxId" description={'Edit Google Search Engine CxId'} defaultValue={googleSearchEngineCxId} onOk={(value) => {
          setGoogleSearchEngineCxId(value)
          Api.setConfig('google_search_engine_cx_id', value).then(r => {
            console.log(r)
            if (r.status) {
              setMessageContent(`Updated Google Search Engine CxId suceessfully`)
              setMessageType('success')
              setMessageOpen(true)
              setMessageTitle('Success')
            } else {
              setMessageTitle('Error')
              setMessageContent(r.data.data)
              setMessageType('error')
              setMessageOpen(true)
            }
          })
        }} icon={<Mui.Icons.Search />} secret={true} />
        <ContentEditDialog title="Google API Key" description={'Your Google API Key for Gemini models'} defaultValue={googleApiKey} onOk={(value) => {
          setGoogleApiKey(value)
          Api.setConfig('google_api_key', value).then(r => {
            console.log(r)
            if (r.status) {
              setMessageContent(`Updated Google API Key suceessfully`)
              setMessageType('success')
              setMessageOpen(true)
              setMessageTitle('Success')
            } else {
              setMessageTitle('Error')
              setMessageContent(r.data.data)
              setMessageType('error')
              setMessageOpen(true)
            }
          })
        }} icon={<Mui.Icons.Cloud />} secret={true} />
        <ContentEditDialog title="Thinking Token Budget" description={'Amount of tokens spent on thinking in each step of the research process'} defaultValue={thinkingTokenBudget} onOk={(value) => {
          setThinkingTokenBudget(value)
          Api.setConfig('thinking_token_budget', parseInt(value)).then(r => {
            console.log(r)
            if (r.status) {
              setMessageContent(`Updated Thinking Token Budget suceessfully`)
              setMessageType('success')
              setMessageOpen(true)
              setMessageTitle('Success')
            } else {
              setMessageTitle('Error')
              setMessageContent(r.data.data)
              setMessageType('error')
              setMessageOpen(true)
            }
          })
        }} icon={<Mui.Icons.Token />} secret={false} />
        <Mui.ListItemButton onClick={() => {
          setShowAboutPage(true)
        }}>
          <Mui.ListItemIcon><Mui.Icons.Info /></Mui.ListItemIcon>
          <Mui.ListItemText primary="About" secondary="DeeperResearch 1.0.0(1)" />
        </Mui.ListItemButton>
      </Mui.List>
    </Mui.Box>
  </Mui.Box>}
    {showAboutPage && <Mui.Box sx={{ height: '100%', width: 'calc(100% - 30px)' }}>
      <About onClose={() => setShowAboutPage(false)} />

    </Mui.Box>}
  </>;
}

export default More;
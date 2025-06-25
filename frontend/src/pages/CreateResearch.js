import React from 'react';
import * as Mui from '../Components'
import Room from '../components/Room';
import Message from '../components/Message';
import Api from '../Api';

function EditGenerationConfigDialog({ open, onClose, config, setConfig }) {
  const [noHistoryMode, setNoHistoryMode] = React.useState(config?.no_history_mode);
  const [useModel, setUseModel] = React.useState(config?.use_model);

  return <Mui.Dialog open={open} onClose={onClose}>
    <Mui.DialogTitle>Edit Generation Config</Mui.DialogTitle>
    <Mui.DialogContent>
      <Mui.Grid container spacing={2} sx={{ marginTop: 5 }}>
        <Mui.Grid item xs={12}>
          <Mui.FormControlLabel
            control={
              <Mui.Checkbox
                checked={noHistoryMode}
                onChange={(e) => {
                  setNoHistoryMode(e.target.checked);
                }}
              />
            }
            label="No History Mode"
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.TextField
            label="Model"
            variant="filled"
            value={useModel}
            fullWidth
            onChange={(e) => {
              setUseModel(e.target.value);
            }}
          />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.DialogContent>
    <Mui.DialogActions>
      <Mui.Button onClick={onClose}>Cancel</Mui.Button>
      <Mui.Button onClick={() => {
        setConfig({
          no_history_mode: noHistoryMode,
          use_model: useModel,
        });
        onClose();
      }}>Save</Mui.Button>
    </Mui.DialogActions>
  </Mui.Dialog>
}


function CreateResearch({ setTitle }) {
  const [researchToken, setResearchToken] = React.useState(null);
  const [inputEvent, setInputEvent] = React.useState(null);
  const [inputContent, setInputContent] = React.useState("");
  const [connect, setConnect] = React.useState(false);
  const [researchId, setResearchId] = React.useState(null);
  const [tokenCount, setTokenCount] = React.useState(0);
  const scrollableRef = React.useRef(null);

  const [generationConfig, setGenerationConfig] = React.useState(null);
  const [editGenerationConfigOpen, setEditGenerationConfigOpen] = React.useState(false);

  const handleEditGenerationConfigOpen = () => {
    setEditGenerationConfigOpen(true);
  };

  const handleEditGenerationConfigClose = () => {
    setEditGenerationConfigOpen(false);
  };

  // message alert related
  const [messageOpen, setMessageOpen] = React.useState(false);
  const [messageTitle, setMessageTitle] = React.useState(null);
  const [messageContent, setMessageContent] = React.useState(null);
  const [messageType, setMessageType] = React.useState(null);

  const handleInputEvent = React.useCallback((str) => {
    setInputEvent({
      type: 'input',
      uniqueId: new Date().getTime(),
      content: str
    });
    setInputContent("");
    if (connect) {
      // handle
    } else {
      // handle create research
      Api.createResearch(str, generationConfig?.no_history_mode || false).then(r => {
        if (r.status) {
          setResearchToken(r.data.workflow_session);
          setResearchId(r.data.id);
          setConnect(true);
        } else {
          console.log(r);
          setMessageTitle('Error');
          setMessageContent(r.data);
          setMessageType('error');
          setMessageOpen(true);
        }
      }).catch(err => {
        console.log(err);
        setMessageTitle('Error');
        setMessageContent(err.data);
        setMessageType('error');
        setMessageOpen(true);
      })
    }
  }, [connect, generationConfig]);

  return <Mui.Box style={{ height: '100%', width: '100%' }}>
    <EditGenerationConfigDialog open={editGenerationConfigOpen} onClose={handleEditGenerationConfigClose} config={generationConfig} setConfig={setGenerationConfig} />
    <Message open={messageOpen} title={messageTitle} content={messageContent} type={messageType} dismiss={() => {
      setMessageOpen(false);
    }} />
    {!researchToken && <Mui.Box sx={{ display: 'flex', width: '100%', height: '100%' }}>

      <Mui.Box sx={{ display: 'block', padding: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center', width: '100%' }}>
        <Mui.Icons.Biotech sx={{ fontSize: 64 }} />
        <Mui.Typography variant="h5" style={{ marginTop: 20 }}>
          What would you like to dive deep into today?
        </Mui.Typography>
        <Mui.Typography variant="body1" style={{ marginTop: 20 }}>
          Breaking the traditional boundries of LLM, you may use this tool to conduct a detailed research on anything you are interested in with live content.
        </Mui.Typography>
      </Mui.Box>

    </Mui.Box>}
    {researchToken && <Room token={researchToken} onTitle={(title) => {
      console.log(title);
      setTitle(title);
    }} sx={{ height: '100%', overflowY: 'scroll', width: '100%' }} inputEvent={inputEvent} connect={connect} onErr={(err) => {
      console.log(err);
      setMessageTitle('Error');
      setMessageContent(err.data);
      setMessageType('error');
      setMessageOpen(true);
    }} ref={scrollableRef} onUpdateTokenCount={(count) => {
      setTokenCount(count);
    }} />}
    {/* Text Area Fixed */}
    <Mui.Box sx={{
      position: 'fixed',
      bottom: 0,
      width: 'calc(100% - 20vw)',
    }}>
      <Mui.Paper sx={{
        alignSelf: 'center',
        margin: 20,
        padding: 10,
        width: 'calc((100% - 20vw) * 80%)'
      }}>
        <Mui.Grid container spacing={2}>
          <Mui.Grid item sm={10} xs={12} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <Mui.TextField
              fullWidth
              label="Prompt"
              variant="filled"
              multiline
              maxRows={7}
              value={inputContent}
              onChange={(e) => {
                setInputContent(e.target.value);
              }}
            />
          </Mui.Grid>
          <Mui.Grid item sm={2} xs={12} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <Mui.Box sx={{ flex: 1 }}>
              <Mui.Button variant="contained" fullWidth onClick={() => {
                handleInputEvent(inputContent);
              }}>
                {connect ? 'Send' : 'Start'}
              </Mui.Button>
            </Mui.Box>
            <Mui.Box sx={{ marginLeft: '10px' }}>
              <Mui.IconButton onClick={handleEditGenerationConfigOpen}>
                <Mui.Icons.Settings />
              </Mui.IconButton>
            </Mui.Box>
          </Mui.Grid>
          <Mui.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Mui.Typography variant="body2">
              {tokenCount} tokens used. Always double-check the result before sharing.
            </Mui.Typography>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Paper>
    </Mui.Box>
  </Mui.Box >
}

export default CreateResearch
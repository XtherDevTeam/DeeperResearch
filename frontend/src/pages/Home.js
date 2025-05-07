
import React from "react";
import Api from "../Api";
import { useNavigate } from "react-router-dom";
import * as Mui from "../Components";
import theme from "../theme";
import Message from "../components/Message";
import More from './More';
import CreateResearch from "./CreateResearch";
import HistoryView from "./HistoryView";
import Extensions from "./Extensions";
import { useLongPress } from 'use-long-press'

function ResearchAction({ research, onOk, onClose, onErr, open }) {
  return <Mui.Dialog onClose={onClose} open={open}>
    <Mui.DialogTitle>
      {research?.name}
    </Mui.DialogTitle>
    {research && <Mui.List>
      <Mui.ListItemButton onClick={() => {
        Api.deleteResearchHistory(research.id).then(r => {
          if (r.status) {
            onOk('Successfully deleted')
            onClose()
          }
        }).catch(e => {
          onErr('Network error')
          onClose()
        })
      }} >
        <Mui.ListItemIcon>
          <Mui.Icons.Delete />
        </Mui.ListItemIcon>
        <Mui.ListItemText primary="Delete" />
      </Mui.ListItemButton>
      <Mui.ListItemButton onClick={() => {
        onClose()
      }} >
        <Mui.ListItemIcon>
          <Mui.Icons.Close />
        </Mui.ListItemIcon>
        <Mui.ListItemText primary="Cancel" />
      </Mui.ListItemButton>
    </Mui.List>}
  </Mui.Dialog>
}

function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: "",
    level: 0
  });
  const [currentTab, setCurrentTab] = React.useState(0);
  const [currentTheme, setCurrentTheme] = React.useState(theme.theme());
  const [selectedIndex, setSelectedIndex] = React.useState({
    type: 'CreateResearch',
    title: 'Create Research',
    data: null
  });
  const [secondBoxMarginLeft, setSecondBoxMarginLeft] = React.useState('20vw')
  const [researchHistory, setResearchHistory] = React.useState([]);

  const [currentResearch, setCurrentResearch] = React.useState(null)
  const [currentResearchActionOpen, setCurrentResearchActionOpen] = React.useState(false)

  // message related
  const [messageTitle, setMessageTitle] = React.useState('')
  const [messageContent, setMessageContent] = React.useState('')
  const [messageType, setMessageType] = React.useState('')
  const [messageOpen, setMessageOpen] = React.useState(false)

  const drawerRef = React.useRef(null);

  function handleResearchListUpdate() {
    Api.getAllResearchHistory().then(r => {
      if (r.status) {
        console.log(r.data)
        setResearchHistory(r.data)
      } else {
        console.log(r.data)
        setMessageTitle('Error')
        setMessageContent(r.data)
        setMessageType('error')
        setMessageOpen(true)
      }
    })
  }

  React.useEffect(() => {
    handleResearchListUpdate()
    theme.listenToThemeModeChange(() => {
      setCurrentTheme(theme.theme());
    })
  }, [])

  return <Mui.Box style={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw', backgroundColor: currentTheme.palette.surfaceContainer.main }}>
    <Message title={messageTitle} message={messageContent} type={messageType} open={messageOpen} dismiss={() => setMessageOpen(false)}></Message>
    <ResearchAction
      research={currentResearch}
      onOk={(message) => {
        setMessageTitle('Success')
        setMessageContent(message)
        setMessageType('success')
        setMessageOpen(true)
        setCurrentResearch(null)
        setCurrentResearchActionOpen(false)
        // re-render
        handleResearchListUpdate()
      }}
      onClose={() => {
        setCurrentResearch(null)
        setCurrentResearchActionOpen(false)
      }}
      onErr={(message) => {
        setMessageTitle('Error')
        setMessageContent(message)
        setMessageType('error')
        setMessageOpen(true)
      }}
      open={currentResearchActionOpen}
    />
    <Mui.Drawer ref={drawerRef} open={true} onLoad={() => { console.log(drawerRef) }} variant="permanent" style={{ position: 'absolute', top: 0, left: 0, height: '100vh' }} PaperProps={{ sx: { width: '20vw' } }}>
      <Mui.Toolbar>
        <Mui.Typography color="inherit" sx={{ fontWeight: 500, letterSpacing: 0.5, fontSize: 20 }}>
          DeeperResearch
        </Mui.Typography>
      </Mui.Toolbar>
      <Mui.List style={{ padding: 10 }}>
        <Mui.Box>
          <Mui.ListItemButton selected={selectedIndex.type === "CreateResearch"} onClick={() => { setSelectedIndex({ type: "CreateResearch", title: "Create Research", data: null }); }}>
            <Mui.ListItemIcon>
              <Mui.Icons.Biotech />
            </Mui.ListItemIcon>
            <Mui.ListItemText primary="Create Research" />
          </Mui.ListItemButton>
          <Mui.ListItem sx={{ py: 2, px: 3, padding: 10 }}>
            <Mui.ListItemText sx={{ fontWeight: 'bold' }}>
              <Mui.Typography color="inherit" sx={{ ml: 1, fontSize: 15, fontWeight: 500 }} >
                Recent
              </Mui.Typography>
            </Mui.ListItemText>
          </Mui.ListItem>
          {researchHistory.map((item, index) => <>
            <Mui.ListItemButton selected={selectedIndex.type == 'HistoryView' && selectedIndex.data == item.id} onClick={() => { setSelectedIndex({ type: 'HistoryView', title: item.name, data: item.id }) }} onContextMenu={(e) => {
              setCurrentResearch(item)
              setCurrentResearchActionOpen(true)
              // prevent
              e.preventDefault()
            }}>
              <Mui.ListItemText primary={item.name} />
            </Mui.ListItemButton>
          </>)}
        </Mui.Box>
        <Mui.Box>
          <Mui.ListItem sx={{ py: 2, px: 3, padding: 10 }}>
            <Mui.ListItemText sx={{ fontWeight: 'bold' }}>
              <Mui.Typography color="inherit" sx={{ ml: 1, fontSize: 15, fontWeight: 500 }} >
                Settings
              </Mui.Typography>
            </Mui.ListItemText>
          </Mui.ListItem>
          <Mui.ListItemButton selected={selectedIndex.type === "Extensions"} onClick={() => { setSelectedIndex({ type: "Extensions", title: "Extensions", data: null }); }}>
            <Mui.ListItemIcon>
              <Mui.Icons.Extension />
            </Mui.ListItemIcon>
            <Mui.ListItemText primary="Extensions" />
          </Mui.ListItemButton>
          <Mui.ListItemButton selected={selectedIndex.type === "More"} onClick={() => { setSelectedIndex({ type: "More", title: "More", data: null }); }}>
            <Mui.ListItemIcon>
              <Mui.Icons.Apps />
            </Mui.ListItemIcon>
            <Mui.ListItemText primary="More" />
          </Mui.ListItemButton>
        </Mui.Box>
      </Mui.List>
    </Mui.Drawer>
    <Mui.Box style={{ display: 'block', marginLeft: secondBoxMarginLeft }}>
      <Mui.AppBar style={{ left: secondBoxMarginLeft, zIndex: 1200 }}>
        <Mui.Toolbar>
          <Mui.Typography color="inherit" sx={{ fontWeight: 500, letterSpacing: 0.5, fontSize: 20 }}>
            {selectedIndex.title}
          </Mui.Typography>
        </Mui.Toolbar>
        <Mui.Paper style={{ padding: 0, borderTopLeftRadius: 30, height: `calc(100vh - 64px)`, width: `calc(100vw - ${secondBoxMarginLeft})` }}>
          {selectedIndex.type === 'CreateResearch' && <CreateResearch setTitle={(title) => {
            setSelectedIndex({ type: 'CreateResearch', title: title })
          }} />}
          {selectedIndex.type === 'More' && <More />}
          {selectedIndex.type === 'HistoryView' && <HistoryView id={selectedIndex.data} sx={{ height: '100%', overflowY: 'scroll', width: '100%' }} />}
          {selectedIndex.type === 'Extensions' && <Extensions />}
        </Mui.Paper>
      </Mui.AppBar>
    </Mui.Box>
  </Mui.Box>
}

export default Home;

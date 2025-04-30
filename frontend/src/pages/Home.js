
import React from "react";
import Api from "../Api";
import { useNavigate } from "react-router-dom";
import * as Mui from "../Components";
import theme from "../theme";
import Message from "../components/Message";
import More from './More';
import CreateResearch from "./CreateResearch";

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
    type: 'Home',
    title: 'Home'
  });
  const [secondBoxMarginLeft, setSecondBoxMarginLeft] = React.useState('20vw')


  // message related
  const [messageTitle, setMessageTitle] = React.useState('')
  const [messageContent, setMessageContent] = React.useState('')
  const [messageType, setMessageType] = React.useState('')
  const [messageOpen, setMessageOpen] = React.useState(false)

  const drawerRef = React.useRef(null);


  theme.listenToThemeModeChange(() => {
    setCurrentTheme(theme.theme());
  })

  return <Mui.Box style={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw', backgroundColor: currentTheme.palette.surfaceContainer.main }}>
    <Message title={messageTitle} message={messageContent} type={messageType} open={messageOpen} dismiss={() => setMessageOpen(false)}></Message>
    <Mui.Drawer ref={drawerRef} open={true} onLoad={() => { console.log(drawerRef) }} variant="permanent" style={{ position: 'absolute', top: 0, left: 0, height: '100vh' }} PaperProps={{ sx: { width: '20vw' } }}>
      <Mui.Toolbar>
        <Mui.Typography color="inherit" sx={{ fontWeight: 500, letterSpacing: 0.5, fontSize: 20 }}>
          DeeperResearch
        </Mui.Typography>
      </Mui.Toolbar>
      <Mui.List style={{ padding: 10 }}>
        <Mui.Box>
          <Mui.ListItem sx={{ py: 2, px: 3, padding: 10 }}>
            <Mui.ListItemText sx={{ fontWeight: 'bold' }}>
              <Mui.Typography color="inherit" sx={{ ml: 1, fontSize: 15, fontWeight: 500 }} >
                Chats
              </Mui.Typography>
            </Mui.ListItemText>
          </Mui.ListItem>
          <Mui.ListItemButton selected={selectedIndex.type == "CreateResearch"} onClick={() => { setSelectedIndex({ type: "CreateResearch", title: "Create Research" }); }}>
            <Mui.ListItemIcon>
              <Mui.Icons.Biotech />
            </Mui.ListItemIcon>
            <Mui.ListItemText primary="Create Research" />
          </Mui.ListItemButton>
        </Mui.Box>
        <Mui.Box>
          <Mui.ListItem sx={{ py: 2, px: 3, padding: 10 }}>
            <Mui.ListItemText sx={{ fontWeight: 'bold' }}>
              <Mui.Typography color="inherit" sx={{ ml: 1, fontSize: 15, fontWeight: 500 }} >
                Settings
              </Mui.Typography>
            </Mui.ListItemText>
          </Mui.ListItem>

          <Mui.ListItemButton selected={selectedIndex.type == "More"} onClick={() => { setSelectedIndex({ type: "More", title: "More" }); }}>
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

        </Mui.Toolbar>
        <Mui.Paper style={{ padding: 0, borderTopLeftRadius: 30, height: `calc(100vh - 64px)`, width: `calc(100vw - ${secondBoxMarginLeft})` }}>
          {selectedIndex.type == 'CreateResearch' && <CreateResearch />}
          {selectedIndex.type == 'More' && <More />}
        </Mui.Paper>
      </Mui.AppBar>
    </Mui.Box>
  </Mui.Box>
}

export default Home;

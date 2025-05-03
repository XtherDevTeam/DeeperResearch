import React from 'react';
import * as Mui from '../Components'
import Api from '../Api';
import MessageRendered from '../components/MessageRendered';

function HistoryView({ id, sx, ref }) {
  const [history, setHistory] = React.useState(null);

  // alert related
    const [messageTitle, setMessageTitle] = React.useState(null)
    const [messageContent, setMessageContent] = React.useState(null)
    const [messageType, setMessageType] = React.useState(null)
    const [messageOpen, setMessageOpen] = React.useState(false)

  React.useEffect(() => {
    Api.getResearchHistory(id).then(data => {
      if (data.status) {
        setHistory(data.data);
      } else {
        setMessageTitle('Error')
        setMessageContent(data.data)
        setMessageType('error')
        setMessageOpen(true)
      }
    })
  }, [id]);

  if (!history) {
    return <Mui.CircularProgress />
  }

  return <Mui.Box sx={{ ...sx }} ref={ref}>
    {history?.history?.map((message, index) => <MessageRendered key={index} message={message} index={index} />)}
    <Mui.Box key={114514191981 + 'qwq'} sx={{ height: 100 }}>
    </Mui.Box>
  </Mui.Box>
}

export default HistoryView;
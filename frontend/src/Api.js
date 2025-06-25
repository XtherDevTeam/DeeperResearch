import axios from 'axios';

axios.defaults.withCredentials = true

let serverUrl = ""

function refreshServerUrl() {
  let serverAddress = window.localStorage.getItem("serverAddress")
  if (serverAddress) {
    serverUrl = `${serverAddress}`
  } else {
    serverUrl = ``
  }
}

function autoAuthenticate() {
  let secret = window.localStorage.getItem("secret")
  if (secret) {
    return authenticate(secret)
  } else {
    return Promise.resolve(null)
  }
}

refreshServerUrl()
autoAuthenticate()

function getServiceInfo(url = serverUrl) {
  return axios.get(`${url}/api/v1/info`)
}

function setServerUrl(url) {
  serverUrl = url
  window.localStorage.setItem("serverAddress", url)
}

function getServerUrl() {
  return serverUrl
}

function setSecret(secret) {
  window.localStorage.setItem("secret", secret)
}

function getSecret() {
  return window.localStorage.getItem("secret")
}

function getConfig(prop) {
  return axios.post(`${serverUrl}/api/v1/config/${prop}/get`).then(r => {
    return r.data
  })
}

function setConfig(prop, value) {
  return axios.post(`${serverUrl}/api/v1/config/${prop}/set`, { value }).then(r => {
    return r.data
  })
}

function authenticate(secret) {
  return axios.post(`${serverUrl}/api/v1/authenticate`, { secret }).then(r => {
    return r.data
  })
}

function getAllResearchHistory() {
  return axios.post(`${serverUrl}/api/v1/research_history`).then(r => {
    return r.data
  })
}

function getResearchHistory(id) {
  return axios.post(`${serverUrl}/api/v1/research_history/get`, {id}).then(r => {
    return r.data
  })
}

function deleteResearchHistory(id) {
  return axios.post(`${serverUrl}/api/v1/research_history/delete`, {id}).then(r => {
    return r.data
  })
}

function createResearch(prompt, no_history_mode = false) {
  return axios.post(`${serverUrl}/api/v1/research/create`, { prompt, no_history_mode }).then(r => {
    return r.data
  })
}

function getExtraInfoList(prompt) {
  return axios.post(`${serverUrl}/api/v1/extra_info`).then(r => {
    return r.data
  })
}

function createExtraInfo(name, description, author, enabled, content) {
  return axios.post(`${serverUrl}/api/v1/extra_info/create`, { name, description, author, enabled, content }).then(r => {
    return r.data
  })
}

function getExtraInfo(id) {
  return axios.post(`${serverUrl}/api/v1/extra_info/get`, { id }).then(r => {
    return r.data
  })
}

function updateExtraInfo(id, name, description, author, enabled, content) {
  return axios.post(`${serverUrl}/api/v1/extra_info/update`, { id, name, description, author, enabled, content }).then(r => {
    return r.data
  })
}

function deleteExtraInfo(id) {
  return axios.post(`${serverUrl}/api/v1/extra_info/delete`, { id }).then(r => {
    return r.data
  })
}

function getUserScriptList() {
  return axios.post(`${serverUrl}/api/v1/user_script`).then(r => {
    return r.data
  })
}

function getUserScript(id) {
  return axios.post(`${serverUrl}/api/v1/user_script/get`, { id }).then(r => {
    return r.data
  })
}

function createUserScript(name, description, author, enabled, content) {
  return axios.post(`${serverUrl}/api/v1/user_script/create`, { name, description, author, enabled, content }).then(r => {
    return r.data
  })
}

function updateUserScript(id, name, description, author, enabled, content) {
  return axios.post(`${serverUrl}/api/v1/user_script/update`, { id, name, description, author, enabled, content }).then(r => {
    return r.data
  })
}

function deleteUserScript(id) {
  return axios.post(`${serverUrl}/api/v1/user_script/delete`, { id }).then(r => {
    return r.data
  })
}

export default {
  refreshServerUrl,
  getServiceInfo,
  setServerUrl,
  getServerUrl,
  getConfig,
  setConfig,
  authenticate,
  getAllResearchHistory,
  getResearchHistory, 
  deleteResearchHistory,
  createResearch,
  setSecret,
  getSecret,
  getExtraInfoList,
  createExtraInfo,
  getExtraInfo,
  updateExtraInfo,
  deleteExtraInfo,
  getUserScriptList,
  getUserScript,
  createUserScript,
  updateUserScript,
  deleteUserScript
}
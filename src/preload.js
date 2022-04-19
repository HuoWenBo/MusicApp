// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron')
const { electronAPI } = require('@electron-toolkit/preload')
const NeteaseCloudMusicApi = require('NeteaseCloudMusicApi')
const axios = require('axios')

const WindowEvents = require('./public/WindowEvents')
const CustomFunctions = require('./public/CustomFunctions')
// const { ipcRenderer } = require('electron')

// Custom APIs for renderer
const api = {
  ipcRenderer,
  NeteaseCloudMusicApi,
  axios,
  WindowEvents,
  CustomFunctions
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}

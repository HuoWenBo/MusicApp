const { ipcRenderer } = require('electron')
// const ipcRenderer = window.api.ipcRenderer

/**
 * 关闭窗体
 * @param {String} windowName 窗体名称
 */
function closeWindow(windowName) {
  ipcRenderer.send('close-window', windowName)
}

/**
 * 创建窗体
 * @param {String} windowName 窗体名称，具有唯一性
 * @param {String} filepath 加载的 html 文件路径
 * @param {Object} windowProperties 窗体的各项参数
 */
function createWindow(windowName, filepath, windowProperties) {
  ipcRenderer.send('create-window', windowName, filepath, windowProperties)
}

/**
 * 最小化窗体
 * @param {String} windowName 窗体名称
 */
function minimizeWindow(windowName) {
  ipcRenderer.send('minimize', windowName)
}

module.exports = { closeWindow, createWindow, minimizeWindow }

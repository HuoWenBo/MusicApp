const { ipcRenderer } = require('electron')

/**
 * 打印数据到主进程控制台
 * @param {...} data
 */
function printToConsole(...data) {
  ipcRenderer.send('print', ...data)
}

/**
 * 添加指定事件到指定 ID 的元素上
 * @param {String} elementID
 * @param {String} eventName
 * @param {Function} func
 */
function eventBindingByID(elementID, eventName, func) {
  document.getElementById(elementID).addEventListener(eventName, func)
}

module.exports = { printToConsole, eventBindingByID }

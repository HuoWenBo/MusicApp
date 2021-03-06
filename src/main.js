// Modules to control application life and create native browser window
const { app, shell, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { electronApp, optimizer } = require('@electron-toolkit/utils')

// 用来记录创建的窗体
let AppWindows = {
  MainWindow: null
}

function createWindow(windowName, filepath, windowProperties) {
  windowProperties.icon =
    process.platform === 'linux' ? { icon: path.join(__dirname, '../build/icon.png') } : {}
  windowProperties.webPreferences = {
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
  }
  AppWindows[windowName] = new BrowserWindow(windowProperties)

  AppWindows[windowName].on('ready-to-show', () => {
    AppWindows[windowName].show()
  })

  AppWindows[windowName].webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url).then(() => {
      console.log(`url: ${details.url}`)
    })
    return { action: 'deny' }
  })

  // and load the App-back.html of the app.
  AppWindows[windowName].loadFile(path.join(__dirname, filepath)).then(() => {
    // console.log(`filepath: ${_filepath}`)
  })
}

ipcMain.on('close-window', (_, windowName) => {
  // 如果是关闭主窗口则关闭所有窗口并退出程序
  if (windowName === 'MainWindow') {
    for (let key in AppWindows) {
      if (AppWindows[key]) {
        AppWindows[key].destroy()
        AppWindows[key] = null
      }
    }
    return
  }

  if (!AppWindows[windowName]) {
    throw Error(`没有名为 ${windowName} 的窗体`)
  }
  AppWindows[windowName].destroy()
  AppWindows[windowName] = null
  // app.quit()
})

ipcMain.on('minimize', (_, windowName) => {
  if (!AppWindows[windowName]) {
    throw Error(`没有名为 ${windowName} 的窗体`)
  }
  AppWindows[windowName].minimize()
})

ipcMain.on('create-window', (_, windowName, filepath, windowProperties) => {
  if (AppWindows[windowName]) return
  // console.log('create-login-window')
  createWindow(windowName, filepath, windowProperties)
})

ipcMain.on('print', (_, ...data) => {
  console.log(...data)
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow('MainWindow', 'App.html', {
    width: 1022,
    height: 670,
    show: false,
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    resizable: false
  })

  app.on('activate', function () {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

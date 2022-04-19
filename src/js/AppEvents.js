;(() => {
  // const ipcRenderer = window.api.ipcRenderer
  const WindowEvents = window.api.WindowEvents
  const CustomFunctions = window.api.CustomFunctions
  // const NeteaseCloudMusicApi = window.api.NeteaseCloudMusicApi
  // const axios = window.api.axios
  // const NeteaseCloudMusicURL = 'http://localhost:3000'

  const MainWindowName = 'MainWindow'

  // CustomFunctions.printToConsole('Hello World')

  // function getQRCode() {
  //   axios({
  //     url: `${NeteaseCloudMusicURL}/login/qr/key`,
  //     withCredentials: true
  //   }).then((res) => {
  //     CustomFunctions.printToConsole(res.data.data['unikey'])
  //   })
  // }
  CustomFunctions.eventBindingByID('close', 'click', () => {
    WindowEvents.closeWindow(MainWindowName)
  })

  CustomFunctions.eventBindingByID('minimize', 'click', () => {
    WindowEvents.minimizeWindow(MainWindowName)
  })

  document.getElementById('login').onclick = () => {
    window.api.WindowEvents.createWindow('LoginWindow', './html/LoginScreen/LoginWindow.html', {
      // --window-width: 350px;
      // --window-height: 530px;
      width: 350,
      height: 530,
      show: false,
      frame: false,
      transparent: true,
      autoHideMenuBar: true
    })
  }
})()

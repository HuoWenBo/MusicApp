;(() => {
  // const ipcRenderer = window.api.ipcRenderer
  const WindowEvents = window.api.WindowEvents
  const CustomFunctions = window.api.CustomFunctions
  // const NeteaseCloudMusicApi = window.api.NeteaseCloudMusicApi
  // const axios = window.api.axios
  // const NeteaseCloudMusicURL = 'http://localhost:3000'
  CustomFunctions.printToConsole('LoginWindow')

  CustomFunctions.eventBindingByID('close', 'click', () => {
    WindowEvents.closeWindow('LoginWindow')
  })

  CustomFunctions.eventBindingByID('phone-login', 'click', () => {
    document.getElementById('phone-number-login').style.left = '0'
    document.getElementById('qr-code-login').style.left = 'calc((var(--window-width) + 100px) * -1)'
  })

  CustomFunctions.eventBindingByID('qr-login', 'click', () => {
    document.getElementById('phone-number-login').style.left = 'calc(var(--window-width) + 100px)'
    document.getElementById('qr-code-login').style.left = '0'
  })
})()

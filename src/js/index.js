let elems = document.querySelectorAll('#menu-bar > div > a')
elems.forEach((elem) => {
  elem.onclick = () => {
    document.querySelectorAll('#menu-bar > div > a').forEach((_) => {
      _.className = ''
    })
    elem.className = 'active'
  }
})

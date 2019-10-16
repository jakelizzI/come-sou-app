'use strict';

import electron from 'electron';

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on('ready', () => {
  import Screen from 'screen';

  const size = Screen.getPrimaryDisplay().size;
  const mainWindow = new BrowserWindow({
    left: 0,
    top: 0,
    width: size.width,
    height: size.height,
    frame: false,
    show: true,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
  })
});
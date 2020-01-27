'use strict';

const electron = require('electron');
const Store = require('electron-store');

const ipcMain = electron.ipcMain;
let app = electron.app;
let BrowserWindow = electron.BrowserWindow;

let mainWindow;

const store = new Store({
  defaults: {
    foo: "bar"
  }
});

app.on('ready', () => {
  // モニタサイズ取得
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  store.set('monitorWidth', width);
  store.set('monitorHight', height);

  mainWindow = new BrowserWindow({
    width: store.get('monitorWidth'),
    height: store.get('monitorHight'),
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration : true
    }
  })
  mainWindow.setIgnoreMouseEvents(true, { forward: true });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.openDevTools();

  mainWindow.webContents.send('config', store.store);

  mainWindow.on('closed', () => {
     mainWindow = null;
  });
});

ipcMain.on('press-button', (e, args) => {
  console.log(args);
  mainWindow = null;
  app.quit();
});

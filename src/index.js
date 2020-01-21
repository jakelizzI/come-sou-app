'use strict';

const electron = require('electron');
const Store = require('electron-store');

const ipcMain = electron.ipcMain;

let app = electron.app;
let BrowserWindow = electron.BrowserWindow;

let mainWindow;

const store = new Store({
  cwd: __dirname,
  defaults: {
    foo: "bar"
  }
});

console.log(store.get('foo'));

app.on('ready', () => {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    fullscreen: true,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration : true
    }
  })
  mainWindow.setIgnoreMouseEvents(true, { forward: true });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', () => {
     mainWindow = null;
  });
});

ipcMain.on('press-button', (e, args) => {
  console.log(args);
  mainWindow = null;
  app.quit();
});
'use strict';

const electron = require('electron');
const localShortcut = require('electron-localshortcut');

const ipcMain = electron.ipcMain;

let app = electron.app;
let BrowserWindow = electron.BrowserWindow;

let mainWindow;
let secondWindow;

app.on('ready', () => {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    'frame': false,
    'fullscreen': true,
    'transparent': true,
    'alwaysOnTop': true
  })
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  secondWindow = new BrowserWindow({ 
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: true
    }
   });
  secondWindow.loadURL('file://' + __dirname + '/auth.html');

  secondWindow.show();

  mainWindow.openDevTools();

  localShortcut.register(mainWindow, 'Ctrl+W', () => {
    secondWindow = null;
    mainWindow = null;
    app.quit();
  });

  secondWindow.on('closed', () => {
    secondWindow = null;
  });

  mainWindow.on('closed', () => {
     mainWindow = null;
  });
});

ipcMain.on('press-button', (e, args) => {
  console.log(args);
});
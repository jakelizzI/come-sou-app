'use strict';

const electron = require('electron');
const localShortcut = require('electron-localshortcut');

let app = electron.app;
let BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('ready', () => {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    'frame': false,
    'fullscreen': true,
    'transparent': true
  })
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  localShortcut.register(mainWindow, 'Ctrl+W', () => {
    mainWindow = null;
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
"use strict";

const electron = require("electron");
const Store = require("electron-store");

const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const store = new Store({
  defaults: {
    ws: {
      host: "127.0.0.1",
      port: "5001"
    },
    slackApi: {
      toggle: "off",
      url: "apiurl"
    }
  }
});

app.on("ready", () => {
  // モニタサイズ取得
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  store.set("monitorWidth", width);
  store.set("monitorHight", height);

  mainWindow = new BrowserWindow({
    width: store.get("monitorWidth"),
    height: store.get("monitorHight"),
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.setIgnoreMouseEvents(true, { forward: true });
  mainWindow.loadURL("file://" + __dirname + "/index.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

ipcMain.on("press-button", (e, args) => {
  console.log(args);
  mainWindow = null;
  app.quit();
});

ipcMain.on("press-config-button", (e, args) => {
  console.log(args);
});

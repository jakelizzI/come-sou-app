"use strict";

const electron = require("electron");
const Store = require("electron-store");
const { v4: uuidv4 } = require("uuid");

const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const store = new Store({
  defaults: {
    ws: {
      host: "ec2-54-65-94-81.ap-northeast-1.compute.amazonaws.com",
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

  if (!store.get("uuid")) {
    const uuid = uuidv4();
    store.set("uuid", uuid);
  }

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

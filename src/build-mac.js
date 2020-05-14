const builder = require("electron-builder");

builder.build({
  config: {
    appId: "comesou-app.jakelizzi",
    mac: {
      target: "zip",
      icon: "image/icon_512.png"
    }
  }
});

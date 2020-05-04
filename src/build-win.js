const builder = require("electron-builder");

builder.build({
  config: {
    appId: "comesou-app.jakelizzi",
    win: {
      target: {
        target: "zip",
        arch: ["x64", "ia32"]
      },
      icon: "image/win.ico"
    }
  }
});

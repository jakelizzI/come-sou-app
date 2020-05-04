const Config = require("./config");
const ipcRenderer = require("electron").ipcRenderer;
const win = require("electron").remote.getCurrentWindow();

const closeButton = document.getElementById("close-button");
const configButton = document.getElementById("config-button");

const config = new Config();

// store setting
const host = $("#host");
const port = $("#port");
const slackCheck = $("#slackCheck");
const slackWebHookUrl = $("#slackWebHookUrl");
const resetConfig = () => {
  host.val(config.getHost());
  port.val(config.getPort());
  slackCheck.prop("checked", config.isSlackToggleOn());
  slackWebHookUrl.val(config.getSlackApiUrl());
};
resetConfig();

// close
closeButton.addEventListener("mouseenter", () => {
  win.setIgnoreMouseEvents(false);
});
closeButton.addEventListener("mouseleave", () => {
  win.setIgnoreMouseEvents(true, { forward: true });
});
closeButton.addEventListener(
  "click",
  () => {
    ipcRenderer.send("press-button", "clonse puressed");
  },
  false
);

// modal config
let isNotModalOpen = true;
configButton.addEventListener("mouseenter", () => {
  win.setIgnoreMouseEvents(false);
});
configButton.addEventListener("mouseleave", () => {
  if (isNotModalOpen) {
    win.setIgnoreMouseEvents(true, { forward: true });
  }
});
configButton.addEventListener(
  "click",
  () => {
    isNotModalOpen = false;
    $("#setting").modal("show");
    ipcRenderer.send("press-config-button", "config puressed");
  },
  false
);

// modal
$(".ui.modal").modal("setting", {
  closable: false,
  onApprove: () => {
    if (slackCheck.prop("checked")) {
      config.setSlackApiConfig(
        slackCheck.prop("checked"),
        slackWebHookUrl.val()
      );
    } else {
      slackWebHookUrl.val(config.getSlackApiUrl());
    }
    win.setIgnoreMouseEvents(true, { forward: true });
  },
  onDeny: () => {
    resetConfig();
    slackCheck.prop("checked") ? slackUrlField.show() : slackUrlField.hide();
    win.setIgnoreMouseEvents(true, { forward: true });
  }
});

// reconnect
$("#connectButton").on("click", () => {
  connector.reConnect(host.val(), port.val());
});

// slack url input
const slackUrlField = $("#slackUrlField");
slackCheck.prop("checked") ? slackUrlField.show() : slackUrlField.hide();

slackCheck.on("change", event => {
  event.target.checked ? slackUrlField.show() : slackUrlField.hide();
});

// devTools
$("#devToolCheck").on("change", event => {
  if (event.target.checked) {
    win.toggleDevTools();
  } else {
    win.toggleDevTools();
  }
});

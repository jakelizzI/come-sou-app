const Config = require("./config");
const ipcRenderer = require("electron").ipcRenderer;
const win = require("electron").remote.getCurrentWindow();

const closeButton = document.getElementById("close-button");
const configButton = document.getElementById("config-button");

const config = new Config();

// store setting
$("#host").val(config.getHost());
$("#port").val(config.getPort());
$("#slackWebHookUrl").val(config.getSlackApiUrl());
const slackCheck = $("#slackCheck");
if (config.getSlackApiToggle() === "on") {
  slackCheck.prop("checked", true);
} else {
  slackCheck.prop("checked", false);
}

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
    connector.reConnect($("#host").val(), $("#port").val());
  }
});

// slack url input
const slackUrlField = $("#slackUrlField");
if (slackCheck.prop("checked")) {
  slackUrlField.show();
} else {
  slackUrlField.hide();
}

slackCheck.on("change", event => {
  if (event.target.checked) {
    slackUrlField.show();
  } else {
    slackUrlField.hide();
  }
});

const ipcRenderer = require("electron").ipcRenderer;
const win = require("electron").remote.getCurrentWindow();

const closeButton = document.getElementById("close-button");
const configButton = document.getElementById("config-button");

let isNotModalOpen = true;

// config
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

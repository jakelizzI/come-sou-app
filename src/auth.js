
    var ipcRenderer = require('electron').ipcRenderer;
    
    document.getElementById('btn').onclick = function() {
      ipcRenderer.send('press-button', 'puressed');
    }
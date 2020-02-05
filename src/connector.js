const Store = require("electron-store");

module.exports = class Connector {
  /**
   * constructor for connectore
   * @param {*} store electron-store instance
   */
  constructor(store) {
    this.store = new Store();
  }
  /**
   * 実際に接続を行うfunction
   * @param {*} canvasContext canvasのコンテキスト
   * @param {*} commentArray コメントを配列に追加するfunction
   */
  connect(canvasContext, commentArray) {
    const sock = new WebSocket(
      "ws://" + this.store.get("ws.host") + ":" + this.store.get("ws.port")
    );

    sock.addEventListener("open", e => {
      console.log("socket : 接続成功");
    });

    sock.addEventListener("message", e => {
      console.log("event listened : " + e.data);

      canvasContext.font = "48px 'Segoe UI'";
      canvasContext.fillStyle = "yellow";

      const textWidth = canvasContext.measureText(e.data).width;

      const comment = new Comment(winX, null, e.data, textWidth);
      commentArray.push(comment);
    });

    sock.addEventListener("error", e => {
      console.log("error occored : " + e);
    });
  }
};

const Store = require("electron-store");

module.exports = class Connector {
  /**
   * constructor for connectore
   * @param {*} canvasContext canvasのコンテキスト
   * @param {*} commentArray コメントを配列に追加するfunction
   */
  constructor(canvasContext, commentArray) {
    this.store = new Store();
    document.getElementById("host").value = this.store.get("ws.host");
    document.getElementById("port").value = this.store.get("ws.port");
    this.canvasContext = canvasContext;
    this.commentArray = commentArray;
    this.connectStatus = "disconnected";
    this.sock = null;
  }

  /**
   * 実際に接続を行うfunction
   * @return {object} websocket instance
   */
  defaultConnect() {
    const url = `ws://${this.store.get("ws.host")}:${this.store.get(
      "ws.port"
    )}`;
    return this.connect(url);
  }

  /**
   * WebSocketつなぎ直し
   * @param {string} host websocket接続先host
   * @param {number} port websocket接続先port
   */
  reConnect(host, port) {
    if (
      host === this.store.get("ws.host") &&
      port === this.store.get("ws.port")
    ) {
      return;
    }
    console.log(`reconnect : ${host} : ${port}`);
    this.store.set("ws.host", host);
    this.store.set("ws.port", port);
    this.sock.close(1000, "To change connection.");
    this.connect(`ws://${host}:${port}`);
  }

  /**
   * 実際に接続を行うfunction
   * @param {string} url websocket接続先
   * @return {object} websocket instance
   */
  connect(url) {
    this.sock = new WebSocket(url);

    this.sock.addEventListener("open", e => {
      console.log("socket : 接続成功");
      this.connectStatus = "connected";
    });

    this.sock.addEventListener("message", e => {
      console.log("event listened : " + e.data);

      this.canvasContext.font = "48px 'Segoe UI'";
      this.canvasContext.fillStyle = "yellow";

      const textWidth = this.canvasContext.measureText(e.data).width;

      const comment = new Comment(winX, null, e.data, textWidth);
      this.commentArray.push(comment);

      this.sendToSlack(e.data);
    });

    this.sock.addEventListener("error", e => {
      alert(
        "サーバーに接続できませんでした。\n右下の設定から接続先を指定して下さい。"
      );
      this.connectStatus = "disconnected";
    });

    return this.sock;
  }

  /**
   * 接続されているかどうか
   * @return {boolean} true : 接続成功 / false : 接続失敗
   */
  isConnected() {
    return this.connectStatus === "connected";
  }

  /**
   * 接続ステータス
   * @param {string} status
   */
  setConnectStatus(status) {
    this.connectStatus = status;
  }

  /**
   * slack 通知
   * @param {*} comment comment
   */
  sendToSlack(comment) {
    console.log("!!!!!");
    console.log(this.store.get("slackApi"));
    console.log(this.store.get("slackApi.toggle"));
    console.log(this.store.get("slackApi.url"));
    if (this.store.get("slackApi.toggle") === "off") return;
    const data = {
      text: comment
    };
    const url = this.store.get("slackApi.url");

    // eslint-disable-next-line no-undef
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }
};

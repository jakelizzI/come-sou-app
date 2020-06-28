const Config = require("./config");

module.exports = class Connector {
  /**
   * constructor for connectore
   * @param {*} canvasContext canvasのコンテキスト
   * @param {*} commentArray コメントを配列に追加するfunction
   */
  constructor(canvasContext, commentArray) {
    this.config = new Config();
    this.canvasContext = canvasContext;
    this.commentArray = commentArray;
    this.sock = null;
  }

  /**
   * 実際に接続を行うfunction
   * @return {object} websocket instance
   */
  defaultConnect() {
    const url = `ws://${this.config.getHost()}:${this.config.getPort()}`;
    return this.connect(url);
  }

  /**
   * WebSocketつなぎ直し
   * @param {string} host websocket接続先host
   * @param {number} port websocket接続先port
   */
  reConnect(host, port) {
    console.log(`reconnect : ${host} : ${port}`);
    this.config.setHost(host);
    this.config.setPort(port);
    this.sock.close(1000, "To change connection.");
    this.connect(`ws://${host}:${port}`);
  }

  /**
   * 実際に接続を行うfunction
   * @param {string} url websocket接続先
   * @return {object} websocket instance
   */
  connect(url) {
    this.sock = new WebSocket(url, this.config.getUUID());

    this.sock.addEventListener("open", e => {
      console.log("socket : 接続成功");
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
    });

    return this.sock;
  }

  /**
   * slack 通知
   * @param {*} comment comment
   */
  sendToSlack(comment) {
    if (!this.config.isSlackToggleOn()) return;
    const data = {
      text: comment
    };
    const url = this.config.getSlackApiUrl();

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

  /**
   * socket の readyState を返却する
   * @return {number} WebSocketのstatus
   */
  getSocketStatus() {
    return this.sock.readyState;
  }
};

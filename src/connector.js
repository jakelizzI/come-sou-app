module.exports = class Connector {
  /**
   * WS接続をおこなるクラスのコンストラクタ
   * @param {*} config JSON
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * 実際に接続を行うfunction
   * @param {*} pushComment コメントを配列に追加するfunction
   */
  connect(pushComment) {
    const sock = new WebSocket("ws://127.0.0.1:5001");

    sock.addEventListener("open", e => {
      console.log("socket : 接続成功");
    });

    sock.addEventListener("message", e => {
      console.log("event listened : " + e.data);
      pushComment(e.data);
    });

    sock.addEventListener("error", e => {
      console.log("error occored : " + e);
    });
  }
};

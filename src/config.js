const Store = require("electron-store");

module.exports = class Config {
  /**
   * コンストラクタ
   */
  constructor() {
    this.store = new Store();
  }

  /**
   * WebSocket接続先ホスト取得
   * @return {string} host
   */
  getHost() {
    return this.store.get("ws.host");
  }

  /**
   * WebSocket接続先ポート取得
   * @return {string} port
   */
  getPort() {
    return this.store.get("ws.port");
  }

  /**
   * SlackApi用URL
   * @return {string} url
   */
  getSlackApiUrl() {
    return this.store.get("slackApi.url");
  }

  /**
   * SlackApi toggle
   * @return {string} toggle : on / off
   */
  getSlackApiToggle() {
    return this.store.get("slackApi.toggle");
  }
};

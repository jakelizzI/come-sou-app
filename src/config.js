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
   * WebSocket接続先ホスト設定
   * @param {string} host
   */
  setHost(host) {
    this.store.set("ws.host", host);
  }

  /**
   * WebSocket接続先ポート取得
   * @return {string} port
   */
  getPort() {
    return this.store.get("ws.port");
  }

  /**
   * WebSocket接続先ポート設定
   * @param {string} port
   */
  setPort(port) {
    this.store.set("ws.port", port);
  }

  /**
   * SlackApi用URL取得
   * @return {string} url
   */
  getSlackApiUrl() {
    return this.store.get("slackApi.url");
  }

  /**
   * SlackApi用URL設定
   * @param {string} url
   */
  setSlackApiUrl(url) {
    this.store.set("slackApi.url", url);
  }

  /**
   * SlackApi toggle 取得
   * @return {string} toggle : on / off
   */
  getSlackApiToggle() {
    return this.store.get("slackApi.toggle");
  }

  /**
   * SlackApi toggle設定
   * value : on / off
   * @param {string} onOff
   */
  setSlackApiToggle(onOff) {
    this.store.set("slackApi.toggle", onOff);
  }

  /**
   * SlackApi toggle が on なら true
   * @return {boolean} on : true, off : false
   */
  isSlackToggleOn() {
    return this.getSlackApiToggle() === "on";
  }

  /**
   * 設定画面でslackapiに関する設定を更新する。
   * @param {boolean} toggle slackApiのcheckbox
   * @param {string} url slackApiのwebhookURL
   */
  setSlackApiConfig(toggle, url) {
    this.setSlackApiToggle(toggle);
    this.setSlackApiUrl(url);
  }

  /**
   * このアプリケーションのUUIDを取得する
   * @return {string} uuid
   */
  getUUID() {
    return this.store.get("uuid");
  }
};

module.exports = class Comment {
  /**
   * コメントの初期化
   * @param {*} x デフォルトX座標
   * @param {*} y デフォルトy座標
   * @param {*} text 表示するテキスト
   * @param {*} textWidth テキストの横幅
   */
  constructor(x, y, text, textWidth) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.textWidth = textWidth;
  }

  /**
   * 文字の重なり判定。
   * 文字サイズはすべて同じなので、水平方向のみ重なりを判定する。
   * @param {*} comment1 重複判定対象コメント１
   * @param {*} comment2 重複判定対象コメント１
   * @return {*} 重なっていたらtrue
   */
  static isOverlap(comment1, comment2) {
    const temp1Right = comment1.x + comment1.textWidth;
    const temp2Left = comment2.x;
    return temp1Right >= temp2Left;
  }
};

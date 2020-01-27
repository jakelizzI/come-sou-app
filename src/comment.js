module.exports = class Comment {
  constructor(x, y, text, textWidth) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.textWidth = textWidth;
  }

  // 文字サイズはすべて同じなので、水平方向のみ重なりを判定する。
  static isOverlap(comment1, comment2) {
    const temp1Right = comment1.x + comment1.textWidth;
    const temp2Left = comment2.x;
    return temp1Right >= temp2Left;
  }
}

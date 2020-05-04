const Comment = require("./comment");
const Connector = require("./connector");
window.jQuery = window.$ = require("jquery");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const winX = window.parent.screen.width;
const winY = window.parent.screen.height;

canvas.width = winX;
canvas.height = winY;

const commentArray = [];

const defaultY = 48;

const connector = new Connector(context, commentArray);

connector.defaultConnect();
let sockStatus = WebSocket.CLOSED;
const statusMessage = $("#connectStatusMessage");
const statusChange = status => {
  switch (status) {
    case WebSocket.CLOSED:
      statusMessage.removeClass("green");
      statusMessage.addClass("red");
      statusMessage.text("接続エラー");
      break;
    case WebSocket.OPEN:
      statusMessage.removeClass("red");
      statusMessage.addClass("green");
      statusMessage.text("接続中");
      break;
  }
};

const sendComment = () => {
  if (connector.getSocketStatus() !== sockStatus) {
    statusChange(connector.getSocketStatus());
    sockStatus = connector.getSocketStatus();
  }

  context.clearRect(0, 0, winX, winY);

  commentArray.forEach((val1, index1) => {
    val1.x = val1.x - 5;

    if (val1.x < 0 - val1.textWidth) commentArray.splice(index1, 1);

    if (val1.y == null) {
      // y座標の最大値を求める
      const temp = commentArray
        .filter(value => value.y != null)
        .map(value => Number(value.y));
      let maxY = defaultY;
      temp.forEach(value => {
        if (value > maxY) {
          maxY = value;
        }
      });

      // y座標ごとに重複があるかどうかを調べる
      const tempYArray = [];
      for (let tempY = defaultY; tempY <= maxY; ) {
        tempYArray.push(tempY);
        tempY = tempY + defaultY;
      }

      const isAllOverlaping = !tempYArray.some(tempY => {
        // 対象のy座標の配列をフィルタリング
        const tempArray = commentArray.filter(value => value.y == tempY);
        // フィルタリングされた配列
        const isOverlap = tempArray.some(val2 => {
          return Comment.isOverlap(val2, val1);
        });
        // 重複していなければ、Yをセットしてループを終了
        if (!isOverlap) {
          val1.y = tempY;
          return true;
        }
      });
      // すべて重複していれば一番下に作成する。
      if (isAllOverlaping) {
        val1.y = maxY + defaultY;
      }
    }

    context.fillText(val1.text, val1.x, val1.y);
  });

  window.requestAnimationFrame(ts => sendComment(commentArray));
};

window.onload = window.requestAnimationFrame(ts => sendComment());

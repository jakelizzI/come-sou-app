const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const winX = window.parent.screen.width;
const winY = window.parent.screen.height;

canvas.width = winX;
canvas.height = winY;

const commentArray = new Array();

const defaultY = 30;

const sendComment = () => {
  context.clearRect(0, 0, winX, winY);

  commentArray.forEach((val1, index1) => {
    val1.x = val1.x - 5;

    if(val1.x < 0 - val1.textWidth) commentArray.splice(index1, 1);

    if(val1.y == null) {

      // y座標の最大値を求める
      const temp = commentArray.filter(value => value.y != null).map(value => Number(value.y));
      let maxY = defaultY;
      temp.forEach(value => {
        if(value > maxY) {
          maxY = value;
        }
      });

      // y座標ごとに重複があるかどうかを調べる
      const tempYArray = [];
      for(let tempY = defaultY; tempY <= maxY ;) {
        tempYArray.push(tempY);
        tempY = tempY + defaultY;
      }

      const isAllOverlaping = !tempYArray.some(tempY => {
        // 対象のy座標の配列をフィルタリング
        const tempArray = commentArray.filter((value => value.y == tempY));
        // フィルタリングされた配列
        const isOverlap = tempArray.some(val2 => {
          return Comment.isOverlap(val2, val1);
        });
        // 重複していなければ、Yをセットしてループを終了
        if(!isOverlap) {
          val1.y = tempY;
          return true;
        }
      });
      // すべて重複していれば一番下に作成する。
      if(isAllOverlaping) {
        val1.y = maxY + defaultY;
      }
    }

    context.fillText(val1.text, val1.x, val1.y);
  })

  window.requestAnimationFrame( ts => sendComment(commentArray));
}

const onClick = () => {
  context.font = "30px 'Segoe UI'";
  context.fillStyle = 'blue';
  const randWards = ["こんにちは","こんにちはこんにちは","これは一体？","やっぱりな","へぇ","それな"];
  const no = Math.floor(Math.random() * 6);
  const text = randWards[no];

  const textWidth = context.measureText(text).width;

  commentArray.push(new Comment(winX, null, text, textWidth));
}

canvas.addEventListener('click', onClick, false);

window.onload = window.requestAnimationFrame( ts => sendComment());

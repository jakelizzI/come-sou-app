const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const winX = window.parent.screen.width;
const winY = window.parent.screen.height;

canvas.width = winX;
canvas.height = winY;

const commentArray = new Array();

class Comment {
  constructor(comment, x, y) {
    this.comment = comment;
    this.x = x;
    this.y = y;
  }
}

const sendComment = () => {

  context.clearRect(0, 0, winX, winY);

  commentArray.forEach(val => {

    val.x = val.x - 5;

    if(val.x < 0) {
      commentArray.splice(commentArray.indexOf(val), 1);
    }
    context.fillText(val.comment, val.x, val.y);
  })

  window.requestAnimationFrame( ts => sendComment(commentArray));
}

const onClick = (e) => {
  context.font = "30px 'ＭＳ ゴシック'";
  context.fillStyle = 'yellow';

  const x = e.clientX
  const y = e.clientY

  let comment = new Comment('こんにちは', x, y);
  commentArray.push(comment);
}

canvas.addEventListener('click', onClick, false);

window.onload = window.requestAnimationFrame( ts => sendComment());

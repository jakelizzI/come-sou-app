const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const winX = window.parent.screen.width;
const winH = window.parent.screen.height;

canvas.width = winX;
canvas.height = winH;

const sendComment = (text, x, y) => {
  const textSize = context.measureText(text).width;
  console.log(textSize);
  context.clearRect(x, y + 5, textSize + 5, -30);

  context.fillStyle = 'yellow';
  context.fillText(text, x, y);

  window.requestAnimationFrame( ts => sendComment(text, x - 5, y));
}

const onClick = (e) => {
  context.font = "30px 'ＭＳ ゴシック'";

  const x = e.clientX
  const y = e.clientY

  window.requestAnimationFrame( ts => sendComment("そんなバナナ", x, y));
}

canvas.addEventListener('click', onClick, false);
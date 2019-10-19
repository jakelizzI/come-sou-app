const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const winX = window.parent.screen.width;
const winH = window.parent.screen.height;

canvas.width = winX;
canvas.height = winH;

const sendComment = (text, x, y) => {
  const mes = context.measureText(text);
  context.clearRect(x, y + 5, 160, -30);

  context.font = "30px 'ＭＳ ゴシック'";
  context.fillStyle = 'yellow';
  context.fillText(text, x, y);

  window.requestAnimationFrame( ts => sendComment("こんにちは", x - 5, y));
}

const onClick = (e) => {

  const x = e.clientX
  const y = e.clientY

  window.requestAnimationFrame( ts => sendComment("こんにちは", x, y));
}

canvas.addEventListener('click', onClick, false);
let canvas = document.querySelector('canvas');
window.addEventListener('resize', resizeCanvas);
canvas.addEventListener("mousedown", startSelect);

let ctx = canvas.getContext('2d');

let points = [];

let pointX = [];
let pointY = [];

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function startSelect() {
  let x = event.clientX - canvas.width/2;
  let y = -event.clientY + canvas.height/2;
  x /= 100;
  y /= 100;

  pointX.push(x);
  pointY.push(y);
  points.push(new Point(event.clientX, event.clientY));
}

function Point(x, y){
  this.x = x;
  this.y = y;
  let radius = 3;

  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, 2*Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
  }
}

function axis(){
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.strokeStyle = "#fff";
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/2);
  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.strokeStyle = "#fff";
  ctx.stroke();
  ctx.closePath();
}

function drawModel(){
  let A = a.dataSync()[0];
  let B = b.dataSync()[0];
  let C = c.dataSync()[0];
  let D = d.dataSync()[0];
  let E = e.dataSync()[0];
  let f = function(x){
    return A*(x**4) + B*(x**3) + C*(x**2) + D*x + E;
  }

  let definition = 1000;
  let multiplier = canvas.width/definition;
  for(let i = 0; i < definition; i++){
    ctx.beginPath();
    ctx.rect(i*multiplier, canvas.height/2 - f((i*multiplier - canvas.width/2)/100)*100, 1, 1);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
  }

  /*
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/2 - f(-canvas.width/20)*10);
  ctx.lineTo(canvas.width, canvas.height/2 - f(canvas.width/20)*10);
  ctx.strokeStyle = "#fff";
  ctx.stroke();
  ctx.closePath();
  */
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  axis();
  for (let point of points) {
    point.draw();
  }
  drawModel();
  if(pointX.length > 0)
    train(pointX, pointY, 10);
}

animate();
resizeCanvas();

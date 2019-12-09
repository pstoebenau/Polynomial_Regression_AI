let canvas = document.querySelector('canvas');
window.addEventListener('resize', resizeCanvas);

let ctx = canvas.getContext('2d');


function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0, canvas.width, canvas.height);


}

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
animate();

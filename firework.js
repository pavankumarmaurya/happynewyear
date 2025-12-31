const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 3 + 1;
    this.color = `hsl(${Math.random() * 360},100%,50%)`;
    this.life = 100;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.life--;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.1) {
    fireworks.push(new Firework());
  }

  fireworks.forEach((fw, index) => {
    fw.draw();
    fw.update();
    if (fw.life <= 0) fireworks.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

animate();

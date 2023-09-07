const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

var mousePos = {
  x: undefined,
  y: undefined,
};

let circleArr = [];

window.addEventListener("mousemove", function (event) {
  mousePos.x = event.x;
  mousePos.y = event.y;
});

const colorPallete = ["#00747C", "#00BBC9", "#CACACA", "#878787", "#202022"];

function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dy = dy;
  this.dx = dx;
  this.color = colorPallete[Math.floor(Math.random() * colorPallete.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.strokeStyle = "red";
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    if (
      this.x + this.radius >= window.innerWidth ||
      this.x - this.radius <= 0
    ) {
      this.dx = -this.dx;
    }
    if (
      this.y + this.radius >= window.innerHeight ||
      this.y - this.radius <= 0
    ) {
      this.dy = -this.dy;
    }
    this.y += this.dy;
    this.x += this.dx;
    if (
      mousePos.x - this.x < 50 &&
      mousePos.x - this.x > -50 &&
      mousePos.y - this.y < 50 &&
      mousePos.y - this.y > -50 &&
      this.radius < 30
    )
      this.radius += 2;
    else if (this.radius > 2) this.radius -= 2;
    this.draw();
  };
}

function init() {
  circleArr = [];
  for (let index = 0; index < 1000; index++) {
    var radius = 2;
    var x = Math.random() * (innerWidth - 2 * radius) + radius;
    var dx = (Math.random() - 0.5) * 10;

    var y = Math.random() * (innerHeight - 2 * radius) + radius;
    var dy = (Math.random() - 0.5) * 10;
    const circle = new Circle(x, y, radius, dx, dy);
    circleArr.push(circle);
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let index = 0; index < circleArr.length; index++) {
      circleArr[index].update();
    }
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init()
animate();

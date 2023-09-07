const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");


function Circle(x, y, radius, dx, dy) {
    this.x = x;
  this.y = y;
  this.radius = radius;
  this.dy = dy;
  this.dx = dx;
  
  this.draw = function () {
      c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "red";
    c.stroke();
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
        this.draw()
    };
}

const circleArr = []

for (let index = 0; index < 100; index++) {
    var radius = 30;
    var x = Math.random() * (innerWidth - 2 * radius) + radius;
    var dx = (Math.random() - 0.5) * 10;
    
    var y = Math.random() * (innerHeight - 2 * radius) + radius;
    var dy = (Math.random() - 0.5) * 10;
    const circle = new Circle(x, y, radius, dx, dy)
    circleArr.push(circle)
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let index = 0; index < circleArr.length; index++) {
        circleArr[index].update()
    }
}

animate();

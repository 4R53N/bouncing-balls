// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


// the constructor for balls
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }
  // draw the ball
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  // update the ball
  update(){
    if((this.x + this.size) >= width){
      this.velX = -(this.velX);
    }

    if((this.x - this.size) <= 0){
      this.velX = -(this.velX);
    }

    if((this.y + this.size) >= height){
      this.velY = -(this.velY);
    }

    if((this.y - this.size) <= 0){
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }
}

// create 25 random balls
var balls = [];

while (balls.length < 25){
  var size = random(10,20);
  var ball = new Ball(
    random(0+size, width-size),
    random(0+size, height-size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
    );
    balls.push(ball);
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for(var i = 0; i < balls.length; i++){
    balls[i].draw();
    balls[i].update();
  }

  requestAnimationFrame(loop);
}



loop();

window.onresize = function(){
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
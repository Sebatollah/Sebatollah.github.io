// ball scene

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let index = 0; index < 30; index++) {
    spawnBall();
  }

  //spawn a ball every .5 seconds
  window.setInterval(spawnBall, 500);
}

function draw() {
  background(220);

  moveBall();
  displayBall();
}

function mousePressed() {
  spawnBall();
  ballArray[ballArray.length-1].x = mouseX;
  ballArray[ballArray.length-1].y = mouseY;
}

function spawnBall() {
  let newBall = {
    x: random(width),
    y: random(height),
    radius: random(10, 30),
    ballcolor: color(random(255), random(255), random(255), random(255)),
    dx: random (5, 10),
    dy: random (5, 10),
  };
  ballArray.push(newBall);
}

function moveBall() {
  for (let theBall of ballArray) {
    theBall.x += theBall.dx;
    theBall.y += theBall.dy;
    theBall.dx = random(-5, 5);
    theBall.dy = random(-5, 5);
  }

}

function displayBall() {
  for (let ball of ballArray) {
    noStroke();
    fill(ball.ballcolor);
    circle(ball.x, ball.y, ball.radius*2);
  }
}
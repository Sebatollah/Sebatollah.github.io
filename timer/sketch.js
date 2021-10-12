// OOP timer demo

let backgroundTimer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundTimer = new Timer(3000);
}

function draw() {
  if (backgroundTimer.isDone()) {
    background("red");
  }
  else {
    background("black");
  }
}

function mousePressed() {
  backgroundTimer.reset();
}

class Timer {
  constructor(waitTime) {
    this.waitTime = waitTime;
    this.startTime = millis();
  }

  isDone() {
    return millis() > this.startTime + this.waitTime;
  }

  reset() {
    this.startTime = millis();
  }

  setDuration(waitTime) {
    this.waitTime = waitTime;
  }
}
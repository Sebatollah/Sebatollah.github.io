// terrain generation
// sept 22, 2021

let heights = [];
let numberOfRectangles = 5000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  numberOfRectangles = width;
  generateTerrain(numberOfRectangles);
}

function draw() {
  background(220);
  displayTerrain();
}

function displayTerrain() {
  let rectWidth = width/numberOfRectangles;
  fill("green");
  noStroke;
  for (let i=0; i<heights.length; i++) {
    rect(i*rectWidth, height-heights[i], rectWidth, heights[i]);
  }
}

function generateTerrain(howMany) {
  let time = 0;
  let dTime = 0.001;

  for (let i=0; i<howMany; i++) {
    let currentHeight = noise(time)*height;
    heights.push(currentHeight);
    time += dTime;
  }
}
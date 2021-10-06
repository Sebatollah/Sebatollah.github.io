// Project Title

let rows = 20;
let cols = 13;
let grid;
let cellwidth;
let cellHeight;
let xBuffer;
let yBuffer;
let active;


function setup() {
  createCanvas(windowWidth, windowHeight);

  grid = createGrid(cols, rows);
  cellwidth = 0.8*width / rows;
  cellHeight = 0.8*height / cols;
  xBuffer = windowWidth*0.1;
  yBuffer = windowHeight*0.1;
}

function draw() {
  background("white");

  angleMode(DEGREES);

  displayGrid();

  eraserIcon();

  console.log(mouseX, mouseY);
}

function displayGrid () {
  for (let y=0; y<cols; y++) {
    for (let x=0; x<rows; x++) {
      if (grid[y][x] === 0) {
        fill(156, 140, 132);
      }
      else if (grid[y][x] === 1) {
        fill(200);
      }
      rect(x*cellwidth + xBuffer, y*cellHeight + yBuffer, cellwidth, cellHeight);
    }
  }
}

function mousePressed() {
  let cellX = Math.floor((mouseX-xBuffer)/cellwidth);
  let cellY = Math.floor((mouseY-yBuffer)/cellHeight);

  swap(cellX, cellY);
}

function swap(x, y) {
  if (x >= 0 && x < rows && y >= 0 && y < cols) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function createGrid(howLarge) {
  let emptyArray = [];
  for (let y = 0; y < howLarge; y++) {
    emptyArray.push([]);
    for (let x=0; x<howLarge; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

function eraserIcon() {
  fill(active);
  stroke("black");
  translate(40,45);
  rotate(15);
  rect(40,45,40,10);

  translate(17,27);
  rotate(0.3);
  rect(17,27,50,70);
}
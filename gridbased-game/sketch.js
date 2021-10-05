// Project Title

let rows = 30;
let cols = 14;
let grid;
let cellwidth;
let cellHeight;


function setup() {
  createCanvas(windowWidth*0.8, windowHeight*0.8);

  grid = createGrid(cols, rows);
  cellwidth = width / rows;
  cellHeight = height/ cols;
}

function draw() {
  background("white");

  displayGrid();

  console.log(mouseX);
  console.log(mouseY);

  rect(10,windowHeight*0.9,40,40);
}

function displayGrid () {
  for (let y=0; y<cols; y++) {
    for (let x=0; x<rows; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      rect(x*cellwidth, y*cellHeight, cellwidth, cellHeight);
    }
  }
}

function mousePressed() {
  let cellX = Math.floor(mouseX/cellwidth);
  let cellY = Math.floor(mouseY/cellHeight);

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
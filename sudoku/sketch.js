// sudoku

let initialGrid = [
  [0, 3, 0, 0, 0, 0, 0, 5, 7],
  [7, 0, 2, 0, 0, 0, 0, 0, 8],
  [0, 0, 0, 3, 0, 6, 0, 0, 0],
  [0, 9, 4, 0, 0, 5, 0, 8, 0],
  [0, 0, 8, 0, 1, 0, 7, 0, 0],
  [0, 7, 0, 8, 0, 0, 9, 2, 0],
  [0, 0, 0, 5, 0, 2, 0, 0, 0],
  [2, 0, 0, 0, 0, 0, 5, 0, 9],
  [6, 5, 0, 0, 0, 0, 0, 4, 0],
];

let gridDimensions = 9;
let cellSize;
let grid;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }

  grid = initialGrid;
  cellSize = width/gridDimensions;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  for (let y=0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      fill("white");
      strokeWeight(1);
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
      
      if (grid[y][x] !== 0) {
        fill("black");
        textSize(cellSize*0.75);
        textAlign(CENTER,CENTER);
        text(grid[y][x], x*cellSize + cellSize/2, y*cellSize + cellSize/2);
      }
    }
  }

  drawCageLines();
}

function drawCageLines () {
  strokeWeight(4);

  for (let location = 0; location <= 9; location += 3) {
    line(0, location*cellSize, width, location*cellSize);
    line(location*cellSize, 0, location*cellSize, height);
  }

  //line(0, 0*cellSize, width, 0*cellSize);
  //line(0, 3*cellSize, width, 3*cellSize);
  //line(0, 6*cellSize, width, 6*cellSize);
  //line(0, 9*cellSize, width, 9*cellSize);

  //line(0*cellSize, 0, 0*cellSize, height);
  //line(3*cellSize, 0, 3*cellSize, height);
  //line(6*cellSize, 0, 6*cellSize, height);
  //line(9*cellSize, 0, 9*cellSize, height);
}
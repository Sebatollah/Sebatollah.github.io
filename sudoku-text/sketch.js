// sudoku

let initialGrid;

let gridDimensions = 9;
let cellSize;
let grid;

function preload() {
  initialGrid = loadStrings("assets/level2.txt");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }

  initialGrid = convertedToIntGrid(initialGrid);

  grid = initialGrid;
  cellSize = width/gridDimensions;
}

function convertedToIntGrid(initialGrid) {
  //assume rectangular array
  let rows = initialGrid.length;
  let cols = initialGrid[0].length;

  let newGrid = [];
  for (let y=0; y<rows; y++) {
    newGrid.push([]);
    for (let x=0; x<cols; x++) {
      newGrid[y].push( int(initialGrid[y][x]) );
    }
  }
  return newGrid;
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
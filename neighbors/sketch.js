// grid Neighbours

let gridDimensions = 10;
let grid;
let cellSize;

function setup() {
  if (windowHeight < windowWidth) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  
  grid= createRandomArray(gridDimensions);
  cellSize = width / gridDimensions;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let cellX = Math.floor(mouseX/cellSize);
  let cellY = Math.floor(mouseY/cellSize);
  
  swap(cellX, cellY);
  swap(cellX, cellY-1);
  swap(cellX, cellY+1);
  swap(cellX+1, cellY);
  swap(cellX-1, cellY);
}

function swap(x, y) {
  if (x >= 0 && x < gridDimensions && y >= 0 && y < gridDimensions) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y=0; y<gridDimensions; y++) {
    for(let x=0; x<gridDimensions; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function createRandomArray(howLarge) {
  let newArray = [];
  for (let y=0; y<howLarge; y++) {
    newArray.push([]);
    for (let x=0; x<howLarge; x++) {
      if (random(0, 100) > 50) {
        newArray[y].push(0);
      }
      else {
        newArray[y].push(1);
      }
    }
  }
  return newArray;
}
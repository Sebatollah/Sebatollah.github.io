// grid movement

let gridDimensions = 10;
let grid;
let cellSize;
let level1;
let playerX = 0;
let playerY = 0;

function preload() {
  level1 = loadJSON("assets/level1.json");
}

function setup() {
  if (windowHeight < windowWidth) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  
  //grid= createRandomArray(gridDimensions);
  grid = level1;
  cellSize = width / gridDimensions;

  //place player
  grid[playerY][playerX] = 9;
}

function draw() {
  background(220);
  displayGrid();
}

function keyPressed() {
  if (key === "s") {
    tryMovingTo(playerX, playerY+1);
  }
  if (key === "w") {
    tryMovingTo(playerX, playerY-1);
  }
  if (key === "d") {
    tryMovingTo(playerX+1, playerY);
  }
  if (key === "a") {
    tryMovingTo(playerX-1, playerY);
  }
}

function tryMovingTo(newX, newY) {
  //make sure you're on the grid
  if (newX >= 0 && newY >= 0 && newX < gridDimensions && newY < gridDimensions) {
    //check if new spot is empty
    if (grid[newY][newX] === 0) {
      //reset current spot to be empty
      grid[playerY][playerX] = 0;

      //move player
      playerX = newX;
      playerY = newY;

      //put player back in grid
      grid[newY][newX] = 9;
    }
  }
}

function mousePressed() {
  let cellX = Math.floor(mouseX/cellSize);
  let cellY = Math.floor(mouseY/cellSize);
  
  swap(cellX, cellY);
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
      else if (grid[y][x] === 9) {
        fill("red");
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
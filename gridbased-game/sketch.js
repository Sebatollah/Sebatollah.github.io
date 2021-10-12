// Project Title

let rows = 20.9;
let cols = 15.78;
let colsloc = 21;
let grid;
let cellwidth;
let cellHeight;
let xBuffer;
let yBuffer;
let activeE = "white";
let activeB = "white";


function setup() {
  createCanvas(windowWidth, windowHeight);

  grid = createGrid(colsloc, rows);
  cellwidth = 0.65*width / rows;
  cellHeight = 0.65*height / cols;
  xBuffer = windowWidth*0.15;
  yBuffer = windowHeight*0.15;
}

function draw() {
  background("white");

  angleMode(DEGREES);

  displayGrid();

  blockIcon();

  eraserIcon();

}

function displayGrid () {
  for (let y=0; y<cols; y++) {
    for (let x=0; x<rows; x++) {
      if (grid[y] === 0) {
        grid[y][x] = 1;
      }
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

  if (activeE === "lightblue") {
    swapE(cellX, cellY);
  }
  if (activeB === "lightblue") {
    swapB(cellX, cellY);
  }


  if (mouseX >= 30 && mouseX <= 120) {
    if (mouseY >= 90 && mouseY <= 190) {
      activeE = "lightblue";
      activeB = "white";
    }
  }

  if (mouseX >= 30 && mouseX <= 120) {
    if (mouseY >= 230 && mouseY <= 330) {
      activeB = "lightblue";
      activeE = "white";
    }
  }
}

function swapB(x, y) {
  if (x >= 1 && x < rows - 1 && y >= 1 && y < colsloc - 1) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
  }
}

function swapE(x,y) {
  if (x >= 1 && x < rows - 1 && y >= 1 && y < colsloc - 1) {
    if (grid[y][x] === 1) {
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

function blockIcon() {
  fill(activeB);
  stroke("white");
  rect(30,230,90,100);

  fill("white");
  stroke("black");
  rect(45,250,60,60);
}

function eraserIcon() {
  fill(activeE);
  stroke("white");
  rect(30, 90, 90, 100);

  fill("white");
  stroke("black");
  translate(40,45);
  rotate(15);
  rect(40,45,40,10);

  translate(17,27);
  rotate(0.3);
  rect(17,27,50,70);
}
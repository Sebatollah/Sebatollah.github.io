// Project Title

let rows = 21;
let cols = 16;
let colsloc = 21;
let grid;
let cellwidth;
let cellHeight;
let xBuffer;
let yBuffer;
let activeE = "white";
let activeB = "white";
let activeBlock;
let gridY = false;
let gridX = false;
let wallBlock = 1;
let metalblock = 2;
let spawnPoint = 3;
let endPoint = 4;
let endIcon;
let startIcon;
let saveIcon;
let currentBlock = 1;
let numOfSpawnpoints = 0;
let numOfEndpoints = 0;

function preload() {
  endIcon = loadImage("assets/end-pos-icon.png");
  startIcon = loadImage("assets/Old hero1.png");
  saveIcon = loadImage("assets/disk-1.png");
}

function setup() {
  createCanvas(1599,788);//1599,788

  grid = createGrid(colsloc, rows); //making the grid and putting it in the center of the screen
  cellwidth = 0.65*width / rows;
  cellHeight = 0.65*height / cols;
  xBuffer = windowWidth*0.15;
  yBuffer = windowHeight*0.15;
  activeBlock = currentBlock;
}

function draw() {
  background("white");

  angleMode(DEGREES);

  displayGrid();

  blockIcon();

  blockBar();

  gameTitle();

  savefile();

  eraserIcon();
}

function displayGrid () {
  for (let y=0; y < cols; y++) {

    if (y === 0 || y === 15) { //putting a border on both y edges
      gridY = true;
    }
    else {
      gridY = false;
    }
    for (let x=0; x < rows; x++) {
      if (gridY === true) {
        grid[y][x] = wallBlock;
      }

      if (x === 0 || x === 20) { //putting a border on both x edges
        gridX = true;
      }
      else {
        gridX = false;
      }
      if (gridX === true) {
        grid[y][x] = wallBlock;
      }

      if (grid[y][x] === 0) { //if a certain block is on the screen then it colors that cell that block
        fill(156, 140, 132);
        rect(x*cellwidth + xBuffer, y*cellHeight + yBuffer, cellwidth, cellHeight);
      }
      else if (grid[y][x] === 1) {
        fill(200);
        rect(x*cellwidth + xBuffer, y*cellHeight + yBuffer, cellwidth, cellHeight);
      }
      else if (grid[y][x] === 2) {
        fill(255);
        rect(x*cellwidth + xBuffer, y*cellHeight + yBuffer, cellwidth, cellHeight);
      }
      else if (grid[y][x] === 3) {
        image(startIcon, x*cellwidth + xBuffer, y*cellHeight + yBuffer, cellwidth, cellHeight);
      }
      else if (grid[y][x] === 4) {
        image(endIcon, x*cellwidth + xBuffer, y*cellHeight + yBuffer, cellwidth, cellHeight);
      }
    }
  }
}

function mouseDragged() {
  let cellX = Math.floor((mouseX-xBuffer)/cellwidth);
  let cellY = Math.floor((mouseY-yBuffer)/cellHeight);

  if (activeE === "lightblue") { //making an eraser
    swapE(cellX, cellY);
  }

  if (activeB === "lightblue") { //making a block placer
    swapB(cellX, cellY);
    activeBlock = 1;
  }

  console.log(grid);

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

  if (mouseX >= 250 && mouseX <= 290) {
    if (mouseY >= 715 && mouseY <= 755) {
      currentBlock = wallBlock;
      activeBlock = 1;
    }
  }

  if (mouseX >= 330 && mouseX <= 370) {
    if (mouseY >= 715 && mouseY <= 755) {
      currentBlock = metalblock;
      activeBlock = 2;
    }
  }

  if (mouseX >= 410 && mouseX <= 450) {
    if (mouseY >= 715 && mouseY <= 755) {
      currentBlock = spawnPoint;
      activeBlock = 3;
    }
  }

  if (mouseX >= 490 && mouseX <= 530) {
    if (mouseY >= 715 && mouseY <= 755) {
      currentBlock = endPoint;
      activeBlock = 4;
    }
  }
}

function mousePressed() {
  let cellX = Math.floor((mouseX-xBuffer)/cellwidth);
  let cellY = Math.floor((mouseY-yBuffer)/cellHeight);

  if (activeE === "lightblue") { //making an eraser
    swapE(cellX, cellY);
    activeBlock = 0;
  }

  if (activeB === "lightblue") { //making a block placer
    swapB(cellX, cellY);
    activeBlock = 1;
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

  if (mouseX >= 250 && mouseX <= 290) {
    if (mouseY >= 715 && mouseY <= 755) {
      currentBlock = wallBlock;
      activeBlock = 1;
    }
  }

  if (mouseX >= 330 && mouseX <= 370) {
    if (mouseY >= 715 && mouseY <= 755) {
      currentBlock = metalblock;
      activeBlock = 2;
    }
  }

  if (mouseX >= 410 && mouseX <= 450) {
    if (mouseY >= 715 && mouseY <= 755) {
      currentBlock = spawnPoint;
      activeBlock = 3;
    }
  }

  if (mouseX >= 490 && mouseX <= 530) {
    if (mouseY >= 715 && mouseY <= 755) {
      currentBlock = endPoint;
      activeBlock = 4;
    }
  }

  if (mouseX >= 45 && mouseX <= 105) {
    if (mouseY >= 330 && mouseY <= 440) {
      saveLevel();
    }
  }
}

function swapB(x, y) {
  if (x >= 1 && x < rows - 1 && y >= 1 && y < cols - 1) {
    if (currentBlock === spawnPoint || currentBlock === endPoint) {
      if (currentBlock === spawnPoint) {
        if (numOfSpawnpoints <= 0) {
          if (grid[y][x] === endPoint) {
            numOfEndpoints -= 1;
          }
          grid[y][x] = currentBlock;
          numOfSpawnpoints += 1;
        }
      }
      if (currentBlock === endPoint) {
        if (numOfEndpoints <= 0) {
          if (grid[y][x] === spawnPoint) {
            numOfSpawnpoints -= 1;
          }
          grid[y][x] = currentBlock;
          numOfEndpoints += 1;
        }
      }
    }
    if (currentBlock !== spawnPoint && currentBlock !== endPoint) {
      if (grid[y][x] === spawnPoint) {
        numOfSpawnpoints -= 1;
      }
      if (grid[y][x] === endPoint) {
        numOfEndpoints -= 1;
      }
      grid[y][x] = currentBlock;
    }
  }
}

function swapE(x,y) {
  if (x >= 1 && x < rows - 1 && y >= 1 && y < cols - 1) {
    if (grid[y][x] === spawnPoint) {
      numOfSpawnpoints -= 1;
    }
    if (grid[y][x] === endPoint) {
      numOfEndpoints -= 1;
    }
    grid[y][x] = 0;
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

function gameTitle() {
  textSize(40);
  fill("black");
  text("LevelEditor",650,20,100,50);
}

function blockIcon() {
  fill(activeB);
  stroke("white");
  rect(30,230,90,100);

  fill("white");
  stroke("black");
  rect(45,250,60,60);
}

function blockBar() {
  fill("black");
  stroke("black");
  rect(0,670, width, 118);
  textSize(20);
  text("Blocks", width/2 - 50, 640, 40, 30);
  blocks();
}

function savefile() {
  image(saveIcon, 45, 380, 60, 60);
}

function saveLevel() {
  saveJSON(grid, "your-level.json");
}

function blocks() {
  if (activeBlock === 1) {
    fill ("blue");
    rect(240, 705, 60, 60);
  }
  fill(200);
  rect(250, 715, 40, 40); //wall block
  
  if (activeBlock === 2) {
    fill ("blue");
    rect(320, 705, 60, 60);
  }
  fill(255);
  rect(330, 715, 40, 40); //metal block
  
  if (activeBlock === 3) {
    fill ("blue");
    rect(400, 705, 60, 60);
  }
  image(startIcon, 410, 715, 40, 40); //start position

  if (activeBlock === 4) {
    fill ("blue");
    rect(480, 705, 60, 60);
  }
  image(endIcon, 490, 715, 40, 40);//end position
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
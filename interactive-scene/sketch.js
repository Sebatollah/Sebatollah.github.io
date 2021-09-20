// interactive scene
// Sebastion Thauberger
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;
let metal;
let screenwidth = 400;
let screenheight = 400;
let playerX = 20;
let playerY = 200;
let rectY;
let rectH;
let radius = 25;
let speed = 5;
let spacebardown = false;
let rightWallHit;
let leftWallHit = false;
let topWallHit = false;
let grav = 0.1;
let dy = 1;
let touchwall = false;

function preload() {
  player = loadImage("assets/Old hero1.png");
}

function setup() {
  createCanvas(screenheight, screenwidth);
  rectY = height * 0.9;
  rectH = height * 0.1;
}

let floorhit = false;
let wallhit = false;
let topOfWallhit = false;

function draw() {
  background(220);
  drawFloor();
  //
  drawWall();
  // //
  handleKeys(); //player movement
  //
  drawPlayer();
  //
  floorhitbox();
  //
  wallhitbox();
  //
  topOfWallhitbox();
  // //
  findTheWall(); //find which side of the wall is being touched
  // //
  gravity();
}

function gravity() {
  //   if (playerY > rectY - radius * 2) {
  //     rectY - radius * 2
  //     dy = 0;
  //   }
  //   else {
  //     playerY += dy;
  //     dy += gravity;
  //   }
}

function findTheWall() {
  if (topOfWallhit === true) {
    if (keyIsDown(83)) {
      topWallHit = true;
      playerY -= speed;
    }
  }
  if (wallhit === true) {
    if (keyIsDown(68)) {
      rightWallHit === true; 
    }
  }
  else if (wallhit === false) {
    rightWallHit = false;
  }
}

function drawFloor() {
  rect(0, rectY, width, height * 0.1);
}

function drawWall() {
  rect(width * 0.45, rectY - 200, 50, 200);
}

function drawPlayer() {
  image(player, playerX, playerY, radius * 2, radius * 2);
}

function floorhitbox() {
  floorhit = collideRectRect(
    0,
    rectY,
    width,
    height * 0.1,
    playerX,
    playerY,
    radius * 2,
    radius * 2
  );
}

function wallhitbox() {
  wallhit = collideRectRect(
    width * 0.45,
    rectY - 200,
    50,
    200,
    playerX,
    playerY,
    radius * 2,
    radius * 2
  );
}

function topOfWallhitbox() {
  topOfWallhit = collideRectRect(
    width * 0.45,
    rectY - 200,
    50,
    1,
    playerX,
    playerY,
    radius * 2,
    radius * 2
  );
}

function handleKeys() {
  if (keyIsDown(87)) {
    //w
    if (playerY > 0) {
      playerY -= speed;
    }
  }
  if (keyIsDown(83)) {
    //s
    if (floorhit === false) {
      playerY += speed;
    }
  }
  if (keyIsDown(65)) {
    //a
    if (playerX > 0) {
      if (wallhit === false) {
        playerX -= speed;
      }
    }
  }
  if (keyIsDown(68)) {
    //d
    if (rightWallHit === false) {
      playerX += speed;
    }
  }
  if (keyIsDown(32)) {
    //spacebar
    dy = -5;
  }

  //print("colliding?", wallhit);
}

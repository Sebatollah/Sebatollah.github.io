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
let topWallHit = false;
let grav = 0.1;
let dy = 1;
let touchwall = false;
let airtime;

function preload() {
  player = loadImage("assets/Old hero1.png");
}

function setup() {
  createCanvas(screenheight, screenwidth);
  rectY = height * 0.9;
  rectH = height * 0.1;
}

let floorhit = false;
let leftwallhit = false;
let topOfWallhit = false;
let rightwallhit = false;

function draw() {
  background(156, 140, 132);
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
  leftwallhitbox();
  //
  topOfWallhitbox();
  //
  rightwallhitbox();
  //
  gravity();
  //

  console.log (dy);
}

function gravity() {
  if (playerY >= rectY - radius * 2) {
    playerY = rectY - radius * 2 - 0.1;
    dy = 0;
  }
  else {
    playerY += dy;
    dy += grav;   
  }
}

function drawFloor() {
  noStroke();
  fill(225);
  rect(0, rectY, width, height * 0.1);
}

function drawWall() {
  noStroke();
  fill(225);
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

function leftwallhitbox() {
  leftwallhit = collideRectRect(
    width * 0.45 + 50,
    rectY - 199,
    1,
    200,
    playerX,
    playerY,
    radius * 2,
    radius * 2
  );
}

function rightwallhitbox() {
  rightwallhit = collideRectRect(
    width * 0.45,
    rectY - 199,
    1,
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
    playerY + radius * 2,
    radius * 2,
    1
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
      if (topOfWallhit === false) {
        playerY += speed;
      }
    }
  }
  if (keyIsDown(65)) {
    //a
    if (playerX > 0) {
      if (leftwallhit === false) {
        playerX -= speed;
      }
    }
  }
  if (keyIsDown(68)) {
    //d
    if (rightwallhit === false) {
      playerX += speed;
    }
  }


  //print("colliding?", wallhit);
}

function keyPressed() {
  if (key === " ") {
    //spacebar
    dy = -5;
    airtime = true;
  }
}
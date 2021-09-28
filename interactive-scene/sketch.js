// interactive scene
// Sebastion Thauberger
// Date

//controls are space for jump wasd for movement and boost in air if you hit w and space bar at the same time

let player;
let metal;
let playerX = 700;
let playerY = 600;
let rectY;
let rectH;
let radius = 25;
let speed = 5;
let grav = 0.1;
let dy = 1;
let airtime = false;
let flooring;
let pushingLine;
let startGame = false;

function preload() {
  player = loadImage("assets/Old hero1.png"); //load player image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectY = height * 0.9;
  rectH = height * 0.1;
  flooring = rectY;
}

let floorhit = false;
let leftwallhit = false;
let topOfWallhit = false;
let rightwallhit = false;

function draw() {
  background(156, 140, 132);
  makeStartingScreen();
  //
  drawFloor();
  //
  drawWall();
  //
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
  drawMetal();
  //
  createPushingLine();
  //
}
function createPushingLine() {
  if (startGame === true) {
    translate(width * 0.45 - 50 + 25, rectY + 5);
    pushingLine = atan2(playerY, playerX);
    rotate(pushingLine);
    //fill(0,180,220, 100);
    //rect(0, 0, width * 0.45 -25 + 100 - radius, 10);
    stroke ("blue");
    line(playerX - width * 0.45 - 50 + 25, playerY - rectY + 5, 0, 0);
  }
}

function drawMetal() {
  if (startGame === true) {
    fill(255);
    rect(width * 0.45 - 50, rectY, 50, 10);
  }
}

function gravity() { //checks whether the player is above the wall or not and if the player is it sets that to be the floor it
  if (playerX + radius*2 < width* 0.45 || playerX > width* 0.45 + 50) {
    flooring = rectY;
  }
  if (playerX + radius*2 - 1 > width* 0.45 && playerX + radius*2 < width* 0.45 + 50 || playerX > width* 0.45 && playerX < width* 0.45 + 50) {
    flooring = rectY - 200;
  }
  if (playerY >= flooring - radius * 2) { //increases the velocity with the gravity (grav) until the player hits the floor
    playerY = flooring - radius * 2 - 0.1;
    dy = 0;
    airtime = false;
  }
  else {
    playerY += dy;
    dy += grav;   
  }
}

function makeStartingScreen() {
  if (startGame === false) {
    background("grey");
    fill("darkgrey");
    rect(width/2 - 250, height/2 - 10, 500, 130);
    textSize(80);
    fill("blue");
    text("SEBASTIAN'S PROJECT GAME", width/2 - 600, height*0.3, 1250, 1000);
    textSize(40);
    fill("black");
    text("CLICK TO START", width/2 - 150, height/2 + 30, 500, 130);
  }
}

function mouseClicked() {
  if (startGame === false) {
    if (mouseX >= width/2 - 250 && mouseX <= width/2 - 250 + 500) {
      if (mouseY >= height/2 - 10 && mouseY <= height/2 - 10 + 130) {
        startGame = true;
      }
    }
  }
}

function drawFloor() {
  if (startGame === true) {
    noStroke();
    fill(200);
    rect(0, rectY, width, height * 0.1);
  }
}

function drawWall() {
  if (startGame === true) {
    noStroke();
    fill(200);
    rect(width * 0.45, rectY - 200, 50, 200);
  }
}

function drawPlayer() {
  if (startGame === true) {
    image(player, playerX, playerY, radius * 2, radius * 2);
  }
}

function floorhitbox() { //whenever the player touches the hitbox it activates anything to do with the hitbox
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

function handleKeys() { //allows movement
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
    if (playerX + radius*2 < width) {
      if (rightwallhit === false) {
        playerX += speed;
      }
    }
  }
}

function keyPressed() { // checks if the player is on the ground and if he is then when the space bar is pressed jump
  if (airtime === false && dy <= 1) {
    if (key === " ") {
      //spacebar
      dy = -5;
      airtime = true;
    }
  }
}
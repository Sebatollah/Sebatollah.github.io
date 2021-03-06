// interactive scene
// Sebastion Thauberger
// Date

//controls are space for jump wasd for movement and boost in air if you hit w and space bar at the same time

let player;
let metal;
let playerX = 0;
let playerY = 0;
let rectY;
let rectH;
let radius = 25;
let speed = 5;
let grav = 0.1;
let dy = 1;
let airtime = false;
let flooring;
let pushingLine;
let d;
let pushSpeed = 5;

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
  background(156, 140, 132);//156, 140, 132
  //
  d = dist(width * 0.45 - 25, rectY + 5, playerX + radius, playerY + radius);
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
  if (mouseIsPressed === true) {
    if (mouseButton === LEFT) {
      if (mouseX >= width * 0.45 - 50 && mouseX <= width * 0.45) {
        if (mouseY >= rectY && mouseY <= rectY + 10) {
          steelPush();
        }
      }
    }
    else if (mouseButton === RIGHT) {
      if (mouseX >= width * 0.45 - 50 && mouseX <= width * 0.45) {
        if (mouseY >= rectY && mouseY <= rectY + 10) {
          ironPull();
        }
      }
    }
  }
}

function createPushingLine() {
  push();
  translate(width * 0.45 - 25, rectY + 5);
  pushingLine = atan2(playerY-(rectY + 5) + radius, playerX-(width * 0.45 - 25) + radius);
  rotate(pushingLine);
  stroke (0,123,255, 240);
  line(0, 0, d, 0);
  pop();
}

function steelPush() {
  playerX += cos(pushingLine) * pushSpeed;
  playerY += sin(pushingLine) * pushSpeed;
}

function ironPull() {
  playerX -= cos(pushingLine) * pushSpeed;
  playerY -= sin(pushingLine) * pushSpeed;
}

function drawMetal() {
  fill(255);
  rect(width * 0.45 - 50, rectY, 50, 10);
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

function drawFloor() {
  noStroke();
  fill(200);
  rect(0, rectY, width, height * 0.1);
}

function drawWall() {
  noStroke();
  fill(200);
  rect(width * 0.45, rectY - 200, 50, 200);
}

function drawPlayer() {
  image(player, playerX, playerY, radius * 2, radius * 2);
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
// Walker OOP Demo

let dude;
let seb;
let guy;

function setup() {
  createCanvas(windowWidth, windowHeight);
  dude = new Walker(width/2, height/2, "blue");
  seb = new Walker(200, 200, "red");
  guy = new Walker(600, 600, "green");
}

function draw() {
  dude.move();
  seb.move();
  guy.move();

  dude.display();
  seb.display();
  guy.display();
}

class Walker {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.color = theColor;
    this.speed = 4;
    this.radius = 2;
  }

  display() {
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    let theChoice = random (100);

    if (theChoice < 25) {//up
      this.y -= this.speed;
    }
    else if (theChoice < 50) {//down
      this.y += this.speed;
    }
    else if (theChoice < 75) {//left
      this.x -= this.speed;
    }
    else {//right
      this.x += this.speed;
    }
  }
}
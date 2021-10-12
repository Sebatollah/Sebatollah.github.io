// Button OOP Demo

let buttonOne, buttonTwo;
let backgroundColor = "white";

function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonOne = new Button(300, 200, 400, 100);
  buttonTwo = new Button(300, 400, 400, 100);
  buttonTwo.notHoveredColor = "#DBFE87";
  buttonTwo.hoverColor = "#FFE381";
}

function draw() {
  background(backgroundColor);
  buttonOne.display();
  buttonTwo.display();
}

function mousePressed() {
  if (buttonOne.checkIfInside(mouseX, mouseY)) {
    backgroundColor = "red";
  }
  if (buttonTwo.checkIfInside(mouseX, mouseY)) {
    backgroundColor = "black";
  }
}

class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.hoverColor = "#DA627D";
    this.notHoveredColor = "#9A348E";
  }

  display() {
    if (this.checkIfInside(mouseX, mouseY)) {
      fill(this.hoverColor);
    }
    else {
      fill(this.notHoveredColor);
    }
    rect(this.x, this.y, this.width, this.height);
  }

  checkIfInside(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
}
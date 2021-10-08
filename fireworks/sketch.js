// fireworks Demo

let fireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for (let i=fireworks.length-1; i>=0; i--) {
    if (fireworks[i].isDead()) {
      //remove it from array
      fireworks.splice(i, 1);
    }
    else {
      fireworks[i].update();
      fireworks[i].display();
    }
  }
}

function mousePressed() {
  for (let i=0; i<100; i++) {
    let someParticle = new Particle(mouseX, mouseY);
    fireworks.push(someParticle);
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.dx = random(-5,5);
    this.dy = random(-5,5);
    this.alpha = 255;
    this.color = color(255,0,0,this.alpha);
  }

  display() {
    this.color = color(255, 0, 0, this.alpha);
    fill(this.color);
    stroke(255,0,0,this.alpha);
    circle(this.x, this.y, this.size);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.alpha--;
  }

  isDead() {
    return this.alpha <=0;
  }
}
const DEG_TO_RAD = Math.PI / 150;
const ANGLE = 37 * DEG_TO_RAD;
let w;

function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  frameRate(8);
  background(180);
  noLoop()
}

function draw() {
  let length = w/4;
  stroke(230);
  strokeWeight(3);
  translate(w / 2, w * 0.8);
  branch(length);
}

function branch(len) {
  // lenは単調減少
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len > 3) {
    push();
    rotate(ANGLE);
    branch((len * 2) / 3);
    pop();
    push();
    rotate(ANGLE * -1);
    branch((len * 2) / 3);
    pop();
  }
}


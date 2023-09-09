let w, g;
let cp = ["#000", "#fff"];

function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  noLoop();
}

function draw() {
  background("palevioletred");

  noFill();
  stroke("darkmagenta");
  strokeWeight(1);

  angleMode(DEGREES);

  let rad = 30;
  let padX = rad * cos(30) * 2;
  let padY = rad * sin(30) * 3;
  let rows = height / padY;
  let cols = width / padX;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = c * padX;
      let y = r * padY;
      if (r % 2 == 0) x += padX / 2;
      drawUnit(x, y, rad);
    }
  }
}

function drawUnit(x, y, r) {
  beginShape();
  let a = 360 / 6;
  for (let i = 0; i < 6; i++) {
    let pX = x + cos(i * a + 30) * r;
    let pY = y + sin(i * a + 30) * r;
    vertex(pX, pY);
  }
  endShape(CLOSE);

  beginShape();
  let b = 360 / 3;
  for (let i = 0; i < 3; i++) {
    let pX = x + cos(i * b - 90) * r;
    let pY = y + sin(i * b - 90) * r;
    vertex(pX, pY);
    line(x, y, pX, pY);
  }
  endShape(CLOSE);
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "myCanvas", "jpg");
}

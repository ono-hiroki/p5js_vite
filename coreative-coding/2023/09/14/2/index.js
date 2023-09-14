//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
let url = "https://coolors.co/palette/8ecae6-219ebc-023047-ffb703-fb8500";
let palette = url
  .replace("https://coolors.co/", "")
  .split("-")
  .map((c) => "#" + c);

let w;
function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  strokeJoin(ROUND);
  drawingContext.shadowColor = color(0, 0, 0, 150);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  // background(random(palette));
  background("#023047");
  push();
  drawingContext.shadowBlur = 50;
  drawingContext.shadowOffsetX = 10;
  strokeWeight(1);
  stroke("#fff");
  fill("#FB8500");
  noFill();
  drawingContext.setLineDash([1, 0]);
  // drawSakura(width / 2, height / 2, 200);
  drawSakura4(width / 2, height / 2, 200);
  pop();
}

function drawSakura4(ox, oy, or) {
  push();
  translate(ox, oy);
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let t1 = 1;
    let t2 = 4; // 花びらの数
    let h2 = 0.5;
    let r1 = theta * t1;
    let r2 = theta * t2;


    let b = (sin(r2) + cos(r2 * 2)) / 2.0;
    let a = b * h2 + 1.0;
    let x = or * a * sin(theta);
    let y = or * a * cos(r1);

    vertex(x, y);
  }
  endShape(CLOSE);

  pop();
}

function drawSakura3(ox, oy, or) {
  push();
  translate(ox, oy);
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let A = sin(theta * 4);
    let x = or * A * sin(theta);
    let y = or * A * cos(theta);

    vertex(x, y);
  }
  endShape(CLOSE);

  pop();
}

function drawSakura2(ox, oy, or) {
  push();
  translate(ox, oy);
  // noStroke();
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let B = sin(theta);
    let A = B * 0.5 + 1.0;
    let C = cos(theta);
    let R = or;

    let x = R * sin(theta + C);
    let y = R * cos(theta + C);

    vertex(x, y);
  }
  endShape(CLOSE);

  pop();
}

function drawSakura(ox, oy, or) {
  push();
  angleMode(DEGREES);
  translate(ox, oy);

  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let B = (sin(theta * 5) + cos(theta * 10)) / 2.0;
    let A = B * 0.5 + 1.0;
    let R = or * A;

    let x = R * sin(theta + 90);
    let y = R * cos(theta + 90);

    vertex(x, y);
  }
  endShape(CLOSE);

  pop();
}

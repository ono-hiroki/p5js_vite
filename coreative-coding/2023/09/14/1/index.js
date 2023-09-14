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
  noLoop();
}

function draw() {
  // background(random(palette));
  background("#023047");
  push();
  drawingContext.shadowBlur = 50;
  drawingContext.shadowOffsetX = 10;
  strokeWeight(6);
  // stroke(random(palette));
  stroke("#023047");
  // fill(random(palette));
  fill("#FB8500");
  drawingContext.setLineDash([1, 10]);
  // drawHeart(width / 2, height / 2, 10);
  // drawFlower(width / 2, height / 2, 100);
  // drawStar(width / 2, height / 2, 100, 5);
  // drawPolygon(width / 2, height / 2, 100, 6);
  // drawTwinkleStar(width / 2, height / 2, 100);
  drawAstroid(width / 2, height / 2, 50, 4);
  // drawSakura(width / 2, height / 2, 100);
  // drawSakura2(width / 2, height / 2, 30);
  // drawLeaf(width / 4, height / 4, 30);
  // drawDrop((width * 3) / 4, height / 4, 100, 5);
  // drawFish((width * 3) / 4, (height * 3) / 4, 50);
  pop();
}

function calcPos(r, t, num) {
  let x = r * cos(radians(t)) * _func(t, num);
  let y = r * sin(radians(t)) * _func(t, num);

  return [x, y];
}

function _func(t, num) {
  let a = 360 / num;
  let A = cos(radians(a));
  let b = acos(cos(radians(num * t)));
  let B = cos(radians(a) - b / num);

  return A / B;
}

function drawFlower(ox, oy, r) {
  push();
  translate(ox, oy);
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let R = r * abs(sin(radians(theta * 3))) + r / 2;
    let x = R * cos(radians(theta));
    let y = R * sin(radians(theta));

    curveVertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function drawStar(ox, oy, r, vertexNum) {
  push();
  translate(ox, oy);
  rotate(radians(-90));
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let pos = calcPos(r, theta, vertexNum);

    let x = pos[0];
    let y = pos[1];

    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function drawHeart(ox, oy, size) {
  push();
  translate(ox, oy);

  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let x =
      size *
      (16 * sin(radians(theta)) * sin(radians(theta)) * sin(radians(theta)));
    let y =
      -1 *
      size *
      (13 * cos(radians(theta)) -
        5 * cos(radians(2 * theta)) -
        2 * cos(radians(3 * theta)) -
        cos(radians(4 * theta)));

    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function drawPolygon(x, y, r, vertexNum) {
  push();
  translate(x, y);
  beginShape();
  for (let i = 0; i < vertexNum; i++) {
    vertex(
      r * cos(radians((360 * i) / vertexNum)),
      r * sin(radians((360 * i) / vertexNum))
    );
  }
  endShape(CLOSE);
  pop();
}

function drawTwinkleStar(x, y, r) {
  push();
  translate(x, y);
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    vertex(
      r * pow(cos(radians(theta)), 3),
      r * 1.4 * pow(sin(radians(theta)), 3)
    );
  }
  endShape(CLOSE);
  pop();
}

function drawAstroid(ox, oy, r, vertexNum) {
  vertexNum -= 1;
  push();
  translate(ox, oy);
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let x =
      r * (vertexNum * cos(radians(theta)) + cos(radians(-vertexNum * theta)));
    let y =
      r * (vertexNum * sin(radians(theta)) + sin(radians(-vertexNum * theta)));
    vertex(x, y);
  }
  endShape();
  pop();
}

function drawSakura(ox, oy, or) {
  let petalNum = 5; // 花びらの数

  push();
  translate(ox, oy);
  rotate(radians(90));
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let A = (petalNum / PI) * radians(theta);
    let md = floor(A) % 2;
    let r = pow(-1, md) * (A - floor(A)) + md;
    let R = r + 2 * _calcH(r);

    let x = or * R * cos(radians(theta));
    let y = or * R * sin(radians(theta));

    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function _calcH(x) {
  if (x < 0.8) {
    return 0;
  } else {
    return 0.8 - x;
  }
}

function drawSakura2(ox, oy, or) {
  push();
  translate(ox, oy);
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let A = (sin(radians(theta * 5)) + cos(radians(theta * 10))) / 2.0;
    let B = A * 0.5 + 1.0;
    let R = or * B;
    let x = R * sin(radians(theta + 90));
    let y = R * cos(radians(theta + 90));

    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function drawLeaf(ox, oy, r) {
  push();
  translate(ox, oy);
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let R =
      -r *
      (1 + (9.0 / 10.0) * cos(radians(8 * theta))) *
      (1 + (1.0 / 10.0) * cos(radians(24 * theta))) *
      (9.0 / 10.0 + (1.0 / 10.0) * cos(radians(200 * theta))) *
      (1 + sin(radians(theta)));

    let x = R * cos(radians(theta));
    let y = R * sin(radians(theta));

    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function drawDrop(x, y, r, A) {
  push();
  translate(x, y);
  rotate(radians(-90));
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let R = r / (A * sin(radians(theta) / 2) + 1);
    vertex(R * cos(radians(theta)), R * sin(radians(theta)));
  }
  endShape(CLOSE);
  pop();
}

function drawFish(ox, oy, r) {
  push();
  translate(ox, oy);
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let x =
      r * cos(radians(theta)) - (r * pow(sin(radians(theta)), 2)) / sqrt(2);
    let y = r * cos(radians(theta)) * sin(radians(theta));
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

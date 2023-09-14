let w, g;
cp = ["#F7CFE1",'#fff', "#F5EA2E", "#CEDE93"];

function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  // createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  noFill();
  let rad = 500;
  let padX = rad * cos(30) * 2; // 三角形の高さ
  let padY = rad * sin(30) * 3; // 三角形の底辺
  let rows = height / padY + 1; // 三角形の高さで割った数
  let cols = width / padX + 1; // 三角形の底辺で割った数

  strokeWeight(1);
  background('#eee');
  stroke(0)
  // fill(0)
  let x = width / 2;
  let y = height / 2;
  circle(x, y, rad);
  circle(x, y, rad * 0.8);

  











  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      push();

      pop()
    }
  }
}

// 角度dの方向に半径rの菱形を描く関数
function drawRhombus(x, y, r, d, c) {
  fill(c);
  beginShape();
  vertex(x, y);
  for (let i = 0; i < 3; i++) {
    let pX = x + cos(d + i * 60 - 60) * r;
    let pY = y + sin(d + i * 60 - 60) * r;
    vertex(pX, pY);
  }
  endShape(CLOSE);
}


function drawCubeA(x, y, r) {
  drawRhombus(x, y, r, 270, randomColor());
  drawRhombus(x, y, r, 30, randomColor());
  drawRhombus(x, y, r, 150, randomColor());
}

// 立方体Bを描く関数
function drawCubeB(x, y, r) {
  drawRhombus(x, y, r, 270, 255);
  drawRhombus(x, y, r, 30, randomColor());
  drawRhombus(x, y, r, 150, randomColor());
  drawRhombus(x + cos(30) * r, y + sin(30) * r, r * 0.66, 210, randomColor());
  drawRhombus(x + cos(30) * r, y + sin(30) * r, r * 0.33, 210, randomColor());
  drawRhombus(x + cos(150) * r, y + sin(150) * r, r * 0.66, 330, randomColor());
  drawRhombus(x + cos(150) * r, y + sin(150) * r, r * 0.33, 330, randomColor());
}

function randomColor() {
  return cp[int(random(cp.length))];
}
function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "myCanvas", "jpg");
}

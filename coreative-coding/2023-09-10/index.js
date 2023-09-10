let w, g;
// let cp = ['#fff','#ddcaaf','#f0ece8','#CFCED2','#A0A0A0','#6F6152'];
// let cp = ['#a11f24','#CD9649','#6D743B','#522C59','#000','#D03952'];
let cp = ["#F7CFE1", "#F5EA2E", "#CEDE93"];

function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  // createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background("black");
  noFill();
  stroke(randomColor());
  strokeWeight(5);

  angleMode(DEGREES);

  let rad = 60;
  let padX = rad * cos(30) * 2; // 三角形の高さ
  let padY = rad * sin(30) * 3; // 三角形の底辺
  let rows = height / padY + 1; // 三角形の高さで割った数
  let cols = width / padX + 1; // 三角形の底辺で割った数

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      push();
      let x = c * padX;
      if(r % 2 == 1) x += padX / 2;
      let y = r * padY;
      translate(x, y);

      if (c % 2 == 0) {
        drawCubeA(0, 0, rad);
      } else {
        drawCubeB(0, 0, rad);
      }
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

// 市松模様
let w, g;
let num = 50;
let cp = ["#000", "#fff"];

function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  noLoop();
  angleMode(DEGREES)
  g = w / 10;
}

function draw() {
  background("#ccc");


  let i = 0;

  angleMode(DEGREES);
  for (let x = 0; x <= w; x += cos(30) * g ) {    
    for (let y = 0; y <= w; y +=   g/2 + sin(30) * g/2 ) {
      i++;

      push();
      stroke(random(cp));
      translate(x, y);
      drawTriangle(0, 0, g / 2);
      pop();
    }
  }
}

function keyPressed() {
  redraw();
  if (key == "s" || key == "S") saveCanvas(canvas, "myCanvas", "jpg");
}

function drawTriangle(x, y, r) {
  angleMode(DEGREES); // 角度モードを度数法に変更
  let pts = []; // x, yを中心にした三角形の座標を格納する配列
  for (let i = 0; i < 3; i++) {
    let d = i * 120 + 30; // 120度づつずらした角度
    let pX = x + r * cos(d); // x座標
    let pY = y + r * sin(d); // y座標
    pts.push({ x: pX, y: pY }); // 配列に格納する
  }
  noStroke()
  fill(random(cp))
  triangle(pts[0].x, pts[0].y, pts[1].x, pts[1].y, pts[2].x, pts[2].y)
}

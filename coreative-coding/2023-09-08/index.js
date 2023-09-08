let num = 50;
let w, g;
let colorPicker = ["#334C5A", "#1AB6B1", "#F8CE53", "#EA8D49", "#E44648"];
let pg = [];
let page = [];

function setup() {
  w = min(windowWidth, windowHeight);
  let canvas = createCanvas(w, w);
  angleMode(DEGREES);
  imageMode(CENTER);
  noLoop();

  g = w / 4;
}

function draw() {
  background(255);
  for (let i = 0; i < num; i++) {
    // 一辺がg
    page[i] = createRandomGraphics(i, g);
  }

  let harfG = g / 2;
  for (let x = harfG; x <= w - harfG; x += g) {
    for (let y = harfG; y <= w - harfG; y += g) {
      push();
      translate(x, y);
      randomRotate(int(random(4)));
      randomScaleReverse(int(random(2)));
      randomImageDrow(pg, num, { x: 0, y: 0 }, { width: g, height: g });
      pop();
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "myCanvas", "jpg");
}



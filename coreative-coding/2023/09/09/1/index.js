let w, g;
// let cp = ["#00302C", "#00A968", "#E9474D"];
// let cp = ['#1B2D69', '#E5B870', '#CA5B9D'];
// let cp = ["#334C5A", "#1AB6B1", "#F8CE53", "#EA8D49", "#E44648"];
let cp = ["#2E4481", "#8290C8", "#F2D7B6", "#EFAE4B", "#E46F3F"];
// let cp = ["#2E4481", "#8290C8", "#8FD3F5"];

function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  strokeCap(SQUARE);
  rectMode(CENTER);
  noLoop();

  g = w / 5;
}

function draw() {
  background(255);
  for (let x = g / 2; x <= w + g; x += g / 10) {
    for (let y = -g; y <= w + g; y += g / 10) {
      push();

      stroke(random(cp));
      translate(x, y);
      fill(random(cp));
      rect(0, 0, g, g);
      pop();
    }
  }

  for (let x = g / 2; x <= w + g; x += g) {
    let ady = random(-g, g);
    for (let y = -g; y <= w + g; y += g) {
      push();
      translate(x, y + ady);

      let [c1, c2] = randomomeTowColor();

      fill(`${c1}ee`);
      noStroke();
      let rr = random([g * 0.91, g * 1.01]);
      angleMode((mode = DEGREES));
      rotate(random(1.1));
      angleMode((mode = RADIANS));
      rect(0, 0, rr, rr);

      rotate(random(TAU));
      scale(random([-1, 1]), 1);

      let r = g * 0.4;
      stroke(c2);
      drawCircle({ x: 0, y: 0 }, r);
      drawCircle({ x: 0, y: -g / 4 }, r);
      drawCircle({ x: 0, y: g / 4 }, r);
      drawCircle({ x: -g / 4, y: 0 }, r);
      drawCircle({ x: g / 4, y: 0 }, r);

      let nr = g;
      fill(c2);
      noStroke();
      let pnum = int(random(1, 10)) * 10; // 1, 10, 20, ... 90
      let mxer = random(1, g / 8); // 1 ~ g/8
      for (let i = 0; i < pnum; i++) {
        drowPoint(nr, mxer);
      }
      pop();
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "myCanvas", "jpg");

  // redraw();
}

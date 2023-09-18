function circles(x, color, dir) {
  push();
  let pg;
  pg = createGraphics(width, height);
  pg.background(color);
  pg.erase();
  pg.push();
  pg.circle(x, pg.height / 2, dir);
  pg.pop();
  pg.noErase();
  drawingContext.filter = 'drop-shadow(4px 4px 8px rgba(46,46,46,0.8))';
  image(pg, 0, 0);
  pop();
}

let w, g;
// let cp = ["#00302C", "#00A968", "#E9474D"];
// let cp = ['#1B2D69', '#E5B870', '#CA5B9D'];
// let cp = ["#334C5A", "#1AB6B1", "#F8CE53", "#EA8D49", "#E44648"];

let url = "https://coolors.co/palette/001524-15616d-ffecd1-ff7d00-78290f";
let c = url
  .replace("https://coolors.co/", "")
  .split("-")
  .map((c) => "#" + c);
// let cp = ["#2E4481", "#8290C8", "#8FD3F5"];
let cp = ["#016A70", "#8290C8", "#FFFFDD", "#D2DE32"];

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

      let nr = g;
      fill(c2);
      noStroke();
      let pnum = int(random(1, 10)) * 10; // 1, 10, 20, ... 90
      let mxer = random(1, g / 8); // 1 ~ g/8
      for (let i = 0; i < pnum; i++) {
        drowPoint(nr, mxer);
      }

      push();
      {
        fill(random(cp));
        let r = g * 0.4;
        stroke(c2);
        let switchNum = int(random(1, 5));
        console.log(switchNum);
        switch (switchNum) {
          case 1:
            drawSakura(0, 0, r);
            break;
          case 2:
            drawSakura2(0, 0, r);
            break;
          case 3:
            drawSakura3(0, 0, r);
            break;
          case 4:
            drawSakura4(0, 0, r);
            break;
        }

        //
      }
      pop();

      pop();

      circles(width/2, 255, 200);
    }
  }

  // drawSakura4(width / 2, height / 2, g * 1.5);
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "myCanvas", "jpg");

  // redraw();
}

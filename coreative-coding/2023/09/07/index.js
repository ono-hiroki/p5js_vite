/**********************************
 * dailycoding -20210622 / graphic
 * by E.C.H (Eiichi Ishii)
 **********************************/

let num = 20;
let w, g;
let cp = ["#334C5A", "#1AB6B1", "#F8CE53", "#EA8D49", "#E44648"];
let pg = [];

function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  angleMode(DEGREES);
  imageMode(CENTER);
  noLoop();

  g = w / 4;
}

function draw() {
  background(255);

  for (let i = 0; i < num; i++) {
    pg[i] = createGraphics(g, g);
    pg[i].angleMode(DEGREES);
    if (int(random(2)) == 0) {
      bc = 255;
    } else {
      bc = 200;
    }
    pg[i].background(bc);

    pg[i].translate(g / 2, g / 2);

    let r = g / 2;
    let ag = 360 / 6;
    pg[i].stroke(cp[int(random(cp.length))]);
    pg[i].strokeJoin(BEVEL);
    pg[i].strokeWeight(g / 100);
    pg[i].fill(255);

    for (let pos = -r * 2; pos <= r * 2; pos += r / 4) {
      pg[i].push();
      pg[i].translate(pos, pos);
      pg[i].rotate(-90);

      if (int(random(2)) == 0) {
        pg[i].fill(255);
      } else {
        pg[i].fill(cp[int(random(cp.length))]);
      }
      pg[i].beginShape();
      pg[i].vertex(0, 0);
      for (let a = -1; a <= 1; a++) {
        pg[i].vertex((r / 2) * cos(ag * a), (r / 2) * sin(ag * a));
      }
      pg[i].endShape(CLOSE);

      if (int(random(2)) == 0) {
        pg[i].fill(255);
      } else {
        pg[i].fill(cp[int(random(cp.length))]);
      }
      pg[i].beginShape();
      pg[i].vertex(0, 0);
      for (let b = 1; b <= 3; b++) {
        pg[i].vertex((r / 2) * cos(ag * b), (r / 2) * sin(ag * b));
      }
      pg[i].endShape(CLOSE);

      if (int(random(2)) == 0) {
        pg[i].fill(255);
      } else {
        pg[i].fill(cp[int(random(cp.length))]);
      }
      pg[i].beginShape();
      pg[i].vertex(0, 0);
      for (let c = 3; c <= 5; c++) {
        pg[i].vertex((r / 2) * cos(ag * c), (r / 2) * sin(ag * c));
      }
      pg[i].endShape(CLOSE);
      pg[i].pop();
    }

    if (int(random(2)) == 0) {
      pg[i].stroke(cp[int(random(cp.length))]);
    } else {
      if (bc == 255) {
        pg[i].stroke(0);
      }
      if (bc == 200) {
        pg[i].stroke(255);
      }
    }

    pg[i].strokeWeight(g / 40);
    pg[i].line(-g / 2, g / 2, -g / 4, g / 4);
    pg[i].line(g / 2, -g / 2, g / 4, -g / 4);
  }

  for (let x = g / 2; x <= w - g / 2; x += g) {
    for (let y = g / 2; y <= w - g / 2; y += g) {
      push();
      translate(x, y);
      let asw = int(random(4));
      if (asw == 0) {
        rotate(0);
      }
      if (asw == 1) {
        rotate(90);
      }
      if (asw == 2) {
        rotate(-90);
      }
      if (asw == 3) {
        rotate(180);
      }
      if (int(random(2)) == 0) {
        scale(-1, 1);
      }

      image(pg[int(random(num))], 0, 0, g, g);
      pop();
    }
  }
	
	let rw = w/10;
	rakkan(rw/2.5, w-rw/1.25, rw);
}

function rakkan(posx, posy, r) {
  push();
  translate(posx, posy);
  let nr = r / 2.5;
  let lr = r / 20;

  fill("#e2041b");
  noStroke();
	rectMode(CENTER);
  rect(0, 0, r / 1.4, r * 1.5, r / 5);

  stroke(255);
  strokeWeight(lr / 1.5);
  noFill();

  push();
  translate(0, -nr);
  beginShape();
  vertex(nr / 2, -nr / 2);
  vertex(0, -nr / 2);
  vertex(-nr / 2, 0);
  vertex(0, nr / 2);
  vertex(nr / 2, nr / 2);
  endShape();

  line(-nr / 2, 0, nr / 2, 0);
  pop();

  push();
  translate(0, 0);
  beginShape();
  vertex(nr / 2, -nr / 2);
  vertex(0, -nr / 2);
  vertex(-nr / 2, 0);
  vertex(0, nr / 2);
  vertex(nr / 2, nr / 2);
  endShape();

  strokeWeight(lr / 3);
  line(nr / 2, -nr / 2, -nr / 2, nr / 2);
  pop();

  push();
  translate(0, nr);
  line(-nr / 2, -nr / 2, -nr / 2, nr / 2);
  line(nr / 2, -nr / 2, nr / 2, nr / 2);
  line(-nr / 2, 0, nr / 2, 0);

  strokeWeight(lr / 3);
  line(nr / 2, -nr / 2, -nr / 2, nr / 2);
  pop();
  pop();
}

function keyPressed() {
  redraw();
}

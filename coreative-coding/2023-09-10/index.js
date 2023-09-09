let w, g;
let num = 10;

function setup() {
	w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textFont("Instrument Serif");
  noLoop();
  g = w / 8;
}

function draw() {
  background(0);

  for (let i = 0; i < num; i++) {
    stroke(random(255));
    strokeWeight(random(1, g / 2));
    noFill();
    ellipse(random(w), random(w), random(g, w), random(g, w));

    push();
    translate(0, random(w));
    let mxt = random(g / 10, g);
    for (let y = -w; y <= w; y += g) {
      push();
      translate(0, y);

      let tg = random(g / 10, mxt);
      for (tx = 0; tx <= w; tx += tg) {
        push();
        translate(tx, random(-tg, tg));
        rotate(random(-20, 20));
        fill(random(255));
        noStroke();
        textSize(random(tg, tg * 2));
        text(
          char(
            random([
              int(random(49, 58)),
              int(random(65, 75)),
              int(random(97, 123)),
            ])
          ),
          0,
          0
        );
        pop();
      }
      pop();
    }
    pop();
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

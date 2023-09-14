// 市松模様
let w, g;
let num = 50;
let cp = [
  "#000",
];
function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  noLoop();
  g = w / 10;
}

function draw() {
  background("silver");

  let i = 0;
  for (let x = 0; x <= w; x += g) {
    for (let y = 0; y <= w; y += g) {
      i++;

      push();
      stroke(random(cp));
      translate(x, y);
      noStroke()
      if (i % 2 == 0) {
        fill("#2b4037");
      } else {
        fill('#249d7b');
        stroke(random(cp)); 
        strokeWeight(2);
        line(0, g, g, g);
        strokeWeight(1);
        line(g, 0, g, g);
      }
      rect(0, 0, g, g);
      pop();
    }
  }
}



function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "myCanvas", "jpg");
}
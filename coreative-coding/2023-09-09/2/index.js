let w, g;
let num = 10;
let cp = ["#fff", "#000"];
let display_char = [27578, 12377];
// let display_char = [22909, 12365]
function setup() {
  console.log(unchar("殺"));
  console.log(unchar("す"));

  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  // textFont("Instrument Serif");
  // textFont(loadFont("./mini-wakuwaku-maru.otf"),[console.log("font loaded")]);
  noLoop();
  g = w / 8;
}

function draw() {
  background(0);

  // 行列をずらして描画
  for (let i = 0; i < num; i++) {
    push();
    translate(0, random(w));
    let mxt = random(g / 10, g);

    //　行列を作成
    for (let y = -w; y <= w; y += g) {
      push();
      translate(0, y);
      let tg = random(g / 10, mxt);

      for (tx = 0; tx <= w; tx += tg) {
        push();
        translate(tx, random(tg, tg));
        rotate(random(-20, 20));
        fill(random(255));
        noStroke();
        textSize(random(tg, tg * 2));
        text(char(random([int(random(display_char))])), 0, 0);
        pop();
      }
      pop();
    }
    pop();

  }


  // push();
  // translate(w / 2, w / 2);
  // let r = random(w / 2, w / 2);
  // let c = random(cp);
  // fill(c);
  // noStroke();
  // textSize(r);
  // rotate(random(-20, 20));
  // text(char(display_char[0]), 0 - r / 2, 0);
  // text(char(display_char[1]), 0 + r / 2, 0);
  // pop();
}

function keyPressed() {
  if (key == "s") saveCanvas("sketch-2023-09-10");
  redraw();
}

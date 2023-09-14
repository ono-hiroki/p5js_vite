
let num = 20;
let w, g;
let colorPicker = ["#334C5A", "#1AB6B1", "#F8CE53", "#EA8D49", "#E44648"];
let pg = [];

function setup() {
  w = min(windowWidth, windowHeight);
let canvas =   createCanvas(w, w);
  angleMode(DEGREES);
  imageMode(CENTER);
  noLoop();

  g = w / 4;
}

function draw() {
  background(255);


  for (let i = 0; i < num; i++) {
   createGraphic(pg, i);
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

}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, 'myCanvas', 'jpg');
}

const randomColorPicker = () => {
    return colorPicker[int(random(colorPicker.length))];
}

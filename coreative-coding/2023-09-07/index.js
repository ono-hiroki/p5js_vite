let num = 1;
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
  let quarterG = g / 4;

  for (let x = harfG; x <= w - harfG; x += g) {
    for (let y = harfG; y <= w - harfG; y += g) {
      push();
      translate(x, y);

      let asw = int(1);
      console.log(asw);
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
      
      // if (int(random(2)) == 0) {
      //   scale(-1, 1);
      // }

      let randomZeroToNum = int(random(num));
      let leftTop = { x: 0, y: 0 };
      let graqhicWidth = { width: g, height: g };
      image(
        page[randomZeroToNum],
        leftTop.x,
        leftTop.y,
        graqhicWidth.x,
        graqhicWidth.y
      );
      console.log(int(random(num)));
      pop();
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(canvas, "myCanvas", "jpg");
}

const randomColorPicker = () => {
  return colorPicker[int(random(colorPicker.length))];
};

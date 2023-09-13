// let palette = ["#C91A09", "#237841", "#42C0FB", "#FFF03A", "#FE8A18"];
let url = "https://coolors.co/palette/ccd5ae-e9edc9-fefae0-faedcd-d4a373";
let palette = url
  .replace("https://coolors.co/", "")
  .split("-")
  .map((c) => "#" + c);
let num = 5;


function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
}

function draw() {
  background(255);

  textSize(20);
  text("破線", 30, height * 0.2-15);
  drawingContext.setLineDash([20, 20]);
  line(30, height * 0.2, width - 30, height * 0.2);

  textSize(20);
  text("一点鎖線", 30, height * 0.4-15);
  drawingContext.setLineDash([50, 20, 5, 20]);
  line(30, height * 0.4, width - 30, height * 0.4);

  textSize(20);
  text("実線", 30, height * 0.6-15);
  drawingContext.setLineDash([1, 0]);
  line(30, height * 0.6, width - 30, height * 0.6);

  textSize(20);
  text("点線", 30, height * 0.8-15);
  strokeWeight(5);
  strokeCap(ROUND);
  drawingContext.setLineDash([1, 50]);
  line(30, height * 0.8, width - 30, height * 0.8);
}

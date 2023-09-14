let url = "https://coolors.co/palette/8ecae6-219ebc-023047-ffb703-fb8500";
let palette = url
  .replace("https://coolors.co/", "")
  .split("-")
  .map((c) => "#" + c);
let w;
let theta;
let STEP;
function setup() {
  theta = 0;
  STEP = 2 * PI * 0.01;
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
}
function draw() {
  translate(width / 2, height / 2); //描画ウィンドウの中心に移動
  line(
    rad(theta) * cos(theta),
    rad(theta) * sin(theta),
    rad(theta + STEP) * cos(theta + STEP),
    rad(theta + STEP) * sin(theta + STEP)
  );
  theta += STEP;
}
function rad(t) {
  //動径を定める関数
  // let r = 5 * t; //アルキメデスらせん
  let r = 20 * sqrt(t); //フェルマーらせん
  // let r = pow(1.1, t); //対数らせん
  return r;
}

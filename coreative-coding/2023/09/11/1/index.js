// TODO リファクタ
let canvas;

const n = 80; //40
const w = n * 3; //120;
const h = n * 1.25; //50;
const num = 25;
let pg;

function preload() {
  pg = createGraphics(w, h);
}

function setup() {
  canvas = createCanvas(600, 400);
  frameRate(13);
  noStroke();
  // pg.loadPixels();
  // frameRate(10);
// noLoop()
}

function draw() {

  // 時間を取得
  // let h = hour();
  // let m = minute();
  // let s = second();
  // let time = h + ":" + m + ":" + s;
  background(220);

  push();
  pg.fill(22);
  pg.noStroke();
  pg.textSize(n);
  pg.text(`19:58`, 0, n);
  pop()


  let x = width / 2 - w / 2; // pを中心にしたときの左上の座標
  let y = height / 2 - h / 2; // pを中心にしたときの左上の座標
  translate(x, y);

  let switching;

  for (let i = 0; i < num; i++) {
    let t = w / num; // grapihcsの高さをnumで割った値
    t = h / num;
    // (x, y, w, h) x,y座標の位置からw,hの大きさで画像を取得
    let img = pg.get(i * t, 0, 5, pg.height);
    img = pg.get(0, i * t, pg.width, 5);
    // image(img, 0, 0); // imgを(0, 0)の位置に表示
    // image(img, random(-5, 5), i * t);
    image(img, i * t, 86 + random(-10, 10));
    image(img, random(-5,5), i * t);
  }

  
  
}

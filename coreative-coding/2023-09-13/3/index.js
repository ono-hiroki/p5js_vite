// let palette = ["#C91A09", "#237841", "#42C0FB", "#FFF03A", "#FE8A18"];
let url = 'https://coolors.co/palette/ccd5ae-e9edc9-fefae0-faedcd-d4a373';
let palette = url.replace('https://coolors.co/', '').split('-').map(c => '#' + c);
let num = 10;
let size = 8;
let step = size * 4;
let colorArr = [];
let sizeArr = [];
let vmin;

function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w, WEBGL);
  // debugMode();
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 2000);
  for (let i = 0; i < num * num; i++) {
    colorArr.push(random(palette));
    sizeArr.push(size * floor(random(1, 5)));
  }
}

function draw() {
  clear();
  background(255);
  ambientLight(170); // 環境光
  directionalLight(200, 200, 200, 1, -1, -1); // 右上奥からの光
  camera(200,200,200);
  rotateY(PI/3);
  // orbitControl();
  noStroke();
  // LEGOを描く
  for (let i = 0; i < num; i++) {
    let z = i * step;
    let pz = (i - num / 2 + 0.5) * step; // マスの中心の位置
    for (let j = 0; j < num; j++) {
      let px = (j - num / 2 + 0.5) * step;
      let s = map(noise(px * 0.003+ frameCount * 0.001, pz * 0.003+ frameCount * 0.001), 0.3, 1, 0.1, 10, true); // ノイズを使ってサイズを変化させる 0.3~1を0.1~10に変換
      if (s < 1) continue;
      let idx = i * num + j;
      fill(colorArr[idx]);
      drowLEGO(step, s, { x: px, z: pz });
    }
  }
}
const randomOneToTen = (x,z) => {
  let nx = x * 0.003 + frameCount * 0.001;
  let nz = z * 0.003 + frameCount * 0.001;
  let s = map(noise(nx, nz), 0.3, 1, 0.1, 10, true); // ノイズを使ってサイズを変化させる 0.3~1を0.1~10に変換
  s = floor(s * 4) / 4;
  return s;
};

const drowLEGO = (XZSize, heightScale, pos) => {
  // heightはxzの大きさに対して何倍か
  let PointYPos = (XZSize * heightScale) / 2; // ポイントのY座標　めり込ん出る
  let BoxYPos = XZSize * heightScale;
  let BQuad = XZSize / 4;
  push();
  {
    translate(pos.x, PointYPos, pos.z);
    _drowPoint(-BQuad, PointYPos, -BQuad, XZSize);
    _drowPoint(BQuad, PointYPos, -BQuad, XZSize);
    _drowPoint(BQuad, PointYPos, BQuad, XZSize);
    _drowPoint(-BQuad, PointYPos, BQuad, XZSize);
    _drowBox({ x: 0, y: 0, z: 0 }, { x: XZSize, y: BoxYPos, z: XZSize });
  }
  pop();
};

function _drowPoint(x, y, z, scaleSize) {
  push();
  {
    translate(x, y, z);
    scale(scaleSize);
    cylinder(0.15, 0.2);
  }
  pop();
}
const _drowBox = (pos, size) => {
  push();
  {
    translate(pos.x, pos.y, pos.z);
    scale(size.x, size.y, size.z);
    box(1);
  }
  pop();
};

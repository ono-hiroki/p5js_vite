function drawCircle(pos, r) {
  push();
  translate(pos.x, pos.y);
  rotate(random(TAU));
  scale(random([-1, 1]), 1);

  let lr = random(1, r / 10);
  strokeWeight(lr);
  noFill();

  let zn = random(1);
  let max_i = random([PI, TAU + 0.1]);
  beginShape();
  for (let i = 0; i <= max_i; i += 0.1) {
    let xn = map(cos(i), -1, 1, 0, 1); // 線形補間 -1~1を0~1に変換
    let yn = map(sin(i), -1, 1, 0, 1);
    let vr = map(noise(xn, yn, zn), 0, 1, r / 2, r); // ノイズを使って半径を変化させる
    vertex(vr * cos(i), vr * sin(i));
  }
  endShape();

  // 一回り小さい円を描く
  let nr = r * 0.9;
  beginShape();
  for (let i = 0; i <= max_i; i += 0.1) {
    let xn = map(cos(i), -1, 1, 0, 1);
    let yn = map(sin(i), -1, 1, 0, 1);
    let vr = map(noise(xn, yn, zn), 0, 1, nr / 2, nr);
    vertex(vr * cos(i), vr * sin(i));
  }
  endShape();

  pop();
}


function drowPoint(g, mxer) {
  let sq = sqrt(random(1)); // 0 ~ 1
  let angle = random(TAU); // 0 ~ TAU

  // 背景の四角形の一辺はg
  // その中に円を描く
  // 最大半径はg/2
  let dotPosRX = (sq * g) / 1.8;
  let dotPosRY = (sq * g) / 1.8;

  let x = dotPosRX * cos(angle); // 0 ~ nr/1.5
  let y = dotPosRY * sin(angle);
  let r = random(1, mxer);
  ellipse(x, y, r);
}

const randomomeTowColor = () => {
  let c1 = random(cp);
  let c2 = random(cp);
  while (c1 == c2) {
    c2 = random(cp);
  }
  return [c1, c2];
};

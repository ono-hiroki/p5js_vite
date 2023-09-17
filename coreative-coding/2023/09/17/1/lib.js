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
  angleMode(RADIANS);
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


function drawSakura(ox, oy, or) {
  push();
  angleMode(RADIANS);
  strokeWeight(0.1);
  translate(ox, oy);
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let B = (sin(theta * 5) + cos(theta * 10)) / 2.0;
    let A = B * 0.5 + 1.0;
    let R = or * A;

    let x = R * sin(theta + 90);
    let y = R * cos(theta + 90);

    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function drawSakura2(ox, oy, or) {
  push();
  translate(ox, oy);
  // noStroke();
  strokeWeight(0.1);
  angleMode(RADIANS);
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let B = sin(theta);
    let A = B * 0.5 + 1.0;
    let C = cos(theta);
    let R = or;

    let x = R * sin(theta + C);
    let y = R * cos(theta + C);

    vertex(x, y);
  }
  endShape(CLOSE);

  pop();
}

function drawSakura3(ox, oy, or) {
  push();
  translate(ox, oy);
  noFill();
  strokeWeight(0.3);
  angleMode(RADIANS);
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let A = sin(theta * 4);
    let x = or * A * sin(theta);
    let y = or * A * cos(theta);

    vertex(x, y);
  }
  endShape(CLOSE);

  pop();
}


function drawSakura4(ox, oy, or) {
  push();
  strokeWeight(0.3);
  translate(ox, oy);
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let t1 = 1;
    let t2 = 4; // 花びらの数
    let h2 = 0.5;
    let r1 = theta * t1;
    let r2 = theta * t2;

    let b = (sin(r2) + cos(r2 * 2)) / 2.0;
    let a = b * h2 + 1.0;
    let x = or * a * sin(theta);
    let y = or * a * cos(r1);

    vertex(x, y);
  }
  endShape(CLOSE);

  pop();
}
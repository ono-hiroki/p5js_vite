const randomColorPicker = () => {
  return colorPicker[int(random(colorPicker.length))];
};

const createRandomGraphics = (i, graqhicWidth) => {
  let pg;
  // 画面1/16の大きさのキャンバスを作成 一辺がgで1/4だから1/16
  pg = createGraphics(g, g);

  // 角度を度数法に設定
  pg.angleMode(DEGREES);
  // 背景の色をランダムに設定
  pg.background(random(200, 255));

  bc = random(100, 255);
  pg.translate(g / 2, g / 2);

  let r = g / 2;

  pg.stroke(randomColorPicker());
  // 先の結合部分をズバッとさせる
  pg.strokeJoin(BEVEL);
  pg.fill(255);
  pg.strokeWeight(g / random(50, 100));

  const harf = graqhicWidth / 2;
  const quarter = graqhicWidth / 4;
  pg.line(-harf, harf, -quarter, quarter);
  pg.line(harf, -harf, quarter, -quarter);


  for (let pos = -g; pos <= g; pos += g / 8) {
    pg.push();
    pg.translate(pos, pos);
    pg.rotate(-90);
    _drowBox(pg,r,60);
    pg.pop();

  }


  return pg;
};

const randomScaleReverse = (n) => {
  if (n == 0) {
    scale(-1, 1);
  }
};

const randomRotate = (asw) => {
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
}

const randomImageDrow = (pg, num ,leftTop, graqhicWidth) => {
  let randomZeroToNum = int(random(num));
  image(
    page[randomZeroToNum],
    leftTop.x,
    leftTop.y,
    graqhicWidth.x,
    graqhicWidth.y
  );
}


const _drowBox = (pg,r) => {
  let ag = 60;
  let vertex = r/2;
  // 単位円上にag°ずつstartからendまで頂点を打つ
  _drowRhombus(pg, vertex, ag, -1, 1);
  _drowRhombus(pg, vertex, ag, 1, 3);
  _drowRhombus(pg, vertex, ag, 3, 5);
}

const _randomColorOrWhiteFill = (pg) => {
  if (int(random(2)) == 0) {
    pg.fill(255);
  } else {
    pg.fill(randomColorPicker());
  }
}

const _drowRhombus = (pg, vertex, ag, start, end  ) => {
  _randomColorOrWhiteFill(pg);
  pg.beginShape();
  pg.vertex(0, 0);
  for (let i = start; i <= end; i++) {
    pg.vertex(vertex * cos(ag * i), vertex * sin(ag * i));
  }
  pg.endShape(CLOSE);
}
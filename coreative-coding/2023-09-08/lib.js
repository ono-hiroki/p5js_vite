const createRandomGraphics = (i,graqhicWidth) => {
  let pg;
  // 画面1/16の大きさのキャンバスを作成 一辺がgで1/4だから1/16
  pg = createGraphics(g, g);

  // 角度を度数法に設定
  pg.angleMode(DEGREES);
  // 背景の色をランダムに設定
  pg.background(random(150, 255));

  bc = random(100, 255);
  pg.translate(g / 2, g / 2);

  let r = g / 2;
  let ag = 360 / 6; // 60度
  pg.stroke(randomColorPicker());
  // 先の結合部分をズバッとさせる
  pg.strokeJoin(BEVEL);
  pg.fill(255);

  pg.strokeWeight(g / random(40));

  const harf = graqhicWidth / 2;
  const quarter = graqhicWidth / 4;
  pg.line(-harf, harf, -quarter, quarter);
  pg.line(harf, -harf, quarter, -quarter);
  
  // 中央に円を描く
  pg.circle(0, 0, g / 16);

  return pg;
};

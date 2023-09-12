setup = (_) => {
  createCanvas((W = 800), W, WEBGL);
  background`#つぶやきProcessing`;
  noStroke(fill`#0ea`);
  for (j = 16; j--; endShape())
    for (beginShape(), x = j % 4, y = ~~(j / 4), i = 11; i--; )
      x && x < 3 && y && y < 3
        ? 0
        : ((r = 99 - (i % 2) * 99 * (0.25 + sin(2.93) * 3)),
          curveVertex(
            x * 99 + cos((a = (i * PI) / 4)) * r - 148,
            y * 99 + sin(a) * r - 148
          ));
  circle(0, 0, 99);
};

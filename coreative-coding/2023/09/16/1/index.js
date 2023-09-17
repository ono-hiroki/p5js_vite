
const sketch = function (_) {
  let num = 8;
  let switching = false;
  let canvas;

  function lineShape(x, y, r, nw) {
    for (let i = 0; i < _.width; i += 5) {
      const h = _.random(5, 100);
      const parin = _.noise(0.01 * i) * h;
      const xx = i;
      _.beginShape();
      for (let j = 0; j < _.height; j += 10) {
        const yy = j + parin;

        const a = x - xx;
        const b = y - yy;
        const c = _.sqrt(a * a + b * b);
        if (c <= r) {
          _.vertex(xx, yy);
          //_.point(xx, yy);
        } else if (x < xx && y < yy && xx < x + nw && yy < y + nw) {
          // ここの記述がミスってて円からはみ出してる
          _.vertex(xx, yy);
          //_.rect(xx, yy, 10, 10);
        }
      }
      _.endShape(_.CLOSE);
    }
    _.push();
    _.circle(x, y, r * 2);
    _.pop();
  }

  _.setup = function () {
    canvas = _.createCanvas(600, 600);
    _.background(220);
    _.frameRate(24);
    _.noFill();
    _.strokeWeight(2);

    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        num-=0.1;
        const x = _.width / num * i;
        const y = _.height / num * j;
        const circle_random = parseInt(_.random(0, 4));
        if (circle_random === 0) {
          _.circle(x + _.width / num / 2, y + _.height / num / 2, _.width / num);
        } else if (circle_random === 1) {
          _.push();
          _.fill(0);
          _.circle(x + _.width / num / 2, y + _.height / num / 2, _.width / num);
          _.pop();
        } else if (circle_random === 2) {
          lineShape(x + _.width / num / 2, y + _.height / num / 2, _.width / num / 2, _.width / num);
        } else {
          _.rect(x, y, _.width / num, _.height / num);
        }
      }
    }

  };

  let count = 0;
  _.draw = function () {
    _.translate(_.width / 2, _.height / 2);
    // _.background(0, 10);

    if (count < 100 && !switching) {
      count += 1;
    } else if (count - 1 < 0) {
      switching = false;
      count += 1;
    } else {
      switching = true;
      count -= 1;
    }
  };

  _.keyPressed = function () {
    if (_.key === 's') {
      _.saveCanvas(canvas, 'myCanvas', 'png');
      //_.saveGif('p5js_rotate', 4);
    }
  };
};

new p5(sketch);

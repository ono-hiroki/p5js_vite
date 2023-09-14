let num = 50;
let cp = ["#C35C50", "#FBB55E", "#A3B24C", "#472C2B", "#171E34"];
let w;

function setup() {
    w = min(windowWidth, windowHeight);
    createCanvas(w, w);
    // 角度を度数法に設定 ex 30度
    angleMode(DEGREES);
    // 線の端を丸くする
    strokeCap(ROUND);
    // (x, y)を中心にして、幅w、高さhの矩形を描画する rect(x, y, w, h)
    rectMode(CENTER);
    // ループを停止する
    noLoop();
}

function draw() {
    background(0);

    for (let i = 0; i < 1; i++) {
        // 現在の描画スタイル設定と変換を保存
        push();
        // 筆の位置を(x, y)に移動する
        translate(random(-w / 4, w + w / 4), random(-w / 4, w + w / 4));
        // 筆の角度をa度に設定する
        rotate(random(360));
        // 大きさをランダムに設定する
        scale(random([-1, 1]), 1);

        let r = random(w / 8, w / 2);
        let ag = 360 / 3;
        let bg = random([2, 5]);

        let c = random(cp);

        strokeWeight(random(1, r / 40));
        noFill();
        stroke(c);
        beginShape();
        for (let a = 0; a <= 360; a += ag) {
            vertex((r / 2) * cos(a), (r / 2) * sin(a));
        }
        endShape(CLOSE);

        push();
        rotate(random(360));
        fill(c);
        noStroke();
        let rr = r / 2.5;
        rect(
            0,
            0,
            rr,
            rr,
            random(rr / 2),
            random(rr / 2),
            random(rr / 2),
            random(rr / 2)
        );
        pop();

        let sw = int(random(2));

        if (sw == 0) {
            stroke(random(255));
        }
        strokeWeight(r / 200);
        for (let a = 0; a <= 360; a += ag) {
            for (let b = 45; b <= 45 + ag / 1.65; b += bg) {
                let nr = map(b, 45, 45 + ag / 1.65, r * 1.5, r / 2);
                if (sw == 0) {
                    line(
                        (r / 2) * cos(a),
                        (r / 2) * sin(a),
                        nr * cos(a + b),
                        nr * sin(a + b)
                    );
                }

                if (sw == 1) {
                    if (int(random(2)) == 0) {
                        stroke(random(cp));
                        line(
                            (r / 2) * cos(a),
                            (r / 2) * sin(a),
                            nr * cos(a + b),
                            nr * sin(a + b)
                        );
                    }
                }
            }
        }
        pop();
    }

    blendMode(OVERLAY);

    for (let j = 0; j < 20; j++) {
        push();
        translate(random(w), random(w));
        rotate(random(360));
        let xn = random(-w, w);
        let yn = random(-w, w);
        let cc = color(random([0, 255, random(cp)]));
        let lr = random(1, w / 80);
        stroke(cc);

        strokeWeight(lr);
        drawingContext.setLineDash([1, lr * 2]);
        noFill();

        beginShape();
        for (let k = 0; k < 1000; k++) {
            let cx = map(noise(xn), 0, 1, -w, w);
            let cy = map(noise(yn), 0, 1, -w, w);
            xn += 0.005;
            yn += 0.005;
            vertex(cx, cy);
        }
        endShape();
        pop();
    }

    let rw = w/10;
    rakkan(rw/2.5, w-rw/1.25, rw);
}

function rakkan(posx, posy, r) {
    push();
    translate(posx, posy);
    let nr = r / 2.5;
    let lr = r / 20;

    fill("#e2041b");
    noStroke();
    rectMode(CENTER);
    rect(0, 0, r / 1.4, r * 1.5, r / 5);

    stroke(255);
    strokeWeight(lr / 1.5);
    noFill();

    push();
    translate(0, -nr);
    beginShape();
    vertex(nr / 2, -nr / 2);
    vertex(0, -nr / 2);
    vertex(-nr / 2, 0);
    vertex(0, nr / 2);
    vertex(nr / 2, nr / 2);
    endShape();

    line(-nr / 2, 0, nr / 2, 0);
    pop();

    push();
    translate(0, 0);
    beginShape();
    vertex(nr / 2, -nr / 2);
    vertex(0, -nr / 2);
    vertex(-nr / 2, 0);
    vertex(0, nr / 2);
    vertex(nr / 2, nr / 2);
    endShape();

    strokeWeight(lr / 3);
    line(nr / 2, -nr / 2, -nr / 2, nr / 2);
    pop();

    push();
    translate(0, nr);
    line(-nr / 2, -nr / 2, -nr / 2, nr / 2);
    line(nr / 2, -nr / 2, nr / 2, nr / 2);
    line(-nr / 2, 0, nr / 2, 0);

    strokeWeight(lr / 3);
    line(nr / 2, -nr / 2, -nr / 2, nr / 2);
    pop();
    pop();
}

function keyPressed() {
    blendMode(BLEND);
    redraw();
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    w = max(width, height)
    colorMode(HSB);

    let sel_hue = random(360)

    pos = [];
    for (let i = 0; i < 150; i++) {
        pos.push({
            x: random(w),
            y: random(w),
            size: random(w * 0.1),
            speed: random(-1, 1) * w * 0.005,
            color: color(sel_hue, random(100), 100)
        })
    }
    noFill();
    frameRate(24);

    img = createGraphics(w, w);
    img.colorMode(HSB);
    img.background(100);

    for (let i = 0; i < w; i++) {
        img.stroke(100 / w * i);
        img.line(i, 0, i, w);
    }

    img.erase();
    for (let i = 0; i < 30; i++) {
        let wight = random(w * 0.01, w * 0.1)
        img.strokeWeight(wight);

        let ix = random(w * 0.75);
        let iy = random(w);

        if(random()<0.5){
            for (let x = 0; x < ix; x++) {
                let y = sin(x / ix * PI) * wight / 2
                img.circle(x, iy + y, wight/4)
            }
        } else{
            for (let x = 0; x < ix; x++) {
                let y = sin(x / ix * PI) * wight / 2
                img.circle(w-x, iy + y, wight/4)
            }

        }
    }
    img.noErase();
}

function draw() {
    background(0);

    for (let p of pos) {
        stroke(p.color);
        p.y += p.speed;
        ellipse(p.x, p.y, p.size);
        if (p.y < -w * 0.05) {
            p.y = w * 1.05;
        }
        if (p.y > w * 1.05) {
            p.y = -w * 0.05;
        }
    }

    image(img, 0, 0);
}











// by SamuelYAN
// more works //
// https://twitter.com/SamuelAnn0924
// https://www.instagram.com/samuel_yan_1990/

var seed = Math.random() * 3987;
var particles = [];
var mySize, margin;
var parNum;

let colors8 = "f7f6cf-b6d8f2-f4cfdf-9ac8eb-ccd4bf-e7cba9-eebab2-f5f3f7-f5e2e4-f4c815-f9cad7-A57283-c1d5de-deede6-AAD9CD-E8D595-E9BBB5-E7CBA9-8DA47E".split("-").map((a) => "#" + a);
let colors81 = "8c75ff-c553d2-2dfd60-2788f5-23054f-f21252-8834f1-c4dd92-184fd3-f9fee2-2E294E-541388-F1E9DA-FFD400-D90368-e9baaa-ffa07a-164555-ffe1d0-acd9e7-4596c7-6d8370-e45240-21d3a4-3303f9-cd2220-173df6-244ca8-a00360-b31016".split("-").map((a) => "#" + a);
let color_sel1, color_sel2;

let graphic_1;
let row, col;


function setup() {
    mySize = max(windowWidth, windowHeight);
    createCanvas(mySize, mySize);
    graphic_1 = createGraphics(width, height);
    colorMode(RGB, 255, 255, 255, 100);
    background(random(colors81));

    row = int(random(3, 8));
    col = int(random(3, 8));
    console.log(row, col)

    loadParticles(1 * width / row, 1 * height / col, random(colors8), random(colors81));

    for (let i = 0; i < row + 1; i++) {
        for (let j = 0; j < col + 1; j++) {
            loadParticles(i * width / row, j * height / col, random(colors8), random(colors81));
        }
    }
    // makeFilter();
}

function draw() {

    for (let i = particles.length - 1; i > 0; i--) {
        if (i < particles.length) {
            particles[i].update();
            particles[i].show(graphic_1);
            if (particles[i].finished()) {
                particles.splice(i, 1);
            }
        }
    }

    image(graphic_1, 0, 0);

    if (frameCount > 200) {
        noLoop();
        blendMode(BLEND);
        strokeWeight(random(0.1, 0.5));
        stroke(str(random(colors81)) + "0d");
        noFill();
        drawingContext.setLineDash([1, 2, 1, 3, 2, 1, 2, 4]);
        drawOverPattern();

        //frame
        drawingContext.setLineDash([]);
        noFill();
        stroke("#202020");
        strokeWeight(mySize / 100);
        rect(0, 0, width, height);
    }
}

function loadParticles(x, y, color_sel1, color_sel2) {
    parNum = int(random(200, 400));
    this.x = x;
    this.y = y


    for (let i = 0; i < parNum; i++) {
        let rr = random(3, 6) * 1;
        let gard_w = random(mySize / 0.15, mySize / 0.25) / 1;
        let gard_h = random(mySize / 0.25, mySize / 0.15) / 1;
        let r = (1 - sqrt(random(random(random())))) * (random(1, 2) * random(gard_w, gard_h) / random(16, 8));
        let angle = random(TWO_PI);
        let x = cos(angle) * r;
        let y = sin(angle) * r;

        let xx = width / 2 + x + i;
        let yy = height / 2 + y + i;

        // width / 2 + x - (i + frameCount / random(1, 20)) * width / random(300, 100) / random(rr, rr)
        //height / 2 + y + tan(i + frameCount / random(100, 1)) * height / random(100, 300) / random(rr, rr)
        particles.push(
            new Particle(
                xx,
                yy,
                color_sel1,
                color_sel2
            ),
        )
    }

}

function Particle(x, y, color_sel1, color_sel2) {
    this.x = x;
    this.y = y;
    this.pos = createVector(this.x, this.y);
    this.vel = createVector(tan(random(-1, 1) + random(-0.1, 0.1)) * 0.1, sin(random(0.75, 1.5) + 1 * random(0.1, -0.1)) * 0.1);
    this.acc = createVector(random(2.5, 3.5) * random(-0.025, 0.025), random(2.5, 3.5) * random(-0.025, 0.025));
    this.alpha2 = 100;
    this.r = random(height / 2000) * random(8, 4);
    // this.r = 0;
    this.color1 = color_sel1;
    this.color2 = color_sel2;
    this.grad = 0;
    this.offset = random(2.0, 5.0);

    this.update = function () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.alpha2 -= random(1) / random(1.25, 4);
        if (this.r > 0.1) {
            this.r -= 0.0699;
        } else {
            this.r = random(0.05, 0.12);
        }
    };

    this.show = function (p) {
        p.noFill();
        p.stroke(0);
        p.push();
        p.translate(this.pos.x + sin(frameCount / 10), this.pos.y + cos(frameCount / 10));

        this.grad = drawingContext
            .createRadialGradient(
                random(-this.offset, this.offset),
                random(-this.offset, this.offset),
                0,
                random(-this.offset, this.offset), random(-this.offset, this.offset), this.r
            );
        this.grad.addColorStop(0.25, this.color1);
        this.grad.addColorStop(0.85, this.color2);

        p.drawingContext.strokeStyle = this.grad;
        p.drawingContext.shadowColor = this.color1;
        p.drawingContext.shadowOffsetX = 1;
        p.drawingContext.shadowOffsetY = 1;
        p.drawingContext.shadowBlur = 0;

        p.rectMode(CENTER);
        p.square(0, 0, this.r);


        p.pop();
    };

    this.finished = function () {
        return this.alpha2 < 10;
    };
}

function keyTyped() {
    if (key === "s" || key === "S") {
        saveCanvas("0526_untitled_2023", "png");
    }
}

//filter
function makeFilter() {
    let filterNum = int(Math.random() * 1982);
    randomSeed(seed);

    // noiseのフィルターをつくる
    colorMode(HSB, 360, 100, 100, 100);
    drawingContext.shadowColor = color(0, 0, 5, 1);
    overAllTexture = createGraphics(width, height);
    overAllTexture.loadPixels();
    for (var i = 0; i < width; i += 2) {
        // noprotect
        for (var j = 0; j < height; j += 2) {
            if (filterNum % 4 == 0) {
                overAllTexture.set( // noprotect
                    i,
                    j,
                    color(random(60), 5, 95, noise(i / 3, j / 3, (i * j) / 50) * 12) // noprotect
                ); // white
            } else if (filterNum % 4 == 1) {
                overAllTexture.set( // noprotect
                    i,
                    j,
                    color(221, 100, 28, noise(i / 3, j / 3, (i * j) / 50) * 12) // noprotect
                ); // dark blue
            } else if (filterNum % 4 == 2) {
                overAllTexture.set( // noprotect
                    i,
                    j,
                    color(random(268, 273), 100, 32, noise(i / 3, j / 3, (i * j) / 50) * 12) // noprotect
                ); // purple
            } else if (filterNum % 4 == 3) {
                overAllTexture.set( // noprotect
                    i,
                    j,
                    color(random(10, 210), 10, 86, noise(i / 3, j / 3, (i * j) / 50) * 12 // noprotect
                    )
                );
            }
        }
    }
    overAllTexture.updatePixels();
}

function drawOverPattern() {
    push();
    translate(width / 2, height / 2);
    //rotate(-PI / 2);
    let s = max(width, height) / 1 * sqrt(3) - 2;
    let n = 6;
    for (let theta = TWO_PI / 6; theta < TWO_PI; theta += TWO_PI / 6) { // noprotect
        divideOP(0, 0, s * cos(theta), s * sin(theta), s * cos(theta + TWO_PI / 6), s * sin(theta + TWO_PI / 6), n);
    }
    pop();
}

function prop(x1, y1, x2, y2, k) {
    let x3 = (1 - k) * x1 + k * x2;
    let y3 = (1 - k) * y1 + k * y2;
    return [x3, y3];
}

function divideOP(x1, y1, x2, y2, x3, y3, n) {
    if (n > 1) {
        let [xA, yA] = prop(x1, y1, x2, y2, 1 / 3);
        let [xB, yB] = prop(x1, y1, x2, y2, 2 / 3);
        let [xC, yC] = prop(x2, y2, x3, y3, 1 / 3);
        let [xD, yD] = prop(x2, y2, x3, y3, 2 / 3);
        let [xE, yE] = prop(x3, y3, x1, y1, 1 / 3);
        let [xF, yF] = prop(x3, y3, x1, y1, 2 / 3);
        let [xG, yG] = prop(xF, yF, xC, yC, 1 / 2);
        divideOP(x1, y1, xA, yA, xF, yF, n - 1);
        divideOP(xA, yA, xB, yB, xG, yG, n - 1);
        divideOP(xB, yB, x2, y2, xC, yC, n - 1);
        divideOP(xG, yG, xF, yF, xA, yA, n - 1);
        divideOP(xC, yC, xG, yG, xB, yB, n - 1);
        divideOP(xF, yF, xG, yG, xE, yE, n - 1);
        divideOP(xG, yG, xC, yC, xD, yD, n - 1);
        divideOP(xD, yD, xE, yE, xG, yG, n - 1);
        divideOP(xE, yE, xD, yD, x3, y3, n - 1);
    } else {
        makeTriangle([x1, y1], [x2, y2], [x3, y3]);
    }
}

function makeTriangle(v1, v2, v3) {
    let points = shuffle([v1, v2, v3]);
    let [x1, y1] = points[0];
    let [x2, y2] = points[1];
    let [x3, y3] = points[2];
    let iStep = 1 / (pow(2, floor(random(4, 2))));
    for (let i = 0; i < 1; i += iStep) { // noprotect
        let [x4, y4] = prop(x1, y1, x2, y2, 1 - i);
        let [x5, y5] = prop(x1, y1, x3, y3, 1 - i);
        triangle(x1, y1, x4, y4, x5, y5);
    }
}

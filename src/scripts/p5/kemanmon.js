"use strict"

const KEMANMON_COLORS = ["#348888", "#22BABB", "#9EF8EE", "#FA7F08", "#F24405"];
const WHITE = "#f5efef";
const BLACK = "#333333";

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    rectMode(CENTER);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(14);
    noLoop();
}

function draw() {
    background(WHITE);
    noFill();
    noStroke();

    let KemanmonRadius = 60;
    const pX = KemanmonRadius * 3;
    const pY = KemanmonRadius * 3;
    const rows = floor(height / pY) + 2;
    const cols = floor(width / pX) + 2;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let x = floor(c * pX);
            let y = floor(r * pY);
            if (r % 2 === 0) x += pX / 2;
            drawKemanmon(x, y, KemanmonRadius, 6);
        }
    }
}


function drawKemanmon(x, y, KemanmonRadius, total) {

    fill(getColor(KEMANMON_COLORS));
    noStroke();

    const positionDeg = 360 / total;
    const MoonDeg = positionDeg / 1.5;
    const moonRadius = KemanmonRadius / 2;

    for (let i = 0; i < total; i++) {
        drawMoon(x, y, moonRadius, MoonDeg, i * positionDeg);
    }
}

function drawMoon(x, y, rad, oD, rot = 0) {

    push();
    translate(x, y);

    rotate(rot);
    const insideX = rad * cos(-oD) + rad * 0.2;
    const insideY = rad * sin(-oD) + rad * 0.2;
    const outsideX = rad * cos(0) + rad * 0.2;
    const outsideY = rad * sin(0) + rad * 0.2;

    beginShape();
    stroke(BLACK);
    strokeWeight(5);
    dotArc(insideX, insideY, rad, 180 - oD, 180 - oD, false);
    dotArc(outsideX, outsideY, rad, -oD, 180 + oD, true);
    endShape();
    pop();
}

function dotArc(x, y, rad, from, progress, clockwise = true) {
    for (let i = 0; i <= progress; i += 3) {
        const d = clockwise ? from + i : from - i;
        vertex(x + rad * cos(d), y + rad * sin(d));
    }
}

function getColor(colors) {
    return colors[floor(random() * colors.length)];
}
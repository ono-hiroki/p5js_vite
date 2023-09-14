let url = 'https://coolors.co/072ac8-1e96fc-a2d6f9-fcf300-ffc600';
let palette = url.replace('https://coolors.co/', '').split('-').map(c => '#' + c);
CONSOLE
let num = 10;
let size = 10;
let step = size * 4;
let colorArr = [];
let sizeArr = [];
let vmin;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 2000);
  
  vmin = (width < height) ? width : height;
  size = (10 / 600) * vmin;
  step = size * 4;
  
  for (let i = 0; i < num * num; i++) {
    colorArr.push(palette[floor(random(palette.length))]);
    sizeArr.push(size * floor(random(1, 5)));
  }
}

function draw() {
  background(palette[2]);
  
  translate(0, -(100 / 600) * vmin, 0);
  rotateX(PI * 0.15);
  rotateY(PI * 0.25);
  
  ambientLight(160, 160, 160);
  directionalLight(200, 200, 200, 1, -1, -1);
  
  noStroke();
  
  for (let i = 0; i < num; i++) {
    let z = i * step;
    let pz = (i - num / 2 + 0.5) * step;
    for (let j = 0; j < num; j++) {
      let x = j * step;
      let px = (j - num / 2 + 0.5) * step;
      let nx = x * 0.003 + frameCount * 0.001;
      let nz = z * 0.003 + frameCount * 0.001;
      let s = map(noise(nx, nz), 0.3, 1, 0.1, 10, true);
      s = floor(s * 4) / 4;
      if (s < 1) continue;
      let idx = i * num + j;
      let sz = sizeArr[idx];
      fill(colorArr[idx]);
      push();
      {
        translate(px, sz * s / 2, pz);
        
        push();
        {
          translate(-sz / 4, sz * s / 2, -sz / 4);
          scale(sz, sz, sz);
          cylinder(0.15, 0.2);
        }
        pop();
        push();
        {
          translate(sz / 4, sz * s / 2, -sz / 4);
          scale(sz, sz, sz);
          cylinder(0.15, 0.2);
        }
        pop();
        push();
        {
          translate(sz / 4, sz * s / 2, sz / 4);
          scale(sz, sz, sz);
          cylinder(0.15, 0.2);
        }
        pop();
        push();
        {
          translate(-sz / 4, sz * s / 2, sz / 4);
          scale(sz, sz, sz);
          cylinder(0.15, 0.2);
        }
        pop();
        
        scale(sz, sz * s, sz);
        box(1);
      }
      pop();
    }
  }
}
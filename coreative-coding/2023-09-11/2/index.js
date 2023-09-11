
const width = 400;
const tileNumber = 4;

let img;
let tileData = [];

class Tile {
  constructor(x, y, tileWidth, tileHeight) {
    this.x = x;
    this.y = y;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.img = get(this.x, this.y, this.tileWidth, this.tileHeight);
    this.blank = false;
  }

  display() {
    image(this.img, this.x, this.y, this.tileWidth, this.tileHeight);

    if (this.blank) {
      fill(0);
    } else {
      noFill();
    }
    rect(this.x, this.y, this.tileWidth, this.tileHeight);
  }
}

function preload() {
  img = loadImage('puzzle.jpg');
}

function setup() {
  img.resize(width, 0)
  const height = img.height;

  createCanvas(width, height)
  image(img, 0, 0)

  for (let i = 0; i < tileNumber; ++i) {
    tileData[i] = [];
    for (let j = 0; j < tileNumber; ++j) {
      tileData[i][j] = new Tile(i*width/tileNumber, j*height/tileNumber, width/tileNumber, height/tileNumber)
    }
  }

  tileData[tileNumber-1][tileNumber-1].blank = true;
}

function draw() {
  for (let i = 0; i < tileNumber; ++i) {
    for (let j = 0; j < tileNumber; ++j) {
      tileData[i][j].display();
    }
  }
}

function swap(tile1, tile2) {
  const imgTemp = tile2.img;
  tile2.img = tile1.img;
  tile1.img = imgTemp;

  const blankTemp = tile2.blank;
  tile2.blank = tile1.blank;
  tile1.blank = blankTemp;
}

function move(i, j) {
  if (i > 0 && tileData[i-1][j].blank) {
    swap(tileData[i][j], tileData[i-1][j]);
  } else if (i < tileNumber - 1 && tileData[i+1][j].blank) {
    swap(tileData[i][j], tileData[i+1][j]);
  } else if (j > 0 && tileData[i][j-1].blank) {
    swap(tileData[i][j], tileData[i][j-1]);
  } else if (j < tileNumber - 1 && tileData[i][j+1].blank) {
    swap(tileData[i][j], tileData[i][j+1]);
  }
}

function mousePressed() {
  const i = floor(mouseX / (width / tileNumber));
  const j = floor(mouseY / (height / tileNumber));

  if (i < 0 || i >= tileNumber) return;
  if (j < 0 || j >= tileNumber) return;

  move(i,j);
}
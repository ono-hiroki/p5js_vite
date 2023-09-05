function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {

    background("#fefefe");
    noStroke();
    fill("#9FC131");
    for(let i=0; i<width; i++){
        let x = 100 * i;
        let y = 0;
        rect(x, y, 50, height);
    }

}
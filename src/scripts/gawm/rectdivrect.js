import p5 from "p5";

const sketch = (p) => {
    let numA = 10;
    let numB = 6;
    let ratio = numB / numA;

    p.setup = () => {
        p.createCanvas(500, 500);
        p.colorMode(p.HSB, 1);
        //この関数内だけのローカル変数
        let itr = 0;
        let xPos = 0;
        let yPos = 0;
        let wd = p.width * ratio;
        while (wd > 0.1) {
            itr++;
            if (itr % 2 == 1) {
                while (xPos + wd < p.width + 0.1) {
                    divSquare(xPos, yPos, wd, ratio);  //正方形を分割する関数の呼び出し
                    xPos += wd;
                }
                wd = p.width - xPos;
            } else {
                while (yPos + wd < p.width * ratio + 0.1) {
                    divSquare(xPos, yPos, wd, ratio);  //正方形を分割する関数の呼び出し
                    yPos += wd;
                }
                wd = p.width * ratio - yPos;
            }
        }


    };

    p.draw = () => {
    };

    //位置(xPos,yPos)にある1辺がwdの正方形を縦横比がnumA:numBの長方形で分割する
    function divSquare( xPos,  yPos,  wd, ratio){
        //この関数内だけのローカル変数
        let itr = 0;
        let xEndPos = wd + xPos;  //正方形の右下の頂点のx座標
        let yEndPos = wd + yPos;  //正方形の右下の頂点のy座標
        //繰り返し処理
        while (wd > 0.1){
            itr++;
            if (itr % 2 === 1){
                while (xPos + wd * ratio < xEndPos + 0.1){
                    p.fill(p.color(p.random(1), 1, 1));
                    p.rect(xPos, yPos, wd * ratio, wd);
                    xPos += wd * ratio;
                }
                wd = xEndPos - xPos;
            } else {
                while (yPos + wd / ratio < yEndPos + 0.1){
                    p.fill(p.color(p.random(1), 1, 1));
                    p.rect(xPos, yPos, wd, wd / ratio);
                    yPos += wd / ratio;
                }
                wd = yEndPos - yPos;
            }
        }
    }
};

new p5(sketch);
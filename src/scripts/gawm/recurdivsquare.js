// recurdicsquare.js
import p5 from "p5";

const sketch = (p) => {
    let numA = 10;
    let numB = 6;
    let ratio = numB / numA;
    let thr = 160;  //しきい値
    p.setup = () => {
        p.createCanvas(500, 500);
        p.colorMode(p.HSB, 1);
        divSquare(0, 0, p.width); //正方形の分割
        // divSquare(0, 0, p.width);
    };

    p.draw = () => {
    };

    //位置(xPos,yPos)にある横幅wdで縦横比がnumA:numBの長方形を正方形によって分割する
    // 長方形を正方形で分割する
    function divRect( xPos, yPos, wd){
        let itr = 0;
        let xEndPos = xPos + wd;
        let yEndPos = yPos + wd / ratio;
        p.fill(p.color(p.random(1), 1, 1));
        p.rect(xPos, yPos, wd, wd / ratio);
        while (wd > thr){   //長方形の幅がしきい値以上の場合に処理を行う
            itr++;
            if (itr % 2 === 0){
                while (xPos + wd < xEndPos + 0.1){
                    divSquare(xPos, yPos, wd);  //正方形を分割する関数の呼び出し
                    xPos += wd;
                }
                wd = xEndPos - xPos;
            } else {
                while (yPos + wd < yEndPos + 0.1){
                    divSquare(xPos, yPos, wd);  //正方形を分割する関数の呼び出し
                    yPos += wd;
                }
                wd = yEndPos - yPos;
            }
        }
    }

    //位置(xPos,yPos)にある1辺がwdの正方形を縦横比がnumA:numBの長方形で分割する
    // 長方形を正方形で分割する
    function divSquare(xPos, yPos, wd){
        let itr = 0;
        let xEndPos = wd + xPos;
        let yEndPos = wd + yPos;
        p.fill(p.color(p.random(1), 1, 1));
        p.rect(xPos, yPos, wd, wd);
        while (wd > thr){  //wdがしきい値以上の場合に処理を行う
            itr++;
            if (itr % 2 === 1){
                while (xPos + wd * ratio < xEndPos + 0.1){
                    divRect(xPos, yPos, wd * ratio);  //長方形を分割する関数の呼び出し
                    xPos += wd * ratio;
                }
                wd = xEndPos - xPos;
            } else {
                while (yPos + wd / ratio < yEndPos + 0.1){
                    divRect(xPos, yPos, wd);  //長方形を分割する関数の呼び出し
                    yPos += wd / ratio;
                }
                wd = yEndPos - yPos;
            }
        }
    }

    p.mouseClicked = () => {
        numA = p.random(1, 20)//1以上20以下のランダムな整数を代入
        numB = p.random(1, 20)
        while (numA === numB){ //numAとnumBが異なるようにする
            numB = p.random(1, 20)
        }
        thr = p.random(10,300)
        console.log("numA =", numA, "numB =", numB,"thr =", thr);  //numA,numB,thrの値を表示
        ratio = numA / numB;
        p.background(0, 0, 1);  //背景を白で消去
        divSquare(0, 0, p.width);
    }



};

new p5(sketch);
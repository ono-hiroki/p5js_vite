import p5 from "p5";

const sketch = (p) => {
    p.setup = () => {
        p.createCanvas(500, 500);

        //縦横比がnumA:numBの長方形によって正方形の描画ウィンドウを分割
        let numA = 6;
        let numB =10;
        let ratio = numB / numA;  //比率
        let xPos = 0;
        let yPos = 0;
        let itr = 0;
        p.colorMode(p.HSB, 1);
        let wd = p.width;    //描画ウィンドウの横幅サイズを初期値とする

        while (wd > 0.1){   //幅が許容誤差より大きければ以下を実行
            itr++;
            if (itr % 2 === 1){  //縦幅がwdの長方形をx軸方向へ加える

                while (xPos + wd * ratio < p.width + 0.1){
                    //幅を足したとき，横幅がウィンドウを超えなければ以下の処理を実行
                    p.fill(p.color(p.random(1), 1, 1));
                    //縦幅wd，縦横比がnumA:numBの長方形
                    p.rect(xPos, yPos, wd * ratio, wd);
                    xPos += wd * ratio;                //x位置を更新
                }
                wd = p.width - xPos;

            } else {  //横幅がwdの長方形をy軸方向へ加える

                while (yPos + wd / ratio < p.width + 0.1){
                    //幅を足したとき，縦幅がウィンドウを超えなければ以下の処理を実行
                    p.fill(p.color(p.random(1), 1, 1));  //ランダムに色を指定
                    p.rect(xPos, yPos, wd, wd / ratio);      //横幅wd，縦横比がnumA:numBの長方形
                    yPos += wd / ratio;                //y位置を更新
                }
                wd = p.width - yPos;
            }
        }

    };

    p.draw = () => {
    };

};

new p5(sketch);
import p5 from "p5";

const sketch = (p) => {
    p.setup = () => {
        p.createCanvas(500, 500);
        let numA0 = 10;
        let numB0 = 6;
        let scalar = 50;   //長方形の拡大倍率
        const numA = numA0 * scalar;       //数値の大きさを拡大
        const numB = numB0 * scalar;

        let wd = numB;
        let xPos = 0;
        let yPos = 0;
        let itr = 0;

        let col;  //色のための変数
        p.colorMode(p.HSB, 1);  //01区間をパラメータとするHSB色形式を使用
        while (wd > 0) {
            itr++;
            if (itr % 2 ===1) {
                while (xPos + wd <= numA) {
                    col = p.color(p.random(1), 1, 1);  //色相のみを01区間でランダムに変える
                    p.fill(col);
                    p.rect(xPos, yPos, wd, wd);
                    xPos += wd;
                }
                wd = numA - xPos;
            } else {
                while (yPos + wd <= numB) {
                    col = p.color(p.random(1), 1, 1);
                    p.fill(col);
                    p.rect(xPos, yPos, wd, wd);
                    yPos += wd;
                }
                wd = numB - yPos;
            }
        }

    };

    p.draw = () => {
    };
};

new p5(sketch);
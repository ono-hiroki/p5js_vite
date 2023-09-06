
const createGraphic = (pg, i) => {
    // 画面1/16の大きさのキャンバスを作成 一辺がgで1/4だから1/16
    pg[i] = createGraphics(g, g);
    // 角度を度数法に設定
    pg[i].angleMode(DEGREES);
    // 背景の色をランダムに設定
    pg[i].background(random(150, 255));
   
    bc = random(100, 255);
    pg[i].translate(g / 2, g / 2);
   
   
    let r = g / 2;
    let ag = 360 / 6; // 60度
    pg[i].stroke(randomColorPicker());
    // 先の結合部分をズバッとさせる
    pg[i].strokeJoin(BEVEL);
    pg[i].fill(255);
   
   
    pg[i].strokeWeight(g / random(40));
   
    const harfGrafix = g / 2;
    const quarterGrafix = g / 4;
    pg[i].line(-harfGrafix, harfGrafix, -quarterGrafix, quarterGrafix);
    pg[i].line(harfGrafix, -harfGrafix, quarterGrafix, -quarterGrafix);
   }

   // external.js
// export function myFunction() {
//     alert("Hello from external.js");
// }

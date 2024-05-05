let pg;
let theShader1;
const colors1 = ['#B67352', '#ECB159', '#FEFBF6'];
const colors2 = ['#0C2D57', '#FC6736', '#EFECEC'];
const colors3 = ['#747264', '#E0CCBE', '#EEEDEB'];
const colors4 = ['#FFA447', '#FFFC9B', '#B7E5B4'];
const colorGroup = [colors1, colors2, colors3, colors4];
let circles;
let rand;

function setup() {
    createCanvas(500, 500, WEBGL);
    pg = createGraphics(width, height);
    pg.noStroke();
    pg.fill('#776B5D');
    background('#F3EEEA');
    noStroke();
    frameRate(24);
    rand = parseInt(random(0, 4));

    circles = getRandomCircles(10000, width, height);
}

function draw() {
    //WEBGLは真ん中基準だがcreageGraphicsは左上基準なので合わせるために設定している
    translate(-width / 2, -height / 2);

    pg.push();
    pg.rect(0, 0, width, height);


    // シェーダーの設定
    theShader1 = createShader(shader1.vs, shader1.fs);
    shader(theShader1);
    theShader1.setUniform(`u_tex`, pg);
    // theShader1.setUniform(`u_time`, frameCount / 50);
    // theShader1.setUniform('u_resolution', [pg.width, pg.height]);


    image(pg, 0, 0);
}

const widthGrid = (pg, num, colors) => {
    const w = width / num;
    pg.noStroke();

    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
                pg.fill(colors[0]);
            } else {
                pg.fill(colors[1]);
            }
            pg.rect(i * w, j * w, w, w);
        }
    }
};

keyPressed = () => {
    if (key === 's') {
        //saveCanvas(canvas, 'canvas', 'png');
        saveGif('canvas', 6);
    }
};

function getRandomCircles(_num, _w, _h) {
    let circles = [];
    for (let i = 0; i < _num; i++) {
        let x = random(-1, 1) * _w;
        let y = random(-1, 1) * _h;
        let z = random(30, 100); // z軸の値を円の大きさとして使用
        if (circles.every((c) => dist(x, y, c.x, c.y) > (z + c.z) * 0.5)) {
            circles.push(createVector(x, y, z));
        }
    }
    return circles;
}

const shader1 = {
    vs: `
  precision highp float;
  precision highp int;

  attribute vec3 aPosition;
  attribute vec2 aTexCoord;

  varying vec2 vTexCoord;

  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelViewMatrix;

  void main() {
    vec4 positionVec4 = vec4(aPosition, 1.0);
    gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
    vTexCoord = aTexCoord;
  }
`,
    fs: `
precision highp float;
precision highp int;

varying vec2 vTexCoord;

uniform sampler2D u_tex;
uniform float u_time;
uniform vec2 u_resolution;

float pi=3.14159265358979;

float random2(float x) {
    return fract(sin(x)*1e4);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
// https://thebookofshaders.com/edit.php#11/3d-noise.frag
float noise (vec3 p) {
    const vec3 step = vec3(110.0, 241.0, 171.0);

    vec3 i = floor(p);
    vec3 f = fract(p);

    // For performance, compute the base input to a
    // 1D random from the integer part of the
    // argument and the incremental change to the
    // 1D based on the 3D -> 1D wrapping
    float n = dot(i, step);

    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix( mix(mix(random2(n + dot(step, vec3(0,0,0))),
                        random2(n + dot(step, vec3(1,0,0))),
                        u.x),
                    mix(random2(n + dot(step, vec3(0,1,0))),
                        random2(n + dot(step, vec3(1,1,0))),
                        u.x),
                u.y),
                mix(mix(random2(n + dot(step, vec3(0,0,1))),
                        random2(n + dot(step, vec3(1,0,1))),
                        u.x),
                    mix(random2(n + dot(step, vec3(0,1,1))),
                        random2(n + dot(step, vec3(1,1,1))),
                        u.x),
                u.y),
            u.z);
}

float rand(vec2 co){
  float a=fract(dot(co,vec2(2.067390879775102,12.451168662908249)))-.5;
  float s=a*(6.182785114200511+a*a*(-38.026512460676566+a*a*53.392573080032137));
  float t=fract(s*43758.5453);
  return t;
}

void main(){
  vec2 uv=vTexCoord;
  float radius=.004;
  uv.x=uv.x+rand(uv)*radius;
  uv.y=uv.y+rand(uv)*radius;

  vec3 pos = vec3(uv*5.0,u_time*0.5);
  float noises = noise(pos);

  // fractでリピートできる
  vec4 tex=texture2D(u_tex,fract((uv*0.9+(noises*0.08))));

  float interval=1.8;
  float strength=smoothstep(interval*.5,interval,interval-mod(0.,interval));
  float whiteNoise=(rand(uv+mod(0.,10.))*2.-1.)*(.15+strength*.15);

  gl_FragColor = tex + whiteNoise;
}
`,
};
let refractionShader
let backContent
let bottle
let pigeon

function setup() {
	createCanvas(600, 600, WEBGL)
	refractionShader = createShader(...createRefractionShader())
	backContent = createFramebuffer()
	pigeon = makePigeon()
}

let position = {
	get: () => createVector(100, 0, -150),
	getAngle: () => 0,
}

function draw() {
	debugMode()
	orbitControl()
	const t = millis()
	background(255)
	
	
	const applyCamera = () => {
		translate(0, 200, 0)
	}
	
	backContent.draw(() => { // 独立した描画
		// background(200,200,255)
		// noStroke()
		// applyCamera()

		// push()
		// const pos = position.get()
		// translate(...pos.array())
		// rotateY(atan2(pos.z, -pos.x) - PI/2)
		// rotateZ(position.getAngle())
		// translate(0, -70, 0)
		// pigeon.draw()
		// pop()
		
		// push()
		// ambientLight(128, 128, 128)
		// directionalLight(128, 128, 128, 0, 0, -1)
		// fill(0, 50)
		// specularMaterial(50)
		// drawingContext.disable(drawingContext.DEPTH_TEST)// これがないと、背景が透けてしまう by copilot
		// translate(0, 0, 50)
		// scale(1.5)
		// model(bottle)
		// drawingContext.enable(drawingContext.DEPTH_TEST)
		// pop()
	})
	
	imageMode(CENTER)
	// image(backContent, 0, 0)
	// drawingContext.clear(drawingContext.DEPTH_BUFFER_BIT)
	// background(200,200,255)
	noStroke()
	applyCamera()

	push()
	const pos = position.get()
	translate(...pos.array())
	rotateY(atan2(pos.z, -pos.x) - PI/2)
	rotateZ(position.getAngle())
	translate(0, -70, 0)
	pigeon.draw()
	pop()
	
	// push()
	// noStroke()
	// // lights()
	// applyCamera()
	// shader(refractionShader)
	// refractionShader.setUniform('backContent', backContent)
	// refractionShader.setUniform('pixelSize', [width*pixelDensity(), height*pixelDensity()])
	// drawingContext.enable(drawingContext.CULL_FACE)
	// drawingContext.cullFace(drawingContext.FRONT)
	// translate(0, 0, 50)
	// scale(1.5)
	// model(bottle)
	// drawingContext.disable(drawingContext.CULL_FACE)
	// pop()
}
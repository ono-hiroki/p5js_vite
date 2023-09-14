let refractionShader
let backContent
let bottle
let pigeon

function setup() {
	createCanvas(600, 600, WEBGL)
	refractionShader = createShader(...createRefractionShader())
	backContent = createFramebuffer()
	bottle = makeBottle()
	console.log(bottle)
	pigeon = makePigeon()
}

let position = {
	until: 0,
	get: () => createVector(100, 0, -150),
	getAngle: () => 0,
}

function draw() {
	const t = millis()
	background(255)
	
	if (position.until <= t) {
		const startPos = position.get()
		const r = random(150, 250)
		const theta = random(1.2, 1.8) * PI
		endPos = createVector(r * cos(theta), 0, -100 + r * sin(theta))
		const steps = Math.ceil(endPos.copy().sub(startPos).mag() / 20)
		const stepLength = 300
		const moveTime = steps * stepLength
		const holdTime = random(500, 3000)
		const startTime = t
		const endTime = t + moveTime
		const finishTime = endTime + holdTime
		position = {
			until: finishTime,
			get: () => {
				const newT = millis()
				const progress = map(newT, startTime, endTime, 0, 1, true)
				const jumpProgress = (progress * steps) % 1
				const maxJumpHeight = 15
				const jumpHeight = 4 * jumpProgress * (jumpProgress - 1) * maxJumpHeight
				return startPos.copy().slerp(endPos, progress).add(0, jumpHeight, 0)
			},
			getAngle: () => {
				const newT = millis()
				const progress = map(newT, startTime, endTime, 0, 1, true)
				const jumpProgress = (progress * steps / 2) % 1
				return sin(jumpProgress * TWO_PI) * 0.005 * PI
			}
		}
	}
	
	const applyCamera = () => {
		translate(0, 200, 0)
	}
	
	backContent.draw(() => {
		background(255)
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
		
		push()
		ambientLight(128, 128, 128)
		directionalLight(128, 128, 128, 0, 0, -1)
		fill(0, 50)
		specularMaterial(50)
		drawingContext.disable(drawingContext.DEPTH_TEST)
		translate(0, 0, 50)
		scale(1.5)
		// model(bottle)
		drawingContext.enable(drawingContext.DEPTH_TEST)
		pop()
	})
	
	imageMode(CENTER)
	image(backContent, 0, 0)
	drawingContext.clear(drawingContext.DEPTH_BUFFER_BIT)
	
	push()
	noStroke()
	// lights()
	applyCamera()
	shader(refractionShader)
	refractionShader.setUniform('backContent', backContent)
	refractionShader.setUniform('pixelSize', [width*pixelDensity(), height*pixelDensity()])
	drawingContext.enable(drawingContext.CULL_FACE)
	drawingContext.cullFace(drawingContext.FRONT)
	translate(0, 0, 50)
	scale(1.5)
	model(bottle)
	drawingContext.disable(drawingContext.CULL_FACE)
	pop()
}
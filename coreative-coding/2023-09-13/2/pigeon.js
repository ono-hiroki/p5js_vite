function makePigeon() {
	return createShaderPark(function() {
		lightDirection(0, -1, 0)
		
		const tiltIn = sin(PI/2 * smoothstep(0.6, 0.7, fract(time * 0.1)))
		const tiltOut = 1 - sin(PI/2 * smoothstep(0.9, 1, fract(time * 0.1)))
		const tilt = tiltIn * tiltOut * 0.2 * PI
		
		pushState()
		blend(0.4)
		color(0.6, 0.1, 0.8)
		pushState()
		setSpace(getSpace() * vec3(0.7, 1, 1))
		line(vec3(0,0,0), vec3(0,0,0.75), 0.5)
		popState()
		sphere(0.7)
		// rotateZ(tilt)
		line(vec3(0,0,0), vec3(0,-1,0), 0.4)
		popState()
		
		pushState()
		color(0.9, 0.9, 0.2)
		// beak
		pushState()
		// rotateZ(tilt)
		setSpace(getSpace() * vec3(0.8, 1, 1))
		line(vec3(0,-0.9,0), vec3(0,-0.9,-0.5), 0.1)
		popState()
		
		// legs
		mirrorX()
		line(vec3(0.25, 0, 0), vec3(0.25, 1, 0), 0.05)
		line(vec3(0.25, 1, 0), vec3(0.2, 1, -0.15), 0.05)
		line(vec3(0.25, 1, 0), vec3(0.3, 1, -0.15), 0.05)
		popState()
		
		pushState()
		// eyes
		// rotateZ(tilt)
		mirrorX()
		color(0, 0, 0)
		displace(0.3, -1, -0.2)
		let blink = 1/(0.1 + cos(PI * smoothstep(0.8, 1, fract(time * 0.25))))
		blink *= 1/(0.1 + cos(PI * smoothstep(0.8, 1, fract(time * 0.4))))
		// setSpace(getSpace() * vec3(1, blink, 1))
		sphere(0.1)
		popState()
		
	}, {
		drawGeometry: () => sphere(250),
		scale: 0.5,
	})
}
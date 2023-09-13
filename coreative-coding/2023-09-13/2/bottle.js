function makeBottle() {
	const silhouette = [
		{
			pt: createVector(0, 0, 0),
		},
		{
			pt: createVector(35, 0, 0),
			next: createVector(40, 0, 0),
		},
		{
			prev: createVector(40, -15, 0),
			pt: createVector(40, -20, 0),
		},
		{
			pt: createVector(40, -100, 0),
			next: createVector(40, -120, 0),
		},
		{
			pt: createVector(20, -160, 0),
		},
		{
			pt: createVector(15, -250, 0),
			// next: createVector(15, -252, 0),
		},
		{
			prev: createVector(17, -250, 0),
			pt: createVector(17, -252, 0),
			next: createVector(17, -254, 0),
		},
		{
			// prev: createVector(17, -254, 0),
			pt: createVector(15, -254, 0),
		},
		/*{
			pt: createVector(15, -234, 0),
		},
		{
			pt: createVector(15, -160, 0)
		},
		{
			prev: createVector(35, -120, 0),
			pt: createVector(35, -100, 0),
		},
		{
			pt: createVector(0, -100, 0)
		},*/
	]
	const innerOffset = createVector(5, 0, 0)
	silhouette.push(...silhouette.slice(0, -2).reverse().map(({ prev, pt, next }) => ({
		prev: next ? next.copy().sub(innerOffset) : undefined,
		pt: pt.copy().sub(innerOffset),
		next: prev ? prev.copy().sub(innerOffset) : undefined,
	})))
	const pts = []
	for (let i = 1; i < silhouette.length; i++) {
		const a = silhouette[i-1].pt
		const b = silhouette[i-1].next || a
		const d = silhouette[i].pt
		const c = silhouette[i].prev || d
		const len = Math.hypot(a.x-d.x, a.y-d.y)
		const numPts = ceil(len/10)
		for (let j = 0; j < numPts; j++) {
			const t = j/numPts
			pts.push(createVector(
				bezierPoint(a.x, b.x, c.x, d.x, t),
				bezierPoint(a.y, b.y, c.y, d.y, t),
				0
			))
		}
	}
	pts.shift()
	
	return new p5.Geometry(1, 1, function() {
		this.gid = 'bottle'
		const numRotations = 30
		for (let i = 0; i < numRotations; i++) {
			const angle = i/30 * TWO_PI
			const rot = new p5.Matrix().rotate(angle, 0, 1, 0)
			this.vertices.push(...pts.map((pt) => rot.multiplyPoint(pt)))
		}
		for (let i = 0; i < numRotations; i++) {
			for (let j = 1; j < pts.length; j++) {
				this.faces.push(
					[
						i*pts.length + j-1,
						i*pts.length + j,
						((i+1)%numRotations)*pts.length + j,
					],
					[
						i*pts.length + j-1,
						((i+1)%numRotations)*pts.length + j,
						((i+1)%numRotations)*pts.length + j - 1,
					],
				)
			}
		}
		this.computeNormals()
	})
}
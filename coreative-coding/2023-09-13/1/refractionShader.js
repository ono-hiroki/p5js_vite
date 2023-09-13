function createRefractionShader() {
	const vert = `
	precision highp float;
	attribute vec3 aPosition;
	attribute vec3 aNormal;
	attribute vec2 aTexCoord;

	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;
	uniform mat3 uNormalMatrix;

	varying vec2 vTexCoord;
	varying vec3 vNormal;
	varying vec3 vPosition;
	varying vec3 vObjPosition;
	varying vec3 vRawNormal;

	void main(void) {
		vec4 objSpacePosition = vec4(aPosition, 1.0);

		vObjPosition = objSpacePosition.xyz;
		vec4 worldSpacePosition = uModelViewMatrix * objSpacePosition;
		gl_Position = uProjectionMatrix * worldSpacePosition;
		vTexCoord = aTexCoord;
		vPosition = worldSpacePosition.xyz;
		vRawNormal = aNormal;
		vNormal = uNormalMatrix * aNormal;
	}
	`

	const frag = `
	precision highp float;
	varying vec2 vTexCoord;
	varying vec3 vRawNormal;
	varying vec3 vNormal;
	varying vec3 vPosition;
	varying vec3 vObjPosition;
	uniform mat3 uNormalMatrix;
	uniform sampler2D backContent;
	// uniform sampler2D reflections;
	uniform vec2 pixelSize;

	const float PI = ${Math.PI.toFixed(10)};

	float map(float val, float inA, float inB, float outA, float outB) {
		return (val - inA) / (inB - inA) * (outB - outA) + outA;
	}

	vec4 sampleBackground(vec3 normal, sampler2D bg) {
		// x = rho sin(phi) cos(theta)
		// y = rho cos(phi)
		// z = rho sin(phi) sin(theta)
		// rho = 1 after normalization
		float phi = acos(normal.y);
		float sinPhi = sin(phi);
		float theta =
			abs(sinPhi) > 0.0001
				? acos(normal.x / sinPhi)
				: 0.;
		vec2 coord = vec2(
			mod(map(theta, 0., PI, 0., 1.) + 0.5, 1.),
			1. - map(phi, 0., PI, 1., 0.)
		);
		return texture2D(bg, coord);
	}

	float fresnel(vec3 direction, vec3 normal, bool invert) {
		if (dot(direction, normal) > 0.0) return 0.0;
		vec3 halfDirection = normalize(normal + direction);
		float cosine = dot(halfDirection, direction);
		float product = max(cosine, 0.0);
		float factor = invert ? 1.0 - pow( product, 5.0 ) : pow( product, 5.0 );
		return factor;
	}

	// Noise functions
	// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
	float rand(float n) {
		return fract(sin(n) * 43758.5453123);
	}
	float rand(vec2 n) { 
		return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
	}
	float noise(float p) {
		float fl = floor(p);
		float fc = fract(p);
		return mix(rand(fl), rand(fl + 1.0), fc);
	}
	float noise(vec2 n) {
		const vec2 d = vec2(0.0, 1.0);
		vec2 b = floor(n);
		vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
		return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
	}

	const int NUM_SAMPLES = 9;

	void main() {
		vec3 normal = normalize(vNormal);

		vec2 offset = -0.065 * normal.xy; //pow(abs(normal.xy), vec2(0.5)) * sign(normal.xy);
		vec2 origCoord = gl_FragCoord.xy / pixelSize;
		origCoord.y = 1. - origCoord.y;

		vec2 coord = gl_FragCoord.xy;

		vec4 refracted = vec4(0.,0.,0.,0.);

		for (int i = 0; i < NUM_SAMPLES; i++) {
			float sampleOffset = float(i) * 123.456789;
			vec3 noiseOffset = vec3(
				fract(10. * noise(coord * 0.2) + sampleOffset) - 0.5,
				fract(10. * noise(coord * 0.2) + 10. + sampleOffset) - 0.5,
				fract(10. * noise(coord * 0.2) + 20. + sampleOffset) - 0.5
			);
			refracted += vec4(
				texture2D(backContent, origCoord + offset*(1.1 + noiseOffset.x*0.3)).x,
				texture2D(backContent, origCoord + offset*(1. + noiseOffset.y*0.3)).y,
				texture2D(backContent, origCoord + offset*(0.9 + noiseOffset.z*0.3)).z,
				1.
			);
		}
		refracted /= float(NUM_SAMPLES);

		vec3 toSurface = normalize(vPosition);
		vec3 reflectedDir = normalize(reflect(toSurface, normalize(vRawNormal))); //transpose(uNormalMatrix) * 
		vec4 reflectionColor = vec4(1., 1., 1., 1.);
		float fresnelStrength = 1.;
		float reflectionStrength = 0.1;
		float f = fresnel(toSurface, normal, false);
		float reflectionAmount = reflectionStrength + fresnelStrength * f;
		gl_FragColor = (refracted + reflectionAmount * reflectionColor) * vec4(0.25, 0.8, 0.6, 1.0);
	}
	`
	return [vert, frag]
}
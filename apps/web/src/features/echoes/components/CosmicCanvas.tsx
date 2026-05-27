'use client';

import { Renderer, Geometry, Program, Mesh } from 'ogl';
import React, { useEffect, useRef } from 'react';

// --- Shaders for OGL Swirling Cosmic Universe ---
const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uPulse; // Expanding wave ripple from click
  varying vec2 vUv;

  // Simple pseudo-random hash
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  // 2D Noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), f.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), f.x), f.y);
  }

  void main() {
    vec2 uv = vUv - 0.5;
    uv.x *= uResolution.x / uResolution.y;

    float r = length(uv);
    float angle = atan(uv.y, uv.x);

    // Deep Velvet Black Base (Nền đen sâu thẳm)
    vec3 spaceDark = vec3(0.001, 0.002, 0.004); 
    
    // Ethereal Blue & Cold Silver Cosmic Dust (Bụi tinh vân màu xanh lam & bạc)
    vec3 silverDust = vec3(0.40, 0.45, 0.52) * 0.06; // Soft silver-blue smoke
    vec3 spaceBlue = vec3(0.08, 0.48, 0.72) * 0.18; // Ethereal deep cosmic blue/cyan haze

    // Swirling Volumetric Space Nebula (FBM vortex) - Very slow and quiet
    float swirlSpeed = uTime * 0.03;
    float swirlAngle = angle + r * 2.2 - swirlSpeed;
    vec2 swirlUv = vec2(cos(swirlAngle), sin(swirlAngle)) * r;
    
    float n1 = noise(swirlUv * 1.8 + vec2(uTime * 0.01));
    float n2 = noise(swirlUv * 1.2 - vec2(uTime * 0.012));
    
    vec3 nebulaColor = mix(silverDust, spaceBlue, n1 * 1.2);
    nebulaColor = mix(nebulaColor, vec3(0.0), n2 * 0.45);

    // Gravitational Shockwave Ripple - Ethereal blue wave expansion
    float rippleRadius = uPulse * 0.95;
    float rippleThickness = 0.035;
    float rippleIntensity = smoothstep(rippleRadius - rippleThickness, rippleRadius, r) * 
                           smoothstep(rippleRadius + rippleThickness, rippleRadius, r);
    float distortion = rippleIntensity * 0.05;
    vec2 distortedUv = uv * (1.0 - distortion);

    // Dense cold silver-blue starfield
    float starDensity = 110.0;
    vec2 starPos = fract(distortedUv * starDensity + vec2(uTime * 0.004, -uTime * 0.002));
    float stars = step(0.991, hash(floor(distortedUv * starDensity))) * 
                  smoothstep(0.06, 0.0, length(starPos - 0.5));
    
    float twinkle = 0.35 + 0.65 * sin(uTime * 1.2 + hash(floor(distortedUv * starDensity)) * 6.28);
    vec3 starField = vec3(stars * twinkle) * vec3(0.82, 0.92, 0.98); // Cold silver-blue stars

    // Ignite starlight caught inside the expanding gravitational wave
    starField += vec3(stars) * rippleIntensity * 1.4 * vec3(0.25, 0.70, 0.95);

    // Ethereal blue, expanding shockwave halo
    vec3 rippleGlow = vec3(0.08, 0.48, 0.72) * rippleIntensity * 0.14;

    // Outer Vignette
    float vignette = smoothstep(0.92, 0.35, length(vUv - 0.5));

    // Combine
    vec3 finalColor = spaceDark + nebulaColor + starField + rippleGlow;
    finalColor *= vignette;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface CosmicCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  programRef: React.MutableRefObject<Program | null>;
}

export function CosmicCanvas({ containerRef, programRef }: CosmicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const renderer = new Renderer({
      canvas,
      alpha: false,
      depth: false,
      antialias: true,
    });
    const gl = renderer.gl;

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [0, 0] },
        uPulse: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    const handleResize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      const elapsedSeconds = (performance.now() - startTime) * 0.001;
      program.uniforms.uTime.value = elapsedSeconds;

      if (program.uniforms.uPulse.value > 0) {
        program.uniforms.uPulse.value += 0.005;
        if (program.uniforms.uPulse.value >= 1.6) {
          program.uniforms.uPulse.value = 0;
        }
      }

      renderer.render({ scene: mesh });
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      geometry.remove();
      program.remove();
    };
  }, [containerRef, programRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-none z-0"
    />
  );
}

'use client';

import { Renderer, Geometry, Program, Mesh } from 'ogl';
import React, { useEffect, useRef } from 'react';

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
  varying vec2 vUv;

  // Hash function for random digital particles
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // Simple 2D noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), f.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), f.x), f.y);
  }

  void main() {
    vec2 uv = vUv;
    
    // Custom space-dark background base
    vec3 spaceDark = vec3(0.012, 0.012, 0.016); // #030304
    vec3 cyberCyan = vec3(0.13, 0.83, 0.93) * 0.065; // Extremely subtle cyan glow
    vec3 cyberPurple = vec3(0.39, 0.16, 0.95) * 0.045; // Extremely subtle purple glow
    
    // 1. Shifting Ambient Nebulas (FBM Gradient glow)
    float n1 = noise(uv * 1.8 + vec2(uTime * 0.015, uTime * 0.01));
    float n2 = noise(uv * 1.2 - vec2(uTime * 0.008, uTime * 0.015));
    
    vec3 nebulaGlow = mix(cyberPurple, cyberCyan, n1);
    nebulaGlow = mix(nebulaGlow, vec3(0.0), n2 * 0.4);
    
    // 2. Subtle Tech Grid Overlay
    // Dynamic grid scaling based on aspect ratio
    float aspect = uResolution.x / uResolution.y;
    vec2 gridPos = vUv * vec2(10.0 * aspect, 10.0);
    vec2 gridFract = fract(gridPos - vec2(uTime * 0.01, 0.0)); // Slow horizontal crawl
    float gridLine = step(0.993, gridFract.x) + step(0.993, gridFract.y);
    
    // Edge vignette to keep focus on foreground text content
    float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    vignette = clamp(pow(vignette * 16.0, 0.6), 0.0, 1.0);
    
    vec3 gridColor = vec3(0.13, 0.83, 0.93) * gridLine * 0.022 * vignette;
    
    // Combine base space dark with nebula and grid lines
    vec3 finalColor = spaceDark + nebulaGlow + gridColor;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function GlobalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // 1. Setup Renderer
    const renderer = new Renderer({
      canvas,
      alpha: false,
      depth: false,
      antialias: true,
    });
    const gl = renderer.gl;

    // 2. Setup Fullscreen Geometry
    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) }, // fast full-viewport quad
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    // 3. Setup Program
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [0, 0] },
      },
      depthTest: false,
      depthWrite: false,
    });

    // 4. Setup Mesh
    const mesh = new Mesh(gl, { geometry, program });

    // 5. Handle Resizing
    const handleResize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // 6. Animation Render Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      const elapsedSeconds = (performance.now() - startTime) * 0.001;
      program.uniforms.uTime.value = elapsedSeconds;

      renderer.render({ scene: mesh });
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      geometry.remove();
      program.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
    </div>
  );
}

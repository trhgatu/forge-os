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

  void main() {
    // Center coordinates from -0.5 to 0.5
    vec2 uv = vUv - 0.5;
    
    // Polar coordinates
    float r = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // Outer boundary falloff (fades out perfectly at edges)
    float boundary = smoothstep(0.5, 0.45, r);
    if (boundary <= 0.001) {
      discard;
    }
    
    // Cyber color palette: glowing tech cyan and deep AI purple
    vec3 colorCyan = vec3(0.13, 0.83, 0.93); // #22d3ee
    vec3 colorPurple = vec3(0.50, 0.30, 0.95); // Deep AI purple
    
    vec3 color = vec3(0.0);
    float alpha = 0.0;
    
    // 1. Radar Sweep Scan Line (Rotating sonar)
    float sweepAngle = angle - uTime * 2.2;
    float sweep = smoothstep(-3.0, 0.0, sin(sweepAngle)) * smoothstep(0.42, 0.08, r) * 0.45;
    color += colorCyan * sweep;
    alpha += sweep;
    
    // 2. Concentric Mechanical Telemetry Rings
    // Ring A: Inner segmented dash dial (12 dashes)
    float ringA = smoothstep(0.005, 0.0, abs(r - 0.25));
    float segmentA = step(0.0, sin(angle * 12.0 + uTime * 0.8)); 
    color += colorCyan * (ringA * segmentA * 0.85);
    alpha += ringA * segmentA * 0.85;
    
    // Ring B: Outer segmented purple ring (rotating opposite)
    float ringB = smoothstep(0.003, 0.0, abs(r - 0.42));
    float segmentB = step(0.35, sin(angle * 4.0 - uTime * 1.2)); 
    color += colorPurple * (ringB * segmentB * 0.75);
    alpha += ringB * segmentB * 0.75;
    
    // Ring C: Fine watch-dial gear tick marks (60 ticks)
    float ringC = smoothstep(0.015, 0.0, abs(r - 0.33));
    float ticks = step(0.92, sin(angle * 60.0)); 
    color += colorCyan * (ringC * ticks * 0.95);
    alpha += ringC * ticks * 0.95;
    
    // 3. Wide Tech Grid Overlay (Expanding the grid across the entire active aura area!)
    vec2 grid = fract(uv * 28.0 - vec2(0.0, uTime * 0.8)); 
    float gridLine = (step(0.92, grid.x) + step(0.92, grid.y)) * 0.28; 
    float gridMask = smoothstep(0.45, 0.1, r) * 0.8; 
    color += colorCyan * (gridLine * gridMask);
    alpha += gridLine * gridMask;
    
    // Central AI Neural Core glow
    float corePulse = 0.15 + sin(uTime * 4.0) * 0.015;
    float coreGlow = smoothstep(corePulse, 0.0, r);
    color += mix(colorCyan, colorPurple, r / corePulse) * (coreGlow * 0.75);
    alpha += coreGlow * 0.75;
    
    // 4. Orbiting Data Telemetry Nodes (Holographic particles)
    // Node 1 (Fast outer particle)
    float nodeAngle1 = uTime * 1.5;
    vec2 nodePos1 = vec2(cos(nodeAngle1), sin(nodeAngle1)) * 0.33;
    float node1 = smoothstep(0.024, 0.0, length(uv - nodePos1));
    color += vec3(1.0) * node1 * 1.6; 
    alpha += node1;
    
    // Node 2 (Medium inner particle)
    float nodeAngle2 = -uTime * 1.0 + 2.5;
    vec2 nodePos2 = vec2(cos(nodeAngle2), sin(nodeAngle2)) * 0.25;
    float node2 = smoothstep(0.02, 0.0, length(uv - nodePos2));
    color += colorCyan * node2 * 1.3;
    alpha += node2;
    
    // 5. Background digital crosshair guidelines (axes tick markers)
    float axisWidth = 0.0025;
    float axisX = smoothstep(axisWidth, 0.0, abs(uv.y)) * step(abs(uv.x), 0.45) * step(0.12, abs(uv.x));
    float axisY = smoothstep(axisWidth, 0.0, abs(uv.x)) * step(abs(uv.y), 0.45) * step(0.12, abs(uv.y));
    float axis = (axisX + axisY) * 0.45;
    color += colorCyan * axis;
    alpha += axis;
    
    // Final output combining boundary mask and rich lighting boost
    gl_FragColor = vec4(color * boundary * 1.8, alpha * boundary);
  }
`;

export function NovaAuraCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // 1. Initialize OGL WebGL Renderer with absolute transparency
    const renderer = new Renderer({
      canvas,
      alpha: true,
      depth: false,
      antialias: true,
      premultipliedAlpha: false,
    });
    const gl = renderer.gl;

    // 2. Setup Quad Geometry (covers full canvas viewport)
    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) }, // Fast full-screen 1-triangle trick
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    // 3. Define Shader Program with time and resolution uniforms
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [0, 0] },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    // 4. Create Mesh
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

    // Cleanup resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      
      // Dispose WebGL context geometries and programs to avoid memory leaks
      geometry.remove();
      program.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none select-none z-10 overflow-visible flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
    </div>
  );
}

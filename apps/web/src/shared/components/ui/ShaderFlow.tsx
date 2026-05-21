'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts';

export type ShaderFlowProps = {
  className?: string;
  flowSpeed?: [number, number];
  scale?: number;
  brightness?: number;
  colorLowA?: [number, number, number];
  colorHighA?: [number, number, number];
  fadeRx?: number;
  fadeRy?: number;
  fadeCx?: number;
  fadeCy?: number;
};

const VS = `attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}`;

const FS = `precision highp float;
uniform vec2 uR;
uniform float uT;
uniform vec2 uV;
uniform float uS;
uniform float uB;
uniform vec3 uColorLow;
uniform vec3 uColorHigh;
uniform vec3 uBgColor;
uniform vec4 uFadeShape;

// Simple 2D pseudo-random noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// 4-octave Fractal Brownian Motion (FBM) for smooth, smoky wind currents
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

float fadeAlpha(float d){
  float t=clamp(1.0-d,0.0,1.0);
  return t*t*(3.0-2.0*t);
}

void main(){
  vec2 frag=gl_FragCoord.xy/uR;
  vec2 p=frag-0.5;
  p.x*=uR.x/uR.y;

  // 1. DYNAMIC ANGLE & GUST INTENSITY (Poetic, pseudo-random wind gusts swaying over time)
  float timeGust = uT * 0.1; 
  float gust = sin(timeGust * 0.3) * 0.35 + cos(timeGust * 0.13) * 0.2 + 0.85; 
  float angle = -0.55 + sin(timeGust * 0.17) * 0.12 + cos(timeGust * 0.09) * 0.05; 

  float cosA = cos(angle);
  float sinA = sin(angle);
  mat2 rotWind = mat2(cosA, sinA, -sinA, cosA);
  
  // Rotate viewport coordinates to align with the sweeping wind direction
  vec2 windP = rotWind * p;

  // 2. STRETCH ALONG THE ROTATED AXIS (Long, beautiful diagonal wind currents)
  windP = vec2(windP.x * 0.42, windP.y * 1.85) * uS;

  // 3. GUSTY UNIDIRECTIONAL DRIFT (Sweeping diagonally from top-left to bottom-right)
  windP.x -= uT * uV.x * gust;
  
  // Dynamic turbulence wave perpendicular to the flow
  float wave = sin(windP.x * 0.22 + uT * 0.15) * 0.18 * (1.0 + sin(uT * 0.03) * 0.5);
  windP.y += wave;

  // 4. LAYERED FBM TURBULENCE (Wispy Sumi-e vertical-diagonal ink-smoke wind)
  vec2 e = vec2(0.08, 0.0); 
  float a = fbm(windP);
  float b = fbm(windP + e.xy);
  float c = fbm(windP + e.yx);
  vec2 q = vec2(b - a, c - a) * 4.5;

  windP += q * 0.7;
  float nVal = fbm(windP + q);

  // 5. MIX COLORS based on wind current density
  float t = clamp(nVal * 1.25, 0.0, 1.0);
  vec3 col = mix(uColorLow, uColorHigh, t) * uB;

  // 6. RADIAL FADE (To blend smoothly into background)
  vec2 ndc=vec2(frag.x, 1.0-frag.y);
  float aspect=uR.x/uR.y;
  float dx=((ndc.x-uFadeShape.x)*aspect)/uFadeShape.z;
  float dy=(ndc.y-uFadeShape.y)/uFadeShape.w;
  float fa=fadeAlpha(sqrt(dx*dx+dy*dy));

  // Soft atmospheric mist blend factor
  vec3 outColor=mix(uBgColor, col, fa * 0.32);
  gl_FragColor=vec4(outColor,1.0);
}`;

const D = {
  flowSpeed: [0.2, 0.0] as [number, number],
  scale: 3.0,
  brightness: 1.15,
  colorLowA: [0.12, 0.12, 0.12] as [number, number, number],
  colorHighA: [0.76, 0.76, 0.76] as [number, number, number],
  fadeRx: 1.6,
  fadeRy: 0.9,
  fadeCx: 0.5,
  fadeCy: 0.3,
};

export function ShaderFlow(props: ShaderFlowProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    // Helper: Compile Shader
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compileShader(VS, gl.VERTEX_SHADER);
    const fs = compileShader(FS, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    // Helper: Create Program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup full-screen triangle position buffer
    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Get Uniform Locations
    const uT = gl.getUniformLocation(program, 'uT');
    const uR = gl.getUniformLocation(program, 'uR');
    const uV = gl.getUniformLocation(program, 'uV');
    const uS = gl.getUniformLocation(program, 'uS');
    const uB = gl.getUniformLocation(program, 'uB');
    const uColorLow = gl.getUniformLocation(program, 'uColorLow');
    const uColorHigh = gl.getUniformLocation(program, 'uColorHigh');
    const uBgColor = gl.getUniformLocation(program, 'uBgColor');
    const uFadeShape = gl.getUniformLocation(program, 'uFadeShape');

    // Sync resize
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();

    window.addEventListener('resize', resize);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    const t0 = performance.now();

    const tick = () => {
      resize();

      const elapsed = (performance.now() - t0) / 1000;
      gl.uniform1f(uT, elapsed);
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform2f(uV, props.flowSpeed?.[0] ?? D.flowSpeed[0], props.flowSpeed?.[1] ?? D.flowSpeed[1]);
      gl.uniform1f(uS, props.scale ?? D.scale);
      gl.uniform1f(uB, props.brightness ?? D.brightness);

      const lowColor = props.colorLowA ?? D.colorLowA;
      const highColor = props.colorHighA ?? D.colorHighA;
      gl.uniform3f(uColorLow, lowColor[0], lowColor[1], lowColor[2]);
      gl.uniform3f(uColorHigh, highColor[0], highColor[1], highColor[2]);

      // Calculate dynamic bg rgb based on theme
      const bg = isDark ? [0.02, 0.02, 0.03] : [0.98, 0.98, 0.96];
      gl.uniform3f(uBgColor, bg[0], bg[1], bg[2]);

      gl.uniform4f(
        uFadeShape,
        props.fadeCx ?? D.fadeCx,
        props.fadeCy ?? D.fadeCy,
        props.fadeRx ?? D.fadeRx,
        props.fadeRy ?? D.fadeRy
      );

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      ro.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [isDark, props]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={props.className ?? 'absolute inset-0 h-full w-full grayscale'}
      style={{ display: 'block' }}
    />
  );
}

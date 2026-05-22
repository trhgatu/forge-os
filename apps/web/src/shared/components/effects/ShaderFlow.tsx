"use client";

import { Mesh, Program, Renderer, Transform, Triangle } from "ogl";
import { useEffect, useRef, type ReactNode } from "react";

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

  // 1. DYNAMIC ANGLE & GUST INTENSITY (Zen wind currents)
  float timeGust = uT * 0.1; 
  float gust = sin(timeGust * 0.3) * 0.35 + cos(timeGust * 0.13) * 0.2 + 0.85; 
  float angle = -0.55 + sin(timeGust * 0.17) * 0.12 + cos(timeGust * 0.09) * 0.05; 

  float cosA = cos(angle);
  float sinA = sin(angle);
  mat2 rotWind = mat2(cosA, sinA, -sinA, cosA);
  
  // Rotate viewport coordinates to align with wind direction
  vec2 windP = rotWind * p;

  // 2. STRETCH ALONG THE ROTATED AXIS
  windP = vec2(windP.x * 0.42, windP.y * 1.85) * uS;

  // 3. GUSTY UNIDIRECTIONAL DRIFT (Sweeping diagonally from top-left to bottom-right)
  windP.x -= uT * uV.x * gust;
  windP.y -= uT * uV.y * gust;
  
  // Dynamic turbulence wave
  float wave = sin(windP.x * 0.22 + uT * 0.15) * 0.18 * (1.0 + sin(uT * 0.03) * 0.5);
  windP.y += wave;

  // 4. LAYERED FBM TURBULENCE
  vec2 e = vec2(0.08, 0.0);
  float a = fbm(windP);
  float b = fbm(windP + e.xy);
  float c = fbm(windP + e.yx);
  vec2 q = vec2(b - a, c - a) * 4.5;

  windP += q * 0.7;
  float nVal = fbm(windP + q);

  // 5. MIX COLORS
  float t = clamp(nVal * 1.25, 0.0, 1.0);
  vec3 col = mix(uColorLow, uColorHigh, t) * uB;

  // 6. RADIAL FADE
  vec2 ndc=vec2(frag.x, 1.0-frag.y);
  float aspect=uR.x/uR.y;
  float dx=((ndc.x-uFadeShape.x)*aspect)/uFadeShape.z;
  float dy=(ndc.y-uFadeShape.y)/uFadeShape.w;
  float fa=fadeAlpha(sqrt(dx*dx+dy*dy));

  // Soft atmospheric mist blend
  vec3 outColor=mix(uBgColor, col, fa * 0.32);
  gl_FragColor=vec4(outColor,1.0);
}`;

const D = {
  flowSpeed: [0.22, 0.28] as [number, number],
  scale: 3.0,
  brightness: 1.15,
  colorLowA: [0.08, 0.08, 0.09] as [number, number, number], 
  colorHighA: [0.22, 0.22, 0.25] as [number, number, number], 
  fadeRx: 1.6,
  fadeRy: 0.9,
  fadeCx: 0.5,
  fadeCy: 0.3,
};

function parseColor(input: string): [number, number, number] | null {
  const s = input.trim();
  if (s.startsWith("#")) {
    let hex = s.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    if (hex.length !== 6) return null;
    const n = parseInt(hex, 16);
    if (Number.isNaN(n)) return null;
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }
  const m = s.match(/(\d+(?:\.\d+)?)/g);
  if (!m || m.length < 3) return null;
  return [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255];
}

function readBgColor(el: HTMLElement): [number, number, number] {
  const styles = getComputedStyle(el);
  const varVal = styles.getPropertyValue("--background").trim();
  const parsed = varVal ? parseColor(varVal) : null;
  if (parsed) return parsed;
  return [0.01, 0.01, 0.02]; 
}

export function ShaderFlow(props: ShaderFlowProps): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  const pr = useRef(props);

  useEffect(() => {
    pr.current = props;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const r = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 1),
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    const gl = r.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    el.appendChild(gl.canvas);

    const geo = new Triangle(gl);
    const p = new Program(gl, {
      vertex: VS,
      fragment: FS,
      uniforms: {
        uT: { value: 0 },
        uR: { value: [1, 1] },
        uV: { value: [...D.flowSpeed] },
        uS: { value: D.scale },
        uB: { value: D.brightness },
        uColorLow: { value: [...D.colorLowA] },
        uColorHigh: { value: [...D.colorHighA] },
        uBgColor: { value: readBgColor(document.documentElement) },
        uFadeShape: {
          value: [D.fadeCx, D.fadeCy, D.fadeRx, D.fadeRy],
        },
      },
    });

    if (!p.uniformLocations) {
      console.error("Shader link failed", {
        v: gl.getShaderInfoLog(p.vertexShader),
        f: gl.getShaderInfoLog(p.fragmentShader),
      });
      return;
    }

    const mesh = new Mesh(gl, { geometry: geo, program: p });
    const scene = new Transform();
    mesh.setParent(scene);

    const onResize = (): void => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      r.setSize(w, h);
      p.uniforms.uR.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    };

    onResize();
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    let raf = 0;
    let visible = true;
    let onScreen = true;
    const t0 = performance.now();

    const onVisibility = (): void => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) onScreen = e.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    io.observe(el);

    const syncBg = (): void => {
      p.uniforms.uBgColor.value = readBgColor(document.documentElement);
    };
    const themeObserver = new MutationObserver(syncBg);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });
    syncBg();

    const sync = (): void => {
      const c = pr.current;
      p.uniforms.uV.value = [...(c.flowSpeed ?? D.flowSpeed)];
      p.uniforms.uS.value = c.scale ?? D.scale;
      p.uniforms.uB.value = c.brightness ?? D.brightness;
      p.uniforms.uColorLow.value = [...(c.colorLowA ?? D.colorLowA)];
      p.uniforms.uColorHigh.value = [...(c.colorHighA ?? D.colorHighA)];
      p.uniforms.uFadeShape.value = [
        c.fadeCx ?? D.fadeCx,
        c.fadeCy ?? D.fadeCy,
        c.fadeRx ?? D.fadeRx,
        c.fadeRy ?? D.fadeRy,
      ];
    };

    const tick = (): void => {
      if (visible && onScreen) {
        p.uniforms.uT.value = (performance.now() - t0) / 1000;
        sync();
        r.render({ scene });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (gl.canvas.parentElement === el) el.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={props.className ?? "absolute inset-0 h-full w-full opacity-60 grayscale mix-blend-screen pointer-events-none"}
    />
  );
}

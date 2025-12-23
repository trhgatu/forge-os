"use client";

import { useEffect, useRef } from "react";

export type ParticleMode = "dust" | "shimmer" | "leaves" | "snow";

interface ParticleCanvasProps {
  mode: ParticleMode;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export function ParticleCanvas({ mode, color }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    // Helper to parse tailwind/custom colors roughly or just use variable
    // For simplicity, we assume `color` is a hex or rgba string passed from parent
    // or we use a fixed color based on mode if needed.
    // The parent currently passes a tailwind class (e.g. "bg-emerald-100").
    // We need actual color values for Canvas.
    const getColorValue = (twClass: string): string => {
      if (twClass.includes("emerald")) return "167, 243, 208"; // emerald-200
      if (twClass.includes("amber")) return "253, 230, 138"; // amber-200
      if (twClass.includes("orange")) return "253, 186, 116"; // orange-200
      if (twClass.includes("white")) return "255, 255, 255";
      return "255, 255, 255";
    };

    const particleColor = getColorValue(color);

    const resize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const createParticle = (init = false): Particle => {
      const isSnow = mode === "snow";
      const isLeaves = mode === "leaves";
      const isShimmer = mode === "shimmer";

      return {
        x: Math.random() * width,
        y: init ? Math.random() * height : isSnow || isLeaves ? -10 : Math.random() * height,
        vx: isSnow
          ? Math.random() * 0.5 - 0.25
          : isLeaves
            ? Math.random() * 1 - 0.5
            : (Math.random() - 0.5) * 0.2,
        vy: isSnow
          ? Math.random() * 0.5 + 0.5
          : isLeaves
            ? Math.random() * 0.5 + 0.2
            : (Math.random() - 0.5) * 0.2,
        size: isShimmer ? Math.random() * 2 : Math.random() * 3 + 1,
        alpha: 0,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      };
    };

    const initParticles = () => {
      const count = width < 768 ? 30 : 60; // Fewer particles on mobile
      particles = Array.from({ length: count }, () => createParticle(true));
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Lifecycle
        p.life++;

        // Fade in/out
        if (p.life < 20) p.alpha = p.life / 20;
        else if (p.life > p.maxLife - 20) p.alpha = (p.maxLife - p.life) / 20;
        else p.alpha = 1;

        // Reset if dead or out of bounds
        if (p.life >= p.maxLife || p.y > height + 10 || p.x < -10 || p.x > width + 10) {
          particles[i] = createParticle();
        }

        // Draw
        ctx.beginPath();
        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha * 0.4})`;

        if (mode === "shimmer") {
          // Glow effect for shimmer
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(${particleColor}, ${p.alpha})`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });

      animationFrameId = requestAnimationFrame(update);
    };

    window.addEventListener("resize", resize);
    resize();
    initParticles();
    update();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, color]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60 mix-blend-screen"
    />
  );
}

'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SumiLeavesProps {
  containerRef: React.RefObject<HTMLElement | null>;
  count?: number;
}

export const SumiLeaves = ({ containerRef, count = 15 }: SumiLeavesProps) => {
  const [mounted, setMounted] = useState(false);
  const localRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current || !localRef.current) return;

    // Use gsap.context for bulletproof React 19 cleanup and rendering stability
    const ctx = gsap.context(() => {
      const leaves = gsap.utils.toArray<HTMLElement>('.sumi-leaf-item');
      const h = containerRef.current?.clientHeight || 900;
      const w = containerRef.current?.clientWidth || 600;

      const animateLeaf = (el: HTMLElement, isInitial = false) => {
        const startY = isInitial
          ? (gsap.getProperty(el, "y") as number)
          : gsap.utils.random(-120, -60);

        const startX = isInitial
          ? (gsap.getProperty(el, "x") as number)
          : gsap.utils.random(-80, w - 150);

        if (!isInitial) {
          gsap.set(el, {
            x: startX,
            y: startY,
            rotation: "random(0, 360)",
            rotationX: "random(0, 360)",
            rotationY: "random(0, 360)",
            scale: "random(0.65, 1.4)",
          });
        }

        gsap.to(el, {
          x: `+=${gsap.utils.random(150, 350)}`,
          y: h + 120,
          rotation: "+=random(360, 900)",
          rotationX: "+=random(180, 540)",
          rotationY: "+=random(180, 540)",
          duration: gsap.utils.random(10, 16),
          ease: "none",
          onComplete: () => animateLeaf(el, false),
        });
      };

      leaves.forEach((leaf) => {
        // 1. Initial random scatter across the container area on load
        gsap.set(leaf, {
          x: `random(-50, ${w - 100})`,
          y: `random(-50, ${h - 100})`,
          rotation: "random(0, 360)",
          rotationX: "random(0, 360)",
          rotationY: "random(0, 360)",
          scale: "random(0.65, 1.4)",
        });

        // 2. Start wind drift immediately
        animateLeaf(leaf, true);

        // 3. Dynamic scrolling reaction (scroll down makes leaves fall DOWNWARDS faster)
        gsap.to(leaf, {
          yPercent: 65,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          }
        });
      });
    }, localRef);

    return () => {
      ctx.revert(); // Instantly kills all active tweens, timelines, and ScrollTriggers
    };
  }, [mounted, containerRef]);

  if (!mounted) return null;

  return (
    <div ref={localRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10 select-none">
      {Array.from({ length: count }).map((_, idx) => {
        const leafNum = (idx % 5) + 1;
        return (
          <div
            key={idx}
            className="sumi-leaf-item absolute w-10 h-10 md:w-14 md:h-14 pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={`/images/leaf-${leafNum}.png`}
              alt={`Sumi Leaf ${leafNum}`}
              className="w-full h-full object-contain pointer-events-none select-none opacity-55 dark:opacity-75 transition-all duration-700"
            />
          </div>
        );
      })}
    </div>
  );
};

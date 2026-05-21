'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useTheme } from '@/contexts';

interface SumiLeavesProps {
  containerRef: React.RefObject<HTMLElement | null>;
  count?: number;
}

export function SumiLeaves({ containerRef, count = 15 }: SumiLeavesProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const localRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Fetch leaves array from ref
    const leaves = gsap.utils.toArray('.sumi-leaf-item', localRef.current);
    const h = containerRef.current.clientHeight || 700;
    const w = typeof window !== 'undefined' ? window.innerWidth : 1000;

    const animateLeaf = (el: any, isInitial = false) => {
      const startY = isInitial
        ? gsap.getProperty(el, "y") as number
        : gsap.utils.random(50, h - 100);

      if (!isInitial) {
        gsap.set(el, {
          x: -80,
          y: startY,
          rotation: "random(0, 360)",
          rotationX: "random(0, 360)",
          rotationY: "random(0, 360)",
          scale: "random(0.6, 1.3)",
        });
      }

      gsap.to(el, {
        x: w + 100,
        y: `+=${gsap.utils.random(-200, 200)}`,
        rotation: "+=random(360, 800)",
        rotationX: "+=random(180, 450)",
        rotationY: "+=random(180, 450)",
        duration: gsap.utils.random(15, 25),
        ease: "none",
        onComplete: () => animateLeaf(el, false),
      });
    };

    // Initialize position and trigger immediate drift animations
    leaves.forEach((leaf: any) => {
      gsap.set(leaf, {
        x: `random(0, ${w})`,
        y: `random(50, ${h} - 100)`,
        rotation: "random(0, 360)",
        rotationX: "random(0, 360)",
        rotationY: "random(0, 360)",
        scale: "random(0.6, 1.3)",
      });

      animateLeaf(leaf, true);
    });

    return () => {
      // Clean up GSAP animations on unmount
      leaves.forEach((leaf: any) => {
        gsap.killTweensOf(leaf);
      });
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
            className="sumi-leaf-item absolute w-8 h-8 md:w-11 md:h-11 pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              filter: isDark
                ? "grayscale(1) brightness(0) invert(1)"
                : "grayscale(1) brightness(0.2)"
            }}
          >
            <img
              src={`/images/leaf-${leafNum}.png`}
              alt={`Sumi Leaf ${leafNum}`}
              className="w-full h-full object-contain pointer-events-none select-none opacity-30 dark:opacity-45 transition-all duration-700"
            />
          </div>
        );
      })}
    </div>
  );
}

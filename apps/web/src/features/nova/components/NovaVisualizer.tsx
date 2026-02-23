"use client";

import { useEffect, useState } from "react";

import { cn } from "@/shared/lib/utils";

interface NovaVisualizerProps {
  isActive: boolean;
  bars?: number;
}

export function NovaVisualizer({ isActive, bars = 15 }: NovaVisualizerProps) {
  const [heights, setHeights] = useState<number[]>(() => Array.from({ length: bars }, () => 10));

  useEffect(() => {
    // 🧩 Reset state → chuyển sang microtask để tránh sync setState
    if (!isActive) {
      queueMicrotask(() => {
        setHeights(Array.from({ length: bars }, () => 10));
      });
      return;
    }

    // 🔊 Active visualizer
    const id = window.setInterval(() => {
      setHeights(Array.from({ length: bars }, () => 20 + Math.random() * 80));
    }, 120);

    return () => window.clearInterval(id);
  }, [isActive, bars]);

  return (
    <div className="mb-4 flex h-4 items-end gap-0.5 opacity-60">
      {heights.map((h, i) => (
        <div
          key={i}
          className={cn("w-1 bg-forge-cyan")}
          style={{
            height: `${h}%`,
            opacity: 1 - i * 0.05,
            transition: "height 120ms ease",
          }}
        />
      ))}
    </div>
  );
}

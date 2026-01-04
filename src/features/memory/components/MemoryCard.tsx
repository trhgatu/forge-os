"use client";

import type { Memory } from "@/shared/types/memory";
import { cn } from "@/shared/lib/utils";
import { SEASON_CONFIG, getSeasonFromMood } from "../config";
import Image from "next/image";

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
}

export function MemoryCard({ memory, onClick }: MemoryCardProps) {
  const season = getSeasonFromMood(memory.mood);
  const config = SEASON_CONFIG[season];

  // Crystal glow colors based on season
  const glowColors = {
    Spring: "rgba(16, 185, 129, 0.4)", // emerald
    Summer: "rgba(245, 158, 11, 0.4)", // amber
    Autumn: "rgba(220, 38, 38, 0.4)", // crimson
    Winter: "rgba(6, 182, 212, 0.4)", // cyan
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex min-h-[240px] cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-500 ease-out",
        "hover:-translate-y-3 hover:scale-[1.02]",
        "transform-gpu perspective-1000",
        // Glassmorphism base
        "backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent",
        "border border-white/20 hover:border-white/30",
        // Crystal shadow with seasonal glow
        "shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
        "hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)]"
      )}
      style={{
        boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset`,
      }}
    >
      {/* Ambient glow halo */}
      <div
        className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColors[season]}, transparent 70%)`,
        }}
      />

      {/* Frosted glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />

      {/* Refraction edge highlight */}
      <div className="absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Season atmospheric gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay",
          config.gradient
        )}
      />

      {/* Image with depth */}
      {memory.imageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={memory.imageUrl}
            alt={memory.title}
            fill
            className="h-full w-full object-cover opacity-40 transition-all duration-700 grayscale-[0.3] group-hover:scale-110 group-hover:opacity-60 group-hover:grayscale-0"
          />
          {/* Multi-layer depth gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
        </div>
      )}

      {/* Content with crystal clarity */}
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        {/* Crystalline season badge */}
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
              "backdrop-blur-xl bg-white/10 border border-white/20",
              "group-hover:bg-white/15 group-hover:border-white/30",
              "shadow-lg"
            )}
          >
            <config.icon
              size={14}
              className={cn(
                "transition-all duration-300 group-hover:scale-110 drop-shadow-lg",
                config.accent
              )}
            />
            <span className="text-white/90 group-hover:text-white">{config.label}</span>
          </div>
          {memory.analysis && (
            <div className="relative">
              <div
                className="absolute inset-0 animate-pulse blur-sm"
                style={{ background: glowColors[season] }}
              />
              <span className={cn("relative text-sm", config.accent)}>●</span>
            </div>
          )}
        </div>

        {/* Title + description with premium typography */}
        <div className="mt-auto space-y-3">
          <h3 className="text-2xl font-display font-medium leading-tight text-white transition-all duration-300 group-hover:translate-x-1 drop-shadow-lg">
            {memory.title}
          </h3>

          {/* Crystal divider */}
          <div className="relative h-px w-12 group-hover:w-24 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/40 to-transparent" />
            <div className="absolute inset-0 blur-sm bg-gradient-to-r from-white/40 to-transparent" />
          </div>

          <p className="line-clamp-2 font-serif text-sm font-light leading-relaxed text-gray-200 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
            {memory.content}
          </p>
        </div>

        {/* Frosted footer */}
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-mono backdrop-blur-sm">
          <span className="text-gray-400 transition-colors duration-300 group-hover:text-white">
            {memory.date.toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="uppercase tracking-wider text-gray-500 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:text-gray-300">
            #{memory.mood}
          </span>
        </div>
      </div>

      {/* Hover ripple effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent animate-pulse" />
      </div>
    </button>
  );
}

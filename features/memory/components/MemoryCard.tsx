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

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex min-h-[280px] cursor-pointer flex-col overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-700 ease-out",
        "hover:-translate-y-2 hover:shadow-2xl",
        config.bg,
        config.border
      )}
    >
      {/* Atmospheric background */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-br opacity-40 transition-opacity duration-700 group-hover:opacity-60",
          config.gradient
        )}
      />

      {/* Spring diffused texture */}
      {season === "Spring" && (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-50" />
        </>
      )}
      {memory.imageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={memory.imageUrl}
            alt={memory.title}
            fill
            className="h-full w-full object-cover opacity-30 transition-all duration-1000 grayscale group-hover:scale-105 group-hover:opacity-40 group-hover:grayscale-50"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-6">
        {/* Top indicator */}
        <div className="mb-6 flex items-start justify-between opacity-80 transition-opacity group-hover:opacity-100">
          <div
            className={cn(
              "flex items-center gap-2 rounded-full border bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md",
              config.accent,
              config.border
            )}
          >
            <config.icon size={12} />
            {config.label}
          </div>
          {memory.analysis && (
            <span className={cn("animate-pulse", config.accent)}>{/* small sparkle dot */}●</span>
          )}
        </div>

        <div className="flex-1" />

        {/* Title + description */}
        <div className="mt-auto">
          <h3 className="mb-3 text-2xl font-display font-medium leading-tight text-white transition-transform duration-500 group-hover:translate-x-1">
            {memory.title}
          </h3>

          <div className="mb-4 h-px w-12 opacity-50 transition-all duration-700 group-hover:w-full bg-white/40" />

          <p className="line-clamp-2 font-serif text-sm font-light leading-relaxed text-gray-300 opacity-80 transition-opacity group-hover:opacity-100">
            {memory.description}
          </p>
        </div>

        {/* Footer meta */}
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-[10px] font-mono text-gray-500">
          <span>
            {memory.date.toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="uppercase tracking-wider opacity-60">#{memory.mood}</span>
        </div>
      </div>
    </button>
  );
}

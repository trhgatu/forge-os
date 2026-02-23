"use client";

import Image from "next/image";

import { cn } from "@/shared/lib/utils";
import type { Memory } from "@/shared/types/memory";

import { SEASON_CONFIG, getSeasonFromMood } from "../config";


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
        "group relative w-full cursor-pointer transition-all duration-500 ease-out",
        "hover:-translate-y-4 hover:scale-[1.02]",
        "transform-gpu"
      )}
    >
      {/* Polaroid Frame - like picking up a photo */}
      <div
        className="relative p-4 pb-16 shadow-lg rounded-sm transition-all duration-500 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
        style={{
          background: "linear-gradient(135deg, #fdfcfb 0%, #f7f5f2 100%)",
        }}
      >
        {/* Subtle glow when lifted */}
        <div
          className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 rounded-sm"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(214, 211, 209, 0.15), transparent 70%)`,
          }}
        />
        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none rounded-sm"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Aged edges */}
        <div className="absolute inset-0 rounded-sm shadow-[inset_0_0_20px_rgba(139,115,85,0.1)] pointer-events-none" />

        {/* Image Container with vintage filter */}
        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 rounded-sm">
          {memory.imageUrl ? (
            <>
              <Image
                src={memory.imageUrl}
                alt={memory.title}
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-110"
                style={{
                  filter: "sepia(0.15) contrast(1.1) brightness(0.95)",
                }}
              />
              {/* Film grain overlay */}
              <div
                className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
            </>
          ) : (
            // Vintage placeholder
            <div
              className="absolute inset-0 flex items-center justify-center opacity-10"
              style={{
                background: `radial-gradient(circle, ${
                  season === "Spring"
                    ? "#8b7355"
                    : season === "Summer"
                      ? "#d4a574"
                      : season === "Autumn"
                        ? "#a0522d"
                        : "#708090"
                }, transparent 70%)`,
              }}
            >
              <config.icon size={64} className="text-gray-400" />
            </div>
          )}

          {/* Vignette - stronger for vintage feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.15)] pointer-events-none" />
        </div>

        {/* Handwritten Caption Area */}
        <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
          {/* Title - handwritten style */}
          <h3
            className="text-base text-gray-700 line-clamp-2 leading-relaxed transition-colors duration-500 group-hover:text-gray-900"
            style={{
              fontFamily: "'Caveat', 'Dancing Script', cursive",
              fontWeight: 500,
            }}
          >
            {memory.title}
          </h3>

          {/* Date - typewriter style */}
          <p className="font-mono text-[10px] text-gray-500 tracking-wide">
            {memory.date.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Vintage stamp badge */}
        <div className="absolute top-6 right-6">
          <div
            className={cn(
              "relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest",
              "backdrop-blur-sm shadow-lg border-2 transition-all duration-500",
              "group-hover:scale-110 group-hover:rotate-6"
            )}
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              borderColor:
                season === "Spring"
                  ? "#8b7355"
                  : season === "Summer"
                    ? "#d4a574"
                    : season === "Autumn"
                      ? "#a0522d"
                      : "#708090",
              color:
                season === "Spring"
                  ? "#8b7355"
                  : season === "Summer"
                    ? "#d4a574"
                    : season === "Autumn"
                      ? "#a0522d"
                      : "#708090",
              borderStyle: "dashed",
            }}
          >
            <config.icon size={11} />
            {config.label}
          </div>
        </div>

        {/* Tape effect on corners */}
        <div className="absolute -top-2 left-8 w-16 h-6 bg-gradient-to-b from-gray-200/60 to-gray-100/40 backdrop-blur-sm rotate-[-5deg] shadow-sm" />
        <div className="absolute -top-2 right-8 w-16 h-6 bg-gradient-to-b from-gray-200/60 to-gray-100/40 backdrop-blur-sm rotate-[5deg] shadow-sm" />
      </div>

      {/* Soft shadow beneath (aged paper on surface) */}
      <div className="absolute -bottom-2 left-4 right-4 h-6 bg-gradient-to-b from-transparent to-black/15 blur-2xl -z-10 transition-all duration-700 group-hover:to-black/25" />
    </button>
  );
}

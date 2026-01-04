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
        "group relative w-full cursor-pointer transition-all duration-500 ease-out",
        "hover:-translate-y-2 hover:rotate-1",
        "transform-gpu"
      )}
    >
      {/* Polaroid Frame - White border */}
      <div className="bg-white p-3 pb-12 shadow-2xl rounded-sm transition-shadow duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          {memory.imageUrl ? (
            <Image
              src={memory.imageUrl}
              alt={memory.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
            />
          ) : (
            // Placeholder with season color
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                "bg-gradient-to-br opacity-20 group-hover:opacity-30"
              )}
              style={{
                background: `linear-gradient(135deg, ${
                  season === "Spring"
                    ? "#10b981"
                    : season === "Summer"
                      ? "#f59e0b"
                      : season === "Autumn"
                        ? "#dc2626"
                        : "#06b6d4"
                }, transparent)`,
              }}
            >
              <config.icon size={48} className="text-gray-400" />
            </div>
          )}

          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Caption Area (Polaroid bottom) */}
        <div className="absolute bottom-3 left-3 right-3 space-y-1">
          {/* Title - handwritten style */}
          <h3 className="font-serif text-sm text-gray-800 line-clamp-1 transition-colors duration-300 group-hover:text-black">
            {memory.title}
          </h3>

          {/* Date - small print */}
          <p className="font-mono text-[10px] text-gray-500">
            {memory.date.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Season badge - like a sticker */}
        <div className="absolute top-5 right-5">
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider",
              "bg-white/90 backdrop-blur-sm shadow-md border transition-all duration-300",
              "group-hover:scale-110"
            )}
            style={{
              borderColor:
                season === "Spring"
                  ? "#10b981"
                  : season === "Summer"
                    ? "#f59e0b"
                    : season === "Autumn"
                      ? "#dc2626"
                      : "#06b6d4",
              color:
                season === "Spring"
                  ? "#10b981"
                  : season === "Summer"
                    ? "#f59e0b"
                    : season === "Autumn"
                      ? "#dc2626"
                      : "#06b6d4",
            }}
          >
            <config.icon size={10} />
            {config.label}
          </div>
        </div>
      </div>

      {/* Soft shadow beneath (like photo on surface) */}
      <div className="absolute -bottom-1 left-2 right-2 h-4 bg-black/10 blur-xl -z-10 transition-all duration-500 group-hover:bg-black/20" />
    </button>
  );
}

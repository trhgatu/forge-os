"use client";

import { Calendar, ChevronRight, Heart, Mic, Sparkles, Tag, X } from "lucide-react";

import type { Memory } from "@/shared/types/memory";
import { cn } from "@/shared/lib/utils";
import { SEASON_CONFIG, getSeasonFromMood } from "../config";
import Image from "next/image";

interface MemoryDetailPanelProps {
  memory: Memory | null;
  onClose: () => void;
  onAnalyze: (id: string) => void;
  isAnalyzing: boolean;
}

export function MemoryDetailPanel({
  memory,
  onClose,
  onAnalyze,
  isAnalyzing,
}: MemoryDetailPanelProps) {
  if (!memory) return null;

  const season = getSeasonFromMood(memory.mood);
  const config = SEASON_CONFIG[season];

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-100 flex w-full flex-col border-l bg-black/90 shadow-2xl backdrop-blur-2xl md:w-[500px] slide-in-panel",
        config.border
      )}
    >
      {/* ambience */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-linear-to-br opacity-20",
          config.gradient
        )}
      />
      {season === "Spring" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        />
      )}
      <div className="relative z-10 flex shrink-0 items-start justify-between border-b border-white/5 bg-black/40 p-6">
        <div>
          <div
            className={cn(
              "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest",
              config.accent
            )}
          >
            <config.icon size={14} />
            Season of {config.label}
          </div>
          <h2 className="text-2xl font-display font-bold leading-tight text-white">
            {memory.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* content */}
      <div className="relative z-10 flex-1 space-y-8 overflow-y-auto p-6">
        {/* image */}
        {memory.imageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
            <Image
              src={memory.imageUrl}
              alt={memory.title}
              fill
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* meta strip */}
        <div className="flex items-center gap-4 border-b border-white/5 pb-6 text-xs font-mono text-gray-400">
          <span className="flex items-center gap-2">
            <Calendar size={12} />
            {memory.date.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="flex items-center gap-2 capitalize">
            <Heart size={12} /> {memory.mood}
          </span>
        </div>

        {/* description */}
        <div>
          <p className="whitespace-pre-line font-serif text-base leading-relaxed text-gray-200">
            {memory.content}
          </p>
        </div>

        {/* tags */}
        {memory.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {memory.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400"
              >
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* AI analysis */}
        <div className="border-t border-white/5 pt-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <Sparkles size={14} className="text-forge-accent" />
              Neural Reflection
            </h3>

            {!memory.analysis && (
              <button
                type="button"
                onClick={() => onAnalyze(memory.id)}
                disabled={isAnalyzing}
                className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs transition-all hover:bg-forge-accent hover:text-white disabled:opacity-50"
              >
                {isAnalyzing ? <Sparkles size={12} className="animate-spin" /> : <Mic size={12} />}
                {isAnalyzing ? "Analyzing..." : "Analyze"}
              </button>
            )}
          </div>

          {memory.analysis ? (
            <div className="space-y-4 animate-in slide-in-from-bottom-4">
              {/* Nova Whisper */}
              <div
                className={cn(
                  "relative overflow-hidden rounded-xl border bg-white/2 p-5",
                  config.border
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-linear-to-br opacity-5",
                    config.gradient
                  )}
                />
                <div className="relative z-10">
                  <div
                    className={cn(
                      "mb-2 text-[10px] font-mono uppercase tracking-widest",
                      config.accent
                    )}
                  >
                    Nova Whisper
                  </div>
                  <p className="text-sm italic text-gray-300">&quot;{config.whisper}&quot;</p>
                </div>
              </div>

              {/* core meaning */}
              <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                <div className="mb-2 text-[10px] text-gray-500 uppercase tracking-widest">
                  Core Meaning
                </div>
                <p className="text-sm text-white">{memory.analysis.coreMeaning}</p>
              </div>

              {/* pattern */}
              <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                <div className="mb-2 text-[10px] text-gray-500 uppercase tracking-widest">
                  Detected Pattern
                </div>
                <p className="text-sm text-gray-300">{memory.analysis.emotionalPattern}</p>
              </div>

              {/* timeline connection */}
              {memory.analysis.timelineConnection && (
                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                    <ChevronRight size={10} />
                    Timeline Connection
                  </div>
                  <p className="text-sm text-gray-300">{memory.analysis.timelineConnection}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-white/10 bg-white/1 py-8 text-center">
              <p className="text-xs text-gray-500">
                Analyze this memory to reveal hidden patterns and connections.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

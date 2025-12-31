import React from "react";
import { Heart, Sparkle } from "lucide-react";
import type { Quote } from "@/shared/types/quote";
import { cn } from "@/shared/lib/utils";
import { SEASON_CONFIG, getSeasonFromMood } from "../../memory/config/seasons";

export function QuoteCard({
  quote,
  onClick,
  onToggleFav,
}: {
  quote: Quote;
  onClick: () => void;
  onToggleFav: (e: React.MouseEvent) => void;
}) {
  const season = getSeasonFromMood(quote.mood);
  const config = SEASON_CONFIG[season];
  const isLong = quote.text.length > 150;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden p-8 pl-12 rounded-r-xl rounded-l-[2px] bg-[#111111] border border-white/5 transition-all duration-700 cursor-pointer",
        "hover:shadow-2xl hover:-translate-y-1 hover:bg-[#141414]",
        // Dynamic colored shadow based on config
        `hover:shadow-[0_10px_40px_-10px_${config.particleColor.replace("bg-", "")}]`
      )}
    >
      {/* 1. The Neon Spine (Glowing Gutter) */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-[4px] transition-all duration-500 shadow-[0_0_15px_currentColor]",
          config.particleColor.replace("bg-", "bg-")
        )}
      />

      {/* 2. God Ray / Scanner Light (Cinematic Sweep) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-in-out pointer-events-none" />

      {/* 3. Texture (Fine Grain Vellum) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Header: Silver Foil Metadata */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex flex-col gap-1">
          <span
            className={cn(
              "text-[10px] font-sans font-bold tracking-[0.3em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600 bg-[length:200%_auto] bg-right group-hover:bg-left transition-all duration-1000"
            )}
          >
            Ref — {quote.id.slice(0, 4)}
          </span>
        </div>

        <button
          onClick={onToggleFav}
          className={cn(
            "transition-all duration-300 hover:scale-110",
            quote.isFavorite ? "text-red-500" : "text-gray-700 hover:text-white"
          )}
        >
          <Heart size={16} fill={quote.isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Content: High Contrast Cinema Typography */}
      <blockquote
        className={cn(
          "font-serif text-gray-400 group-hover:text-gray-100 transition-colors duration-700 leading-relaxed relative z-10",
          isLong ? "text-base" : "text-2xl"
        )}
      >
        &quot;{quote.text}&quot;
      </blockquote>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
        <cite className="text-xs font-serif italic text-gray-500 group-hover:text-amber-500/80 transition-colors duration-500">
          — {quote.author || "Unknown"}
        </cite>

        <div
          className={cn(
            "px-2 py-1 rounded-[2px] border border-white/5 bg-black/20 text-[9px] font-sans tracking-widest uppercase text-gray-600 group-hover:text-white group-hover:border-white/10 transition-all"
          )}
        >
          {quote.mood}
        </div>
      </div>

      {/* Decorative Rotating Watermark */}
      <Sparkle
        className={cn(
          "absolute -bottom-6 -right-6 w-32 h-32 text-white/[0.01] group-hover:text-white/[0.04] transition-all duration-[2000ms] group-hover:rotate-90",
          config.accent.replace("text-", "text-")
        )}
        strokeWidth={0.5}
      />
    </div>
  );
}

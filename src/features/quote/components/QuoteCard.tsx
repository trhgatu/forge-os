import React from "react";
import { Quote as QuoteIcon, Heart } from "lucide-react";
import type { Quote } from "@/shared/types/quote";
import { cn } from "@/shared/lib/utils";
import { SEASON_CONFIG, getSeasonFromMood } from "../../memory/config/seasons";
import { GlassCard } from "../../forge-lab/components/GlassCard"; // Reuse standard component

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
    <GlassCard
      onClick={onClick}
      className={cn(
        "group h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-1",
        config.border
      )}
    >
      {/* Decorative Glow */}
      <div
        className={cn(
          "absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700",
          config.bg
        )}
      />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={cn("p-2 rounded-lg bg-white/5", config.accent)}>
          <QuoteIcon size={16} className="opacity-70" />
        </div>

        <button
          onClick={onToggleFav}
          className={cn(
            "p-2 rounded-full hover:bg-white/10 transition-colors z-20",
            quote.isFavorite ? "text-red-500" : "text-gray-500 hover:text-red-400"
          )}
        >
          <Heart size={16} fill={quote.isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <blockquote
        className={cn(
          "font-display text-gray-200 leading-relaxed mb-6 flex-1",
          isLong ? "text-sm" : "text-lg font-medium"
        )}
      >
        &quot;{quote.text}&quot;
      </blockquote>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
        <div className="flex items-center gap-2">
          <div className={cn("w-1 h-6 rounded-full opacity-50", config.particleColor)} />
          <div className="flex flex-col">
            <cite className="text-xs font-bold text-white not-italic font-mono uppercase tracking-wider">
              {quote.author || "Unknown"}
            </cite>
            <span className="text-[10px] text-gray-500">{quote.tags[0] || "Wisdom"}</span>
          </div>
        </div>

        {/* Subtle Mood Indicator */}
        <div
          className={cn(
            "text-[10px] uppercase tracking-widest opacity-60 font-mono",
            config.accent
          )}
        >
          {quote.mood}
        </div>
      </div>
    </GlassCard>
  );
}

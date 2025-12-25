import React from "react";
import { Quote as QuoteIcon, Heart } from "lucide-react";
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
        "group h-full relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl border bg-black/40 backdrop-blur-xl hover:bg-white/[0.03]",
        config.border
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700",
          `shadow-[0_0_30px_${config.accent}]`
        )}
      />
      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <QuoteIcon size={20} className={cn("opacity-50", config.accent)} />
          <button
            onClick={onToggleFav}
            className={cn(
              "p-2 rounded-full hover:bg-white/10 transition-colors",
              quote.isFavorite ? "text-red-500" : "text-gray-600"
            )}
          >
            <Heart size={16} fill={quote.isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <blockquote
          className={cn(
            "font-display text-gray-100 leading-relaxed mb-6",
            isLong ? "text-sm" : "text-lg font-medium"
          )}
        >
          {quote.text}
        </blockquote>
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-1 h-6 rounded-full",
                config.bg.replace("bg-", "bg-opacity-50 "),
                config.accent
              )}
              style={{ backgroundColor: "currentColor" }}
            />
            <div className="flex flex-col">
              <cite className="text-xs font-bold text-white not-italic font-mono">
                {quote.author}
              </cite>
              <span className="text-[10px] text-gray-500">{quote.tags[0] || "Wisdom"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

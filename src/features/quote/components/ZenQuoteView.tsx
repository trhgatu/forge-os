import React, { useEffect, useState } from "react";
import { Minimize2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Quote } from "@/shared/types/quote";
import { SEASON_CONFIG, getSeasonFromMood } from "../../memory/config/seasons";

interface ZenQuoteViewProps {
  quote: Quote;
  onClose: () => void;
}

export function ZenQuoteView({ quote, onClose }: ZenQuoteViewProps) {
  const season = getSeasonFromMood(quote.mood);
  const config = SEASON_CONFIG[season];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay setting visibility to allow for mounting transition
    const timer = setTimeout(() => setIsVisible(true), 10);

    // Add escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-all duration-1000",
        isVisible ? "opacity-100 bg-black" : "opacity-0 bg-transparent"
      )}
    >
      {/* Dynamic Background */}
      <div
        className={cn(
          "absolute inset-0 opacity-20 transition-all duration-[3000ms] animate-pulse",
          config.bg
        )}
      />

      {/* Gradient Orbs */}
      <div
        className={cn(
          "absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 animate-blob mix-blend-screen",
          config.particleColor
        )}
      />
      <div
        className={cn(
          "absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 animate-blob animation-delay-2000 mix-blend-screen",
          config.accent.replace("text-", "bg-")
        )}
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

      {/* Close Button (Minimalist) */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors p-4 rounded-full hover:bg-white/5 group"
      >
        <Minimize2 size={24} className="group-hover:scale-110 transition-transform" />
        <span className="sr-only">Exit Zen Mode</span>
      </button>

      {/* Content */}
      <div
        className={cn(
          "relative z-10 max-w-5xl px-8 text-center transform transition-all duration-1000 delay-300",
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
        )}
      >
        <blockquote
          className={cn(
            "font-display font-medium leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60",
            quote.text.length > 100 ? "text-4xl md:text-6xl" : "text-5xl md:text-7xl lg:text-8xl"
          )}
        >
          &quot;{quote.text}&quot;
        </blockquote>

        <div className="mt-12 flex flex-col items-center gap-4 opacity-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000 fill-mode-forwards">
          <cite className="font-mono text-lg md:text-xl text-forge-cyan uppercase tracking-[0.2em] not-italic">
            {quote.author || "Unknown"}
          </cite>

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <span
            className={cn("text-xs font-mono uppercase tracking-widest opacity-50", config.accent)}
          >
            {quote.mood}
          </span>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Delay setting visibility to allow for mounting transition
    const timer = setTimeout(() => setIsVisible(true), 10);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    // Add escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, [onClose]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-all duration-1000",
        isVisible ? "opacity-100 bg-black" : "opacity-0 bg-transparent"
      )}
    >
      {/* 1. Deep Void Background (Absolute Black) */}
      <div className="absolute inset-0 bg-[#000000]" />

      {/* 2. Mood Tint (Barely Visible - 10% Opacity) */}
      <div
        className={cn("absolute inset-0 opacity-10 transition-colors duration-[3000ms]", config.bg)}
      />

      {/* 3. Subtle Nebula Glows (Non-Intrusive) */}
      <div
        className={cn(
          "absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[150px] opacity-10 animate-[spin_60s_linear_infinite] mix-blend-overlay",
          config.particleColor
        )}
      />
      <div
        className={cn(
          "absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full blur-[150px] opacity-5 animate-[pulse_10s_ease-in-out_infinite] mix-blend-overlay",
          config.accent.replace("text-", "bg-")
        )}
      />

      {/* 4. Cinematic Noise (Texture) */}
      <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />

      {/* Close Button (High Contrast) */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-50 text-white/30 hover:text-white transition-colors p-4 rounded-full hover:bg-white/10 group"
      >
        <Minimize2 size={24} className="group-hover:scale-110 transition-transform" />
        <span className="sr-only">Exit Zen Mode</span>
      </button>

      {/* Content Container */}
      <div
        className={cn(
          "relative z-10 max-w-6xl px-8 text-center transform transition-all duration-1000 delay-300",
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
        )}
      >
        <blockquote
          className={cn(
            "font-quote font-medium leading-tight text-white drop-shadow-2xl whitespace-pre-wrap break-words italic",
            quote.text.length > 100 ? "text-3xl md:text-5xl" : "text-4xl md:text-6xl lg:text-7xl"
          )}
        >
          &quot;{quote.text}&quot;
        </blockquote>

        <div className="mt-16 flex flex-col items-center gap-6 opacity-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 fill-mode-forwards">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <cite className="font-mono text-xl md:text-2xl text-white/80 uppercase tracking-[0.2em] not-italic drop-shadow-lg">
            {quote.author || "Unknown"}
          </cite>

          <span
            className={cn(
              "text-xs font-mono uppercase tracking-[0.3em] text-white/40",
              config.accent
            )}
          >
            {quote.mood} Protocol
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}

import { Heart } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/shared/lib/utils";
import type { Quote } from "@/shared/types/quote";

import { SEASON_CONFIG, getSeasonFromMood } from "../../memory/config/seasons";

interface QuoteCardProps {
  quote: Quote;
  onClick: () => void;
  onToggleFav: (e: React.MouseEvent) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function QuoteCard({ quote, onClick, onToggleFav, onEdit, onDelete }: QuoteCardProps) {
  const season = getSeasonFromMood(quote.mood);
  const config = SEASON_CONFIG[season];
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Randomized Floating Animation
  const [{ floatDuration, floatDelay }] = useState(() => ({
    floatDuration: `${5 + Math.random() * 3}s`,
    floatDelay: `${Math.random() * 2}s`,
  }));

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleLongPress = () => {
    setShowContextMenu(true);
  };

  const [pressTimer, setPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseDown = () => {
    const timer = setTimeout(() => {
      handleLongPress();
    }, 500);
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = () => setShowContextMenu(false);
    if (showContextMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showContextMenu]);

  // Wabi-Sabi "No-Card" Floating Design
  return (
    <div
      onClick={onClick}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      className="relative group cursor-pointer h-full animate-float"
      style={{
        animationDuration: floatDuration,
        animationDelay: floatDelay,
      }}
    >
      {/*
         Main Container - Purely structure, no visual background/border
         Even on hover, we don't show a box. Just scaling.
      */}
      <div
        className="h-full relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500
                      border border-transparent bg-transparent
                      group-hover:scale-[1.02]"
      >
        {/* -- Background Effects (Only visible on hover) -- */}

        {/* 1. Subtle Glow around text area, not full card */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* 2. Mood Blob (Very Subtle) */}
        <div
          className={cn(
            "absolute -top-[50%] -right-[50%] w-[100%] h-[100%] rounded-full opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 blur-[80px] pointer-events-none",
            config.particleColor.replace("bg-", "bg-")
          )}
        />

        {/* 3. Giant Quote Mark Watermark (Pops on hover) */}
        <div className="absolute top-0 left-0 text-white/[0.02] group-hover:text-white/[0.08] transition-colors duration-500 pointer-events-none font-quote text-8xl leading-none select-none">
          “
        </div>

        {/* -- Content -- */}
        <div className="flex flex-col h-full p-6 relative z-10">
          {/* Header: Tech Meta (Fade in on Hover) */}
          <div className="flex items-center justify-between mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2">
              <div
                className={cn("w-1.5 h-1.5 rounded-full", config.accent.replace("text-", "bg-"))}
              />
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">
                {quote.mood}
              </span>
            </div>
            {quote.isFavorite && (
              <Heart
                size={12}
                fill="currentColor"
                className="text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.5)]"
              />
            )}
          </div>

          {/* Body: Quote Text (Floating in void) */}
          <div className="flex-1 flex flex-col justify-center min-h-[60px] pl-2">
            <p className="font-quote text-xl md:text-2xl text-white/80 leading-relaxed italic group-hover:text-white group-hover:text-shadow-sm transition-all duration-500 whitespace-pre-wrap break-words tracking-wide">
              &quot;{quote.text}&quot;
            </p>
          </div>

          {/* Footer: Author (Subtle) */}
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-transparent group-hover:border-white/5 transition-colors duration-500">
            <div className="flex flex-col">
              <cite className="text-sm font-sans font-medium text-white/50 not-italic group-hover:text-white/80 transition-colors">
                — {quote.author || "Unknown"}
              </cite>
            </div>

            {/* Interactive Dot (Reveals on Hover) */}
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
              <div className="w-1 h-1 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </div>

      {showContextMenu && (
        <div
          className="fixed z-50 bg-[#09090b]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-1 min-w-[160px]"
          style={{ left: menuPosition.x, top: menuPosition.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFav(e);
              setShowContextMenu(false);
            }}
            className="w-full text-left px-4 py-2.5 text-xs font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-wide"
          >
            <Heart
              size={12}
              fill={quote.isFavorite ? "currentColor" : "none"}
              className={quote.isFavorite ? "text-fuchsia-400" : ""}
            />
            {quote.isFavorite ? "Unfavorite" : "Favorite"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
              setShowContextMenu(false);
            }}
            className="w-full text-left px-4 py-2.5 text-xs font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors uppercase tracking-wide"
          >
            Edit Log
          </button>
          <div className="h-px bg-white/5 my-1" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              setShowContextMenu(false);
            }}
            className="w-full text-left px-4 py-2.5 text-xs font-medium text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors uppercase tracking-wide"
          >
            Delete Log
          </button>
        </div>
      )}
    </div>
  );
}

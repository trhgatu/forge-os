import React, { useState } from "react";
import { Trash2, X, Sparkles, Pencil, Maximize2 } from "lucide-react";
import { toast } from "sonner";
import type { Quote } from "@/shared/types/quote";
import { cn } from "@/shared/lib/utils";
import { SEASON_CONFIG, getSeasonFromMood } from "../../memory/config/seasons";
import { ZenQuoteView } from "./ZenQuoteView";

export function QuoteDetailPanel({
  quote,
  onClose,
  onAnalyze,
  onDelete,
  onEdit,
  isAnalyzing,
}: {
  quote: Quote;
  onClose: () => void;
  onAnalyze: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (quote: Quote) => void;
  isAnalyzing: boolean;
}) {
  const season = getSeasonFromMood(quote.mood);
  const config = SEASON_CONFIG[season];
  const [isZenMode, setIsZenMode] = useState(false);

  const handleDeleteClick = () => {
    toast.custom((t) => (
      <div className="flex flex-col gap-2 rounded-xl border border-red-500/20 bg-black/90 p-4 text-sm text-white shadow-xl backdrop-blur-md animate-in zoom-in-95 duration-200">
        <p className="font-bold">Dissolve this wisdom?</p>
        <p className="text-gray-400">It will fade into the void.</p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t);
              onDelete(quote.id);
            }}
            className="rounded-md bg-red-500/20 px-3 py-1.5 text-red-200 transition-colors hover:bg-red-500/30 font-medium"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t)}
            className="rounded-md bg-white/10 px-3 py-1.5 text-gray-300 transition-colors hover:bg-white/20"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  if (isZenMode) {
    return <ZenQuoteView quote={quote} onClose={() => setIsZenMode(false)} />;
  }

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-[#050505]/95 backdrop-blur-3xl border-l border-white/[0.08] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 overflow-y-auto slide-in-panel">
      {/* Background Ambience */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-10 transition-all duration-[2000ms]",
          config.bg
        )}
      />
      <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 min-h-full flex flex-col p-8 md:p-12">
        {/* Header Control Bar */}
        <div className="flex justify-between items-center mb-16">
          <div
            className={cn(
              "flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02]",
              config.accent
            )}
          >
            <config.icon size={12} />
            <span>{season} Protocol</span>
          </div>

          <button
            onClick={onClose}
            className="group p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all duration-300"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-8">
            <QuoteDetailMetadata quote={quote} />
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            &quot;{quote.text}&quot;
          </h2>

          <div className="flex items-center gap-6">
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            <div className="text-right">
              <p className="font-mono text-sm text-white/60 uppercase tracking-widest mb-1">
                {quote.author || "Unknown"}
              </p>
              {quote.source && (
                <p className="font-sans text-xs text-white/30 italic">{quote.source}</p>
              )}
            </div>
          </div>
        </div>

        {/* Control Deck (Floating Dock) */}
        <div className="mt-16 bg-[#111111]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          {/* Hover Glow */}
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none",
              config.bg
            )}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <button
              onClick={() => setIsZenMode(true)}
              className="flex-1 flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white rounded-xl py-4 px-6 transition-all duration-300 group/btn"
            >
              <Maximize2
                size={16}
                className="text-forge-cyan group-hover/btn:scale-110 transition-transform"
              />
              <span className="text-xs font-bold uppercase tracking-[0.2em] group-hover/btn:text-forge-cyan transition-colors">
                Enter Zen Mode
              </span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onAnalyze(quote.id)}
                disabled={isAnalyzing}
                className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 text-white/60 hover:text-forge-cyan transition-all"
                title="AI Analysis"
              >
                <Sparkles size={18} className={cn(isAnalyzing && "animate-spin")} />
              </button>

              <div className="w-px h-10 bg-white/10 mx-2" />

              <button
                onClick={() => onEdit(quote)}
                className="p-4 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 text-white/60 hover:text-white transition-all"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={handleDeleteClick}
                className="p-4 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-white/60 hover:text-red-400 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Tech Footer */}
          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-[9px] uppercase tracking-widest text-white/20 font-mono">
            <span>
              ID: {quote.id.split("-")[0]} {"//"} {quote.mood}
            </span>
            <div className="flex gap-3">
              {quote.tags?.map((tag) => (
                <span key={tag} className="text-white/30">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuoteDetailMetadata({ quote }: { quote: Quote }) {
  return (
    <div className="flex flex-wrap gap-2">
      <span
        className={cn(
          "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border border-white/10 bg-white/5 text-white/60"
        )}
      >
        {quote.mood}
      </span>
      {quote.isFavorite && (
        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border border-red-500/20 bg-red-500/10 text-red-400 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" /> Favorite
        </span>
      )}
    </div>
  );
}

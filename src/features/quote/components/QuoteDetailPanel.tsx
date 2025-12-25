import React from "react";
import { Trash2, X, Tag, Sparkles, Pencil } from "lucide-react";
import { toast } from "sonner";
import type { Quote } from "@/shared/types/quote";
import { cn } from "@/shared/lib/utils";
import { SEASON_CONFIG, getSeasonFromMood } from "../../memory/config/seasons";

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

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-black/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 overflow-y-auto slide-in-panel">
      {/* Visual Effects Layer */}
      <div className={cn("pointer-events-none absolute inset-0 opacity-20", config.bg)} />
      <div
        className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="p-6 border-b border-white/5 flex items-start justify-between bg-black/40 sticky top-0 backdrop-blur-md z-20">
          <div>
            <div
              className={cn(
                "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest",
                config.accent
              )}
            >
              <config.icon size={12} />
              Mood: {quote.mood}
            </div>
            <h2 className="text-2xl font-display font-bold leading-tight text-white line-clamp-2">
              {quote.text}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-4">
            <button
              onClick={() => onEdit(quote)}
              className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              title="Edit Quote"
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={handleDeleteClick}
              className="p-2 hover:bg-red-500/10 rounded-full text-gray-400 hover:text-red-500 transition-colors"
              title="Delete Quote"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8 flex-1">
          <div>
            <blockquote className="font-display text-2xl font-medium text-white leading-relaxed mb-4">
              {quote.text}
            </blockquote>
            <cite className="font-mono text-sm uppercase tracking-wider text-forge-cyan not-italic block">
              — {quote.author}
            </cite>
            {quote.source && (
              <span className="font-mono text-[10px] text-gray-500 mt-2 block uppercase tracking-widest">
                Source: {quote.source}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {quote.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono uppercase tracking-wider text-gray-300 flex items-center gap-1"
              >
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles size={14} className="text-forge-accent" /> Neural Decoding
              </h3>
              {!quote.analysis && (
                <button
                  onClick={() => onAnalyze(quote.id)}
                  disabled={isAnalyzing}
                  className="text-xs bg-white/5 hover:bg-forge-accent hover:text-white px-3 py-1.5 rounded-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <Sparkles size={12} className="animate-spin" />
                  ) : (
                    <Sparkles size={12} />
                  )}
                  {isAnalyzing ? "Analyzing..." : "Decode Meaning"}
                </button>
              )}
            </div>

            {quote.analysis ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="p-5 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-[10px] text-forge-accent font-mono uppercase tracking-widest mb-2">
                      Hidden Meaning
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {quote.analysis.meaning}
                    </p>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 border-l-2 border-l-forge-cyan">
                  <div className="text-[10px] text-forge-cyan font-mono uppercase tracking-widest mb-2">
                    Daily Prompt
                  </div>
                  <p className="text-sm text-white italic">{quote.analysis.reflectionPrompt}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-white/10 rounded-xl">
                <p className="text-xs text-gray-500">
                  Activate neural core to interpret this wisdom.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

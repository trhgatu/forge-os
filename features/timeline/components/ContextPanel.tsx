"use client";

import { Calendar, Tag, Sparkles, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { TYPE_CONFIG } from "../config/";
import type { TimelineItem } from "@/shared/types/timeline";
import Image from "next/image";

interface Props {
  item: TimelineItem | null;
  onClose: () => void;
  onAnalyze: (id: string) => void;
  isAnalyzing: boolean;
}

export default function ContextPanel({ item, onClose, onAnalyze, isAnalyzing }: Props) {
  if (!item) return null;

  const config = TYPE_CONFIG[item.type];

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-black/80 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-right duration-500">

      {/* HEADER */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-black/40 backdrop-blur-xl z-10">
        <div className="flex items-center gap-2">
          <config.icon size={18} className={config.color} />
          <span className="text-sm font-bold text-white uppercase tracking-wider">
            {config.label} Detail
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-8">

        {/* Timestamp + Title */}
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-2">
            <Calendar size={12} />
            {item.date.toLocaleString()}
          </div>

          <h2 className="text-2xl font-display font-bold text-white mb-4">
            {item.title}
          </h2>

          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              className="w-full rounded-xl border border-white/10 mb-6"
              alt="detail"
            />
          )}

          <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed">
            <p>{item.content}</p>
          </div>
        </div>

        {/* TAGS */}
        <div>
          <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
            Semantic Tags
          </h4>

          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-gray-300 flex items-center gap-1"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* AI ANALYSIS CARD */}
        <div className="bg-white/2 border border-white/5 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles size={14} className="text-forge-accent" />
              Temporal Analysis
            </h3>

            {!item.analysis && (
              <button
                onClick={() => onAnalyze(item.id)}
                disabled={isAnalyzing}
                className={cn(
                  "text-xs bg-forge-accent/10 hover:bg-forge-accent/20 text-forge-accent border border-forge-accent/20 px-3 py-1 rounded transition-all",
                  isAnalyzing && "opacity-50 cursor-not-allowed"
                )}
              >
                {isAnalyzing ? "Processing..." : "Analyze"}
              </button>
            )}
          </div>
          {item.analysis ? (
            <div className="space-y-4 relative z-10 animate-in fade-in duration-500">
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                  Significance
                </div>
                <p className="text-sm text-gray-200">
                  {item.analysis.significance}
                </p>
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                  Pattern
                </div>
                <p className="text-sm text-gray-200 italic">
                  &quot;{item.analysis.pattern}&quot;
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic relative z-10">
              Reveal the hidden connections of this moment within your life&apos;s timeline.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState, useRef, memo } from "react";
import {
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  BrainCircuit,
  ArrowUpRight,
  Hammer,
  CopyPlus,
  CheckCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import { KnowledgeConcept } from "@/shared/types";
import { GlassCard } from "@/shared/components/ui/GlassCard";
import { cn } from "@/shared/lib/utils";

interface SourceTabProps {
  concept: KnowledgeConcept;
  extracts: { id: string; text: string }[];
  onCrystallize: () => void;
  onCapture: (text: string) => void;
  onRemoveExtract: (id: string) => void;
}

// Strictly memoized content display to protect text selection state
const SourceContent = memo(
  ({ htmlContent }: { htmlContent: string }) => {
    return (
      <div
        className="prose prose-invert prose-lg max-w-none font-serif leading-loose text-gray-200
                prose-headings:font-display prose-headings:font-bold prose-headings:text-white
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2
                prose-h3:text-xl prose-h3:text-gray-100 prose-h3:mt-8
                prose-p:mb-6 prose-p:text-lg prose-p:leading-8 prose-p:text-gray-200
                prose-a:text-forge-cyan prose-a:no-underline hover:prose-a:underline
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:mb-2 prose-li:text-gray-200
                prose-blockquote:border-l-4 prose-blockquote:border-forge-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-white/[0.03] prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-300
                prose-strong:text-white prose-strong:font-semibold selection:bg-forge-accent/30 selection:text-white"
        dangerouslySetInnerHTML={{
          __html: htmlContent,
        }}
      />
    );
  },
  (prev, next) => prev.htmlContent === next.htmlContent
);

SourceContent.displayName = "SourceContent";

export const SourceTab: React.FC<SourceTabProps> = ({
  concept,
  extracts,
  onCrystallize,
  onCapture,
  onRemoveExtract,
}) => {
  const lastModified = concept.lastModified
    ? new Date(concept.lastModified).toLocaleDateString()
    : null;

  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<{ text: string; top: number; left: number } | null>(
    null
  );
  const [isCaptured, setIsCaptured] = useState(false);

  // Handle selection logic
  useEffect(() => {
    const handleMouseUp = () => {
      // Use short timeout to ensure selection is settled
      setTimeout(() => {
        const activeSelection = window.getSelection();

        // If no valid selection or not affecting our content, clear UI
        if (
          !activeSelection ||
          activeSelection.isCollapsed ||
          !contentRef.current ||
          !containerRef.current
        ) {
          // Check if we clicked on the button itself? No, unrelated clicks clear.
          if (!activeSelection || activeSelection.isCollapsed) {
            setSelection(null);
            setIsCaptured(false);
          }
          return;
        }

        const text = activeSelection.toString().trim();
        // If text is empty or outside our content area
        if (!text || !contentRef.current.contains(activeSelection.anchorNode)) {
          setSelection(null);
          setIsCaptured(false);
          return;
        }

        const range = activeSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        // Position relative to the main container
        setSelection({
          text,
          top: rect.top - containerRect.top - 60, // Higher offset for better visibility
          left: rect.left - containerRect.left + rect.width / 2,
        });
        setIsCaptured(false);
      }, 10);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleCaptureClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (selection) {
      onCapture(selection.text);
      setIsCaptured(true);

      // Delay cleaning but keeping feedback loop
      setTimeout(() => {
        setSelection(null);
        window.getSelection()?.removeAllRanges();
        setIsCaptured(false);
      }, 800);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative"
    >
      {/* Floating Glass Capture Button */}
      {selection && (
        <div
          className="absolute z-[100] animate-in fade-in zoom-in-95 duration-200"
          style={{ top: selection.top, left: selection.left, transform: "translateX(-50%)" }}
          onMouseDown={(e) => e.preventDefault()} // Prevent focus stealing
        >
          <button
            type="button"
            onClick={handleCaptureClick}
            disabled={isCaptured}
            className={cn(
              "group relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-xl border font-bold shadow-lg transition-all active:scale-95 backdrop-blur-md",
              isCaptured
                ? "bg-emerald-500/90 border-emerald-400 text-white shadow-emerald-500/20"
                : "bg-gradient-to-r from-cyan-950/90 to-blue-950/90 border-cyan-500/30 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:border-cyan-400/50"
            )}
          >
            {!isCaptured && (
              <div className="absolute inset-0 bg-cyan-400/20 group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12 -translate-x-full" />
            )}

            <div className="relative z-10 flex items-center gap-2">
              {isCaptured ? (
                <CheckCircle size={16} className="text-white" />
              ) : (
                <CopyPlus
                  size={16}
                  className="text-cyan-300 group-hover:text-white transition-colors"
                />
              )}
              <span className="text-sm font-bold tracking-wide text-white">
                {isCaptured ? "Saved to Anvil" : "Capture Extract"}
              </span>
            </div>
          </button>
          {/* Pointer Arrow */}
          <div
            className={cn(
              "absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 border-r border-b rotate-45 transition-colors",
              isCaptured
                ? "bg-emerald-500/90 border-emerald-400"
                : "bg-cyan-950/90 border-cyan-500/30"
            )}
          />
        </div>
      )}

      {/* LEFT COLUMN: Main Content */}
      <div className="flex-1 space-y-6">
        {/* HERO IMAGE SECTION */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden border border-white/10 group">
          {concept.imageUrl ? (
            <>
              <Image
                fill
                src={concept.imageUrl}
                alt={concept.title}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-[#050508] flex items-center justify-center">
              <BookOpen size={64} className="text-white/10" />
            </div>
          )}

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-300 mb-4 backdrop-blur-md">
              <Layers size={12} /> Knowledge Source
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight drop-shadow-2xl mb-4">
              {concept.title}
            </h1>

            {lastModified && (
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Calendar size={12} /> Last updated: {lastModified}
              </div>
            )}
          </div>
        </div>

        {/* CONTENT TEXT (Wrapped for interactions) */}
        <div className="px-4 md:px-0" ref={contentRef}>
          <SourceContent htmlContent={concept.content ?? concept.extract ?? ""} />
        </div>
      </div>

      {/* RIGHT SIDEBAR: Metadata & Insights */}
      <div className="w-full md:w-[350px] space-y-6 shrink-0">
        {/* ACTION: Crystallize Button */}
        <button
          onClick={onCrystallize}
          className="w-full cursor-pointer group relative overflow-hidden p-4 rounded-xl bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border border-cyan-500/30 text-cyan-100 font-bold shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:border-cyan-400/50 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-cyan-400/10 group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12 -translate-x-full" />
          <div className="flex items-center justify-center gap-3 relative z-10">
            <Hammer
              size={20}
              className="group-hover:rotate-12 transition-transform text-cyan-300"
            />
            <span className="tracking-wide">Forge Insight</span>
          </div>
          <p className="text-[10px] text-cyan-200/60 text-center mt-1 font-normal relative z-10 font-mono tracking-widest uppercase">
            Transition to Anvil & Crystallize
          </p>
        </button>

        {/* Reflection */}
        {concept.reflection && (
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-forge-accent/10 to-transparent border border-forge-accent/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-forge-accent/20 blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-bold text-forge-accent uppercase tracking-widest mb-3">
                <Sparkles size={14} /> Nova Reflection
              </div>
              <p className="text-base text-white font-light italic leading-relaxed font-serif">
                &quot;{concept.reflection}&quot;
              </p>
            </div>
          </div>
        )}

        {/* Insights / Captured Extracts */}
        {(extracts.length > 0 || concept.insights) && (
          <GlassCard>
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <BrainCircuit size={14} /> Key Extractions
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {/* Show newly captured extracts first */}
              {extracts.map((extract) => (
                <div
                  key={extract.id}
                  className="group relative p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 hover:bg-emerald-950/30 transition-colors animate-in fade-in slide-in-from-left-2"
                >
                  <div className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#34D399] shrink-0" />
                    <p className="text-sm text-gray-200 leading-relaxed font-light line-clamp-4 pr-6">
                      {extract.text}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveExtract(extract.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-red-500/80 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
                    title="Remove Extract"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {/* Show existing insights */}
              {concept.insights?.map((insight, i) => (
                <div
                  key={`insight-${i}`}
                  className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-forge-cyan shadow-[0_0_5px_#22D3EE] shrink-0" />
                    <p className="text-sm text-gray-400 leading-relaxed font-light">{insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Categories */}
        {concept.metadata?.categories && (
          <GlassCard>
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {concept.metadata.categories.map((cat, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                >
                  {cat}
                </span>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Source Link */}
        {concept.url && (
          <a
            href={concept.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 group transition-all"
          >
            <span className="text-xs text-gray-500 group-hover:text-gray-300">
              View Original Source
            </span>
            <ArrowUpRight size={14} className="text-gray-600 group-hover:text-white" />
          </a>
        )}
      </div>
    </div>
  );
};

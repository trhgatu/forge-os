import React, { useState } from "react";
import { Hammer, Eye, Quote, X } from "lucide-react";
import { GlassCard } from "@/shared/components/ui/GlassCard";
import { cn } from "@/shared/lib/utils";
import { ForgeEditor } from "@/shared/components/editor/ForgeEditor";

interface AnvilTabProps {
  extracts?: string[];
  onRemoveExtract?: (index: number) => void;
}

export const AnvilTab: React.FC<AnvilTabProps> = ({ extracts = [], onRemoveExtract }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("New Artifact");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Mock save
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  const insertExtract = (text: string) => {
    setContent((prev) => `${prev}\n> ${text}\n\n`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* LEFT: Research Context / Insights */}
      <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4 h-full min-h-0">
        <GlassCard
          className="h-full flex flex-col bg-[#050508]/50 overflow-hidden"
          innerClassName="h-full flex flex-col overflow-hidden"
        >
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2 shrink-0">
            <Eye size={14} /> Context & Extracts
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin min-h-0">
            {extracts.length === 0 ? (
              <div className="p-3 rounded-lg border border-dashed border-white/10 bg-white/5 text-xs text-gray-500 text-center">
                Drag extracts here or select text from Source to visualize context.
              </div>
            ) : (
              extracts.map((e, i) => (
                <div
                  key={i}
                  onClick={() => insertExtract(e)}
                  className="group relative p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-forge-accent/50 cursor-pointer transition-all active:scale-95 pr-6"
                >
                  <Quote
                    size={12}
                    className="text-forge-accent mb-2 opacity-50 group-hover:opacity-100"
                  />
                  <p className="text-xs text-gray-300 line-clamp-4 leading-relaxed font-serif italic text-pretty">
                    &quot;{e}&quot;
                  </p>

                  {/* Delete Button */}
                  {onRemoveExtract && (
                    <button
                      onClick={(ev) => {
                        ev.stopPropagation();
                        onRemoveExtract(i);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-red-500/80 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm z-10"
                      title="Remove Extract"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>

      {/* RIGHT: Main Editor Area */}
      <div className="flex-1 flex flex-col h-full gap-4 min-h-0">
        {/* Editor Canvas */}
        <GlassCard
          className="flex-1 p-0 flex flex-col overflow-hidden bg-[#0c0c0e] relative group min-h-0"
          innerClassName="h-full flex flex-col relative"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />

          {/* Title Input */}
          <div className="px-8 pt-8 pb-4 z-10 shrink-0">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-4xl font-display font-bold text-white placeholder-gray-600 focus:outline-none"
              placeholder="Artifact Title..."
            />
          </div>

          {/* Shared Editor */}
          <div className="flex-1 min-h-0 relative z-10 px-8 pb-8 flex flex-col">
            <ForgeEditor
              content={content}
              onChange={setContent}
              placeholder="Begin forging your insight here... (Markdown supported)"
              className="flex-1 h-full min-h-0"
            />
          </div>
        </GlassCard>

        {/* Action Bar */}
        <div className="flex justify-end shrink-0">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white text-black transition-all hover:bg-gray-200 disabled:opacity-50",
              isSaving ? "cursor-wait" : ""
            )}
          >
            {isSaving ? (
              <div className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
            ) : (
              <Hammer size={18} className={isSaving ? "animate-bounce" : ""} />
            )}
            <span>{isSaving ? "Forging..." : "Crystallize Artifact"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

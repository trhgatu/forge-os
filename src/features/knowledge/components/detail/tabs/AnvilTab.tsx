import React, { useState } from "react";
import { Hammer, Eye } from "lucide-react";
import { GlassCard } from "@/shared/components/ui/GlassCard";
import { cn } from "@/shared/lib/utils";
import { ForgeEditor } from "@/shared/components/editor/ForgeEditor";

export const AnvilTab: React.FC = () => {
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

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* LEFT: Research Context / Insights */}
      <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4 h-full">
        <GlassCard className="h-full flex flex-col bg-[#050508]/50 overflow-hidden">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Eye size={14} /> Context & Extracts
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
            <div className="p-3 rounded-lg border border-dashed border-white/10 bg-white/5 text-xs text-gray-500 text-center">
              Drag extracts here or select text from Source to visualize context. (Coming Soon)
            </div>
            {/* Placeholder mock extracts */}
          </div>
        </GlassCard>
      </div>

      {/* RIGHT: Main Editor Area */}
      <div className="flex-1 flex flex-col h-full gap-4">
        {/* Editor Canvas */}
        <GlassCard className="flex-1 p-0 flex flex-col overflow-hidden bg-[#0c0c0e] relative group">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />

          {/* Title Input */}
          <div className="px-8 pt-8 pb-4 z-10">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-4xl font-display font-bold text-white placeholder-gray-600 focus:outline-none"
              placeholder="Artifact Title..."
            />
          </div>

          {/* Shared Editor */}
          <div className="flex-1 min-h-0 relative z-10 px-8 pb-8">
            <ForgeEditor
              content={content}
              onChange={setContent}
              placeholder="Begin forging your insight here... (Markdown supported)"
            />
          </div>
        </GlassCard>

        {/* Action Bar */}
        <div className="flex justify-end">
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

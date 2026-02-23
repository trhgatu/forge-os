"use client";

import { Calendar, Maximize2, Minimize2, Save, Sparkles } from "lucide-react";

import type { JournalEntry } from "@/features/journal/types";
import { ForgeEditor } from "@/shared/components/editor/ForgeEditor";
import { cn } from "@/shared/lib/utils";

import { MoodSelector } from "./MoodSelector";

export function JournalEditor({
  entry,
  onChange,
  onAnalyze,
  isAnalyzing,
  isFocusMode,
  toggleFocusMode,
  saveStatus = "saved",
}: {
  entry: JournalEntry;
  onChange: (v: Partial<JournalEntry>) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  isFocusMode: boolean;
  toggleFocusMode: () => void;
  saveStatus?: "saved" | "saving" | "error";
}) {
  return (
    <div
      className={cn("flex-1 flex flex-col transition-all duration-500", isFocusMode && "bg-black")}
    >
      {/* Header */}
      <div
        className={cn(
          "px-8 py-4 flex items-center justify-between border-b border-white/5 transition-all duration-500",
          isFocusMode && "-mt-16 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
          <span className="flex items-center gap-2">
            <Calendar size={12} /> {new Date(entry.createdAt).toLocaleDateString()}
          </span>
          <span className="w-px h-3 bg-white/10" />
          <span
            className={cn(
              "flex items-center gap-1 transition-colors",
              saveStatus === "saved" && "text-green-500",
              saveStatus === "saving" && "text-yellow-500",
              saveStatus === "error" && "text-red-500"
            )}
          >
            <Save size={12} className={cn(saveStatus === "saving" && "animate-pulse")} />
            {saveStatus === "saved" && "Saved"}
            {saveStatus === "saving" && "Saving..."}
            {saveStatus === "error" && "Error"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFocusMode}
            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            {isFocusMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium border transition-all",
              isAnalyzing
                ? "bg-forge-accent/20 text-forge-accent border-forge-accent/20 animate-pulse cursor-wait"
                : "bg-white/5 text-white border-white/10 hover:bg-forge-accent hover:border-forge-accent hover:shadow-[0_0_15px_rgba(124,58,237,0.4)]"
            )}
          >
            <Sparkles size={14} />
            {isAnalyzing ? "Neural Processing..." : "AI Reflect"}
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-8 min-h-full flex flex-col">
          {/* Mood Selector */}
          <div
            className={cn(
              "transition-opacity duration-500 mb-6",
              isFocusMode ? "opacity-0 hover:opacity-100" : "opacity-100"
            )}
          >
            <MoodSelector mood={entry.mood || "neutral"} onSelect={(m) => onChange({ mood: m })} />
          </div>

          {/* Title */}
          <input
            type="text"
            value={entry.title || ""}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Title your thought..."
            className="w-full bg-transparent border-none text-4xl font-display font-bold text-white placeholder-gray-700 focus:ring-0 px-0 py-4 mb-4"
          />

          {/* Content */}
          <div className="flex-1 min-h-[500px]">
            <ForgeEditor
              content={entry.content}
              onChange={(v) => onChange({ content: v })}
              placeholder="Start writing... (Markdown supported)"
              className="min-h-[500px]"
            />
          </div>

          {isFocusMode && (
            <button
              onClick={toggleFocusMode}
              className="fixed bottom-8 right-8 p-3 rounded-full bg-white/10 backdrop-blur text-gray-400 hover:text-white hover:bg-white/20 transition-all opacity-0 hover:opacity-100"
            >
              <Minimize2 size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Search, Plus, Trash2 } from "lucide-react";

import type { JournalEntry } from "@/features/journal/types";
import { MOOD_COLORS } from "@/shared/constants";
import { cn } from "@/shared/lib/utils";
export function JournalSidebar({
  entries,
  selectedId,
  onSelect,
  onNew,
  onDelete,
}: {
  entries: JournalEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="w-80 flex flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl h-full">
      <div className="p-4 border-b border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-white tracking-wide">JOURNAL</h2>
          <button
            onClick={onNew}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input
            type="text"
            placeholder="Search thoughts..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-forge-accent/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        <div>
          <h3 className="px-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
            Timeline
          </h3>
          <div className="space-y-1">
            {entries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => onSelect(entry.id)}
                className={cn(
                  "group relative p-3 rounded-xl cursor-pointer border transition-all duration-200",
                  selectedId === entry.id
                    ? "bg-white/10 border-white/10 shadow-lg"
                    : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/5"
                )}
              >
                {/* Delete Button - Visible on Hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(entry.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20"
                  title="Delete"
                >
                  <Trash2 size={12} />
                </button>

                <div className="flex justify-between items-start mb-1 pr-6">
                  <h4
                    className={cn(
                      "font-medium text-sm truncate pr-2",
                      selectedId === entry.id
                        ? "text-white"
                        : "text-gray-300 group-hover:text-white"
                    )}
                  >
                    {entry.title || "Untitled Entry"}
                  </h4>
                  {entry.analysis && (
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5",
                        MOOD_COLORS[entry.mood || "neutral"].split(" ")[0].replace("text-", "bg-")
                      )}
                    />
                  )}
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-relaxed">
                  {entry.content || "Empty content"}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-600 font-mono">
                    {new Date(entry.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {entry.tags.slice(0, 1).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";

import type { TimelineItem, TimelineType } from "@/shared/types/timeline";

import { TYPE_CONFIG } from "../config";
import TimelineNode from "./TimelineNode";
import TimelineCard from "./TimelineCard";
import ContextPanel from "./ContextPanel";
import { MOCK_TIMELINE } from "../data";
/* import { analyzeTimelineItem } from "@/services/geminiService"; */

export const Timeline = () => {
  const [items /* setItems */] = useState<TimelineItem[]>(MOCK_TIMELINE);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<TimelineType | "all">("all");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredItems = filterType === "all" ? items : items.filter((i) => i.type === filterType);

  const sortedItems = [...filteredItems].sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleAnalyze = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    setIsAnalyzing(true);

    try {
      /* const analysis = await analyzeTimelineItem(item.type, item.content);

            setItems((prev) =>
              prev.map((i) =>
                i.id === id
                  ? { ...i, analysis }
                  : i
              )
            ); */
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectedItem = selectedId ? items.find((i) => i.id === selectedId) || null : null;

  return (
    <div className="h-full w-full flex bg-forge-bg relative overflow-hidden animate-in fade-in duration-700">
      <div className="lg:flex w-64 flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl h-full p-6 z-20">
        <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">
          Timeline Stream
        </h2>
        <div className="space-y-2">
          <button
            onClick={() => setFilterType("all")}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
              filterType === "all"
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            All Streams
          </button>
          {Object.entries(TYPE_CONFIG).map(([type, config]) => (
            <button
              key={type}
              onClick={() => setFilterType(type as TimelineType)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                filterType === type
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <config.icon
                size={14}
                className={filterType === type ? "text-white" : config.color}
              />
              {config.label}
            </button>
          ))}
        </div>
      </div>
      <div
        className="flex-1 h-full overflow-y-auto relative scrollbar-hide"
        id="timeline-scroll-container"
      >
        <div className="sticky top-0 z-40 w-full p-6 bg-linear-to-b from-forge-bg via-forge-bg/90 to-transparent pointer-events-none flex justify-between items-start">
          <div className="pointer-events-auto">
            <h1 className="text-3xl font-display font-bold text-white">Chronicle</h1>
            <p className="text-xs text-gray-500 mt-1 font-mono">{sortedItems.length} Artifacts</p>
          </div>

          <button className="pointer-events-auto p-3 rounded-full bg-forge-accent text-white shadow-lg hover:scale-110 transition-transform">
            <Plus size={20} />
          </button>
        </div>

        <div className="relative max-w-3xl mx-auto pb-32 min-h-screen">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-forge-accent to-transparent opacity-50" />
          <div className="pt-12 relative">
            {sortedItems.map((item, index) => (
              <div key={item.id} className="relative flex w-full">
                <TimelineNode
                  item={item}
                  isLeft={index % 2 === 0}
                  isSelected={selectedId === item.id}
                />

                <TimelineCard
                  item={item}
                  isLeft={index % 2 === 0}
                  isSelected={selectedId === item.id}
                  onClick={() => setSelectedId(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedItem && (
        <ContextPanel
          item={selectedItem}
          onClose={() => setSelectedId(null)}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />
      )}
    </div>
  );
};

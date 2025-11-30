"use client";

import { useMemo, useState } from "react";
import { Image as ImageIcon, Plus, Search, Wind } from "lucide-react";

import type { Memory } from "@/shared/types/memory";
import { cn } from "@/shared/lib/utils";
import { SEASON_CONFIG, type InnerSeason, getSeasonFromMood } from "../config";
import { MOCK_MEMORIES } from "../data/mockMemories";
import { analyzeMemory } from "../services/analyze";
import { MemoryCard } from "./MemoryCard";
import { MemoryDetailPanel } from "./MemoryDetailPanel";
import { CreateMemoryModal } from "./CreateMemoryModal";

type SeasonFilter = InnerSeason | "All";

export function Memory() {
  const [memories, setMemories] = useState<Memory[]>(MOCK_MEMORIES);
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<SeasonFilter>("All");

  const filteredMemories = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    let current = memories;

    if (query) {
      current = current.filter(
        (memory) =>
          memory.title.toLowerCase().includes(query) ||
          memory.description.toLowerCase().includes(query)
      );
    }

    if (activeFilter !== "All") {
      current = current.filter((memory) => getSeasonFromMood(memory.mood) === activeFilter);
    }

    return current;
  }, [memories, searchTerm, activeFilter]);

  const selectedMemory = memories.find((memory) => memory.id === selectedMemoryId) ?? null;

  const handleAnalyze = async (id: string) => {
    const target = memories.find((memory) => memory.id === id);
    if (!target) return;

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeMemory(target.description);
      setMemories((previous) =>
        previous.map((memory) => (memory.id === id ? { ...memory, analysis } : memory))
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveNew = (memory: Memory) => {
    setMemories((previous) => [memory, ...previous]);
    setSelectedMemoryId(memory.id);
  };

  const bgClass =
    activeFilter === "Spring"
      ? "bg-[#020a0a]"
      : activeFilter === "Summer"
        ? "bg-[#0c0804]"
        : activeFilter === "Autumn"
          ? "bg-[#0c0505]"
          : activeFilter === "Winter"
            ? "bg-[#02030a]"
            : "bg-[#020204]";

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden animate-in fade-in duration-1000 selection:bg-white/20",
        bgClass
      )}
    >
      <div className="pointer-events-none absolute inset-0 transition-all duration-1000">
        <div
          className={cn(
            "absolute left-0 top-0 h-[500px] w-full bg-linear-to-b opacity-30 transition-colors duration-1000",
            activeFilter === "Spring"
              ? "from-emerald-900/30"
              : activeFilter === "Summer"
                ? "from-amber-900/30"
                : activeFilter === "Autumn"
                  ? "from-orange-900/30"
                  : "from-slate-900/30"
          )}
        />
      </div>

      {/* header */}
      <div className="sticky top-0 z-20 flex items-end justify-between border-b border-white/5 px-8 py-8 backdrop-blur-sm">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500">
            <Wind size={14} />
            Mnemosyne Engine
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-white">
            Memory Landscape
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="group relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white"
              size={14}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search echoes..."
              className="w-48 rounded-full border border-white/10 bg-white/5 px-9 py-2 text-xs text-white outline-none transition-all placeholder-gray-600 focus:border-white/20"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105"
          >
            <Plus size={14} />
            Preserve
          </button>
        </div>
      </div>

      {/* filter bar */}
      <div className="z-20 flex gap-2 overflow-x-auto px-8 py-4 scrollbar-hide">
        {(["All", "Spring", "Summer", "Autumn", "Winter"] as SeasonFilter[]).map((seasonKey) => {
          const isAll = seasonKey === "All";
          const config = !isAll ? SEASON_CONFIG[seasonKey] : undefined;
          const isActive = activeFilter === seasonKey;

          return (
            <button
              key={seasonKey}
              type="button"
              onClick={() => setActiveFilter(seasonKey)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all",
                isActive
                  ? "border-white/20 bg-white/10 text-white shadow-lg"
                  : "border-transparent bg-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300"
              )}
            >
              {config && (
                <config.icon size={12} className={isActive ? config.accent : "text-gray-600"} />
              )}
              {seasonKey}
            </button>
          );
        })}
      </div>
      <div className="relative z-10 flex-1 overflow-y-auto px-8 pb-32 scrollbar-hide">
        <div className="mx-auto max-w-7xl pt-8">
          {filteredMemories.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 animate-in slide-in-from-bottom-8 duration-700">
              {filteredMemories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  onClick={() => setSelectedMemoryId(memory.id)}
                />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center opacity-40">
              <ImageIcon size={32} className="mx-auto mb-4 text-white" />
              <p className="font-mono text-sm text-gray-500">The landscape is silent.</p>
            </div>
          )}
        </div>
      </div>
      <MemoryDetailPanel
        memory={selectedMemory}
        onClose={() => setSelectedMemoryId(null)}
        onAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
      />
      {isCreating && (
        <CreateMemoryModal onClose={() => setIsCreating(false)} onSave={handleSaveNew} />
      )}
    </div>
  );
}

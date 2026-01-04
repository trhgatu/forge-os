"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Image as ImageIcon, Plus, Search, Wind } from "lucide-react";
import { toast } from "sonner";

import type { Memory } from "@/shared/types/memory";
import { cn } from "@/shared/lib/utils";
import { SEASON_CONFIG, type InnerSeason, getSeasonFromMood } from "../config";
import { useMemories, useCreateMemory } from "@/features/memory/hooks";
import { analyzeMemory } from "../services/analyze";
import { MemoryCard } from "./MemoryCard";
import { MemoryDetailPanel } from "./MemoryDetailPanel";
import { CreateMemoryModal } from "./CreateMemoryModal";

type SeasonFilter = InnerSeason | "All";

export function Memory() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMemories();

  const memories = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);
  const [analysisMap, setAnalysisMap] = useState<Record<string, Memory["analysis"]>>({});

  const [isCreating, setIsCreating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<SeasonFilter>("All");

  // Infinite Scroll Trigger
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const filteredMemories = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    let current = memories;

    if (query) {
      current = current.filter(
        (memory) =>
          memory.title.toLowerCase().includes(query) || memory.content.toLowerCase().includes(query)
      );
    }

    if (activeFilter !== "All") {
      current = current.filter((memory) => getSeasonFromMood(memory.mood) === activeFilter);
    }

    return current;
  }, [memories, searchTerm, activeFilter]);

  const selectedMemoryBase = memories.find((memory) => memory.id === selectedMemoryId) ?? null;

  const selectedMemory =
    selectedMemoryBase && analysisMap[selectedMemoryBase.id]
      ? { ...selectedMemoryBase, analysis: analysisMap[selectedMemoryBase.id] }
      : selectedMemoryBase;

  const handleAnalyze = async (id: string) => {
    const target = memories.find((memory) => memory.id === id);
    if (!target) return;

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeMemory(target.content);
      setAnalysisMap((prev) => ({
        ...prev,
        [id]: analysis,
      }));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const createMemory = useCreateMemory();

  const handleSaveNew = (memory: Partial<Memory>) => {
    // We can safely cast because CreateModal validation ensures these fields exist for new memories
    const payload = {
      title: memory.title!,
      content: memory.content!,
      mood: memory.mood!,
      tags: memory.tags || [],
      type: memory.type || "moment",
      imageUrl: memory.imageUrl,
    };

    createMemory.mutate(payload, {
      onSuccess: (newMemory) => {
        toast.success("Memory crystallized successfully");
        setIsCreating(false);
        // Small delay to allow modal to close gracefully before panel slides in
        setTimeout(() => setSelectedMemoryId(newMemory.id), 300);
      },
      onError: (error) => {
        console.error("Failed to create memory:", error);
        toast.error("Failed to preserve memory");
      },
    });
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

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-gray-500">Loading memories...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-red-400">Failed to load memories.</p>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden animate-in fade-in duration-1000 selection:bg-white/20",
        bgClass
      )}
    >
      {/* Deep atmospheric background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Primary gradient wash */}
        <div
          className={cn(
            "absolute left-0 top-0 h-[600px] w-full transition-all duration-1000",
            activeFilter === "Spring"
              ? "bg-gradient-to-b from-emerald-950/40 via-emerald-900/20 to-transparent"
              : activeFilter === "Summer"
                ? "bg-gradient-to-b from-amber-950/40 via-amber-900/20 to-transparent"
                : activeFilter === "Autumn"
                  ? "bg-gradient-to-b from-red-950/40 via-red-900/20 to-transparent"
                  : activeFilter === "Winter"
                    ? "bg-gradient-to-b from-cyan-950/40 via-cyan-900/20 to-transparent"
                    : "bg-gradient-to-b from-slate-950/40 via-slate-900/20 to-transparent"
          )}
        />

        {/* Radial light source */}
        <div
          className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 opacity-20 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at center, ${
              activeFilter === "Spring"
                ? "rgba(16, 185, 129, 0.3)"
                : activeFilter === "Summer"
                  ? "rgba(245, 158, 11, 0.3)"
                  : activeFilter === "Autumn"
                    ? "rgba(220, 38, 38, 0.3)"
                    : activeFilter === "Winter"
                      ? "rgba(6, 182, 212, 0.3)"
                      : "rgba(148, 163, 184, 0.2)"
            }, transparent 60%)`,
          }}
        />

        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Depth fog */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/40 to-transparent" />
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
      <div className="z-20 flex gap-3 overflow-x-auto px-8 py-4 scrollbar-hide">
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
                "flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300",
                isActive
                  ? "border-white/20 bg-white/10 text-white shadow-lg shadow-white/5 scale-105"
                  : "border-transparent bg-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300 hover:border-white/10"
              )}
            >
              {config && (
                <config.icon
                  size={16}
                  className={cn(
                    "transition-all duration-300",
                    isActive ? config.accent : "text-gray-600"
                  )}
                />
              )}
              {seasonKey}
            </button>
          );
        })}
      </div>
      <div className="relative z-10 flex-1 overflow-y-auto px-8 pb-32 scrollbar-hide">
        <div className="mx-auto max-w-7xl pt-8">
          {filteredMemories.length > 0 ? (
            <div className="space-y-16">
              {/* Group memories by season */}
              {(["Spring", "Summer", "Autumn", "Winter"] as InnerSeason[]).map((season) => {
                const seasonMemories = filteredMemories.filter(
                  (m) => getSeasonFromMood(m.mood) === season
                );

                if (seasonMemories.length === 0 && activeFilter !== "All") return null;
                if (seasonMemories.length === 0) return null;

                const config = SEASON_CONFIG[season];
                const seasonText = {
                  Spring: "Những ngày tươi mới bắt đầu, hy vọng nảy nở như chồi non...",
                  Summer: "Rồi mùa hè đến với ánh nắng rực rỡ, năng lượng tràn đầy...",
                  Autumn: "Thu về mang theo sự trầm lắng, những suy tư sâu xa...",
                  Winter: "Đông lạnh giá nhưng thanh tịnh, thời gian để nhìn lại...",
                };

                return (
                  <div
                    key={season}
                    className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                    style={{
                      animationDelay: `${["Spring", "Summer", "Autumn", "Winter"].indexOf(season) * 100}ms`,
                    }}
                  >
                    {/* Chapter Header */}
                    <div className="mb-8 space-y-3">
                      <div className="flex items-center gap-3">
                        <config.icon size={24} className={cn("opacity-60", config.accent)} />
                        <h2 className="text-2xl font-display font-medium text-white/80">
                          {season} Memories
                        </h2>
                      </div>
                      <p className="font-serif text-sm text-gray-400 italic leading-relaxed max-w-2xl">
                        {seasonText[season]}
                      </p>
                      <div className="h-px w-24 bg-gradient-to-r from-white/20 to-transparent" />
                    </div>

                    {/* Masonry Grid */}
                    <div
                      className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                      style={{ columnGap: "1.5rem" }}
                    >
                      {seasonMemories.map((memory, idx) => (
                        <div
                          key={memory.id}
                          className="break-inside-avoid mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          <MemoryCard
                            memory={memory}
                            onClick={() => setSelectedMemoryId(memory.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-700">
              <div className="relative mb-8">
                <div className="absolute inset-0 animate-pulse bg-white/5 blur-3xl" />
                <ImageIcon size={64} className="relative text-white/20" />
              </div>
              <p className="mb-2 text-lg font-display text-white/40">
                {activeFilter !== "All"
                  ? `No ${activeFilter.toLowerCase()} memories found`
                  : searchTerm
                    ? "No memories match your search"
                    : "The story has yet to begin"}
              </p>
              <p className="mb-8 text-sm font-serif italic text-gray-600">
                {activeFilter !== "All" || searchTerm
                  ? "Try adjusting your filters"
                  : "Every journey starts with a single memory..."}
              </p>
              {!searchTerm && (
                <button
                  type="button"
                  onClick={() => setIsCreating(true)}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-bold text-white border border-white/20 transition-all hover:bg-white/20 hover:scale-105"
                >
                  <Plus size={16} />
                  Begin Your Story
                </button>
              )}
            </div>
          )}

          {/* Infinite Scroll Sentinel */}
          {hasNextPage && (
            <div ref={observerTarget} className="mt-8 flex justify-center py-4">
              {isFetchingNextPage ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              ) : (
                <div className="h-4" />
              )}
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

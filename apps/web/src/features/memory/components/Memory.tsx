"use client";

import { Search, BookOpen, Feather } from "lucide-react";
import { useMemo, useState, useRef, useEffect } from "react";
import { toast } from "sonner";

import { useMemories, useCreateMemory } from "@/features/memory/hooks";
import { cn } from "@/shared/lib/utils";
import type { Memory as MemoryType } from "@/shared/types/memory";

import { SEASON_CONFIG, type InnerSeason, getSeasonFromMood } from "../config";
import { analyzeMemory } from "../services/analyze";

import { CreateMemoryModal } from "./CreateMemoryModal";
import { MemoryCard } from "./MemoryCard";
import { MemoryDetailPanel } from "./MemoryDetailPanel";
import { MemoryParticles } from "./MemoryParticles";

type SeasonFilter = InnerSeason | "All";

export function Memory() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMemories();

  const memories = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);
  const [analysisMap, setAnalysisMap] = useState<Record<string, MemoryType["analysis"]>>({});

  const [isCreating, setIsCreating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<SeasonFilter>("All");

  // Debounce search for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

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
    const query = debouncedSearch.toLowerCase().trim();

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
  }, [memories, debouncedSearch, activeFilter]);

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

  const handleSaveNew = (memory: Partial<MemoryType>) => {
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
        toast.success("Memory preserved in the archives");
        setIsCreating(false);
        setTimeout(() => setSelectedMemoryId(newMemory.id), 300);
      },
      onError: (error) => {
        console.error("Failed to create memory:", error);
        toast.error("Failed to preserve memory");
      },
    });
  };

  // Soft contemplative dark - muted warmth
  const bgClass = "bg-gradient-to-br from-[#1c1917] via-[#181614] to-[#0c0a09]";

  if (isLoading) {
    return (
      <div className="flex h-full flex-col bg-gradient-to-br from-[#1c1917] to-[#0c0a09]">
        {/* Loading particles */}
        <MemoryParticles />

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse bg-stone-500/10 blur-3xl" />
              <BookOpen size={48} className="relative text-stone-400/40 animate-pulse" />
            </div>
            <p className="text-sm text-stone-300/50 font-serif italic animate-pulse">
              Loading memories from the archives...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#1c1917] to-[#0c0a09]">
        <p className="text-sm text-red-300/80 font-serif">Failed to retrieve memories.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden animate-in fade-in duration-1000",
        bgClass
      )}
    >
      {/* Soft paper texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* Subtle warm glow - very muted */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-stone-800/5 via-transparent to-stone-900/5" />

      {/* Floating Particles */}
      <MemoryParticles />

      {/* Timeless Header - Flowing Layout */}
      <div className="sticky top-0 z-20 border-b border-stone-800/30 px-8 py-8 backdrop-blur-xl bg-gradient-to-b from-[#1c1917]/95 to-[#1c1917]/80">
        {/* Top row - Title and Actions */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {/* Ethereal label */}
            <div className="mb-4 flex items-center gap-2 opacity-60">
              <div className="h-px w-8 bg-gradient-to-r from-stone-600/40 to-transparent" />
              <span className="text-[10px] font-serif uppercase tracking-[0.4em] text-stone-500/70">
                Echoes of Time
              </span>
            </div>

            {/* Poetic Title */}
            <h1
              className="text-5xl font-light tracking-tight text-stone-100 leading-tight mb-3"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              Memories
            </h1>

            {/* Flowing Subtitle - More Poetic */}
            <p className="font-serif text-sm text-stone-400/80 leading-relaxed max-w-xl italic">
              Fragments of moments, crystallized in time—each memory a whisper from the past,
              preserved in the quiet corners of the soul...
            </p>
          </div>

          {/* Preserve Button - Floating with Ripple */}
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="group relative flex items-center gap-2.5 rounded-full px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-500 shadow-lg hover:shadow-2xl backdrop-blur-md overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(120, 113, 108, 0.15) 0%, rgba(87, 83, 78, 0.1) 100%)",
              border: "1px solid rgba(168, 162, 158, 0.25)",
              color: "#d6d3d1",
            }}
          >
            <Feather
              size={13}
              className="relative z-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
            />
            <span className="relative z-10 font-serif">Preserve</span>

            {/* Ripple effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-stone-400/10 to-transparent animate-[ripple_2s_ease-out_infinite]" />
            </div>

            {/* Glow pulse */}
            <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10 bg-stone-400/15 animate-pulse" />
          </button>
        </div>

        {/* Premium Search and Filters */}
        <div className="flex items-center gap-6 pt-6">
          {/* Premium Search - Elevated Card */}
          <div className="group relative flex-1 max-w-md">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-stone-600/20 via-stone-500/20 to-stone-600/20 opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-500" />

            <div className="relative rounded-2xl border border-stone-700/50 bg-gradient-to-br from-stone-900/60 to-stone-950/80 backdrop-blur-md shadow-lg group-focus-within:border-stone-600/70 group-focus-within:shadow-xl transition-all duration-500">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 transition-all duration-500 group-focus-within:text-stone-300 group-focus-within:scale-110"
                size={16}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="search memories..."
                className="w-full rounded-2xl bg-transparent pl-12 pr-4 py-3.5 text-sm text-stone-100 outline-none placeholder-stone-500 placeholder:font-serif placeholder:italic font-serif"
              />
            </div>
          </div>

          {/* Elegant Divider */}
          <div className="flex items-center gap-2 opacity-40">
            <div className="h-px w-3 bg-gradient-to-r from-transparent to-stone-600" />
            <div className="h-1.5 w-1.5 rounded-full bg-stone-600" />
            <div className="h-px w-3 bg-gradient-to-l from-transparent to-stone-600" />
          </div>

          {/* Premium Filter Pills */}
          <div className="flex items-center gap-2.5">
            {(["All", "Spring", "Summer", "Autumn", "Winter"] as SeasonFilter[]).map(
              (seasonKey) => {
                const isAll = seasonKey === "All";
                const config = !isAll ? SEASON_CONFIG[seasonKey] : undefined;
                const isActive = activeFilter === seasonKey;

                return (
                  <button
                    key={seasonKey}
                    type="button"
                    onClick={() => setActiveFilter(seasonKey)}
                    className={cn(
                      "group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-500 backdrop-blur-sm font-serif",
                      isActive
                        ? "scale-105 shadow-lg"
                        : "hover:scale-105 opacity-50 hover:opacity-100"
                    )}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${seasonKey === "Spring"
                          ? "rgba(16, 185, 129, 0.15)"
                          : seasonKey === "Summer"
                            ? "rgba(245, 158, 11, 0.15)"
                            : seasonKey === "Autumn"
                              ? "rgba(220, 38, 38, 0.15)"
                              : seasonKey === "Winter"
                                ? "rgba(6, 182, 212, 0.15)"
                                : "rgba(120, 113, 108, 0.15)"
                        } 0%, ${seasonKey === "Spring"
                          ? "rgba(16, 185, 129, 0.05)"
                          : seasonKey === "Summer"
                            ? "rgba(245, 158, 11, 0.05)"
                            : seasonKey === "Autumn"
                              ? "rgba(220, 38, 38, 0.05)"
                              : seasonKey === "Winter"
                                ? "rgba(6, 182, 212, 0.05)"
                                : "rgba(120, 113, 108, 0.05)"
                        } 100%)`
                        : "rgba(41, 37, 36, 0.4)",
                      border: isActive
                        ? `1.5px solid ${seasonKey === "Spring"
                          ? "rgba(16, 185, 129, 0.5)"
                          : seasonKey === "Summer"
                            ? "rgba(245, 158, 11, 0.5)"
                            : seasonKey === "Autumn"
                              ? "rgba(220, 38, 38, 0.5)"
                              : seasonKey === "Winter"
                                ? "rgba(6, 182, 212, 0.5)"
                                : "rgba(168, 162, 158, 0.4)"
                        }`
                        : "1px solid rgba(87, 83, 78, 0.3)",
                      color: isActive
                        ? seasonKey === "Spring"
                          ? "#10b981"
                          : seasonKey === "Summer"
                            ? "#f59e0b"
                            : seasonKey === "Autumn"
                              ? "#dc2626"
                              : seasonKey === "Winter"
                                ? "#06b6d4"
                                : "#d6d3d1"
                        : "#78716c",
                    }}
                  >
                    {config && (
                      <config.icon
                        size={13}
                        className="transition-transform duration-300 group-hover:rotate-12"
                      />
                    )}
                    <span>{seasonKey}</span>

                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-xl opacity-30 blur-lg -z-10"
                        style={{
                          background:
                            seasonKey === "Spring"
                              ? "#10b981"
                              : seasonKey === "Summer"
                                ? "#f59e0b"
                                : seasonKey === "Autumn"
                                  ? "#dc2626"
                                  : seasonKey === "Winter"
                                    ? "#06b6d4"
                                    : "#a8a29e",
                        }}
                      />
                    )}
                  </button>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto px-8 pb-32 scrollbar-hide">
        <div className="mx-auto max-w-7xl pt-8">
          {filteredMemories.length > 0 ? (
            <div className="space-y-20">
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
                    {/* Soft Contemplative Chapter Header */}
                    <div className="mb-10 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-stone-600/25" />
                        <config.icon
                          size={20}
                          className="opacity-40"
                          style={{
                            color:
                              season === "Spring"
                                ? "#10b981"
                                : season === "Summer"
                                  ? "#f59e0b"
                                  : season === "Autumn"
                                    ? "#dc2626"
                                    : "#06b6d4",
                          }}
                        />
                        <h2
                          className="text-2xl font-medium text-stone-200/85"
                          style={{
                            fontFamily: "'Playfair Display', 'Georgia', serif",
                          }}
                        >
                          {season}
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-stone-600/25 to-transparent" />
                      </div>
                      <p className="font-serif text-sm text-stone-400/60 italic leading-relaxed pl-16">
                        {seasonText[season]}
                      </p>
                    </div>

                    {/* Masonry Grid with Staggered Entrance */}
                    <div
                      className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                      style={{ columnGap: "1.5rem" }}
                    >
                      {seasonMemories.map((memory, idx) => {
                        // Depth of field - cards further down get slightly blurred
                        const depthBlur = idx > 6 ? "blur-[0.3px]" : "";

                        return (
                          <div
                            key={memory.id}
                            className={cn(
                              "break-inside-avoid mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]",
                              depthBlur
                            )}
                            style={{
                              animationDelay: `${idx * 80}ms`,
                            }}
                          >
                            <MemoryCard
                              memory={memory}
                              onClick={() => setSelectedMemoryId(memory.id)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-700">
              <div className="relative mb-8">
                <div className="absolute inset-0 animate-pulse bg-stone-500/5 blur-3xl" />
                <BookOpen size={64} className="relative text-stone-600/30" />
              </div>
              <p className="mb-2 text-xl font-serif text-stone-300/70">
                {activeFilter !== "All"
                  ? `No ${activeFilter.toLowerCase()} memories found`
                  : searchTerm
                    ? "No memories match your search"
                    : "The archives await..."}
              </p>
              <p className="mb-8 text-sm font-serif italic text-stone-500/50 leading-relaxed">
                {activeFilter !== "All" || searchTerm
                  ? "Try adjusting your search"
                  : "Every story begins with a single memory"}
              </p>
              {!searchTerm && (
                <button
                  type="button"
                  onClick={() => setIsCreating(true)}
                  className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] transition-all shadow-lg hover:shadow-2xl backdrop-blur-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(120, 113, 108, 0.15) 0%, rgba(87, 83, 78, 0.1) 100%)",
                    border: "1px solid rgba(168, 162, 158, 0.25)",
                    color: "#d6d3d1",
                  }}
                >
                  <Feather size={16} />
                  <span className="font-serif">Begin Writing</span>
                </button>
              )}
            </div>
          )}

          {/* Infinite Scroll Sentinel */}
          {hasNextPage && (
            <div ref={observerTarget} className="mt-8 flex justify-center py-4">
              {isFetchingNextPage ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400/20 border-t-gray-600" />
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

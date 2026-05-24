'use client';

import { Search, BookOpen, Feather } from 'lucide-react';
import { useMemo, useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';


import { useMemories, useCreateMemory } from '@/features/memory/hooks';
import { cn } from '@/shared/lib/utils';
import type { Memory as MemoryType } from '@/shared/types/memory';

import { SEASON_CONFIG, type InnerSeason, getSeasonFromMood } from '../config';
import { MOCK_MEMORIES } from '../data/mockMemories';
import { analyzeMemory } from '../services/analyze';

import { CreateMemoryModal } from './CreateMemoryModal';
import { MemoryCard } from './MemoryCard';
import { MemoryDetailPanel } from './MemoryDetailPanel';

type SeasonFilter = InnerSeason | 'All';

export function Memory() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMemories();

  const memories = useMemo(() => {
    if (isError) {
      return MOCK_MEMORIES;
    }
    const apiMemories = data?.pages.flatMap((page) => page.data) ?? [];
    if (apiMemories.length === 0) {
      return MOCK_MEMORIES;
    }
    return apiMemories;
  }, [data, isError]);

  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);
  const [analysisMap, setAnalysisMap] = useState<Record<string, MemoryType['analysis']>>({});

  const [isCreating, setIsCreating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<SeasonFilter>('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const observerTarget = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
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
          memory.title.toLowerCase().includes(query) ||
          memory.content.toLowerCase().includes(query),
      );
    }

    if (activeFilter !== 'All') {
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
      type: memory.type || 'moment',
      imageUrl: memory.imageUrl,
    };

    createMemory.mutate(payload, {
      onSuccess: (newMemory) => {
        toast.success('Memory preserved in the archives');
        setIsCreating(false);
        setTimeout(() => setSelectedMemoryId(newMemory.id), 300);
      },
      onError: (error) => {
        console.error('Failed to create memory:', error);
        toast.error('Failed to preserve memory');
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-full flex-col bg-[#030304] text-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse bg-forge-cyan/10 blur-3xl" />
              <BookOpen size={48} className="relative text-forge-cyan/40 animate-pulse" />
            </div>
            <p className="text-sm text-gray-400 font-mono tracking-wide animate-pulse">
              Retrieving memory archives...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-transparent text-white animate-in fade-in duration-1000">
      {/* Timeless Header - Flowing Layout */}
      <div className="sticky top-0 z-20 border-b border-white/5 px-8 py-8 backdrop-blur-xl bg-transparent">
        {/* Top row - Title and Actions */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {/* Ethereal label */}
            <div className="mb-3 flex items-center gap-2 opacity-80">
              <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-forge-cyan/70">
                Memory Vault
              </span>
            </div>

            {/* Poetic Title */}
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight mb-3">
              Memories
            </h1>

            {/* Flowing Subtitle */}
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xl">
              Crystallized nodes of consciousness preserved in the digital void. Access, analyze, and map the emotional blueprint of your soul.
            </p>
          </div>

          {/* Preserve Button - Glass Tech Glowing */}
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="group relative flex items-center gap-2.5 rounded-xl px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 bg-forge-cyan/10 border border-forge-cyan/20 text-forge-cyan hover:bg-forge-cyan/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
          >
            <Feather
              size={14}
              className="transition-transform duration-300 group-hover:rotate-12"
            />
            <span className="font-mono">Preserve Memory</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search memories..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 transition-colors placeholder-gray-500 font-sans"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {(['All', 'Spring', 'Summer', 'Autumn', 'Winter'] as SeasonFilter[]).map(
              (seasonKey) => {
                const isAll = seasonKey === 'All';
                const config = !isAll ? SEASON_CONFIG[seasonKey] : undefined;
                const isActive = activeFilter === seasonKey;

                return (
                  <button
                    key={seasonKey}
                    type="button"
                    onClick={() => setActiveFilter(seasonKey)}
                    className={cn(
                      'group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 border backdrop-blur-md cursor-pointer',
                      isActive
                        ? seasonKey === 'Spring'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                          : seasonKey === 'Summer'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                            : seasonKey === 'Autumn'
                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                              : seasonKey === 'Winter'
                                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                                : 'bg-white/10 border-white/20 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
                    )}
                  >
                    {config && (
                      <config.icon
                        size={12}
                        className={cn(
                          'transition-transform duration-300 group-hover:scale-110',
                          isActive && 'text-current'
                        )}
                      />
                    )}
                    <span className="font-mono tracking-wider">{seasonKey}</span>
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div ref={scrollContainerRef} className="relative z-10 flex-1 overflow-y-auto px-8 pb-32 scrollbar-hide">
        <div className="mx-auto max-w-7xl pt-8">
          {filteredMemories.length > 0 ? (
            <div className="space-y-20">
              {/* Group memories by season */}
              {(['Spring', 'Summer', 'Autumn', 'Winter'] as InnerSeason[]).map((season) => {
                const seasonMemories = filteredMemories.filter(
                  (m) => getSeasonFromMood(m.mood) === season,
                );

                if (seasonMemories.length === 0 && activeFilter !== 'All') return null;
                if (seasonMemories.length === 0) return null;

                const config = SEASON_CONFIG[season];
                const seasonText = {
                  Spring: 'New beginnings take root, hope unfurling like fresh sprouts...',
                  Summer: 'Warmth and radiant light, boundless drive and energetic focus...',
                  Autumn: 'Contemplative shadows descend, deep reflection and maturity...',
                  Winter: 'Cold, serene stillness, a clear lens to look backward...',
                };

                return (
                  <div
                    key={season}
                    className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                    style={{
                      animationDelay: `${['Spring', 'Summer', 'Autumn', 'Winter'].indexOf(season) * 100}ms`,
                    }}
                  >
                    {/* Sleek Alchemical Chapter Header */}
                    <div className="mb-10 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/10" />
                        <config.icon
                          size={18}
                          style={{
                            color:
                              season === 'Spring'
                                ? '#10b981'
                                : season === 'Summer'
                                  ? '#f59e0b'
                                  : season === 'Autumn'
                                    ? '#f43f5e'
                                    : '#06b6d4',
                          }}
                        />
                        <h2 className="text-xl font-display font-semibold text-white tracking-wide">
                          {season}
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                      </div>
                      <p className="text-xs text-gray-500 pl-14 italic font-light">
                        {seasonText[season]}
                      </p>
                    </div>

                    {/* Masonry Grid with Staggered Entrance */}
                    <div
                      className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                      style={{ columnGap: '1.5rem' }}
                    >
                      {seasonMemories.map((memory, idx) => {
                        const depthBlur = idx > 6 ? 'blur-[0.3px]' : '';

                        return (
                          <div
                            key={memory.id}
                            className={cn(
                              'break-inside-avoid mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]',
                              depthBlur,
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
                <div className="absolute inset-0 animate-pulse bg-forge-cyan/5 blur-3xl" />
                <BookOpen size={64} className="relative text-white/20 animate-pulse" />
              </div>
              <p className="mb-2 text-xl font-display font-semibold text-white">
                {activeFilter !== 'All'
                  ? `No ${activeFilter.toLowerCase()} memory nodes found`
                  : searchTerm
                    ? 'No memory nodes match your query'
                    : 'The vault is empty...'}
              </p>
              <p className="mb-8 text-sm text-gray-500 leading-relaxed max-w-sm text-center">
                {activeFilter !== 'All' || searchTerm
                  ? 'Try adjusting your search criteria'
                  : 'Every neural log begins with a single preserved memory node.'}
              </p>
              {!searchTerm && (
                <button
                  type="button"
                  onClick={() => setIsCreating(true)}
                  className="flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 bg-forge-cyan/10 border border-forge-cyan/20 text-forge-cyan hover:bg-forge-cyan/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                >
                  <Feather size={14} />
                  <span className="font-mono">Begin Writing</span>
                </button>
              )}
            </div>
          )}

          {/* Infinite Scroll Sentinel */}
          {hasNextPage && (
            <div ref={observerTarget} className="mt-8 flex justify-center py-4">
              {isFetchingNextPage ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-800 border-t-forge-cyan" />
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

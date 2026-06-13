'use client';

import type { MoodType } from '@forge/reflection';
import { Plus, Search, Filter, Leaf, Sparkles } from 'lucide-react';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';

import { Skeleton, Label, Tag, Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import type { Quote as QuoteType } from '@/shared/types/quote';

import { SEASON_CONFIG, getSeasonFromMood } from '../../memory/config/seasons';
import { useQuotes, useCreateQuote, useDeleteQuote, useUpdateQuote } from '../hooks/useQuote';

import { DailyInspiration } from './DailyInspiration';
import { QuoteCard } from './QuoteCard';
import { QuoteDetailPanel } from './QuoteDetailPanel';
import { QuoteModal, EMOTION_OPTIONS } from './QuoteModal';

export function Quote() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useQuotes();
  const createMutation = useCreateQuote();
  const deleteMutation = useDeleteQuote();
  const updateMutation = useUpdateQuote();

  const quotes = useMemo(() => data?.pages.flatMap((page) => page.data) || [], [data]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterMood, setFilterMood] = useState<MoodType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingQuote, setEditingQuote] = useState<QuoteType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredQuotes = quotes
    .filter((q) => filterMood === 'all' || q.mood === filterMood)
    .filter(
      (q) =>
        searchQuery === '' ||
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())),
    );

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      toast.info('AI analysis coming soon!');
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleSaveNew = async (
    content: string,
    author?: string,
    source?: string,
    tags?: string[],
    isFavorite?: boolean,
    mood?: MoodType,
  ) => {
    try {
      await createMutation.mutateAsync({ content, author, source, tags, isFavorite, mood });
      toast.success('Quote added successfully!');
    } catch (error) {
      console.error('Failed to create quote', error);
      toast.error('Failed to add quote');
    }
  };

  const handleUpdateQuote = async (
    content: string,
    author?: string,
    source?: string,
    tags?: string[],
    isFavorite?: boolean,
    mood?: MoodType,
  ) => {
    if (!editingQuote) return;
    try {
      await updateMutation.mutateAsync({
        id: editingQuote.id,
        content,
        author,
        source,
        tags,
        status: isFavorite ? 'favorite' : 'internal',
        mood,
      });
      toast.success('Quote updated successfully!');
      setEditingQuote(null);
      setSelectedId(null);
    } catch (error) {
      console.error('Failed to update quote', error);
      toast.error('Failed to update quote');
    }
  };

  const handleToggleFav = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const quote = quotes.find((q) => q.id === id);
    if (!quote) return;

    try {
      await updateMutation.mutateAsync({
        id,
        status: !quote.isFavorite ? 'favorite' : 'internal',
      });
    } catch (error) {
      console.error('Failed to toggle favorite', error);
      toast.error('Failed to update quote');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Quote deleted successfully');
      setSelectedId(null);
    } catch (error) {
      console.error('Failed to delete quote', error);
      toast.error('Failed to delete quote');
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-transparent relative overflow-hidden animate-in fade-in duration-1000">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-purple-900/5 rounded-full blur-[200px] opacity-30" />
        <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-cyan-900/5 rounded-full blur-[200px] opacity-20" />
        <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-[0.015] mix-blend-overlay" />
      </div>

      {/* Header - Flowing Layout */}
      <div className="sticky top-0 z-20 border-b border-white/5 px-8 py-8 backdrop-blur-xl bg-transparent">
        {/* Top row - Title and Actions */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Ethereal label */}
            <div className="mb-3 flex items-center gap-2 opacity-80">
              <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
              <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase">
                Wisdom Frequencies
              </Label>
            </div>

            {/* Poetic Title */}
            <Label variant="default" className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3 block capitalize">
              Mind Garden
            </Label>

            {/* Flowing Subtitle */}
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xl">
              Cultivate your daily wisdom. Filter, search, and preserve the frequencies of inspiration in your neural archives.
            </p>
          </div>

          <div className="flex gap-3 mt-6 animate-in fade-in slide-in-from-right-4 duration-500 delay-100">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              variant="outline"
              className="border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition-all hover:bg-white/10 disabled:opacity-50"
            >
              <Sparkles size={16} className={cn(isAnalyzing ? 'animate-spin mr-2' : 'text-forge-accent mr-2', 'inline')} />
              Analyze Wisdom
            </Button>

            <Button
              onClick={() => setIsAdding(true)}
              className="bg-white hover:bg-gray-200 text-black font-semibold shadow-lg shadow-white/5"
            >
              <Plus size={16} className="inline mr-2" />
              New Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full relative z-10 flex flex-col min-w-0 overflow-hidden animate-in fade-in duration-700 delay-200">
        <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 pb-32">
          {/* Daily Inspiration Hero */}
          <DailyInspiration />

          {/* Floating Command Deck */}
          <div className="sticky top-6 z-30 mb-8 pointer-events-none">
            <div className="w-full max-w-fit mx-auto pointer-events-auto">
              <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 ring-1 ring-white/5">
                {/* Search Pill */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search
                      size={14}
                      className="text-white/40 group-focus-within:text-forge-cyan transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Filter wisdom..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-40 focus:w-64 bg-transparent border-none text-xs text-white placeholder:text-white/20 focus:ring-0 focus:outline-none pl-9 pr-4 py-2 transition-all duration-500"
                  />
                </div>

                <div className="w-px h-6 bg-white/10" />

                {/* Filter Dropdown */}
                <div className="relative group/filter">
                  <Button
                    variant="outline"
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all h-9 border-white/10',
                      filterMood === 'all'
                        ? 'text-white/60 hover:text-white bg-white/5 hover:bg-white/10'
                        : 'bg-forge-cyan/10 text-forge-cyan border-forge-cyan/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]',
                    )}
                  >
                    <Filter size={12} />
                    {filterMood === 'all' ? 'Mood' : filterMood}
                  </Button>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full right-0 mt-3 w-48 p-1.5 bg-[#0A0A0F] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover/filter:opacity-100 group-hover/filter:visible transition-all duration-200 transform origin-top-right z-50">
                    <Tag
                      interactive
                      active={filterMood === 'all'}
                      variant={filterMood === 'all' ? 'cyan' : 'default'}
                      onClick={() => setFilterMood('all')}
                      className="w-full justify-start px-3 py-2 text-xs font-mono tracking-wide cursor-pointer mb-1"
                    >
                      All Frequencies
                    </Tag>
                    {EMOTION_OPTIONS.map((mood) => {
                      const isActive = filterMood === mood;
                      return (
                        <Tag
                          key={mood}
                          interactive
                          active={isActive}
                          variant={isActive ? 'cyan' : 'default'}
                          onClick={() => setFilterMood(mood)}
                          className="w-full justify-start px-3 py-2 text-xs font-mono tracking-wide cursor-pointer flex items-center gap-2 mb-1"
                        >
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              SEASON_CONFIG[getSeasonFromMood(mood)].particleColor,
                            )}
                          />
                          <span>{mood}</span>
                        </Tag>
                      );
                    })}
                  </div>
                </div>

                <div className="w-px h-6 bg-white/10" />

                {/* Add Button */}
                <Button
                  onClick={() => setIsAdding(true)}
                  className="bg-white hover:bg-gray-200 text-black font-semibold uppercase tracking-wider h-9 px-4 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Plus size={14} strokeWidth={3} />
                  New
                </Button>
              </div>
            </div>
          </div>

          {/* Masonry Layout - Organic Waterfall */}
          <div className="px-6 py-8">
            {isLoading ? (
              <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Skeleton variant="default" className="h-56 w-full rounded-xl" />
                <Skeleton variant="default" className="h-72 w-full rounded-xl" />
                <Skeleton variant="default" className="h-64 w-full rounded-xl" />
                <Skeleton variant="default" className="h-64 w-full rounded-xl" />
                <Skeleton variant="default" className="h-56 w-full rounded-xl" />
                <Skeleton variant="default" className="h-72 w-full rounded-xl" />
              </div>
            ) : filteredQuotes.length > 0 ? (
              <div className="max-w-[1600px] mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredQuotes.map((quote) => {
                  return (
                    <div key={quote.id} className="break-inside-avoid">
                      <QuoteCard
                        quote={quote}
                        onClick={() => setSelectedId(quote.id)}
                        onToggleFav={(e) => handleToggleFav(e, quote.id)}
                        onEdit={() => setEditingQuote(quote)}
                        onDelete={() => handleDelete(quote.id)}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center">
                    <Leaf size={24} className="text-white/20" />
                  </div>
                  <p className="text-white/30 text-sm">Your garden awaits its first seed</p>
                </div>
              </div>
            )}

            {hasNextPage && (
              <div className="flex justify-center py-12">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-8 py-3 rounded-full bg-white/[0.03] border border-white/5 text-white/50 hover:text-white/70 hover:bg-white/[0.05] hover:border-white/10 transition-all text-sm disabled:opacity-50 backdrop-blur-sm"
                >
                  {isFetchingNextPage ? 'Growing...' : 'Grow Garden'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedId && (
        <QuoteDetailPanel
          quote={quotes.find((q) => q.id === selectedId)!}
          onClose={() => setSelectedId(null)}
          onAnalyze={handleAnalyze}
          onDelete={handleDelete}
          onEdit={(quote) => setEditingQuote(quote)}
          isAnalyzing={isAnalyzing}
        />
      )}
      {isAdding && (
        <QuoteModal initialText="" onClose={() => setIsAdding(false)} onSave={handleSaveNew} />
      )}
      {editingQuote && (
        <QuoteModal
          quote={editingQuote}
          onClose={() => setEditingQuote(null)}
          onSave={handleUpdateQuote}
        />
      )}
    </div>
  );
}




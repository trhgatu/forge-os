"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Filter, Leaf } from "lucide-react";
import type { MoodType } from "@/shared/types/journal";
import type { Quote } from "@/shared/types/quote";
import { cn } from "@/shared/lib/utils";
import { useQuotes, useCreateQuote, useDeleteQuote, useUpdateQuote } from "../hooks/useQuote";
import { toast } from "sonner";
import { SEASON_CONFIG, getSeasonFromMood } from "../../memory/config/seasons";
import { MoodAmbience } from "./MoodAmbience";
import { QuoteCard } from "./QuoteCard";
import { QuoteDetailPanel } from "./QuoteDetailPanel";
import { QuoteModal, EMOTION_OPTIONS } from "./QuoteModal";
import { DailyInspiration } from "./DailyInspiration";

export function Quote() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useQuotes();
  const createMutation = useCreateQuote();
  const deleteMutation = useDeleteQuote();
  const updateMutation = useUpdateQuote();

  const quotes = useMemo(() => data?.pages.flatMap((page) => page.data) || [], [data]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterMood, setFilterMood] = useState<MoodType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredQuotes = quotes
    .filter((q) => filterMood === "all" || q.mood === filterMood)
    .filter(
      (q) =>
        searchQuery === "" ||
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      toast.info("AI analysis coming soon!");
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleSaveNew = async (
    content: string,
    author?: string,
    source?: string,
    tags?: string[],
    isFavorite?: boolean,
    mood?: MoodType
  ) => {
    try {
      await createMutation.mutateAsync({ content, author, source, tags, isFavorite, mood });
      toast.success("Quote added successfully!");
    } catch (error) {
      console.error("Failed to create quote", error);
      toast.error("Failed to add quote");
    }
  };

  const handleUpdateQuote = async (
    content: string,
    author?: string,
    source?: string,
    tags?: string[],
    isFavorite?: boolean,
    mood?: MoodType
  ) => {
    if (!editingQuote) return;
    try {
      await updateMutation.mutateAsync({
        id: editingQuote.id,
        content,
        author,
        source,
        tags,
        status: isFavorite ? "favorite" : "internal",
        mood,
      });
      toast.success("Quote updated successfully!");
      setEditingQuote(null);
      setSelectedId(null);
    } catch (error) {
      console.error("Failed to update quote", error);
      toast.error("Failed to update quote");
    }
  };

  const handleToggleFav = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const quote = quotes.find((q) => q.id === id);
    if (!quote) return;

    try {
      await updateMutation.mutateAsync({
        id,
        status: !quote.isFavorite ? "favorite" : "internal",
      });
    } catch (error) {
      console.error("Failed to toggle favorite", error);
      toast.error("Failed to update quote");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Quote deleted successfully");
      setSelectedId(null);
    } catch (error) {
      console.error("Failed to delete quote", error);
      toast.error("Failed to delete quote");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#030304] text-white">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 h-32 w-32 animate-pulse rounded-full bg-forge-cyan/10 blur-3xl" />
          <div className="h-16 w-16 animate-spin rounded-full border-2 border-white/5 border-t-forge-cyan/50" />
          <div className="absolute h-2 w-2 rounded-full bg-forge-cyan/50 shadow-[0_0_10px_currentColor]" />
        </div>
        <p className="mt-8 animate-pulse font-mono text-xs uppercase tracking-[0.3em] text-white/30">
          Loading Garden...
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#030304] relative overflow-hidden">
      <MoodAmbience mood={filterMood} />

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-purple-900/5 rounded-full blur-[200px] opacity-30" />
        <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-cyan-900/5 rounded-full blur-[200px] opacity-20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] mix-blend-overlay" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full relative z-10 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 pb-32">
          {/* Hero Header - Scrolls away */}
          <div className="relative z-20">
            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 pt-12 pb-2">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-forge-cyan/30 to-transparent" />
                  <Leaf size={14} className="text-forge-cyan/40" />
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-forge-cyan/30 to-transparent" />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white/90 tracking-tight mb-2">
                  Mind Garden
                </h1>
                <p className="text-sm text-white/40 font-light max-w-lg">
                  Cultivate your daily wisdom
                </p>
              </div>
            </div>
          </div>

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
                    className="w-40 focus:w-64 bg-transparent border-none text-sm text-white placeholder:text-white/20 focus:ring-0 focus:outline-none pl-9 pr-4 py-2 transition-all duration-500"
                  />
                </div>

                <div className="w-px h-6 bg-white/10" />

                {/* Filter Dropdown */}
                <div className="relative group/filter">
                  <button
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all",
                      filterMood === "all"
                        ? "text-white/60 hover:text-white hover:bg-white/5"
                        : "bg-forge-cyan/10 text-forge-cyan border border-forge-cyan/20"
                    )}
                  >
                    <Filter size={12} />
                    {filterMood === "all" ? "Mood" : filterMood}
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full right-0 mt-3 w-48 p-1.5 bg-[#0A0A0F] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover/filter:opacity-100 group-hover/filter:visible transition-all duration-200 transform origin-top-right z-50">
                    <button
                      onClick={() => setFilterMood("all")}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors mb-1",
                        filterMood === "all"
                          ? "bg-white/10 text-white"
                          : "text-white/50 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      All Frequencies
                    </button>
                    {EMOTION_OPTIONS.map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setFilterMood(mood)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors",
                          filterMood === mood
                            ? "bg-white/10 text-white"
                            : "text-white/50 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            SEASON_CONFIG[getSeasonFromMood(mood)].particleColor
                          )}
                        />
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-px h-6 bg-white/10" />

                {/* Add Button */}
                <button
                  onClick={() => setIsAdding(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition-all text-xs font-bold uppercase tracking-wider h-9"
                >
                  <Plus size={14} strokeWidth={3} />
                  New
                </button>
              </div>
            </div>
          </div>

          {/* Masonry Layout - Organic Waterfall */}
          <div className="px-6 py-8">
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

            {filteredQuotes.length === 0 && (
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
                  {isFetchingNextPage ? "Growing..." : "Grow Garden"}
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

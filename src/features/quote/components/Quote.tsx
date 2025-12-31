"use client";

import { useState, useEffect, useMemo } from "react"; // Added useEffect
import { Plus, Feather, Sparkles, Search } from "lucide-react";
import type { MoodType } from "@/shared/types/journal";
import type { Quote } from "@/shared/types/quote";
import { cn } from "@/shared/lib/utils";
import { useQuotes, useCreateQuote, useDeleteQuote, useUpdateQuote } from "../hooks/useQuote";
import { toast } from "sonner";
import { SEASON_CONFIG, getSeasonFromMood } from "../../memory/config/seasons";
// import { GlassCard } from "../../forge-lab/components/GlassCard"; // Unused in this file
import { MoodAmbience } from "./MoodAmbience"; // Added MoodAmbience import

import { QuoteCard } from "./QuoteCard";
import { QuoteDetailPanel } from "./QuoteDetailPanel";
import { QuoteModal, EMOTION_OPTIONS } from "./QuoteModal";

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
  const [initialDraftText, setInitialDraftText] = useState("");
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Logic for Featured Quote (Random one from filtered list)
  const [heroQuote, setHeroQuote] = useState<Quote | null>(null);

  // Update hero quote when quotes change or on demand
  useEffect(() => {
    if (quotes.length > 0) {
      const isStale = heroQuote && !quotes.find((q) => q.id === heroQuote.id);
      if (!heroQuote || isStale) {
        const timer = setTimeout(() => {
          setHeroQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [quotes, heroQuote]);

  const shuffleHero = () => {
    if (quotes.length > 0) {
      let newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      while (quotes.length > 1 && newQuote.id === heroQuote?.id) {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      }
      setHeroQuote(newQuote);
    }
  };

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
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#050505] text-white absolute inset-0 z-50">
        <div className="relative flex items-center justify-center">
          {/* Ambient Glow */}
          <div className="absolute inset-0 h-32 w-32 animate-pulse rounded-full bg-forge-cyan/20 blur-3xl" />

          {/* Spinning Rings */}
          <div className="h-16 w-16 animate-spin rounded-full border-2 border-white/10 border-t-white/80" />
          <div className="absolute h-24 w-24 animate-[spin_3s_linear_infinite_reverse] rounded-full border border-white/5 border-b-white/20" />

          {/* Core */}
          <div className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_10px_white]" />
        </div>

        <p className="mt-8 animate-pulse font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          Accessing Athenaeum...
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#050508] relative overflow-hidden animate-in fade-in zoom-in-95 duration-700">
      <MoodAmbience mood={filterMood} />

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10">
        <div className="max-w-7xl mx-auto p-6 md:p-10 pb-32 space-y-12">
          {/* Module Header */}
          <header className="flex flex-col items-center justify-center text-center space-y-4 pt-8 animate-in slide-in-from-top-10 duration-1000">
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase text-white/90">
              The Athenaeum
            </h1>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <p className="font-serif italic text-white/40 text-sm md:text-base max-w-lg">
              &quot;Curated echoes of timeless thought.&quot;
            </p>
          </header>

          {/* Section 1: Featured Wisdom (Compact Void) */}
          {heroQuote && (
            <div className="relative min-h-[30vh] flex flex-col items-center justify-center py-12 cursor-default animate-in fade-in zoom-in-[0.98] duration-[2000ms]">
              {/* Ambient Spotlight */}
              <div
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[60%] rounded-full blur-[120px] opacity-10 pointer-events-none",
                  SEASON_CONFIG[getSeasonFromMood(heroQuote.mood)].particleColor
                )}
              />

              <div className="relative z-10 max-w-5xl px-4 flex flex-col items-center text-center">
                {/* The Quote */}
                <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30 drop-shadow-lg transition-all duration-1000 selection:bg-white/10 selection:text-white">
                  &quot;{heroQuote.text}&quot;
                </blockquote>

                {/* Footer */}
                <div className="flex items-center gap-4 mt-8 group">
                  <div className="h-px w-8 bg-white/10" />
                  <cite className="font-sans text-xs tracking-[0.3em] uppercase text-white/40 not-italic group-hover:text-white/60 transition-colors duration-700">
                    {heroQuote.author}
                  </cite>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      shuffleHero();
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-700 text-white/20 hover:text-white transform hover:rotate-90"
                    title="Invoke"
                  >
                    <Sparkles size={14} strokeWidth={1.5} />
                  </button>
                  <div className="h-px w-8 bg-white/10" />
                </div>
              </div>
            </div>
          )}

          {/* Section 2: The Ethereal Deck (Floating Control Center) */}
          <div className="sticky top-6 z-40 mx-auto w-max mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* The Living Aura (Background Glow) */}
            <div
              className={cn(
                "absolute inset-0 rounded-full blur-[20px] opacity-10 transition-all duration-[3000ms]",
                SEASON_CONFIG[
                  getSeasonFromMood(
                    filterMood === "all" ? ("curiosity" as MoodType) : (filterMood as MoodType)
                  )
                ].particleColor
              )}
            />

            <div className="relative flex items-center gap-2 p-1.5 pr-2 rounded-full border border-white/10 bg-[#050505]/60 backdrop-blur-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 hover:bg-[#050505]/80 hover:border-white/20 hover:scale-[1.01] group/deck">
              {/* 1. Search (Fluid Input) */}
              <div className="relative group/search pl-4 pr-2 flex items-center">
                <Search
                  size={14}
                  className="text-white/30 group-focus-within/search:text-white/80 transition-colors duration-500"
                />
                <input
                  type="text"
                  placeholder="Scan Athenaeum..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-24 md:w-40 bg-transparent border-none py-2 px-3 text-[11px] font-sans tracking-wide text-white/80 placeholder:text-white/20 focus:outline-none focus:w-56 transition-all duration-500"
                />
              </div>

              {/* Divider */}
              <div className="w-px h-4 bg-white/10" />

              {/* 2. Filter (The Compact System) */}
              <div className="relative group z-50">
                <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/[0.05] transition-all duration-300">
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-widest transition-colors duration-300",
                      filterMood === "all"
                        ? "text-white/40 group-hover:text-white/80"
                        : "text-white"
                    )}
                  >
                    {filterMood === "all" ? "All Signals" : filterMood}
                  </span>
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-500",
                      filterMood !== "all" &&
                        SEASON_CONFIG[getSeasonFromMood(filterMood as MoodType)].particleColor,
                      filterMood !== "all" && "shadow-[0_0_8px_currentColor]"
                    )}
                  />
                </button>

                {/* The Dropdown Grid (Centered on Pill) */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[260px] p-1.5 bg-[#0c0c0c]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform origin-top scale-90 group-hover:scale-100">
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => setFilterMood("all")}
                      className={cn(
                        "col-span-2 relative px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center transition-all duration-300",
                        filterMood === "all"
                          ? "bg-white/10 text-white"
                          : "text-white/30 hover:text-white hover:bg-white/5"
                      )}
                    >
                      All Signals
                    </button>

                    {EMOTION_OPTIONS.map((mood) => {
                      const isActive = filterMood === mood;
                      const config = SEASON_CONFIG[getSeasonFromMood(mood)];
                      return (
                        <button
                          key={mood}
                          onClick={() => setFilterMood(mood)}
                          className={cn(
                            "relative flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-300",
                            isActive
                              ? "bg-white/5 text-white"
                              : "text-white/30 hover:text-white hover:bg-white/[0.02]"
                          )}
                        >
                          <div
                            className={cn(
                              "w-1 h-1 rounded-full",
                              config.particleColor.replace("bg-", "bg-opacity-100 "),
                              isActive && "shadow-[0_0_5px_currentColor] scale-150"
                            )}
                          />
                          <span className="text-[9px] font-bold uppercase tracking-wider">
                            {mood}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. Action (New Entry) */}
              <button
                onClick={() => {
                  setInitialDraftText("");
                  setIsAdding(true);
                }}
                className="ml-1 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                title="New Entry"
              >
                <Plus size={14} strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Section 3: Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredQuotes.map((quote, index) => (
              <div
                key={quote.id}
                className="break-inside-avoid animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-forwards"
                style={{ animationDelay: `${(index % 10) * 100}ms` }}
              >
                <QuoteCard
                  quote={quote}
                  onClick={() => setSelectedId(quote.id)}
                  onToggleFav={(e) => handleToggleFav(e, quote.id)}
                />
              </div>
            ))}
          </div>

          {filteredQuotes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 opacity-50 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
              <Feather size={48} className="mb-4 text-gray-600" />
              <p className="text-lg font-mono text-gray-500">No whispers found.</p>
            </div>
          )}

          {hasNextPage && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-xs font-mono uppercase tracking-widest disabled:opacity-50"
              >
                {isFetchingNextPage ? "Resonating..." : "Load More Echoes"}
              </button>
            </div>
          )}
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
        <QuoteModal
          initialText={initialDraftText}
          onClose={() => setIsAdding(false)}
          onSave={handleSaveNew}
        />
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

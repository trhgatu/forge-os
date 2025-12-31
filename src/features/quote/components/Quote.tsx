"use client";

import { useState } from "react";
import { Plus, BookOpen, Feather, Layers, Sparkles, Search, Filter } from "lucide-react";
import type { MoodType } from "@/shared/types/journal";
import type { Quote } from "@/shared/types/quote";
import { cn } from "@/shared/lib/utils";
import { useQuotes, useCreateQuote, useDeleteQuote, useUpdateQuote } from "../hooks/useQuote";
import { toast } from "sonner";
import { SEASON_CONFIG, getSeasonFromMood } from "../../memory/config/seasons";
// import { GlassCard } from "../../forge-lab/components/GlassCard"; // Unused in this file

import { QuoteCard } from "./QuoteCard";
import { QuoteDetailPanel } from "./QuoteDetailPanel";
import { QuoteModal, EMOTION_OPTIONS } from "./QuoteModal";

export function Quote() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useQuotes();
  const createMutation = useCreateQuote();
  const deleteMutation = useDeleteQuote();
  const updateMutation = useUpdateQuote();

  const quotes = data?.pages.flatMap((page) => page.data) || [];

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterMood, setFilterMood] = useState<MoodType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [initialDraftText, setInitialDraftText] = useState("");
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
      <div className="h-full flex items-center justify-center bg-[#050508]">
        <div className="text-center">
          <Sparkles size={32} className="mx-auto mb-4 text-forge-accent animate-spin" />
          <p className="text-sm font-mono text-gray-500">Loading wisdom...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#050508] relative overflow-hidden animate-in fade-in zoom-in-95 duration-700">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto p-6 md:p-10 pb-32 space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                <BookOpen size={12} /> Wisdom Archive
              </div>
              <h1 className="text-3xl font-display font-bold text-white tracking-tight">
                Library of Meaning
              </h1>
              <p className="text-gray-400 font-light mt-1">
                Curated thoughts and echoes from the void.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Search wisdom..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 w-full md:w-64 transition-colors placeholder:text-gray-600"
                />
              </div>
              <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <Filter size={18} />
              </button>
              <button
                onClick={() => {
                  setInitialDraftText("");
                  setIsAdding(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                <Plus size={16} /> New Entry
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
            <button
              onClick={() => setFilterMood("all")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border",
                filterMood === "all"
                  ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  : "bg-white/5 text-gray-400 border-white/5 hover:text-white hover:bg-white/10 hover:border-white/20"
              )}
            >
              <Layers size={14} /> All
            </button>
            <div className="w-px h-6 bg-white/10 mx-2" />
            {EMOTION_OPTIONS.map((mood) => {
              const season = getSeasonFromMood(mood);
              const config = SEASON_CONFIG[season];
              const isActive = filterMood === mood;
              return (
                <button
                  key={mood}
                  onClick={() => setFilterMood(mood)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border",
                    isActive
                      ? cn(
                          `bg-gradient-to-r ${config.gradient} text-white border-white/20 shadow-lg scale-105`
                        )
                      : "bg-white/5 text-gray-400 border-white/5 hover:text-white hover:bg-white/10 hover:border-white/20"
                  )}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]",
                      config.particleColor.replace("bg-", "bg-opacity-100 "), // Ensure distinct dot
                      isActive ? "animate-pulse" : ""
                    )}
                  />
                  {mood}
                </button>
              );
            })}
          </div>

          {/* Quotes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                onClick={() => setSelectedId(quote.id)}
                onToggleFav={(e) => handleToggleFav(e, quote.id)}
              />
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

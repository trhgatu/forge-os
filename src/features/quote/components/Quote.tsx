"use client";

import { useState } from "react";
import { Plus, BookOpen, Feather, Layers, Sparkles } from "lucide-react";
import type { MoodType } from "@/shared/types/journal";
import type { Quote } from "@/shared/types/quote";
import { cn } from "@/shared/lib/utils";
import { useQuotes, useCreateQuote, useDeleteQuote, useUpdateQuote } from "../hooks/useQuote";
import { toast } from "sonner";
import { SEASON_CONFIG, getSeasonFromMood } from "../../memory/config/seasons";

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
  const [isAdding, setIsAdding] = useState(false);
  const [initialDraftText, setInitialDraftText] = useState("");
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredQuotes =
    filterMood === "all" ? quotes : quotes.filter((q) => q.mood === filterMood);

  const handleAnalyze = async () => {
    // Mock analysis for now
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
    <div className="h-full flex flex-col bg-[#050508] relative overflow-hidden animate-in fade-in duration-700">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-900/10 via-transparent to-transparent" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-900/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      </div>

      {/* Header & Filter Section */}
      <div className="shrink-0 p-8 pb-4 relative z-30 flex flex-col gap-6">
        {/* Top Row: Title & Actions */}
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
              <BookOpen size={12} /> Wisdom Archive
            </div>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">
              Library of Meaning
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <div className="text-2xl font-bold text-white">{quotes.length}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Entries</div>
            </div>
            <button
              onClick={() => {
                setInitialDraftText("");
                setIsAdding(true);
              }}
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105"
            >
              <Plus size={14} />
              <span>Add Quote</span>
            </button>
          </div>
        </div>

        {/* Filter Island (Horizontal Scroll) */}
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-2 p-1.5 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-md overflow-x-auto scrollbar-hide max-w-full">
            <button
              onClick={() => setFilterMood("all")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                filterMood === "all"
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              )}
            >
              <Layers size={14} /> All Wisdom
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            {EMOTION_OPTIONS.map((mood) => {
              const season = getSeasonFromMood(mood);
              const config = SEASON_CONFIG[season];
              return (
                <button
                  key={mood}
                  onClick={() => setFilterMood(mood)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                    filterMood === mood
                      ? `bg-white/10 text-white shadow-inner border border-white/5`
                      : "text-gray-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      config.bg.replace("bg-", "bg-opacity-50 "),
                      config.accent
                    )}
                    style={{ backgroundColor: "currentColor" }}
                  />
                  {mood}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-8 pb-20 scrollbar-hide z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-7xl pt-4">
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
          <div className="text-center py-32 opacity-50">
            <Feather size={32} className="mx-auto mb-4 text-white" />
            <p className="text-sm font-mono text-gray-500">Silence fills the archives.</p>
          </div>
        )}

        {hasNextPage && (
          <div className="flex justify-center p-8">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
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

import { X } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/shared/lib/utils";
import type { MoodType } from "@/shared/types/journal";
import type { Quote } from "@/shared/types/quote";

export const EMOTION_OPTIONS: MoodType[] = [
  "joy",
  "calm",
  "inspired",
  "neutral",
  "sad",
  "anxious",
  "focused",
  "nostalgic",
];

export function QuoteModal({
  quote,
  initialText = "",
  onClose,
  onSave,
}: {
  quote?: Quote;
  initialText?: string;
  onClose: () => void;
  onSave: (
    content: string,
    author?: string,
    source?: string,
    tags?: string[],
    isFavorite?: boolean,
    mood?: MoodType
  ) => void;
}) {
  const [text, setText] = useState(quote?.text || initialText);
  const [author, setAuthor] = useState(quote?.author || (initialText ? "Self" : ""));
  const [source, setSource] = useState(quote?.source || "");
  const [mood, setMood] = useState<MoodType>(quote?.mood || "neutral");
  const [tags] = useState<string[]>(quote?.tags || []);
  const [isFavorite] = useState(quote?.isFavorite || false);

  const handleSave = () => {
    if (!text) return;
    onSave(text, author || undefined, source || undefined, tags, isFavorite, mood);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md fade-in">
      <div className="flex h-[500px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#09090b] shadow-2xl slide-in-from-bottom-2">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <h3 className="font-display text-lg font-bold tracking-wide text-white">
            {quote ? "Update Wisdom" : "Preserve Wisdom"}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 rounded-full p-1 text-gray-500 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-white px-4 py-1.5 text-xs font-bold text-black transition-all hover:bg-gray-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              {quote ? "Update" : "Archive"}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Main Content */}
          <div className="flex-1 flex flex-col border-r border-white/5 bg-white/[0.02]">
            <textarea
              className="flex-1 w-full resize-none bg-transparent px-8 py-8 font-serif text-lg leading-loose text-gray-300 placeholder-white/20 outline-none"
              placeholder="Type something profound..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
            />
          </div>

          {/* Right: Sidebar */}
          <div className="w-80 space-y-8 overflow-y-auto bg-black/20 p-8">
            {/* Mood */}
            <div>
              <label className="mb-3 block text-[10px] font-mono uppercase tracking-widest text-gray-500">
                Emotional Context
              </label>
              <div className="flex flex-wrap gap-2">
                {EMOTION_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMood(option)}
                    className={cn(
                      "rounded px-3 py-1.5 text-xs capitalize transition-all border",
                      mood === option
                        ? "border-white bg-white text-black font-bold shadow-lg"
                        : "border-white/5 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Author */}
            <div>
              <label className="mb-3 block text-[10px] font-mono uppercase tracking-widest text-gray-500">
                Author
              </label>
              <input
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none transition-colors focus:border-white/20 placeholder-white/20"
                placeholder="Who said it?"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            {/* Source */}
            <div>
              <label className="mb-3 block text-[10px] font-mono uppercase tracking-widest text-gray-500">
                Source (Optional)
              </label>
              <input
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none transition-colors focus:border-white/20 placeholder-white/20"
                placeholder="Book, Movie, etc."
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

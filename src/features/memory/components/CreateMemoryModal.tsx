"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

import type { Memory } from "@/shared/types/memory";
import type { MoodType } from "@/shared/types";
import { cn } from "@/shared/lib/utils";

interface CreateMemoryModalProps {
  onClose: () => void;
  onSave: (memory: Memory) => void;
}

const EMOTION_OPTIONS: MoodType[] = [
  "joy",
  "calm",
  "inspired",
  "neutral",
  "sad",
  "anxious",
  "focused",
];

export function CreateMemoryModal({ onClose, onSave }: CreateMemoryModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<MoodType>("neutral");
  const [imageUrl, setImageUrl] = useState("");

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const trimmedImage = imageUrl.trim() || undefined;

    const newMemory: Memory = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      date: new Date(),
      mood,
      type: "moment",
      tags: [],
      reflectionDepth: 5,
      imageUrl: trimmedImage,
    };

    onSave(newMemory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md fade-in">
      <div className="flex h-[500px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-forge-bg shadow-2xl slide-in-from-bottom-2">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <h3 className="font-display text-lg font-bold tracking-wide text-white">
            Preserve Moment
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
              Crystallize
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Main Content */}
          <div className="flex-1 flex flex-col border-r border-white/5 bg-white/[0.02]">
            <input
              className="w-full bg-transparent px-8 pt-8 pb-4 font-display text-3xl font-bold text-white placeholder-white/20 outline-none"
              placeholder="Give it a name..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              autoFocus
            />
            <textarea
              className="flex-1 w-full resize-none border-t border-white/5 bg-transparent px-8 py-6 font-serif text-lg leading-loose text-gray-300 placeholder-white/10 outline-none"
              placeholder="What is the texture of this moment? Describe the sights, sounds, and feelings..."
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>

          {/* Right: Sidebar */}
          <div className="w-80 space-y-8 overflow-y-auto bg-black/20 p-8">
            {/* Mood */}
            <div>
              <label className="mb-3 block text-[10px] font-mono uppercase tracking-widest text-gray-500">
                Emotional Charge
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

            {/* Image */}
            <div>
              <label className="mb-3 block text-[10px] font-mono uppercase tracking-widest text-gray-500">
                Visual Artifact
              </label>
              <div className="space-y-3">
                <input
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none transition-colors focus:border-white/20"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                />
                {imageUrl && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10">
                    <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

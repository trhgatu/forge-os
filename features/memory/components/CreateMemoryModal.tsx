"use client";

import { useState } from "react";
import { X } from "lucide-react";

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
  const [description, setDescription] = useState("");
  const [mood, setMood] = useState<MoodType>("neutral");
  const [imageUrl, setImageUrl] = useState("");

  const handleSave = () => {
    if (!title.trim() || !description.trim()) return;

    const trimmedImage = imageUrl.trim() || undefined;

    const newMemory: Memory = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
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
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-forge-bg shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between border-b border-white/5 p-6">
          <h3 className="font-display text-lg font-bold tracking-wide text-white">
            Preserve Moment
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 transition-colors hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <label className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-gray-500">
              Artifact Name
            </label>
            <input
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-display text-white outline-none transition-colors focus:border-white/20"
              placeholder="Untitled Memory"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              autoFocus
            />
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-gray-500">
              Atmosphere
            </label>
            <textarea
              className="h-32 w-full resize-none rounded-lg border border-white/10 bgWhite/5 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-white/20 leading-relaxed"
              placeholder="What is the texture of this moment?"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-gray-500">
              Emotional Charge
            </label>
            <div className="flex flex-wrap gap-2">
              {EMOTION_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMood(option)}
                  className={cn(
                    "rounded px-3 py-1 text-xs capitalize transition-all border",
                    mood === option
                      ? "border-white bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      : "border-white/10 text-gray-500 hover:border-white/30"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-gray-500">
              Image URL (optional)
            </label>
            <input
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none transition-colors focus:border-white/20"
              placeholder="https://..."
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-white/5 p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-xs text-gray-400 transition-all hover:bg-white/5 hover:text-white"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-white px-6 py-2 text-xs font-bold text-black transition-all hover:bg-gray-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Crystallize
          </button>
        </div>
      </div>
    </div>
  );
}

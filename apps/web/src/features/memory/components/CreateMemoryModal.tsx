'use client';

import { MoodType } from '@forge/reflection';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import type { Memory } from '@/shared/types/memory';

interface CreateMemoryModalProps {
  onClose: () => void;
  onSave: (memory: Partial<Memory>) => void;
  initialData?: Memory | null;
}

const EMOTION_OPTIONS: MoodType[] = [
  MoodType.JOY,
  MoodType.CALM,
  MoodType.INSPIRED,
  MoodType.NEUTRAL,
  MoodType.SAD,
  MoodType.ANXIOUS,
  MoodType.FOCUSED,
  MoodType.NOSTALGIC,
];

export function CreateMemoryModal({ onClose, onSave, initialData }: CreateMemoryModalProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [mood, setMood] = useState<MoodType>(initialData?.mood || MoodType.NEUTRAL);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

  const [imgError, setImgError] = useState(false);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const trimmedImage = !imgError && imageUrl.trim() ? imageUrl.trim() : undefined;

    const memoryPayload: Partial<Memory> = {
      ...(initialData && { id: initialData.id }),
      title: title.trim(),
      content: content.trim(),
      mood,
      imageUrl: trimmedImage,
    };

    onSave(memoryPayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md fade-in animate-in duration-300">
      <div className="flex h-[550px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-2xl slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-black/20">
          <h3 className="font-display text-base font-bold tracking-wide text-white">
            {initialData ? 'Refine Memory Node' : 'Preserve Memory Node'}
          </h3>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X size={16} />
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-forge-cyan/10 border border-forge-cyan/20 px-4 py-2 text-xs font-semibold text-forge-cyan transition-all hover:bg-forge-cyan/20 shadow-[0_0_15px_rgba(34,211,238,0.1)] cursor-pointer"
            >
              {initialData ? 'Update Node' : 'Crystallize'}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Main Content */}
          <div className="flex-1 flex flex-col border-r border-white/5 bg-white/[0.01]">
            <input
              className="w-full bg-transparent px-8 pt-8 pb-4 font-display text-2xl font-bold text-white placeholder-white/10 outline-none border-b border-white/5"
              placeholder="Give this memory a name..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              autoFocus
            />
            <textarea
              className="flex-1 w-full resize-none bg-transparent px-8 py-6 font-sans text-sm leading-relaxed text-gray-300 placeholder-white/5 outline-none font-light"
              placeholder="What is the emotional resonance of this moment? Describe the sights, sounds, and thoughts..."
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>

          {/* Right: Sidebar */}
          <div className="w-80 space-y-8 overflow-y-auto bg-black/40 p-6 scrollbar-hide">
            {/* Mood */}
            <div>
              <label className="mb-3 block text-[9px] font-mono uppercase tracking-widest text-gray-500">
                Emotional Charge
              </label>
              <div className="flex flex-wrap gap-2">
                {EMOTION_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMood(option)}
                    className={cn(
                      'rounded-lg px-2.5 py-1.5 text-xs capitalize transition-all border font-mono tracking-wider cursor-pointer',
                      mood === option
                        ? 'bg-forge-cyan/10 border-forge-cyan/30 text-forge-cyan shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                        : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white',
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="mb-3 block text-[9px] font-mono uppercase tracking-widest text-gray-500">
                Visual Artifact (URL)
              </label>
              <div className="space-y-3">
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none transition-colors focus:border-white/20"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(event) => {
                    setImageUrl(event.target.value);
                    setImgError(false);
                  }}
                />
                {imageUrl && !imgError && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                      onError={() => setImgError(true)}
                    />
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

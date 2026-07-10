'use client';

import { MoodType } from '@forge/reflection';
import { X, Upload, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

import { Input, Label, Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import type { Memory, MemoryType } from '@/shared/types/memory';

import { uploadMemoryImage } from '../services/memoryService';

interface CreateMemoryModalProps {
  onClose: () => void;
  onSave: (memory: Partial<Memory> & { status?: string }) => void;
  initialData?: Memory & { status?: string } | null;
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

const TYPE_OPTIONS: MemoryType[] = ['moment', 'milestone', 'insight', 'challenge'];
const STATUS_OPTIONS = [
  { value: 'internal', label: 'Private (Internal)' },
  { value: 'active', label: 'Public (Active)' },
];

export function CreateMemoryModal({ onClose, onSave, initialData }: CreateMemoryModalProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [mood, setMood] = useState<MoodType>(initialData?.mood || MoodType.NEUTRAL);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [type, setType] = useState<MemoryType>(initialData?.type || 'moment');
  const [status, setStatus] = useState<string>(initialData?.status || 'internal');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const [imgError, setImgError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadMemoryImage(file);
      setImageUrl(url);
      setImgError(false);
      toast.success('Visual artifact uploaded successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload visual artifact');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddTag = () => {
    const val = tagInput.trim().toLowerCase().replace(/#/g, '');
    if (val && !tags.includes(val)) {
      setTags([...tags, val]);
    }
    setTagInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    const memoryPayload = {
      ...(initialData && { id: initialData.id }),
      title: title.trim(),
      content: content.trim(),
      mood,
      imageUrl: imageUrl.trim() || undefined,
      type,
      tags,
      status,
    };

    onSave(memoryPayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md fade-in animate-in duration-300">
      <div className="flex h-[600px] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-2xl slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-black/20">
          <Label variant="cyan" className="text-base font-bold tracking-wide uppercase">
            {initialData ? 'Refine Memory Node' : 'Preserve Memory Node'}
          </Label>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-white"
            >
              <X size={16} />
            </Button>
            <Button
              variant="glass"
              onClick={handleSave}
              className="border-forge-cyan/20 text-forge-cyan hover:border-forge-cyan/40 px-4 py-2 font-mono text-xs font-semibold shadow-[0_0_15px_rgba(34,211,238,0.1)]"
            >
              {initialData ? 'Update Node' : 'Crystallize'}
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Main Content */}
          <div className="flex-1 flex flex-col border-r border-white/5 bg-white/[0.01]">
            <Input
              variant="unstyled"
              className="w-full bg-transparent px-8 pt-8 pb-4 font-display text-2xl font-bold text-white placeholder-white/10 outline-none border-b border-white/5 focus:outline-none"
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
          <div className="w-96 space-y-6 overflow-y-auto bg-black/40 p-6 scrollbar-hide">
            {/* Memory Type */}
            <div>
              <Label variant="dim" className="mb-2 block text-[9px] uppercase tracking-widest">
                Chronicle Node Type
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {TYPE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setType(opt)}
                    className={cn(
                      'rounded-lg py-1.5 text-[11px] capitalize border font-mono tracking-wider cursor-pointer text-center',
                      type === opt
                        ? 'bg-forge-cyan/10 border-forge-cyan/30 text-forge-cyan shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                        : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white',
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood */}
            <div>
              <Label variant="dim" className="mb-2 block text-[9px] uppercase tracking-widest">
                Emotional Charge
              </Label>
              <div className="grid grid-cols-4 gap-1.5">
                {EMOTION_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMood(option)}
                    className={cn(
                      'rounded-lg py-1.5 text-[10px] capitalize border font-mono tracking-wide cursor-pointer text-center truncate px-1',
                      mood === option
                        ? 'bg-forge-cyan/15 border-forge-cyan/40 text-forge-cyan'
                        : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white',
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility Status */}
            <div>
              <Label variant="dim" className="mb-2 block text-[9px] uppercase tracking-widest">
                Visibility Status
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStatus(opt.value)}
                    className={cn(
                      'rounded-lg py-1.5 text-[11px] border font-mono tracking-wider cursor-pointer text-center',
                      status === opt.value
                        ? 'bg-forge-cyan/10 border-forge-cyan/30 text-forge-cyan'
                        : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white',
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Input */}
            <div>
              <Label variant="dim" className="mb-2 block text-[9px] uppercase tracking-widest">
                Tags & Anchors
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag (Enter or comma)..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-white/5 border-white/10 text-xs px-3 py-1.5 h-8 flex-1"
                />
                <Button
                  onClick={handleAddTag}
                  variant="glass"
                  className="px-2 py-0 h-8 border-white/10 text-white min-w-0"
                >
                  <Plus size={14} />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] font-mono text-gray-400"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-500 hover:text-red-400 font-bold ml-0.5"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Visual Artifact (File Upload) */}
            <div>
              <Label variant="dim" className="mb-2 block text-[9px] uppercase tracking-widest">
                Visual Artifact (Image)
              </Label>
              <div className="space-y-3">
                <div className="relative flex items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    disabled={isUploading}
                  />
                  <div className="flex flex-col items-center gap-1 text-center pointer-events-none">
                    <Upload size={16} className="text-gray-400" />
                    <span className="text-[11px] text-gray-300 font-mono">
                      {isUploading ? 'Uploading artifact...' : 'Select File to Upload'}
                    </span>
                  </div>
                </div>

                {imageUrl && !imgError && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-lg group">
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                      onError={() => setImgError(true)}
                    />
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-gray-400 hover:text-white transition-opacity opacity-0 group-hover:opacity-100"
                    >
                      <X size={12} />
                    </button>
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

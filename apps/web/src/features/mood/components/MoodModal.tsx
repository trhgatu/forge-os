'use client';

import { MoodType } from '@forge/reflection';
import { X } from 'lucide-react';
import { useState } from 'react';

import { Label, Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import type { MoodEntry } from '@/shared/types/mood';

import { MOOD_CONFIG } from '../config';
import type { CreateMoodDto } from '../services/moodService';

interface MoodModalProps {
  initialData?: MoodEntry;
  onClose: () => void;
  onSave: (entry: CreateMoodDto) => void;
}

export function MoodModal({ initialData, onClose, onSave }: MoodModalProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(initialData?.mood || null);
  const [intensity, setIntensity] = useState<number>(initialData?.intensity || 5);
  const [note, setNote] = useState(initialData?.note || '');
  const [step, setStep] = useState<1 | 2>(initialData ? 2 : 1);

  const handleSave = () => {
    if (!selectedMood) return;

    const newEntry: CreateMoodDto = {
      mood: selectedMood,
      intensity,
      note,
      tags: initialData?.tags || [],
    };

    onSave(newEntry);
    onClose();
  };

  const topMoods: MoodType[] = [
    MoodType.JOY,
    MoodType.HAPPY,
    MoodType.CALM,
    MoodType.INSPIRED,
    MoodType.NEUTRAL,
    MoodType.SAD,
    MoodType.STRESSED,
    MoodType.LONELY,
    MoodType.ANGRY,
    MoodType.ENERGETIC,
    MoodType.EMPTY,
    MoodType.FOCUSED,
    MoodType.ANXIOUS,
    MoodType.NOSTALGIC,
    MoodType.TIRED,
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-forge-bg shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 to-transparent" />

        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <Label variant="cyan" className="text-2xl font-bold tracking-tight block">
                {initialData ? 'Reflect & Edit' : 'Emotional Log'}
              </Label>
              <p className="mt-1 text-sm text-gray-400">
                {initialData
                  ? 'Update your emotional record'
                  : 'How does the inner world feel right now?'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-white rounded-full p-2"
            >
              <X size={20} />
            </Button>
          </div>

          {step === 1 ? (
            // Step 1: Chọn mood
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {topMoods.map((mood) => {
                const config = MOOD_CONFIG[mood];

                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => {
                      setSelectedMood(mood);
                      setStep(2);
                    }}
                    className="group flex flex-col items-center justify-center rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                  >
                    <div
                      className={cn(
                        'mb-3 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-110',
                        `${config.color.replace('text-', 'bg-')}/20`,
                      )}
                    >
                      <config.icon size={24} className={config.color} />
                    </div>
                    <span className="capitalize text-sm font-medium text-gray-300 group-hover:text-white">
                      {config.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            // Step 2: Cường độ + note
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              <div className="mb-6 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-gray-500 hover:text-white"
                >
                  ← Change
                </button>

                {selectedMood && (
                  <div className="flex items-center gap-2 text-xl font-bold capitalize text-white">
                    <div className={cn('h-3 w-3 rounded-full', MOOD_CONFIG[selectedMood].bg)} />
                    {selectedMood}
                  </div>
                )}
              </div>

              {/* Intensity */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <Label variant="dim">Intensity</Label>
                  <span className="font-mono text-white">{intensity}/10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-forge-accent"
                />
                <div className="mt-1 flex justify-between text-[10px] font-mono uppercase text-gray-600">
                  <span>Subtle</span>
                  <span>Overwhelming</span>
                </div>
              </div>

              {/* Note */}
              <div>
                <Label variant="dim" className="mb-2 block text-sm">Context / Triggers</Label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Why do you feel this way?"
                  className="h-24 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none transition-colors focus:border-forge-accent"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={!selectedMood}
                  variant="glass"
                  className="w-full sm:w-auto border-forge-accent/20 text-forge-accent hover:border-forge-accent/40 shadow-[0_0_15px_rgba(245,158,11,0.1)] px-6 py-3"
                >
                  {initialData ? 'Update Record' : 'Log Emotion'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




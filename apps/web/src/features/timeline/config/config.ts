import { MoodType } from '@forge/reflection';
import type { LucideIcon } from 'lucide-react';
import { Image as ImageIcon, BookOpen, Quote, Activity, Flag, Sparkles } from 'lucide-react';

import type { TimelineType } from '@/shared/types';

export const TYPE_CONFIG: Record<TimelineType, { icon: LucideIcon; color: string; label: string }> =
  {
    memory: { icon: ImageIcon, color: 'text-blue-400', label: 'Memory' },
    journal: { icon: BookOpen, color: 'text-purple-400', label: 'Journal' },
    quote: { icon: Quote, color: 'text-amber-400', label: 'Insight' },
    mood: { icon: Activity, color: 'text-pink-400', label: 'Mood' },
    milestone: { icon: Flag, color: 'text-red-400', label: 'Milestone' },
    insight: { icon: Sparkles, color: 'text-forge-cyan', label: 'AI Insight' },
  };

export const MOOD_COLORS: Record<MoodType, string> = {
  [MoodType.INSPIRED]: 'shadow-fuchsia-500/40 border-fuchsia-500/30',
  [MoodType.CALM]: 'shadow-cyan-500/40 border-cyan-500/30',
  [MoodType.ANXIOUS]: 'shadow-orange-500/40 border-orange-500/30',
  [MoodType.TIRED]: 'shadow-gray-500/40 border-gray-500/30',
  [MoodType.FOCUSED]: 'shadow-emerald-500/40 border-emerald-500/30',
  [MoodType.NEUTRAL]: 'shadow-white/20 border-white/10',
  [MoodType.JOY]: 'shadow-yellow-500/40 border-yellow-500/30',
  [MoodType.SAD]: 'shadow-indigo-500/40 border-indigo-500/30',
  [MoodType.STRESSED]: 'shadow-red-500/40 border-red-500/30',
  [MoodType.LONELY]: 'shadow-blue-500/40 border-blue-500/30',
  [MoodType.HAPPY]: 'shadow-green-500/40 border-green-500/30',
  [MoodType.ANGRY]: 'shadow-rose-500/40 border-rose-500/30',
  [MoodType.ENERGETIC]: 'shadow-lime-500/40 border-lime-500/30',
  [MoodType.EMPTY]: 'shadow-stone-500/40 border-stone-500/30',
  [MoodType.NOSTALGIC]: 'shadow-amber-500/40 border-amber-500/30',
};




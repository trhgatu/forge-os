'use client';

import { MoodType } from '@forge/reflection';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Anchor,
  Cloud,
  Droplets,
  Flame,
  Ghost,
  Moon,
  Sparkles,
  Sun,
  Wind,
  History as HistoryIcon,
} from 'lucide-react';


export interface MoodConfigItem {
  label: string;
  color: string;
  bg: string;
  icon: LucideIcon;
  weight: number;
}

export const MOOD_CONFIG: Record<MoodType, MoodConfigItem> = {
  [MoodType.JOY]: {
    label: 'Joy',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500',
    icon: Sun,
    weight: 9,
  },
  [MoodType.HAPPY]: {
    label: 'Happy',
    color: 'text-green-400',
    bg: 'bg-green-500',
    icon: Sun,
    weight: 8,
  },
  [MoodType.CALM]: {
    label: 'Calm',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500',
    icon: Anchor,
    weight: 6,
  },
  [MoodType.INSPIRED]: {
    label: 'Inspired',
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500',
    icon: Sparkles,
    weight: 10,
  },
  [MoodType.NEUTRAL]: {
    label: 'Neutral',
    color: 'text-gray-300',
    bg: 'bg-gray-500',
    icon: Cloud,
    weight: 5,
  },
  [MoodType.SAD]: {
    label: 'Sad',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500',
    icon: Droplets,
    weight: 2,
  },
  [MoodType.STRESSED]: {
    label: 'Stressed',
    color: 'text-red-400',
    bg: 'bg-red-500',
    icon: Flame,
    weight: 3,
  },
  [MoodType.LONELY]: {
    label: 'Lonely',
    color: 'text-blue-400',
    bg: 'bg-blue-500',
    icon: Ghost,
    weight: 1,
  },
  [MoodType.ANGRY]: {
    label: 'Angry',
    color: 'text-rose-600',
    bg: 'bg-rose-600',
    icon: Flame,
    weight: 8,
  },
  [MoodType.ENERGETIC]: {
    label: 'Energetic',
    color: 'text-lime-400',
    bg: 'bg-lime-500',
    icon: Activity,
    weight: 9,
  },
  [MoodType.EMPTY]: {
    label: 'Empty',
    color: 'text-stone-400',
    bg: 'bg-stone-500',
    icon: Moon,
    weight: 0,
  },
  [MoodType.FOCUSED]: {
    label: 'Focused',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500',
    icon: Activity,
    weight: 7,
  },
  [MoodType.ANXIOUS]: {
    label: 'Anxious',
    color: 'text-orange-400',
    bg: 'bg-orange-500',
    icon: Wind,
    weight: 4,
  },
  [MoodType.TIRED]: {
    label: 'Tired',
    color: 'text-slate-400',
    bg: 'bg-slate-500',
    icon: Moon,
    weight: 2,
  },
  [MoodType.NOSTALGIC]: {
    label: 'Nostalgic',
    color: 'text-amber-400',
    bg: 'bg-amber-500',
    icon: HistoryIcon,
    weight: 4,
  },
};

export const MOOD_CHART_COLOR = '#FBBF24';
export const MOOD_CHART_GRADIENT_ID = 'moodGradient';




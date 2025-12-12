"use client";

import type { LucideIcon } from "lucide-react";
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
} from "lucide-react";
import type { MoodType } from "@/shared/types";

export interface MoodConfigItem {
  label: string;
  color: string;
  bg: string;
  icon: LucideIcon;
  weight: number;
}

export const MOOD_CONFIG: Record<MoodType, MoodConfigItem> = {
  joy: {
    label: "Joy",
    color: "text-yellow-400",
    bg: "bg-yellow-500",
    icon: Sun,
    weight: 9,
  },
  calm: {
    label: "Calm",
    color: "text-cyan-400",
    bg: "bg-cyan-500",
    icon: Anchor,
    weight: 6,
  },
  inspired: {
    label: "Inspired",
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500",
    icon: Sparkles,
    weight: 10,
  },
  neutral: {
    label: "Neutral",
    color: "text-gray-300",
    bg: "bg-gray-500",
    icon: Cloud,
    weight: 5,
  },
  sad: {
    label: "Sad",
    color: "text-indigo-400",
    bg: "bg-indigo-500",
    icon: Droplets,
    weight: 2,
  },
  stressed: {
    label: "Stressed",
    color: "text-red-400",
    bg: "bg-red-500",
    icon: Flame,
    weight: 3,
  },
  lonely: {
    label: "Lonely",
    color: "text-blue-400",
    bg: "bg-blue-500",
    icon: Ghost,
    weight: 1,
  },
  angry: {
    label: "Angry",
    color: "text-rose-600",
    bg: "bg-rose-600",
    icon: Flame,
    weight: 8,
  },
  energetic: {
    label: "Energetic",
    color: "text-lime-400",
    bg: "bg-lime-500",
    icon: Activity,
    weight: 9,
  },
  empty: {
    label: "Empty",
    color: "text-stone-400",
    bg: "bg-stone-500",
    icon: Moon,
    weight: 0,
  },
  focused: {
    label: "Focused",
    color: "text-emerald-400",
    bg: "bg-emerald-500",
    icon: Activity,
    weight: 7,
  },
  anxious: {
    label: "Anxious",
    color: "text-orange-400",
    bg: "bg-orange-500",
    icon: Wind,
    weight: 4,
  },
  tired: {
    label: "Tired",
    color: "text-slate-400",
    bg: "bg-slate-500",
    icon: Moon,
    weight: 2,
  },
};

export const MOOD_CHART_COLOR = "#FBBF24";
export const MOOD_CHART_GRADIENT_ID = "moodGradient";

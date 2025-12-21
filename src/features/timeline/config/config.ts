import {
  Image as ImageIcon,
  BookOpen,
  Quote,
  Activity,
  Flag,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import type { TimelineType, MoodType } from "@/shared/types";

export const TYPE_CONFIG: Record<TimelineType, { icon: LucideIcon; color: string; label: string }> =
  {
    memory: { icon: ImageIcon, color: "text-blue-400", label: "Memory" },
    journal: { icon: BookOpen, color: "text-purple-400", label: "Journal" },
    quote: { icon: Quote, color: "text-amber-400", label: "Insight" },
    mood: { icon: Activity, color: "text-pink-400", label: "Mood" },
    milestone: { icon: Flag, color: "text-red-400", label: "Milestone" },
    insight: { icon: Sparkles, color: "text-forge-cyan", label: "AI Insight" },
  };

export const MOOD_COLORS: Record<MoodType, string> = {
  inspired: "shadow-fuchsia-500/40 border-fuchsia-500/30",
  calm: "shadow-cyan-500/40 border-cyan-500/30",
  anxious: "shadow-orange-500/40 border-orange-500/30",
  tired: "shadow-gray-500/40 border-gray-500/30",
  focused: "shadow-emerald-500/40 border-emerald-500/30",
  neutral: "shadow-white/20 border-white/10",
  joy: "shadow-yellow-500/40 border-yellow-500/30",
  sad: "shadow-indigo-500/40 border-indigo-500/30",
  stressed: "shadow-red-500/40 border-red-500/30",
  lonely: "shadow-blue-500/40 border-blue-500/30",
  angry: "shadow-rose-500/40 border-rose-500/30",
  energetic: "shadow-lime-500/40 border-lime-500/30",
  empty: "shadow-stone-500/40 border-stone-500/30",
};

import { MoodType } from "@/shared/types";

export const MOOD_COLORS: Record<MoodType, string> = {
  inspired: "text-fuchsia-400 bg-fuchsia-400/10",
  calm: "text-cyan-400 bg-cyan-400/10",
  anxious: "text-orange-400 bg-orange-400/10",
  tired: "text-gray-400 bg-gray-400/10",
  focused: "text-emerald-400 bg-emerald-400/10",
  neutral: "text-white bg-white/10",
  joy: "text-yellow-400 bg-yellow-400/10",
  sad: "text-indigo-400 bg-indigo-400/10",
  stressed: "text-red-400 bg-red-400/10",
  lonely: "text-blue-400 bg-blue-400/10",
  angry: "text-rose-500 bg-rose-500/10",
  energetic: "text-lime-400 bg-lime-400/10",
  empty: "text-stone-400 bg-stone-400/10",
  nostalgic: "text-amber-400 bg-amber-400/10",
};

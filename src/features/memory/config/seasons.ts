import type { LucideIcon } from "lucide-react";
import { Sprout, Sun, Leaf, Snowflake } from "lucide-react";
import type { MoodType } from "@/shared/types";

export type InnerSeason = "Spring" | "Summer" | "Autumn" | "Winter";

export type SeasonTexture = "dust" | "shimmer" | "leaves" | "snow";

export interface SeasonConfig {
  id: InnerSeason;
  label: string;
  icon: LucideIcon;
  gradient: string;
  border: string;
  accent: string;
  bg: string;
  whisper: string;
  texture: SeasonTexture;
  particleColor: string;
}

export const SEASON_CONFIG: Record<InnerSeason, SeasonConfig> = {
  Spring: {
    id: "Spring",
    label: "Awakening",
    icon: Sprout,
    gradient: "from-emerald-500/20 via-teal-500/10 to-sky-500/5",
    bg: "bg-[#061414]",
    border: "border-emerald-400/20",
    accent: "text-emerald-200",
    whisper: "Có thứ gì đó đang mở ra trong mày.",
    texture: "dust",
    particleColor: "bg-emerald-100",
  },
  Summer: {
    id: "Summer",
    label: "Drive",
    icon: Sun,
    gradient: "from-amber-900/40 via-orange-900/20 to-slate-900/40",
    bg: "bg-[#110c05]",
    border: "border-amber-500/30",
    accent: "text-amber-200",
    whisper: "Khoảnh khắc này vẫn mang hơi ấm và sức đẩy.",
    texture: "shimmer",
    particleColor: "bg-amber-100",
  },
  Autumn: {
    id: "Autumn",
    label: "Depth",
    icon: Leaf,
    gradient: "from-orange-950/40 via-rose-950/20 to-slate-900/40",
    bg: "bg-[#110805]",
    border: "border-orange-400/30",
    accent: "text-orange-200",
    whisper: "Chiều sâu của ký ức này chạm vào một phần trưởng thành của mày.",
    texture: "leaves",
    particleColor: "bg-orange-300",
  },
  Winter: {
    id: "Winter",
    label: "Stillness",
    icon: Snowflake,
    gradient: "from-slate-900/60 via-indigo-950/20 to-slate-950/60",
    bg: "bg-[#050508]",
    border: "border-indigo-300/20",
    accent: "text-indigo-200",
    whisper: "Im lặng trong ký ức này nói nhiều hơn bất cứ lời nào.",
    texture: "snow",
    particleColor: "bg-white",
  },
};

export function getSeasonFromMood(mood: MoodType): InnerSeason {
  switch (mood) {
    case "calm":
    case "sad":
    case "lonely":
      return "Spring";

    case "joy":
    case "energetic":
    case "angry":
    case "stressed":
      return "Summer";

    case "inspired":
    case "anxious":
    case "nostalgic":
      return "Autumn";

    case "neutral":
    case "focused":
    case "tired":
    case "empty":
    default:
      return "Winter";
  }
}

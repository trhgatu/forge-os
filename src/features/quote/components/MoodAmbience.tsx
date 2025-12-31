import React from "react";
import { cn } from "@/shared/lib/utils";
import { SEASON_CONFIG, getSeasonFromMood } from "../../memory/config/seasons";
import type { MoodType } from "@/shared/types/journal";

interface MoodAmbienceProps {
  mood: MoodType | "all";
}

export const MoodAmbience: React.FC<MoodAmbienceProps> = ({ mood }) => {
  const seasonId = mood === "all" ? "Winter" : getSeasonFromMood(mood);
  const config = SEASON_CONFIG[seasonId];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#0a0a0a] transition-colors duration-[5000ms]">
      {/* 1. Base Deep Atmosphere (Darkened) */}
      <div
        className={cn(
          "absolute inset-0 opacity-20 transition-colors duration-[5000ms] mix-blend-normal",
          config.bg
        )}
      />

      {/* 2. Primary Nebula (Subtle Overlay) */}
      <div
        className={cn(
          "absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-10 animate-[spin_60s_linear_infinite] mix-blend-overlay transition-all duration-[5000ms]",
          config.particleColor
        )}
      />

      {/* 3. Secondary Aurora (Deep Glow) */}
      <div
        className={cn(
          "absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full blur-[150px] opacity-5 animate-[pulse_10s_ease-in-out_infinite] mix-blend-overlay transition-all duration-[5000ms]",
          config.accent.replace("text-", "bg-")
        )}
      />

      {/* 4. The Prism (Faint Iridescence) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[100px] opacity-5 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 mix-blend-overlay animate-pulse" />

      {/* 5. Vertical Pillars of Light (The Stacks) */}
      <div className="absolute inset-0 flex justify-around opacity-10 pointer-events-none">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent transform translate-y-[-20%] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="w-[100px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent blur-xl transform translate-y-[10%] animate-[pulse_12s_ease-in-out_infinite_1s]" />
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent transform translate-y-[-10%] animate-[pulse_10s_ease-in-out_infinite_2s]" />
      </div>

      {/* 6. Ceiling Light (Ambient Reading Light) */}
      <div
        className={cn(
          "absolute top-[-20%] left-1/4 w-[50%] h-[400px] blur-[120px] opacity-10 transition-all duration-[8000ms]",
          "bg-gradient-to-b from-white/20 to-transparent"
        )}
      />

      {/* 7. Floor Reflection (Grounding) */}
      <div
        className={cn(
          "absolute bottom-0 inset-x-0 h-[30%] bg-gradient-to-t from-[#050505] to-transparent opacity-80"
        )}
      />

      {/* 8. Paper Texture (Library feel) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay" />
    </div>
  );
};

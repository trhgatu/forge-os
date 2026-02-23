import React, { useEffect, useState, useRef } from "react";
import { Sparkles, Flame } from "lucide-react";
import { gamificationService } from "../services/gamificationService";
import { UserStats } from "../types";
import { LevelUpModal } from "./LevelUpModal";
import { cn } from "@/shared/lib/utils";
import { useAuthStore } from "@/shared/store/authStore";
import { useGamificationSocket } from "../hooks/useGamificationSocket";
import { useLanguage } from "@/contexts";

interface XPBarProps {
  compact?: boolean;
}

export const XPBar: React.FC<XPBarProps> = ({ compact = false }) => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth User
  const user = useAuthStore((state) => state.user);

  // Level Up State
  const [showLevelUp, setShowLevelUp] = useState(false);
  const previousLevelRef = useRef<number | null>(null);

  const fetchStats = React.useCallback(async () => {
    if (!user?.id) return;
    try {
      const data = await gamificationService.getStats();
      if (data) {
        if (previousLevelRef.current !== null && data.level > previousLevelRef.current) {
          setShowLevelUp(true);
        }
        previousLevelRef.current = data.level;
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch gamification stats", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Update the hook usage to call the memoized function
  useGamificationSocket(user?.id, fetchStats);

  if (loading) return <div className="h-6 w-32 bg-white/5 rounded-full animate-pulse" />;
  if (!stats) return null;

  // Calculate generic progress
  const currentLevelXp = Math.pow(stats.level - 1, 2) * 100;
  const nextLevelXp = Math.pow(stats.level, 2) * 100;
  const progress = Math.min(
    100,
    Math.max(0, ((stats.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100)
  );

  return (
    <div
      className={cn(
        "flex items-center gap-4 select-none transition-all duration-300",
        compact
          ? "justify-center gap-0"
          : "p-3 bg-white/5 rounded-sm border border-white/5 hover:border-forge-cyan/30 shadow-lg group-hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]"
      )}
    >
      {/* Level Badge - Industrial Hex/Square Look */}
      <div className="relative group cursor-pointer">
        {/* Tech Glow - Always active now but subtle */}
        <div className="absolute -inset-0.5 bg-forge-cyan/20 opacity-50 blur-md rounded-sm animate-pulse" />

        <div
          className={cn(
            "relative flex items-center gap-3 px-3 py-2 bg-black border border-zinc-700/80 rounded-sm shadow-lg group-hover:border-forge-cyan transition-colors z-10",
            compact && "px-2 py-2 border-transparent bg-transparent shadow-none"
          )}
        >
          <div className="flex items-center justify-center w-6 h-6 bg-zinc-900 rounded-sm border border-zinc-700 text-forge-cyan shadow-[0_0_8px_rgba(34,211,238,0.3)]">
            <Sparkles
              size={14}
              className="text-forge-cyan drop-shadow-[0_0_3px_rgba(34,211,238,0.8)]"
            />
          </div>

          {!compact && (
            <div className="flex flex-col leading-none">
              <span className="text-[9px] text-forge-cyan/80 font-[family-name:var(--font-rajdhani)] uppercase tracking-widest mb-0.5">
                {t("gamification.level")}
              </span>
              <span className="text-xl font-bold text-white font-[family-name:var(--font-rajdhani)] tracking-wide drop-shadow-md">
                {String(stats.level).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        {/* Tooltip / Expanded Stats - Technical HUD Style */}
        <div className="absolute bottom-full left-0 mb-4 w-72 p-0 rounded-sm bg-[#050505] border border-forge-cyan/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden backdrop-blur-xl">
          {/* Header Strip */}
          <div className="bg-zinc-900/90 px-4 py-2 border-b border-white/10 flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-forge-cyan/10 to-transparent opacity-50" />
            <span className="text-sm font-[family-name:var(--font-rajdhani)] text-forge-cyan uppercase tracking-[0.2em] relative z-10 font-bold">
              {t("gamification.operator_stats")}
            </span>
            <div className="flex gap-1.5 relative z-10">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_red]" />
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-[0_0_5px_orange]" />
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_lime]" />
            </div>
          </div>

          <div className="p-4 space-y-5 relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Title Section */}
            <div className="relative flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-[family-name:var(--font-rajdhani)]">
                {t("gamification.rank_designation")}
              </span>
              <span className="text-xs text-white font-bold uppercase tracking-wide px-3 py-1 bg-forge-cyan/10 border border-forge-cyan/20 rounded-sm text-forge-cyan font-[family-name:var(--font-rajdhani)]">
                {stats.title}
              </span>
            </div>

            {/* XP Section */}
            <div className="space-y-2 relative">
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-[family-name:var(--font-rajdhani)]">
                  {t("gamification.experience_log")}
                </span>
                <span className="text-sm font-[family-name:var(--font-rajdhani)] text-forge-cyan font-bold">
                  {Math.floor(stats.xp)} <span className="text-gray-600 font-normal">/</span>{" "}
                  {nextLevelXp} XP
                </span>
              </div>
              <div className="h-2.5 w-full bg-black rounded-sm border border-zinc-800 relative overflow-hidden p-[1px]">
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 z-10 opacity-20 bg-[url('/assets/noise.svg')]" />
                <div
                  className="h-full bg-forge-cyan shadow-[0_0_15px_#22d3ee] relative z-0 duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_white]" />
                </div>
              </div>
            </div>

            {/* Footer / Streak */}
            <div className="pt-2 flex justify-between items-center relative">
              <div className="flex items-center gap-2 text-xs text-amber-500 font-mono bg-amber-500/10 px-2 py-1 rounded-sm border border-amber-500/20">
                <Flame size={12} fill="currentColor" className="animate-pulse" />
                <span className="font-bold font-[family-name:var(--font-rajdhani)] tracking-wide">
                  {stats.streak} {t("gamification.day_streak").toUpperCase()}
                </span>
              </div>
              <span className="text-[9px] text-zinc-600 font-mono tracking-tighter">
                ID:{" "}
                {user?.id
                  ? `${user.id.substring(0, 4)}...${user.id.substring(user.id.length - 4)}`
                  : "UNK"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Progress Bar - Dashboard Module Style */}
      {!compact && (
        <div className="flex flex-col gap-1.5 flex-1 group/bar">
          <div className="flex justify-between items-end px-0.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-medium group-hover/bar:text-forge-cyan transition-colors duration-300">
              {t("gamification.progression")}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 group-hover/bar:text-white transition-colors duration-300">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 w-full bg-black/50 rounded-sm border border-white/10 overflow-hidden relative shadow-inner">
            {/* Segmented Look */}
            <div className="absolute inset-0 z-20 flex justify-between opacity-20 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-[1px] h-full bg-black" />
              ))}
            </div>
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-forge-cyan shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:10px_10px]" />
            </div>
          </div>
        </div>
      )}

      <LevelUpModal
        isOpen={showLevelUp}
        newLevel={stats.level}
        onClose={() => setShowLevelUp(false)}
      />
    </div>
  );
};

export default XPBar;

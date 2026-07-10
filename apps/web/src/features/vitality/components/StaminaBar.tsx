'use client';

import React from 'react';
import { Activity, Droplet, Moon, Dumbbell, Zap } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useVitalityStats } from '../hooks/useVitality';
import { useActiveEffects } from '@/features/gamification/hooks/useActiveEffects';

interface StaminaBarProps {
  compact?: boolean;
}

export const StaminaBar: React.FC<StaminaBarProps> = ({ compact = false }) => {
  const { data: stats, isLoading } = useVitalityStats();
  const { data: activeEffects = [] } = useActiveEffects();

  if (isLoading || !stats) {
    return (
      <div className="flex items-center justify-center p-3 animate-pulse bg-white/5 rounded-xl border border-white/5">
        <div className="w-5 h-5 rounded-full bg-zinc-800" />
      </div>
    );
  }

  const staminaPercent = Math.min(100, Math.max(0, Math.round((stats.stamina / stats.maxStamina) * 100)));

  // Determine active colors based on stamina level
  const statusColorClass =
    staminaPercent > 50 ? 'text-emerald-400 border-emerald-500/25 bg-emerald-500/10' :
    staminaPercent > 20 ? 'text-amber-400 border-amber-500/25 bg-amber-500/10' :
    'text-rose-500 border-rose-500/25 bg-rose-500/10 animate-pulse';

  const cellColorClass = (index: number) => {
    const isActive = staminaPercent > index * 10;
    if (!isActive) return 'bg-zinc-950 border border-white/[0.03]';

    if (staminaPercent > 50) return 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-[0_0_8px_#10b981] border border-emerald-400/30';
    if (staminaPercent > 20) return 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-[0_0_8px_#f59e0b] border border-amber-400/30';
    return 'bg-gradient-to-t from-rose-600 to-rose-400 shadow-[0_0_8px_#f43f5e] border border-rose-400/30 animate-pulse';
  };

  const handleBarClick = () => {
    window.location.href = '/forge/energy';
  };

  if (compact) {
    // A micro vertical battery in compact mode
    return (
      <div
        onClick={handleBarClick}
        title={`Stamina: ${stats.stamina}/${stats.maxStamina}`}
        className="relative group cursor-pointer flex flex-col items-center justify-center p-2 rounded-xl bg-black/40 hover:bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all duration-300"
      >
        <div className="absolute -inset-0.5 opacity-20 blur-md rounded-xl bg-emerald-500/10 group-hover:opacity-40" />
        
        {/* Micro-reactor core battery cells */}
        <div className="flex flex-col gap-[2px] w-3 h-8 bg-zinc-950 p-[2px] rounded-[3px] border border-white/10 relative z-10">
          {[...Array(4)].reverse().map((_, i) => {
            const isActive = staminaPercent > i * 25;
            return (
              <div
                key={i}
                className={cn(
                  "flex-1 w-full rounded-[1px] transition-all duration-300",
                  isActive
                    ? staminaPercent > 50 ? 'bg-emerald-400 shadow-[0_0_4px_#10b981]' : staminaPercent > 20 ? 'bg-amber-400 shadow-[0_0_4px_#f59e0b]' : 'bg-rose-500 animate-pulse'
                    : 'bg-zinc-900'
                )}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleBarClick}
      className="w-full select-none cursor-pointer group transition-all duration-300"
    >
      <div className="relative group/tooltip">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] text-zinc-500 font-mono tracking-wider group-hover:text-emerald-400 transition-colors duration-300">
            STAMINA
          </span>
          <span className={cn("text-xs font-mono font-bold", 
            staminaPercent > 50 ? 'text-emerald-400' : staminaPercent > 20 ? 'text-amber-400' : 'text-rose-400'
          )}>
            {stats.stamina}<span className="text-zinc-600 font-normal">/{stats.maxStamina}</span>
          </span>
        </div>

        {/* Slim progress bar */}
        <div className="h-1.5 w-full bg-black/50 rounded-sm border border-white/10 overflow-hidden relative shadow-inner">
          <div
            className={cn(
              "h-full rounded-sm transition-all duration-1000 ease-out",
              staminaPercent > 50 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_8px_#10b981]' : 
              staminaPercent > 20 ? 'bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_8px_#f59e0b]' : 
              'bg-gradient-to-r from-rose-600 to-rose-400 animate-pulse'
            )}
            style={{ width: `${staminaPercent}%` }}
          />
        </div>

        {/* Detailed HUD Tooltip */}
        <div className="absolute bottom-full left-0 mb-4 w-72 p-0 rounded-sm bg-[#050505] border border-emerald-500/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 overflow-hidden backdrop-blur-xl">
          {/* Header Strip */}
          <div className="bg-zinc-900/90 px-4 py-2 border-b border-white/10 flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-transparent opacity-50" />
            <span className="text-sm text-emerald-400 uppercase tracking-[0.2em] relative z-10 font-bold">
              BIOLOGICAL CORE
            </span>
          </div>

          <div className="p-4 space-y-4 relative">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Stamina details */}
            <div className="space-y-1 relative">
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                  Physical Stamina
                </span>
                <span className={cn("text-xs font-bold font-mono", 
                  staminaPercent > 50 ? 'text-emerald-400' : staminaPercent > 20 ? 'text-amber-400' : 'text-rose-400'
                )}>
                  {stats.stamina} / {stats.maxStamina}
                </span>
              </div>
            </div>

            {/* Sub-parameters */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
              <div className="flex flex-col items-center p-2 bg-white/[0.02] border border-white/5 rounded-sm">
                <Droplet size={12} className="text-cyan-400 mb-1" />
                <span className="text-[8px] text-gray-500 uppercase font-mono">Hydration</span>
                <span className="text-xs font-bold text-gray-200 mt-0.5">{stats.totalsToday?.hydrationMl || 0}ml</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-white/[0.02] border border-white/5 rounded-sm">
                <Moon size={12} className="text-indigo-400 mb-1" />
                <span className="text-[8px] text-gray-500 uppercase font-mono">Sleep</span>
                <span className="text-xs font-bold text-gray-200 mt-0.5">
                  {stats.totalsToday?.sleep?.logged ? `${stats.totalsToday.sleep.durationHours}h` : 'None'}
                </span>
              </div>
              <div className="flex flex-col items-center p-2 bg-white/[0.02] border border-white/5 rounded-sm">
                <Dumbbell size={12} className="text-amber-400 mb-1" />
                <span className="text-[8px] text-gray-500 uppercase font-mono">Workouts</span>
                <span className="text-xs font-bold text-gray-200 mt-0.5">{stats.totalsToday?.workouts?.length || 0}</span>
              </div>
            </div>

            {/* Active Buffs */}
            {activeEffects.length > 0 && (
              <div className="border-t border-white/5 pt-2 space-y-1.5">
                <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold">
                  Bio-Modulators
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeEffects.map(effect => (
                    <div
                      key={effect.id}
                      className={cn(
                        "text-[9px] font-mono px-2 py-0.5 rounded-sm border flex items-center gap-1",
                        effect.type === 'STOIC_RESOLVE' ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400" :
                        effect.type === 'CAFFEINE_RUSH' ? "bg-amber-500/10 border-amber-500/25 text-amber-400" :
                        "bg-zinc-500/10 border-zinc-500/25 text-zinc-400"
                      )}
                    >
                      <Zap size={8} />
                      {effect.type}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

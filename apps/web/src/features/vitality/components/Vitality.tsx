'use client';

import React from 'react';
import { Sparkles, HeartPulse, Droplet, Moon, Dumbbell, Zap } from 'lucide-react';
import { Label, Skeleton, Tag, WidgetShell, GlassCard } from '@/shared/components/ui';
import { BioReactorWidget } from './BioReactorWidget';
import { useVitalityStats } from '../hooks/useVitality';
import { useActiveEffects } from '@/features/gamification/hooks/useActiveEffects';
import { cn } from '@/shared/lib/utils';

export function Vitality() {
  const { data: stats, isLoading: statsLoading } = useVitalityStats();
  const { data: activeEffects = [], isLoading: effectsLoading } = useActiveEffects();

  const isLoading = statsLoading || effectsLoading;

  if (isLoading || !stats) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center p-6 md:p-10 bg-transparent text-white font-sans animate-pulse">
        <div className="relative flex flex-col items-center gap-4 w-full max-w-[1600px] mx-auto">
          <Skeleton variant="glowing" className="w-full h-[100px] rounded-xl" />
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 w-full mt-4">
            <Skeleton variant="glowing" className="h-[280px] rounded-xl col-span-1 xl:col-span-3" />
            <Skeleton variant="glowing" className="h-[280px] rounded-xl col-span-1" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-emerald-400/60 animate-pulse mt-6 font-mono">
            Calibrating Biological Energy Telemetry...
          </span>
        </div>
      </div>
    );
  }

  const staminaPercent = Math.min(100, Math.max(0, Math.round((stats.stamina / stats.maxStamina) * 100)));
  const hydrationTarget = 3000;
  const hydrationPercent = Math.min(100, Math.round(((stats.totalsToday?.hydrationMl || 0) / hydrationTarget) * 100));

  const sleepTarget = 8;
  const sleepHours = stats.totalsToday?.sleep?.durationHours || 0;
  const sleepPercent = Math.min(100, Math.round((sleepHours / sleepTarget) * 100));

  return (
    <div className="relative flex h-full overflow-hidden bg-transparent text-white animate-in fade-in duration-700">
      {/* Main content area */}
      <div className="relative z-10 flex h-full flex-1 flex-col overflow-hidden">
        {/* Page Header */}
        <div className="sticky top-0 z-20 border-b border-white/5 px-8 py-8 backdrop-blur-xl bg-transparent">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-2 opacity-80">
                <div className="h-px w-8 bg-gradient-to-r from-emerald-500/40 to-transparent" />
                <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase text-emerald-400">
                  Bio-Telemetry Core
                </Label>
              </div>

              <Label variant="default" className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3 block capitalize">
                Vitality & Energy
              </Label>

              <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xl">
                Track your biological batteries and stamina modifiers. Maintain optimal cellular hydration, restorative sleep, and workout resonance to maximize daily XP gains.
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable View Content */}
        <div className="scrollbar-hide flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* Main Core Widget */}
          <BioReactorWidget />

          {/* Detailed stats grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hydration breakdown */}
            <WidgetShell
              title={
                <div className="flex items-center gap-3 text-white normal-case tracking-normal">
                  <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                    <Droplet className="text-cyan-400" size={16} />
                  </div>
                  <span className="text-xs font-mono tracking-wider font-bold text-zinc-100">Hydration Level</span>
                </div>
              }
              headerRight={<Tag variant="cyan" className="text-[9px] font-bold">{hydrationPercent}% Target</Tag>}
              glowColor="forge-cyan"
            >
              <div className="space-y-2 mt-2">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Today's Total</span>
                  <span className="font-mono text-zinc-100 font-bold">{stats.totalsToday?.hydrationMl || 0}ml / {hydrationTarget}ml</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full transition-all duration-1000"
                    style={{ width: `${hydrationPercent}%` }}
                  />
                </div>
                <p className="text-[10px] text-zinc-500 font-light pt-1 leading-relaxed">
                  Stamina regenerates (+5 stamina) for each 250ml cup. Limit to 3000ml (12 cups) daily to prevent metabolic overload.
                </p>
              </div>
            </WidgetShell>

            {/* Sleep Restorations */}
            <WidgetShell
              title={
                <div className="flex items-center gap-3 text-white normal-case tracking-normal">
                  <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                    <Moon className="text-indigo-400" size={16} />
                  </div>
                  <span className="text-xs font-mono tracking-wider font-bold text-zinc-100">Sleep Recovery</span>
                </div>
              }
              headerRight={<Tag variant="default" className="text-[9px] font-bold bg-indigo-500/20 border-indigo-500/30 text-indigo-300">{sleepPercent}% Target</Tag>}
              glowColor="white"
            >
              <div className="space-y-2 mt-2">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Rest Duration</span>
                  <span className="font-mono text-zinc-100 font-bold">{sleepHours}h / {sleepTarget}h</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full transition-all duration-1000"
                    style={{ width: `${sleepPercent}%` }}
                  />
                </div>
                <p className="text-[10px] text-zinc-500 font-light pt-1 leading-relaxed">
                  Achieving sleep metrics triggers a morning stamina reset to 90% full charge.
                </p>
              </div>
            </WidgetShell>
          </div>
        </div>
      </div>

      {/* Right panel containing diagnostics */}
      <div className="hidden h-full w-80 border-l border-white/5 bg-black/20 backdrop-blur-xl xl:block">
        <div className="border-b border-white/5 p-6 flex items-center gap-2">
          <HeartPulse className="text-emerald-400" size={16} />
          <Label variant="default" className="text-sm font-semibold tracking-widest uppercase block">
            Bio-Metrics Diagnostic
          </Label>
        </div>
        
        <div className="p-6 space-y-8">
          <div>
            <Label variant="dim" className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4">
              XP Modifiers & Buffs
            </Label>
            
            <div className="space-y-4">
              {/* Flow state factor */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5">
                  <span>Flow State Threshold (&gt;70% Stamina)</span>
                  <span className={cn("font-bold", stats.stamina >= 70 ? "text-emerald-400" : "text-zinc-500")}>
                    {stats.stamina >= 70 ? "ACTIVE (1.2x XP)" : "INACTIVE"}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      stats.stamina >= 70 ? "bg-emerald-400" : "bg-zinc-600"
                    )}
                    style={{ width: `${staminaPercent}%` }}
                  />
                </div>
              </div>

              {/* Status Effects List */}
              <div className="pt-2">
                <span className="text-[10px] text-zinc-400 font-mono">Current Multipliers:</span>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center text-xs p-2.5 bg-white/[0.01] border border-white/5 rounded-xl">
                    <span className="text-zinc-300">Base XP Rate</span>
                    <span className="font-mono text-zinc-400">1.0x</span>
                  </div>
                  {stats.stamina >= 70 && (
                    <div className="flex justify-between items-center text-xs p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-emerald-400">
                      <span>Flow State Modifier</span>
                      <span className="font-mono font-bold">+20%</span>
                    </div>
                  )}
                  {activeEffects.map(effect => (
                    <div 
                      key={effect.id} 
                      className="flex justify-between items-center text-xs p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-emerald-400"
                    >
                      <span>{effect.type} Modifier</span>
                      <span className="font-mono font-bold">
                        {effect.type === 'STOIC_RESOLVE' ? '+20%' : effect.type === 'CAFFEINE_RUSH' ? '+10%' : '+0%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Core Insights */}
          <div>
            <Label variant="dim" className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">
              AI Core Insights
            </Label>
            <GlassCard interactive={false} gradient={true} noPadding={false} className="border-white/5 bg-white/[0.01]">
              <span className="text-xs text-gray-300 leading-relaxed font-light italic">
                {stats.stamina >= 70 
                  ? `"Your physical bio-battery is highly charged. XP accrual is boosted by 20%. Maintain this focus state with continuous hydration."`
                  : stats.stamina < 30
                  ? `"Warning: Low stamina level detected. Perform a nap, hydration intake, or routine recovery immediately to restore mental capacity."`
                  : `"Your energy baseline is nominal. Keep hydrated and plan your workouts to maximize resonance."`
                }
              </span>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}

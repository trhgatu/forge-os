'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Droplet, 
  Moon, 
  Dumbbell, 
  Coffee, 
  Sparkles, 
  Plus, 
  Compass, 
  ChevronRight, 
  Zap 
} from 'lucide-react';
import { WidgetShell, Button, Label, Tag } from '@/shared/components/ui';
import { useVitalityStats, useLogVitality } from '../hooks/useVitality';
import { useActiveEffects } from '@/features/gamification/hooks/useActiveEffects';
import { cn } from '@/shared/lib/utils';
import { BioReactorModal } from './BioReactorModal';

export const BioReactorWidget: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = useVitalityStats();
  const { data: activeEffects = [], isLoading: effectsLoading } = useActiveEffects();
  const isLoading = statsLoading || effectsLoading;
  const logMutation = useLogVitality();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // For countdown timers of active status effects
  const [timeLeftMap, setTimeLeftMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!activeEffects) return;

    const updateTimers = () => {
      const newMap: Record<string, string> = {};
      const now = new Date().getTime();

      activeEffects.forEach(effect => {
        const expiresTime = new Date(effect.expiresAt).getTime();
        const diff = expiresTime - now;

        if (diff > 0) {
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          newMap[effect.id] = `${minutes}m ${seconds}s`;
        } else {
          newMap[effect.id] = 'Expired';
        }
      });

      setTimeLeftMap(newMap);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [activeEffects]);

  if (isLoading || !stats) {
    return (
      <WidgetShell className="col-span-1 md:col-span-2 min-h-[260px] animate-pulse">
        <div className="h-full flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10" />
        </div>
      </WidgetShell>
    );
  }

  const staminaPercent = Math.min(100, Math.max(0, Math.round((stats.stamina / stats.maxStamina) * 100)));
  
  const hasStoicResolve = activeEffects.some(e => e.type === 'STOIC_RESOLVE');
  const hasCaffeineRush = activeEffects.some(e => e.type === 'CAFFEINE_RUSH');

  const handleQuickHydration = (amount: number) => {
    logMutation.mutate({ type: 'HYDRATION', value: amount });
  };

  const handleMaktubAlign = () => {
    if (stats.stamina < 30) return;
    logMutation.mutate({ type: 'MAKTUB_ALIGN', value: 1 });
  };


  return (
    <>
      <WidgetShell
        className="col-span-1 md:col-span-2 row-span-1 min-h-[260px] relative overflow-hidden"
        title={
          <>
            <Activity className="text-emerald-400" size={12} /> Biological Core
          </>
        }
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes wave-move {
            0% { transform: translateX(0) translateZ(0) scaleY(1); }
            50% { transform: translateX(-25%) translateZ(0) scaleY(0.85); }
            100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
          }
          .wave-container {
            position: absolute;
            left: 0;
            width: 400%;
            height: 100%;
            fill: rgba(16, 185, 129, 0.25);
            animation: wave-move 12s linear infinite;
            transform-origin: center bottom;
          }
          .wave-container-back {
            fill: rgba(52, 211, 153, 0.15);
            animation: wave-move 8s linear infinite;
            animation-delay: -3s;
          }
          .glow-ring {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.15), inset 0 0 15px rgba(16, 185, 129, 0.1);
          }
          .glow-ring:hover {
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.2);
          }
        `}} />

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 h-full items-center mt-2">
          {/* Reactor Sphere */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-36 h-36 rounded-full border border-emerald-500/20 glow-ring bg-black/40 flex items-center justify-center overflow-hidden transition-all duration-700">
              {/* Dynamic Wave Liquid */}
              <div 
                className="absolute inset-x-0 bottom-0 w-full transition-all duration-1000 ease-out"
                style={{ height: `${staminaPercent}%` }}
              >
                <svg className="wave-container-back absolute bottom-full left-0 w-[400%] h-6" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1300,20 1500,60 L1500,120 L0,120 Z" />
                </svg>
                <svg className="wave-container absolute bottom-full left-0 w-[400%] h-6" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M0,60 C150,20 350,100 500,60 C650,20 850,100 1000,60 C1150,20 1300,100 1500,60 L1500,120 L0,120 Z" />
                </svg>
                <div className="w-full h-full bg-gradient-to-t from-emerald-600/35 to-emerald-500/20" />
              </div>

              {/* Stats overlay */}
              <div className="relative z-20 flex flex-col items-center text-center">
                <span className="text-xs font-mono tracking-widest text-emerald-400 font-bold drop-shadow-md">STAMINA</span>
                <span className="text-4xl font-display font-bold text-white tracking-tighter my-1 drop-shadow-md">
                  {stats.stamina}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 drop-shadow-md">/ {stats.maxStamina} MAX</span>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex gap-2 mt-4 w-full justify-center">
              <Button 
                variant="glass" 
                size="sm" 
                className="text-[10px] py-1 h-7 border-emerald-500/10 hover:border-emerald-500/30 flex items-center gap-1"
                onClick={() => handleQuickHydration(250)}
              >
                <Droplet size={10} className="text-emerald-400" />
                +250ml
              </Button>
              <Button 
                variant="glass" 
                size="sm" 
                className="text-[10px] py-1 h-7 border-emerald-500/10 hover:border-emerald-500/30 flex items-center gap-1"
                onClick={() => handleQuickHydration(500)}
              >
                <Droplet size={10} className="text-emerald-400" />
                +500ml
              </Button>
            </div>
          </div>

          {/* Details & Alignment Panel */}
          <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-4">
            {/* Health parameters */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <Droplet size={12} className="text-cyan-400" />
                  <span className="text-[9px] font-mono">Hydration</span>
                </div>
                <div className="text-sm font-bold text-zinc-100">{stats.totalsToday?.hydrationMl || 0} <span className="text-[10px] text-zinc-500 font-light">ml</span></div>
              </div>

              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <Moon size={12} className="text-indigo-400" />
                  <span className="text-[9px] font-mono">Sleep</span>
                </div>
                <div className="text-sm font-bold text-zinc-100">
                  {stats.totalsToday?.sleep?.logged ? `${stats.totalsToday.sleep.durationHours}h` : 'No log'}
                </div>
              </div>

              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-500 mb-1">
                  <Dumbbell size={12} className="text-amber-400" />
                  <span className="text-[9px] font-mono">Workouts</span>
                </div>
                <div className="text-sm font-bold text-zinc-100">{stats.totalsToday?.workouts?.length || 0} <span className="text-[10px] text-zinc-500 font-light">done</span></div>
              </div>
            </div>

            {/* Active Status Effects */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase font-bold">Active Bio-Modulators</span>
              <div className="flex flex-wrap gap-2 min-h-[24px]">
                {activeEffects.length === 0 ? (
                  <span className="text-[10px] text-zinc-600 font-mono italic">No active physiological buffs</span>
                ) : (
                  activeEffects.map(effect => (
                    <div 
                      key={effect.id} 
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] border",
                        effect.type === 'STOIC_RESOLVE' ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400" :
                        effect.type === 'CAFFEINE_RUSH' ? "bg-amber-500/10 border-amber-500/25 text-amber-400" :
                        "bg-zinc-500/10 border-zinc-500/25 text-zinc-400"
                      )}
                    >
                      <Zap size={10} className="animate-pulse" />
                      <span className="font-semibold">{effect.type}</span>
                      <span className="text-[9px] font-mono opacity-80 border-l border-white/10 pl-1.5">
                        {timeLeftMap[effect.id] || 'calculating...'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Log Activity Button */}
            <div className="flex pt-2">
              <Button
                variant="default"
                className="flex-1 text-xs font-mono font-bold tracking-wider rounded-2xl h-10 bg-gradient-to-r from-emerald-600 to-teal-500 border-transparent hover:from-emerald-500 hover:to-teal-400 text-white shadow-none border border-transparent"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus size={14} className="mr-2" />
                LOG HEALTH METRIC (SLEEP, WORKOUT, CAFFEINE)
              </Button>
            </div>
          </div>
        </div>
      </WidgetShell>

      <BioReactorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          logMutation.mutate(data);
          setIsModalOpen(false);
        }}
        isPending={logMutation.isPending}
      />
    </>
  );
};

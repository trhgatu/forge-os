'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  X,
  Zap,
  Award,
  BookOpen,
  Repeat,
  History,
  CheckCircle2,
  Clock,
  Scroll,
  HelpCircle,
} from 'lucide-react';
import { gamificationApi } from '../services/gamificationApi';
import { Quest } from '../types';
import { useSound } from '@/contexts';
import { cn } from '@/shared/lib/utils';

type HudFilterType = 'all' | 'daily' | 'main' | 'side';

export const QuestHUD: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<HudFilterType>('all');
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sound Context
  const { playSound } = useSound();

  // Load active daily/main quests
  const loadQuests = async () => {
    setLoading(true);
    try {
      const questsData = await gamificationApi.getDailyQuests();
      setQuests(questsData);
      setError(null);
    } catch (err: any) {
      console.error('Failed to load QuestHUD data:', err);
      setError('Quest synchronization offline');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadQuests();
    }
  }, [isOpen]);

  // Synchronize data reactively during open state
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      interval = setInterval(() => {
        loadQuests();
      }, 4000); // Polling quest status every 4 seconds for immediate check auto-ticks
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleToggle = () => {
    playSound('click');
    setIsOpen(!isOpen);
  };

  const activeIncompleteCount = quests.filter((q) => !q.isCompleted && q.type === 'daily').length;

  const filteredQuests = quests.filter((q) => {
    if (filter === 'all') return true;
    return q.type === filter;
  });

  return (
    <>
      {/* 🧭 OS BOTTOM-LEFT FLOATING TRIGGER BUTTON */}
      <button
        onClick={handleToggle}
        onMouseEnter={() => playSound('hover')}
        className={cn(
          'fixed bottom-6 left-72 z-50 flex items-center justify-center gap-2.5',
          'px-5 py-3.5 rounded-full font-medium transition-all duration-300 cursor-pointer select-none border group',
          'bg-[#0A0A0F]/80 border-white/10 text-gray-300 hover:text-white',
          'shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/20 hover:scale-105 active:scale-95 text-xs',
          isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
        )}
      >
        <Shield className="w-4 h-4 text-forge-cyan group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-semibold">Quest Board</span>

        {activeIncompleteCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forge-cyan text-[10px] font-mono font-bold text-black animate-pulse shadow-[0_0_8px_#22D3EE]">
            {activeIncompleteCount}
          </span>
        )}
      </button>

      {/* 🎭 BACKDROP GLASS FILTER */}
      {isOpen && (
        <div
          onClick={handleToggle}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 animate-in fade-in"
        />
      )}

      {/* 🛡️ DOCK-SYNCHRONIZED GLASS QUEST DRAWER */}
      <div
        className={cn(
          'fixed right-0 top-0 h-full w-[450px] z-50 flex flex-col',
          'bg-[#0A0A0F]/90 border-l border-white/10 shadow-2xl backdrop-blur-2xl transition-all duration-500 ease-spring-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Holographic noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.01] relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-forge-cyan">
              <Scroll className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-md text-white tracking-wide leading-none">
                Quest Board
              </span>
              <span className="text-[10px] mt-1 text-gray-500 font-light">
                Real-time active mission monitors.
              </span>
            </div>
          </div>
          <button
            onClick={handleToggle}
            onMouseEnter={() => playSound('hover')}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories / Type Filters inside HUD (Highly synchronized with main page) */}
        <div className="flex items-center gap-1.5 p-4 border-b border-white/10 bg-[#0A0A0F]/40 relative z-10 overflow-x-auto select-none">
          {[
            { id: 'all', label: 'All Quests' },
            { id: 'daily', label: 'Daily' },
            { id: 'main', label: 'Main' },
            { id: 'side', label: 'Side' },
          ].map((btn) => {
            const count = btn.id === 'all' ? quests.length : quests.filter(q => q.type === btn.id).length;
            const isActive = filter === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => {
                  playSound('click');
                  setFilter(btn.id as HudFilterType);
                }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider uppercase border transition-all cursor-pointer flex items-center gap-1.5',
                  isActive
                    ? 'bg-forge-cyan/10 border-forge-cyan text-forge-cyan'
                    : 'bg-black/20 border-white/5 text-gray-500 hover:text-white'
                )}
              >
                <span>{btn.label}</span>
                <span className={cn('px-1 rounded-sm text-[8px] font-mono', isActive ? 'bg-forge-cyan/20 text-forge-cyan' : 'bg-white/5 text-gray-600')}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Quests Panel list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 scrollbar-thin">
          {error && (
            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs flex items-center gap-2">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {loading && quests.length === 0 ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-xl bg-white/5 border border-white/10" />
              ))}
            </div>
          ) : filteredQuests.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
              <Shield className="w-10 h-10 text-gray-700 mb-3" />
              <p className="text-xs font-semibold text-gray-400">No active quests found</p>
              <p className="text-[10px] mt-1 text-gray-600">Archived or completed goals are hidden</p>
            </div>
          ) : (
            filteredQuests.map((quest) => (
              <div
                key={quest.id}
                className={cn(
                  'p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group',
                  quest.isCompleted
                    ? 'bg-[#0A0A0F]/30 border-emerald-500/20 opacity-60'
                    : 'bg-[#0A0A0F]/60 border-white/10 hover:border-white/20'
                )}
              >
                {/* Header block */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider border',
                        quest.type === 'daily'
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          : quest.type === 'main'
                          ? 'bg-forge-cyan/10 text-forge-cyan border-forge-cyan/20'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      )}
                    >
                      {quest.type}
                    </span>
                    <h4 className="font-bold text-white text-md mt-2 group-hover:text-forge-cyan transition-colors">
                      {quest.title}
                    </h4>
                    {quest.description && (
                      <p className="text-xs text-gray-400 mt-1">{quest.description}</p>
                    )}
                  </div>

                  {/* Reward indicator */}
                  <div className="shrink-0 flex items-center gap-1.5 bg-forge-cyan/5 border border-forge-cyan/20 px-2.5 py-1 rounded-lg text-forge-cyan text-xs font-bold font-mono">
                    <Zap className="w-3.5 h-3.5 fill-forge-cyan/10" />
                    <span>+{quest.xpReward} XP</span>
                  </div>
                </div>

                {/* Objectives linked list */}
                <div className="mt-4 space-y-3 pt-3 border-t border-white/5">
                  {quest.objectives.map((obj) => (
                    <div key={obj.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-gray-300 font-medium">
                          {obj.type === 'CREATE_JOURNAL' ? (
                            <BookOpen className="w-3.5 h-3.5 text-forge-cyan" />
                          ) : obj.type === 'CHECK_HABIT' ? (
                            <Repeat className="w-3.5 h-3.5 text-amber-400" />
                          ) : (
                            <Award className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                          <span>
                            {obj.type === 'CREATE_JOURNAL'
                              ? 'Write Journal Page'
                              : obj.type === 'CHECK_HABIT'
                              ? 'Complete Habit target'
                              : 'Log Memory Node'}
                          </span>
                        </div>
                        <span className="font-mono text-gray-400 text-[10px]">
                          {obj.currentCount} / {obj.targetCount}
                        </span>
                      </div>

                      {/* Objective progress track */}
                      <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <div
                          className={cn(
                            'h-full transition-all duration-700 rounded-full',
                            obj.isCompleted ? 'bg-emerald-500' : 'bg-forge-cyan'
                          )}
                          style={{
                            width: `${Math.min(
                              100,
                              (obj.currentCount / obj.targetCount) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Holographic cleared stamp */}
                {quest.isCompleted && (
                  <div className="absolute right-4 bottom-4 flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-lg text-emerald-400 text-[9px] font-bold uppercase tracking-widest rotate-6 pointer-events-none select-none animate-pulse">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>CLEARED</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0A0A0F]/80 text-center text-[9px] font-mono text-gray-500 uppercase tracking-widest select-none flex items-center justify-center gap-1.5 relative z-10">
          <Clock className="w-3 h-3 text-forge-cyan" />
          <span>Completed quests auto-reward XP on clearance</span>
        </div>
      </div>
    </>
  );
};

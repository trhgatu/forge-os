'use client';

import { Search, Shield, Trophy, Award, Lock } from 'lucide-react';
import React from 'react';

import { useSound } from '@/contexts';

import type { Goal } from '../types';

type CategoryType = 'all' | 'active' | 'completed';

interface GoalSidebarProps {
  goals: Goal[];
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  triggerCelebration: () => void;
}

// Badge specifications mapping badgeIcon to visuals
const badgeMap: Record<string, { label: string; bg: string; text: string; glow: string; color: string }> = {
  achievement_master_of_reality: { 
    label: 'Master of Reality', 
    bg: 'bg-amber-500/10 border-amber-500/20', 
    text: 'text-amber-400',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    color: '#fbbf24'
  },
  achievement_stoic_sage: { 
    label: 'Stoic Sage', 
    bg: 'bg-purple-500/10 border-purple-500/20', 
    text: 'text-purple-400',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]',
    color: '#a855f7'
  },
  achievement_focus_lord: { 
    label: 'Focus Lord', 
    bg: 'bg-cyan-500/10 border-cyan-500/20', 
    text: 'text-cyan-400',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    color: '#22d3ee'
  },
  achievement_eternal_alchemist: { 
    label: 'Eternal Alchemist', 
    bg: 'bg-emerald-500/10 border-emerald-500/20', 
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    color: '#10b981'
  }
};

export function GoalSidebar({
  goals,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  triggerCelebration,
}: GoalSidebarProps) {
  const { playSound } = useSound();

  const activeCount = goals.filter((g) => !g.isCompleted).length;
  const completedCount = goals.filter((g) => g.isCompleted).length;

  const categories = [
    { id: 'all', label: 'All Epic Milestones', count: goals.length },
    { id: 'active', label: 'In Progress', count: activeCount },
    { id: 'completed', label: 'Mastered Goals', count: completedCount },
  ] as const;

  return (
    <div className="space-y-6">
      {/* 🔍 Search block */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md space-y-2">
        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
          Search Targets
        </label>
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search epic goal..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-all font-sans"
          />
        </div>
      </div>

      {/* 🧭 Category Filter Navigation */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2">
          <Shield size={12} className="text-forge-cyan" />
          <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block leading-none">
            Filter States
          </label>
        </div>
        <div className="space-y-1.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  playSound('click');
                  onCategoryChange(cat.id);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all duration-300 flex items-center justify-between cursor-pointer border select-none ${
                  isActive
                    ? 'bg-forge-cyan/5 border-forge-cyan/20 text-forge-cyan font-semibold shadow-[0_0_15px_rgba(34,211,238,0.03)]'
                    : 'bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                  isActive ? 'bg-forge-cyan/20 text-forge-cyan' : 'bg-white/5 text-gray-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🏆 Achievement Badge Collection Widget */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2">
          <Trophy size={12} className="text-amber-500" />
          <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block leading-none">
            Unlocked Medals
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          {Object.entries(badgeMap).map(([key, value]) => {
            const isBadgeUnlocked = goals.some((g) => g.badgeIcon === key && g.isCompleted);
            
            return (
              <div
                key={key}
                onClick={isBadgeUnlocked ? triggerCelebration : undefined}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-500 text-center select-none ${
                  isBadgeUnlocked
                    ? `${value.bg} cursor-pointer hover:scale-105 active:scale-95 ${value.glow}`
                    : 'border-white/5 bg-transparent opacity-30'
                }`}
                title={isBadgeUnlocked ? `Click to celebrate Unlocking ${value.label}!` : `${value.label} (Locked)`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 mb-2 bg-white/[0.01]">
                  {isBadgeUnlocked ? (
                    <Award className={`w-6 h-6 ${value.text}`} />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <span className={`text-[8px] font-mono uppercase tracking-wider block font-bold leading-none ${isBadgeUnlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                  {value.label.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

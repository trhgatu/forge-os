'use client';

import { Search, Shield } from 'lucide-react';
import React from 'react';

import { useSound } from '@/contexts';
import { cn } from '@/shared/lib/utils';

import type { Quest } from '../types';

type CategoryType = 'all' | 'daily' | 'weekly' | 'main' | 'side';

interface QuestSidebarProps {
  quests: Quest[];
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function QuestSidebar({
  quests,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: QuestSidebarProps) {
  const { playSound } = useSound();

  const categories = [
    { id: 'all', label: 'All Missions' },
    { id: 'daily', label: 'Daily Quests' },
    { id: 'weekly', label: 'Weekly Quests' },
    { id: 'main', label: 'Main Quests' },
    { id: 'side', label: 'Side Quests' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* 🔍 Search Mission node */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md space-y-2">
        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
          Search Quests
        </label>
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search active target..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-all font-sans"
          />
        </div>
      </div>

      {/* 🧭 Category Navigation tabs */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2">
          <Shield size={12} className="text-forge-cyan" />
          <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block leading-none">
            Quest Categories
          </label>
        </div>
        <div className="space-y-1.5">
          {categories.map((cat) => {
            const count =
              cat.id === 'all'
                ? quests.filter((q) => q.isActive !== false).length
                : quests.filter((q) => q.type === cat.id && q.isActive !== false).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  playSound('click');
                  onCategoryChange(cat.id);
                }}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all duration-300 flex items-center justify-between cursor-pointer border select-none',
                  isActive
                    ? 'bg-forge-cyan/5 border-forge-cyan/20 text-forge-cyan font-semibold shadow-[0_0_15px_rgba(34,211,238,0.03)]'
                    : 'bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5',
                )}
              >
                <span>{cat.label}</span>
                <span
                  className={cn(
                    'text-[9px] px-1.5 py-0.5 rounded font-mono',
                    isActive ? 'bg-forge-cyan/20 text-forge-cyan' : 'bg-white/5 text-gray-500',
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

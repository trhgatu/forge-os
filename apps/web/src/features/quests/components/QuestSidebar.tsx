'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useSound } from '@/contexts';
import type { Quest } from '../types';

type CategoryType = 'all' | 'daily' | 'weekly' | 'main' | 'side';

interface QuestSidebarProps {
  quests: Quest[];
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

export function QuestSidebar({ quests, activeCategory, onCategoryChange }: QuestSidebarProps) {
  const { playSound } = useSound();

  const categories = [
    { id: 'all', label: 'All Quests' },
    { id: 'daily', label: 'Daily Quests' },
    { id: 'weekly', label: 'Weekly Quests' },
    { id: 'main', label: 'Main Quests' },
    { id: 'side', label: 'Side Quests' },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
        <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
          Categories
        </h3>
        <div className="space-y-1">
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
                  'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between cursor-pointer',
                  isActive
                    ? 'bg-white/10 text-white shadow-inner font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5',
                )}
              >
                <span>{cat.label}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 rounded font-mono',
                    isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-500',
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

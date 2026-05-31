'use client';

import { Search, Shield } from 'lucide-react';
import React from 'react';

import { useSound } from '@/contexts';
import { Label, Input, Tag } from '@/shared/components/ui';
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
        <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block mb-2">
          Search Quests
        </Label>
        <Input
          placeholder="Search active target..."
          icon={<Search size={14} />}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-black/40 text-xs h-10 border-white/10"
        />
      </div>

      {/* 🧭 Category Navigation tabs */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2">
          <Shield size={12} className="text-forge-cyan" />
          <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block leading-none">
            Quest Categories
          </Label>
        </div>
        <div className="space-y-1.5">
          {categories.map((cat) => {
            const count =
              cat.id === 'all'
                ? quests.filter((q) => q.isActive !== false).length
                : quests.filter((q) => q.type === cat.id && q.isActive !== false).length;
            const isActive = activeCategory === cat.id;

            return (
              <Tag
                key={cat.id}
                interactive
                active={isActive}
                variant={isActive ? 'cyan' : 'default'}
                onClick={() => {
                  playSound('click');
                  onCategoryChange(cat.id);
                }}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all duration-300 flex items-center justify-between cursor-pointer border select-none font-sans',
                  !isActive && 'bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5'
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
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
}

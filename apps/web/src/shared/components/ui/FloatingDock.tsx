'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface FloatingDockItem<T extends string = string> {
  id: T;
  label: string;
  icon: LucideIcon;
}

interface FloatingDockProps<T extends string = string> {
  items: FloatingDockItem<T>[];
  activeTab: T;
  onChange: (id: T) => void;
}

export function FloatingDock<T extends string = string>({
  items,
  activeTab,
  onChange,
}: FloatingDockProps<T>) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 bg-[#09090b]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:border-white/20">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                'relative flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-500 group overflow-hidden',
                isActive
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'text-gray-500 hover:text-white hover:bg-white/5',
              )}
            >
              <Icon
                size={18}
                className={cn(
                  'shrink-0 transition-colors z-10',
                  isActive ? 'text-forge-cyan' : 'group-hover:text-white',
                )}
              />
              <span
                className={cn(
                  'text-xs font-medium font-mono uppercase tracking-wider transition-all duration-500 ease-spring-out overflow-hidden whitespace-nowrap z-10',
                  isActive
                    ? 'max-w-[150px] opacity-100 ml-1'
                    : 'max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 group-hover:ml-1',
                )}
              >
                {item.label}
              </span>

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-forge-cyan to-transparent opacity-50" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

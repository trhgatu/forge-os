import { Layers, Book, Network, Terminal, Star, GitBranch } from 'lucide-react';
import React from 'react';

import { GlassCard } from '@/shared/components/ui/GlassCard';
import { Label, Tag, Skeleton } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

import type { ForgeTab, Project, Foundation } from '../../types';

interface DirectivesWidgetProps {
  projects: Project[];
  foundations: Foundation[];
  setActiveTab: (tab: ForgeTab) => void;
  setActiveProjectId: (projectId: string | null) => void;
  isLoading?: boolean;
}

export const DirectivesWidget: React.FC<DirectivesWidgetProps> = ({
  projects,
  foundations,
  setActiveTab,
  setActiveProjectId,
  isLoading,
}) => {
  const pinnedItems = [...projects, ...foundations].filter((item) => item.isPinned);

  const navItems = [
    {
      id: 'projects',
      label: 'Projects',
      icon: Layers,
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10',
    },
    {
      id: 'foundations',
      label: 'Foundations',
      icon: Book,
      color: 'text-fuchsia-400',
      bg: 'bg-fuchsia-400/10',
    },
    {
      id: 'research',
      label: 'Research',
      icon: Network,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
    {
      id: 'cli',
      label: 'Terminal',
      icon: Terminal,
      color: 'text-gray-400',
      bg: 'bg-white/5',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Menu */}
      <div className="grid grid-cols-2 gap-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as ForgeTab)}
            className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-[#0d1117] hover:bg-white/[0.03] hover:border-white/20 transition-all group text-left"
          >
            <div className={cn('p-2 rounded-lg transition-colors', item.bg, item.color)}>
              <item.icon size={18} />
            </div>
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Pinned Projects "Active Directives" */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <Label variant="dim" className="text-xs font-bold uppercase tracking-widest block">
            Active Directives
          </Label>
          <button className="text-xs text-forge-cyan hover:underline">Customize</button>
        </div>

        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <GlassCard key={i} className="border-white/5" noPadding>
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="w-32 h-4" />
                  </div>
                  <Skeleton className="w-12 h-4 rounded-md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="w-full h-3" />
                  <Skeleton className="w-3/4 h-3" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="w-16 h-3" />
                  <Skeleton className="w-12 h-3" />
                </div>
              </div>
            </GlassCard>
          ))
        ) : pinnedItems.map((item) => (
          <GlassCard
            key={item.id}
            className={cn(
              'group cursor-pointer transition-all border-white/5',
              (item as { status?: string }).status === 'active'
                ? 'hover:border-forge-cyan/30'
                : 'hover:border-fuchsia-400/30',
            )}
            noPadding
            onClick={() =>
              'type' in item
                ? setActiveTab('foundations')
                : setActiveProjectId((item as Project).id)
            }
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {'type' in item ? (
                    <Book size={16} className="text-fuchsia-400" />
                  ) : (
                    <Layers size={16} className="text-forge-cyan" />
                  )}
                  <Label
                    variant="default"
                    className={cn(
                      'font-bold text-white text-sm transition-colors block',
                      'type' in item
                        ? 'group-hover:text-fuchsia-400'
                        : 'group-hover:text-forge-cyan',
                    )}
                  >
                    {item.title}
                  </Label>
                </div>
                <Tag variant="default" className="px-2 py-0.5 text-[10px] bg-white/5 text-gray-400 border border-white/10">
                  {item.githubStats ? 'Public' : 'Internal'}
                </Tag>
              </div>
              <p className="text-xs text-gray-400 mb-4 line-clamp-2">{item.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                {item.githubStats?.language && (
                  <div className="flex items-center gap-1.5">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full',
                        item.githubStats.language === 'TypeScript'
                          ? 'bg-blue-500'
                          : 'bg-yellow-400',
                      )}
                    />
                    <span className="text-gray-300">{item.githubStats.language}</span>
                  </div>
                )}
                {item.githubStats?.stars !== undefined && (
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-500/50" /> {item.githubStats.stars}
                  </div>
                )}
                {item.githubStats?.forks !== undefined && (
                  <div className="flex items-center gap-1">
                    <GitBranch size={12} /> {item.githubStats.forks}
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        ))}

        {!isLoading && pinnedItems.length === 0 && (
          <div className="text-center py-6 text-xs text-gray-600 italic">No directives pinned.</div>
        )}
      </div>
    </div>
  );
};



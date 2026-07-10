'use client';

import Image from 'next/image';

import { Tag } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import type { Memory } from '@/shared/types/memory';

import { SEASON_CONFIG, getSeasonFromMood } from '../config';

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
}

export function MemoryCard({ memory, onClick }: MemoryCardProps) {
  const season = getSeasonFromMood(memory.mood);
  const config = SEASON_CONFIG[season];

  // Soft color mapping for text tags
  const textColor =
    season === 'Spring'
      ? 'text-emerald-400/80'
      : season === 'Summer'
        ? 'text-amber-400/80'
        : season === 'Autumn'
          ? 'text-rose-400/80'
          : 'text-cyan-400/80';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative w-full cursor-pointer transition-all duration-700 ease-out text-left block focus:outline-none',
        'hover:-translate-y-1',
        'transform-gpu',
      )}
    >
      {/* Sleek Minimalist Memory Card Container */}
      <div
        className={cn(
          'relative p-5 pb-7 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md transition-all duration-500 overflow-hidden',
          'group-hover:bg-white/[0.03] group-hover:border-white/10',
          'shadow-[0_4px_30px_rgba(0,0,0,0.2)] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)]'
        )}
      >
        {/* Soft, warm ambient light hint inside image on hover */}
        <div className="absolute inset-0 bg-radial from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Image Container - Serene & Silent */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/[0.01] border border-white/5 rounded-xl mb-4">
          {memory.imageUrl ? (
            <Image
              src={memory.imageUrl}
              alt={memory.title}
              fill
              className="object-cover transition-all duration-1000 scale-[1.01] group-hover:scale-[1.03]"
              style={{
                filter: 'contrast(0.98) brightness(0.9) grayscale(0.1)',
              }}
            />
          ) : (
            // Clean serene icon placeholder
            <div className="absolute inset-0 flex items-center justify-center bg-[#070709] overflow-hidden">
              <config.icon size={32} className="text-white/10 group-hover:text-white/15 transition-colors duration-500" />
            </div>
          )}

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Caption Info */}
        <div className="space-y-2.5">
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-wider">
            <span className="text-gray-500">
              {memory.date.toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className={cn('uppercase font-medium', textColor)}>
              {config.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-display font-medium text-gray-200 line-clamp-2 leading-snug group-hover:text-white transition-colors duration-500">
            {memory.title}
          </h3>

          {/* Content snippet */}
          <p className="text-xs text-gray-400 font-sans line-clamp-2 leading-relaxed font-light">
            {memory.content}
          </p>

          {/* Tags */}
          {memory.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
              {memory.tags.slice(0, 3).map((tag) => (
                <Tag
                  key={tag}
                  size="sm"
                  variant="default"
                  className="bg-white/[0.02] text-[9px] text-gray-500 border border-white/5 group-hover:text-gray-400"
                >
                  #{tag}
                </Tag>
              ))}
              {memory.tags.length > 3 && (
                <Tag size="sm" variant="default" className="text-[9px] font-mono self-center border-none py-0">
                  +{memory.tags.length - 3}
                </Tag>
              )}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

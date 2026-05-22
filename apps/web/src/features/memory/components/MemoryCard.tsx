'use client';

import Image from 'next/image';

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

  // Map season to neon colors
  const neonColor =
    season === 'Spring'
      ? 'rgba(16, 185, 129, 0.4)'
      : season === 'Summer'
        ? 'rgba(245, 158, 11, 0.4)'
        : season === 'Autumn'
          ? 'rgba(244, 63, 94, 0.4)'
          : 'rgba(6, 182, 212, 0.4)';

  const textNeonColor =
    season === 'Spring'
      ? 'text-emerald-400'
      : season === 'Summer'
        ? 'text-amber-400'
        : season === 'Autumn'
          ? 'text-rose-400'
          : 'text-cyan-400';

  const borderNeonColor =
    season === 'Spring'
      ? 'border-emerald-500/30 group-hover:border-emerald-500/50'
      : season === 'Summer'
        ? 'border-amber-500/30 group-hover:border-amber-500/50'
        : season === 'Autumn'
          ? 'border-rose-500/30 group-hover:border-rose-500/50'
          : 'border-cyan-500/30 group-hover:border-cyan-500/50';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative w-full cursor-pointer transition-all duration-500 ease-out text-left block focus:outline-none',
        'hover:-translate-y-2 hover:scale-[1.01]',
        'transform-gpu',
      )}
    >
      {/* Holographic Memory Node Container */}
      <div
        className={cn(
          'relative p-5 pb-8 rounded-2xl border transition-all duration-500 backdrop-blur-md bg-black/40 overflow-hidden',
          borderNeonColor,
          'shadow-[0_4px_30px_rgba(0,0,0,0.4)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
        )}
      >
        {/* Glowing Backlight matching Season Mood */}
        <div
          className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10 rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${neonColor}, transparent 60%)`,
          }}
        />

        {/* Laser Tech Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] rounded-2xl" />

        {/* Laser Corner Brackets (Tech Framing) */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/10 group-hover:border-white/30 transition-colors" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/10 group-hover:border-white/30 transition-colors" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/10 group-hover:border-white/30 transition-colors" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/10 group-hover:border-white/30 transition-colors" />

        {/* Image Container with Holographic Tint */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/[0.02] border border-white/5 rounded-xl mb-5">
          {memory.imageUrl ? (
            <>
              <Image
                src={memory.imageUrl}
                alt={memory.title}
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-105"
                style={{
                  filter: 'contrast(1.05) brightness(0.95)',
                }}
              />
              {/* Cyber Hologram scanline */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent bg-[length:100%_200%] animate-[scanline_8s_linear_infinite] opacity-30 pointer-events-none" />
            </>
          ) : (
            // Glowing generative placeholder
            <div className="absolute inset-0 flex items-center justify-center bg-[#07070a] overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 blur-3xl transition-transform duration-1000 group-hover:scale-125"
                style={{
                  background: `radial-gradient(circle, ${neonColor} 0%, transparent 70%)`,
                }}
              />
              <config.icon size={44} className="text-white/10 group-hover:text-white/20 transition-colors" />
            </div>
          )}

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Cyber Caption Info */}
        <div className="space-y-3">
          {/* Metadata Row */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
              {memory.date.toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className={cn('font-mono text-[8px] uppercase tracking-[0.2em] font-semibold flex items-center gap-1', textNeonColor)}>
              <span className="inline-block w-1 h-1 rounded-full bg-current animate-pulse" />
              {config.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-display font-bold text-white line-clamp-2 leading-snug group-hover:text-forge-cyan transition-colors duration-300">
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
                <span
                  key={tag}
                  className="px-1.5 py-0.5 rounded bg-white/5 font-mono text-[9px] text-gray-400 border border-white/5"
                >
                  #{tag}
                </span>
              ))}
              {memory.tags.length > 3 && (
                <span className="font-mono text-[9px] text-gray-600 self-center">
                  +{memory.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

'use client';

import { Activity } from 'lucide-react';
import React from 'react';

import { useLanguage } from '@/contexts';

import type { UserStats } from '../../gamification/types';

interface RadarChartProps {
  stats: UserStats;
}

export const RadarChart: React.FC<RadarChartProps> = ({ stats }) => {
  const { t } = useLanguage();

  const attrDiscipline = stats.discipline || 0;
  const attrConsistency = stats.consistency || 0;
  const attrWillpower = stats.willpower || 0;
  const attrAwareness = stats.awareness || 0;
  const attrPresence = stats.presence || 0;

  const maxAttrVal = Math.max(10, attrDiscipline, attrConsistency, attrWillpower, attrAwareness, attrPresence);

  const cx = 150;
  const cy = 150;
  const r = 110;

  const getPentagonPoints = (scale: number = 1) => {
    const points = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const x = cx + r * Math.cos(angle) * scale;
      const y = cy + r * Math.sin(angle) * scale;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  const getStatsPoints = () => {
    const attributes = [attrDiscipline, attrConsistency, attrWillpower, attrAwareness, attrPresence];
    const points = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const valScale = attributes[i] / maxAttrVal;
      const safeScale = Math.max(0.15, valScale);
      const x = cx + r * Math.cos(angle) * safeScale;
      const y = cy + r * Math.sin(angle) * safeScale;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  const getLabelCoords = (index: number, offset: number = 20) => {
    const angle = (index * 2 * Math.PI) / 5 - Math.PI / 2;
    const x = cx + (r + offset) * Math.cos(angle);
    const y = cy + (r + offset) * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="lg:col-span-2 p-6 rounded-sm bg-[#050507]/60 border border-white/5 shadow-2xl backdrop-blur-2xl flex flex-col items-center justify-center relative overflow-hidden hover:border-forge-cyan/20 transition-all duration-300">
      <div className="absolute top-3 left-4 flex items-center gap-2">
        <Activity size={12} className="text-forge-cyan animate-pulse" />
        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
          {t('identity.mind_vector')}
        </span>
      </div>

      <svg viewBox="0 0 300 300" className="w-full max-w-[280px] h-auto mt-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.15)]">
        {/* Outer Grid Pentagons */}
        <polygon points={getPentagonPoints(1.0)} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <polygon points={getPentagonPoints(0.8)} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <polygon points={getPentagonPoints(0.6)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <polygon points={getPentagonPoints(0.4)} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <polygon points={getPentagonPoints(0.2)} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* Pentagon Axes Lines */}
        {[...Array(5)].map((_, i) => {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />;
        })}

        {/* Current Attributes Polygon */}
        <polygon
          points={getStatsPoints()}
          fill="rgba(34,211,238,0.15)"
          stroke="#22d3ee"
          strokeWidth="2"
          className="transition-all duration-700 ease-out"
        />

        {/* Data points nodes */}
        {getStatsPoints().split(' ').map((pt, i) => {
          const [x, y] = pt.split(',');
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#050507"
              stroke="#22d3ee"
              strokeWidth="2"
              className="transition-all duration-700 ease-out"
            />
          );
        })}

        {/* Pentagon labels with exact HUD coordinates */}
        {['DIS', 'CON', 'WIL', 'AWA', 'PRE'].map((label, i) => {
          const { x, y } = getLabelCoords(i, 20);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={i === 0 ? '#22d3ee' : '#a1a1aa'}
              fontSize="9"
              fontWeight="bold"
              fontFamily="monospace"
              letterSpacing="1px"
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Radar Legend Indicator */}
      <div className="flex gap-4 text-[9px] font-mono text-zinc-500 mt-4">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-forge-cyan" />Current</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-[1px] border-t border-dashed border-white/20" />Grid Core</span>
      </div>
    </div>
  );
};

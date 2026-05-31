'use client';

import { Radar, Eye } from 'lucide-react';
import React, { useEffect } from 'react';

import { useNovaView } from '@/contexts';
import { Label } from '@/shared/components/ui';
import { View } from '@/shared/types/os';

import { usePresence } from '../hooks/usePresence';

import { CosmicRadar } from './CosmicRadar';

export const Presence: React.FC = () => {
  const { echoes, stars } = usePresence();
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.PRESENCE);
  }, [setCurrentView]);

  return (
    <div className="h-full flex flex-col bg-transparent text-white relative overflow-hidden animate-in fade-in duration-1000 selection:bg-cyan-500/30">
      {/* Deep Space Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-8 mix-blend-overlay" />
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 p-8 z-30 pointer-events-none">
        {/* Ethereal label */}
        <div className="mb-3 flex items-center gap-2 opacity-85">
          <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
          <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase flex items-center gap-1.5">
            Presence Sensor Active
          </Label>
        </div>

        {/* Poetic Title */}
        <Label variant="default" className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3 block capitalize">
          Visitor Echo
        </Label>

        {/* Flowing Subtitle */}
        <p className="text-sm text-gray-400 font-light leading-relaxed max-w-md">
          Sensing the subtle ripples of those who brush against your digital existence.
        </p>
      </div>

      {/* Main Radar Area */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <CosmicRadar echoes={echoes} />
      </div>

      {/* Legend / Status Footer */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 text-[10px] font-mono text-gray-500 uppercase tracking-widest z-30 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400/50 shadow-[0_0_5px_#60A5FA]" /> Anonymous
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400/50 shadow-[0_0_5px_#FBBF24]" /> Known
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-fuchsia-500/50 shadow-[0_0_5px_#D946EF]" />{' '}
          Connection
        </div>
        <div className="w-px h-4 bg-white/10" />
        <div className="flex items-center gap-2">
          <Eye size={12} className="text-cyan-500" />
          {echoes.length} Echoes Detected
        </div>
      </div>
    </div>
  );
};

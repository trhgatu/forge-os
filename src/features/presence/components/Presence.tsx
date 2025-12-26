"use client";

import React from "react";
import { Radar, Eye } from "lucide-react";
import { CosmicRadar } from "./CosmicRadar";
import { usePresence } from "../hooks/usePresence";

export const Presence: React.FC = () => {
  const { echoes, stars } = usePresence();

  return (
    <div className="h-full flex flex-col bg-[#010103] text-white relative overflow-hidden animate-in fade-in duration-1000 selection:bg-cyan-500/30">
      {/* Deep Space Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#010103] to-black" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

        {/* Stabilized Stars */}
        {stars.map((style, i) => (
          <div key={i} className="absolute rounded-full bg-white animate-pulse" style={style} />
        ))}
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 p-8 z-30 pointer-events-none">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-500 uppercase tracking-widest mb-2">
          <Radar size={14} className="animate-spin-slow" /> Presence Sensor Active
        </div>
        <h1 className="text-4xl font-display font-bold text-white tracking-tight">Visitor Echo</h1>
        <p className="text-sm text-gray-500 mt-2 max-w-md">
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
          <div className="w-2 h-2 rounded-full bg-fuchsia-500/50 shadow-[0_0_5px_#D946EF]" />{" "}
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

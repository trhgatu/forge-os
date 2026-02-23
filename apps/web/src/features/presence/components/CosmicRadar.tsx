"use client";

import React from "react";
import { VisitorEcho } from "../types";
import { RadarBlip } from "./RadarBlip";

export const CosmicRadar: React.FC<{ echoes: VisitorEcho[] }> = ({ echoes }) => {
  return (
    <div className="relative w-[600px] h-[600px] rounded-full border border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden flex items-center justify-center group shadow-[0_0_100px_rgba(0,0,0,0.5)]">
      {/* Grid Rings */}
      <div className="absolute w-[25%] h-[25%] rounded-full border border-white/5" />
      <div className="absolute w-[50%] h-[50%] rounded-full border border-white/5" />
      <div className="absolute w-[75%] h-[75%] rounded-full border border-white/5" />
      <div className="absolute w-full h-full rounded-full border border-white/10 opacity-50" />

      {/* Crosshairs */}
      <div className="absolute w-full h-px bg-white/5" />
      <div className="absolute h-full w-px bg-white/5" />

      {/* Scanning Line (The Sweep) */}
      <div className="absolute w-full h-full animate-[spin_4s_linear_infinite] pointer-events-none origin-center">
        <div
          className="w-1/2 h-1/2 bg-gradient-to-r from-transparent via-forge-cyan/10 to-forge-cyan/40 absolute top-0 left-1/2 origin-bottom-left transform -rotate-45"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} // Triangle slice
        />
      </div>

      {/* Center (The Self) */}
      <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white] z-30 animate-pulse">
        <div className="absolute inset-0 bg-forge-cyan blur-md opacity-50" />
      </div>

      {/* Render Echoes */}
      {echoes.map((echo) => (
        <RadarBlip key={echo.id} echo={echo} />
      ))}
    </div>
  );
};

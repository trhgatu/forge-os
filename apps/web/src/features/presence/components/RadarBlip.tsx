"use client";

import React from "react";

import { cn } from "@/shared/lib/utils";

import { ECHO_COLORS, ROLE_COLORS } from "../constants/colors";
import type { VisitorEcho } from "../types";

export const RadarBlip: React.FC<{ echo: VisitorEcho }> = ({ echo }) => {
  // Removed auto-fade logic to keep active users visible

  let colorClass = ECHO_COLORS[echo.type];
  if (echo.type === "connection" && echo.connectionRole) {
    colorClass = ROLE_COLORS[echo.connectionRole].replace("/50", ""); // Use solid for core
  }

  // Convert Polar to Cartesian for CSS positioning (center is 50%, 50%)
  // distance is % from center.
  const angleRad = (echo.angle - 90) * (Math.PI / 180); // -90 to start top
  const x = 50 + (echo.distance / 2) * Math.cos(angleRad); // divide by 2 because distance is 0-100 but radius is 50%
  const y = 50 + (echo.distance / 2) * Math.sin(angleRad);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 group cursor-pointer z-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      <div
        className={cn(
          "w-3 h-3 rounded-full animate-ping absolute opacity-50",
          colorClass.split(" ")[0]
        )}
      />
      <div className={cn("w-2 h-2 rounded-full relative z-10", colorClass)} />

      {/* Tooltip on Hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 border border-white/10 rounded text-[9px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-md">
        {echo.type === "connection" ? echo.connectionRole : echo.type}
      </div>
    </div>
  );
};

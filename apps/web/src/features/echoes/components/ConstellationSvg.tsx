'use client';

import React from 'react';

interface FlowMoment {
  id: string;
  time: string;
  fileName: string;
  gitBranch: string;
  cpuLoad: number;
  coordinates: { x: number; y: number };
}

interface ConstellationSvgProps {
  flowHistory: FlowMoment[];
  lineToDraw: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    visible: boolean;
  } | null;
  newestLineRef: React.RefObject<SVGLineElement | null>;
}

export const ConstellationSvg: React.FC<ConstellationSvgProps> = ({
  flowHistory,
  lineToDraw,
  newestLineRef,
}) => {
  return (
    <svg className="absolute w-[98%] h-[98%] pointer-events-none opacity-[0.09]" viewBox="0 0 400 400">
      <circle cx="200" cy="200" r="185" fill="none" stroke="white" strokeWidth="0.4" strokeDasharray="1, 4" />
      <circle cx="200" cy="200" r="135" fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="4, 6" />
      <circle cx="200" cy="200" r="85" fill="none" stroke="white" strokeWidth="0.3" />
      <path d="M 200,20 L 200,380 M 20,200 L 380,200" stroke="white" strokeWidth="0.2" />

      {/* Static SVG Constellation Threads linking existing flow stars */}
      {flowHistory.map((moment, idx) => {
        if (idx === flowHistory.length - 1) return null;
        const nextMoment = flowHistory[idx + 1];
        return (
          <line
            key={`line-${moment.id || idx}`}
            x1={moment.coordinates.x}
            y1={moment.coordinates.y}
            x2={nextMoment.coordinates.x}
            y2={nextMoment.coordinates.y}
            stroke="#0891b2"
            strokeWidth="1.2"
            strokeOpacity="0.45"
            strokeDasharray="2, 2"
          />
        );
      })}

      {/* Animated Golden Thread growing and weaving itself to connect the new star */}
      {lineToDraw && lineToDraw.visible && (
        <line
          ref={newestLineRef}
          x1={lineToDraw.x1}
          y1={lineToDraw.y1}
          x2={lineToDraw.x2}
          y2={lineToDraw.y2}
          stroke="#22d3ee"
          strokeWidth="1.8"
          strokeOpacity="0.95"
          strokeDasharray="400"
          strokeDashoffset="400"
        />
      )}

      {/* Persistent Flow Stars on the map */}
      {flowHistory.map((moment, idx) => (
        <circle
          key={`star-${moment.id || idx}`}
          cx={moment.coordinates.x}
          cy={moment.coordinates.y}
          r={idx === 0 ? 3.8 : 2.5}
          fill={idx === 0 ? '#22d3ee' : '#0891b2'}
          fillOpacity={idx === 0 ? 0.9 : 0.7}
        />
      ))}
    </svg>
  );
};

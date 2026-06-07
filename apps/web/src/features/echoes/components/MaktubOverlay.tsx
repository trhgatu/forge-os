'use client';

import React from 'react';

interface MaktubOverlayProps {
  overlayRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  dividerRef: React.RefObject<HTMLDivElement | null>;
  subRef: React.RefObject<HTMLParagraphElement | null>;
  language: 'vi' | 'en';
}

export function MaktubOverlay({
  overlayRef,
  titleRef,
  dividerRef,
  subRef,
  language,
}: MaktubOverlayProps) {
  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 z-40 bg-[#020205] flex flex-col items-center justify-center pointer-events-none opacity-0 transition-opacity duration-1000"
    >
      {/* Pulsing Radial Background Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none animate-pulse" />

      {/* Astro-Alchemical Alignment Compass (Sacred Geometry) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <svg
          className="w-[350px] h-[350px] md:w-[600px] md:h-[600px] text-cyan-400/[0.04] animate-[spin_120s_linear_infinite] pointer-events-none"
          viewBox="0 0 200 200"
        >
          {/* Inner & Outer Circles */}
          <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.25" fill="none" />
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="3,3" />
          <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="0.25" fill="none" />
          <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="0.25" fill="none" strokeDasharray="1,2" />
          <circle cx="100" cy="100" r="25" stroke="currentColor" strokeWidth="0.25" fill="none" />

          {/* Cross lines */}
          <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="0.15" strokeDasharray="2,2" />
          <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="0.15" strokeDasharray="2,2" />
          <line x1="33" y1="33" x2="167" y2="167" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1,3" />
          <line x1="167" y1="33" x2="33" y2="167" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1,3" />

          {/* Double overlapping triangles (Star of David) */}
          <polygon points="100,25 165,137.5 35,137.5" stroke="currentColor" strokeWidth="0.25" fill="none" />
          <polygon points="100,175 165,62.5 35,62.5" stroke="currentColor" strokeWidth="0.25" fill="none" />
        </svg>
      </div>

      {/* Floating alchemical silver-cyan embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, idx) => (
          <div
            key={idx}
            className="absolute w-[1.5px] h-[1.5px] md:w-[2px] md:h-[2px] bg-cyan-400/30 rounded-full cinematic-ember opacity-0"
            style={{
              left: `${10 + idx * 6 + Math.random() * 8}%`,
              bottom: `${5 + Math.random() * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Sci-Fi Corner Telemetry Indicators */}
      <div className="absolute top-8 left-8 text-left font-mono text-[8px] text-zinc-600/80 tracking-[0.25em] uppercase select-none leading-relaxed hidden sm:block">
        <div>System // Forge OS v2.0</div>
        <div>Calibration // Presence.Weft</div>
      </div>
      <div className="absolute top-8 right-8 text-right font-mono text-[8px] text-zinc-600/80 tracking-[0.25em] uppercase select-none leading-relaxed hidden sm:block">
        <div>Status // Alignment.Completed</div>
        <div>Sync Rate // 100% Coherent</div>
      </div>
      <div className="absolute bottom-8 left-8 text-left font-mono text-[8px] text-zinc-600/80 tracking-[0.25em] uppercase select-none leading-relaxed hidden sm:block">
        <div>Core // Reticular.Activated</div>
        <div>Resonance // 11:11 Frequency</div>
      </div>
      <div className="absolute bottom-8 right-8 text-right font-mono text-[8px] text-zinc-600/80 tracking-[0.25em] uppercase select-none leading-relaxed hidden sm:block">
        <div>Telemetry // Constellation.Weaved</div>
        <div>Paradigm // Maktub</div>
      </div>

      {/* Center Text Panel */}
      <div className="text-center max-w-2xl px-6 z-10 select-none">
        {/* Staggered Split-Letters for MAKTUB - Cinema Scale & Serif Typo */}
        <h2
          ref={titleRef}
          className="flex justify-center items-center gap-3 md:gap-5 text-5xl md:text-7xl lg:text-8xl font-extralight text-cyan-400 uppercase filter drop-shadow-[0_0_25px_rgba(34,211,238,0.25)] mb-2"
          style={{
            fontFamily: "'Cinzel', 'Playfair Display', 'Didot', Georgia, serif",
            fontWeight: 200,
            letterSpacing: '0.15em',
          }}
        >
          {"MAKTUB".split("").map((letter, idx) => (
            <span key={idx} className="cinematic-letter inline-block opacity-0">
              {letter}
            </span>
          ))}
        </h2>

        {/* Thin breathing divider line */}
        <div
          ref={dividerRef}
          className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent w-0 mx-auto opacity-0 my-5"
        />

        <p
          ref={subRef}
          className="text-xs md:text-sm font-sans font-extralight text-gray-400 italic tracking-[0.18em] leading-relaxed opacity-0 max-w-xl mx-auto drop-shadow-md"
        >
          {language === 'vi'
            ? 'Đã được an bài. Bạn đang ở chính xác nơi số mệnh chỉ lối.'
            : 'It is written. You are exactly where you are destined to be.'}
        </p>
      </div>
    </div>
  );
}

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
      className="absolute inset-0 z-40 bg-[#000000] flex flex-col items-center justify-center pointer-events-none opacity-0"
    >
      {/* Subtle floating alchemical silver-cyan ember particles in the black container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="absolute w-[2px] h-[2px] bg-[#22d3ee]/40 rounded-full cinematic-ember opacity-0"
            style={{
              left: `${15 + idx * 14 + Math.random() * 8}%`,
              bottom: `${10 + Math.random() * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-2xl px-6 z-10 select-none">
        {/* Staggered Split-Letters for MAKTUB - Cinema Scale & Serif Typo */}
        <h2
          ref={titleRef}
          className="flex justify-center items-center gap-3 md:gap-5 text-5xl md:text-7xl lg:text-8xl font-extralight text-[#22d3ee] uppercase filter drop-shadow-[0_0_20px_rgba(34,211,238,0.3)] mb-2"
          style={{ fontFamily: "'Cinzel', 'Playfair Display', 'Didot', Georgia, serif", fontWeight: 200, letterSpacing: '0.15em' }}
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
          className="h-[1px] bg-gradient-to-r from-transparent via-[#22d3ee]/40 to-transparent w-0 mx-auto opacity-0 my-4"
        />

        <p
          ref={subRef}
          className="text-xs md:text-sm font-sans font-extralight text-gray-400 italic tracking-[0.15em] leading-relaxed opacity-0 max-w-xl mx-auto"
        >
          {language === 'vi'
            ? 'Đã được an bài. Bạn đang ở chính xác nơi số mệnh chỉ lối.'
            : 'It is written. You are exactly where you are destined to be.'}
        </p>
      </div>
    </div>
  );
}

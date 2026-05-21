'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Sun, Moon, Globe } from 'lucide-react';

import { LanguageProvider, SoundProvider, NovaViewProvider, ThemeProvider, useLanguage, useSound, useTheme } from '@/contexts';
import { NovaGuideWrapper } from '@/features/nova/components/NovaGuideWrapper';
import { ShaderFlow } from '@/shared/components/ui/ShaderFlow';
import { SumiLeaves } from '@/shared/components/ui/SumiLeaves';

function AuthToolbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { playSound } = useSound();

  const handleToggleTheme = () => {
    playSound('click');
    toggleTheme();
  };

  const handleToggleLanguage = () => {
    playSound('click');
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <div className="absolute top-6 right-8 flex items-center gap-3 z-50 select-none">
      {/* Language Toggle Button */}
      <button
        onClick={handleToggleLanguage}
        className="
          flex items-center gap-1.5 px-3 py-1.5 rounded-full
          border border-black/5 dark:border-white/5
          bg-white/40 dark:bg-black/20 backdrop-blur-md
          hover:bg-white/60 dark:hover:bg-black/30
          text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white
          transition-all duration-300 cursor-pointer
          text-[10px] font-sans font-black tracking-wider uppercase
        "
      >
        <Globe size={12} className="opacity-70" />
        <span>{language === 'en' ? 'EN' : 'VI'}</span>
      </button>

      {/* Theme Toggle Button */}
      <button
        onClick={handleToggleTheme}
        className="
          flex items-center justify-center w-8 h-8 rounded-full
          border border-black/5 dark:border-white/5
          bg-white/40 dark:bg-black/20 backdrop-blur-md
          hover:bg-white/60 dark:hover:bg-black/30
          text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white
          transition-all duration-300 cursor-pointer
        "
      >
        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
      </button>
    </div>
  );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <SoundProvider>
          <NovaViewProvider>
            <div
              ref={containerRef}
              className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#faf8f5] dark:bg-[#050508] transition-colors duration-500 text-zinc-900 dark:text-white selection:bg-forge-cyan/30"
            >
              {/* Floating controls toolbar */}
              <AuthToolbar />

              <svg className="absolute w-0 h-0 invisible" aria-hidden="true">
                <defs>
                  <filter id="line-torn-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
              </svg>

              {/* 1. Meditative Wind Background (WebGL ShaderFlow) */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-45 dark:opacity-35 transition-opacity duration-500">
                <ShaderFlow
                  scale={3.0}
                  brightness={1.15}
                  flowSpeed={[0.2, 0.0]}
                  className="absolute inset-0 h-full w-full grayscale"
                />
              </div>

              {/* 2. Floating Sumi Leaves falling from left to right */}
              <SumiLeaves containerRef={containerRef} count={12} />

              {/* 3. Original Philosophy Sumi-e Tree - Far Left */}
              <div
                className="hidden md:block absolute left-[-20%] md:left-[-15%] -top-[25%] w-96 md:w-[900px] h-[800px] md:h-[1000px] pointer-events-none z-[1] dark:opacity-35 transition-all duration-500 invert-0 dark:invert"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/sumi-tree.png"
                    alt="Sumi-e Tree Decoration"
                    fill
                    className="object-contain object-left-bottom"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* 4. Original Philosophy Meditating Musashi - Left Bottom */}
              <div
                className="hidden md:block absolute left-[2%] md:left-[8%] bottom-[5%] md:bottom-[8%] w-48 md:w-[320px] h-96 md:h-[450px] pointer-events-none z-[1] opacity-60 dark:opacity-35 transition-all duration-500 invert-0 dark:invert"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/musashi-samurai.png"
                    alt="Musashi Meditating"
                    fill
                    className="object-contain object-left-bottom"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Content Container */}
              <div className="relative z-20 w-full h-full flex items-center justify-center p-6">{children}</div>

              <NovaGuideWrapper />
            </div>
          </NovaViewProvider>
        </SoundProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}



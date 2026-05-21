'use client';

import React from 'react';

import { LanguageProvider, SoundProvider, NovaViewProvider, ThemeProvider } from '@/contexts';
import { NovaGuideWrapper } from '@/features/nova/components/NovaGuideWrapper';
import { QueryProvider } from '@/providers/QueryProvider';
import { Sidebar } from '@/shared/layout/Sidebar';
import '@/app/globals.css';

export default function ForgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SoundProvider>
          <NovaViewProvider>
            <QueryProvider>
              <div className="flex h-screen w-screen bg-[#fbfaf7] dark:bg-forge-bg text-[#1c1c1a] dark:text-white overflow-hidden selection:bg-red-800/10 dark:selection:bg-forge-accent selection:text-[#1c1c1a] dark:selection:text-white font-sans bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#fffefc] via-[#fbfaf7] to-[#f5f4ef] dark:from-gray-900 dark:via-forge-bg dark:to-[#050505]">
                <svg className="absolute w-0 h-0 invisible" aria-hidden="true">
                  <defs>
                    <filter id="line-torn-filter" x="-20%" y="-20%" width="140%" height="140%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="3" result="noise" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                </svg>

                <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-red-800/[0.03] dark:bg-forge-accent/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
                <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-amber-800/[0.02] dark:bg-forge-cyan/5 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none z-0" />

                <div className="relative z-10 flex w-full h-full">
                  <Sidebar />
                  <main className="flex-1 h-full relative overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-hidden">{children}</div>
                    <NovaGuideWrapper />
                  </main>
                </div>
              </div>
            </QueryProvider>
          </NovaViewProvider>
        </SoundProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}



'use client';

import React from 'react';

import { LanguageProvider, SoundProvider, NovaViewProvider } from '@/contexts';
import { QuestHUD } from '@/features/gamification/components/QuestHUD';
import { NovaGuideWrapper } from '@/features/nova/components/NovaGuideWrapper';
import { QueryProvider } from '@/providers/QueryProvider';
import { Sidebar } from '@/shared/layout/Sidebar';
import '@/app/globals.css';

export default function ForgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SoundProvider>
        <NovaViewProvider>
          <QueryProvider>
            <div className="relative flex h-screen w-screen bg-[#030304] text-white overflow-hidden selection:bg-forge-accent selection:text-white font-sans">
              <div className="relative z-10 flex w-full h-full bg-[#030304]">
                <Sidebar />
                <main className="flex-1 h-full relative overflow-hidden flex flex-col bg-[#030304]">
                  <div className="flex-1 overflow-hidden bg-[#030304]">{children}</div>
                </main>
                <NovaGuideWrapper />
                <QuestHUD />
              </div>
            </div>
          </QueryProvider>
        </NovaViewProvider>
      </SoundProvider>
    </LanguageProvider>
  );
}

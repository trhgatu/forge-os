'use client';

import React from 'react';

import { LanguageProvider, SoundProvider, NovaViewProvider } from '@/contexts';
import { NovaGuideWrapper } from '@/features/nova/components/NovaGuideWrapper';
import { QueryProvider } from '@/providers/QueryProvider';
import { Sidebar } from '@/shared/layout/Sidebar';
import { QuestHUD } from '@/features/gamification/components/QuestHUD';
import '@/app/globals.css';

export default function ForgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SoundProvider>
        <NovaViewProvider>
          <QueryProvider>
            <div className="flex h-screen w-screen bg-[#030304] text-white overflow-hidden selection:bg-forge-accent selection:text-white font-sans">
              <div className="relative z-10 flex w-full h-full">
                <Sidebar />
                <main className="flex-1 h-full relative overflow-hidden flex flex-col">
                  <div className="flex-1 overflow-hidden">{children}</div>
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

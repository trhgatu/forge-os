"use client";

import React from "react";

import { LanguageProvider, SoundProvider, NovaViewProvider } from "@/contexts";
import { NovaGuideWrapper } from "@/features/nova/components/NovaGuideWrapper";
import { QueryProvider } from "@/providers/QueryProvider";
import { Sidebar } from "@/shared/layout/Sidebar";
import "@/app/globals.css";

export default function ForgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SoundProvider>
        <NovaViewProvider>
          <QueryProvider>
            <div className="flex h-screen w-screen bg-forge-bg text-white overflow-hidden selection:bg-forge-accent selection:text-white font-sans bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-gray-900 via-forge-bg to-[#050505]">
              <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-forge-accent/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
              <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-forge-cyan/5 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none z-0" />

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
    </LanguageProvider>
  );
}

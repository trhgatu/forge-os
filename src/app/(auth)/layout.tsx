"use client";

import React from "react";
import { NovaGuideWrapper } from "@/features/nova/components/NovaGuideWrapper";
import { LanguageProvider, SoundProvider, NovaViewProvider } from "@/contexts";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SoundProvider>
        <NovaViewProvider>
          <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050508] text-white selection:bg-forge-cyan/30">
            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-[20%] -left-[10%] w-[1000px] h-[1000px] bg-forge-accent/20 rounded-full blur-[150px] opacity-30 animate-pulse-slow" />
              <div className="absolute top-[40%] -right-[10%] w-[800px] h-[800px] bg-forge-cyan/10 rounded-full blur-[150px] opacity-20" />
              <div className="absolute inset-0 bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-md p-6">{children}</div>

            {/* Footer / Copyright */}
            <div className="absolute bottom-6 text-center text-[10px] text-gray-600 font-mono tracking-widest uppercase">
              Forge OS // v0.1.0 // Auth System
            </div>

            <NovaGuideWrapper />
          </div>
        </NovaViewProvider>
      </SoundProvider>
    </LanguageProvider>
  );
}

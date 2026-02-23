// features/nova/components/NovaGuide.tsx
"use client";

import { Activity, Bot, ChevronRight, Radio, X } from "lucide-react";
import { useState } from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/shared/lib/utils";
import type { View } from "@/shared/types/os";

import { useNovaMessage } from "../hooks/useNovaMessage";
import { useTypewriter } from "../hooks/useTypewriter";

import { NovaVisualizer } from "./NovaVisualizer";

interface NovaGuideProps {
  currentView: View;
}

export function NovaGuide({ currentView }: NovaGuideProps) {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(true);

  const rawMessage = useNovaMessage(currentView, language);
  const { displayed, isTyping } = useTypewriter(rawMessage, {
    minSpeed: 20,
    maxSpeed: 50,
  });

  const isVisible = Boolean(rawMessage);

  return (
    <div className="pointer-events-none fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Panel */}
      <div
        className={cn(
          "pointer-events-auto mb-6 w-80 origin-bottom-right perspective-1000 transition-all duration-500",
          isVisible && isExpanded
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Connector line */}
        <div className="absolute -bottom-6 right-6 z-0 h-6 w-px bg-forge-cyan/50" />

        {/* Glass panel */}
        <div className="group relative overflow-hidden rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl rounded-br-sm border border-forge-cyan/30 bg-[#050508]/95 shadow-[0_0_40px_rgba(34,211,238,0.15)] backdrop-blur-xl">
          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,3px_100%] opacity-20" />

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-2">
            <div className="flex items-center gap-2">
              <Radio className="h-3 w-3 animate-pulse text-forge-cyan" />
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-forge-cyan">
                NOVA_LINK_V∞
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 transition-colors hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Content */}
          <div className="relative z-10 p-5">
            {/* Visualizer */}
            <NovaVisualizer isActive={isTyping} />

            {/* Message */}
            <div className="min-h-[60px]">
              <div className="font-mono text-xs leading-relaxed tracking-wide text-cyan-100 whitespace-pre-line drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                {displayed}
                {isTyping && (
                  <span className="ml-1 inline-block h-4 w-2 animate-blink bg-forge-cyan align-middle shadow-[0_0_8px_#22D3EE]" />
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
              <div className="flex items-center gap-2">
                <Activity className="h-2.5 w-2.5 text-emerald-500" />
                <div className="text-[8px] font-mono uppercase text-gray-500">Sys: Stable</div>
              </div>
              <ChevronRight className="h-2.5 w-2.5 text-forge-cyan" />
            </div>
          </div>

          {/* Corners */}
          <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-forge-cyan opacity-50" />
          <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-forge-cyan opacity-50" />
          <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-forge-cyan opacity-50" />
          <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-forge-cyan" />
        </div>
      </div>

      {/* Core button */}
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        className={cn(
          "pointer-events-auto relative z-50 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-500",
          isExpanded ? "scale-100" : "scale-95 hover:scale-105"
        )}
      >
        {/* Rings */}
        <div className="absolute inset-0 rounded-full border border-forge-cyan/30 border-t-transparent animate-[spin_4s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border border-forge-cyan/50 border-b-transparent animate-[spin_3s_linear_infinite_reverse]" />

        {/* Glow */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-forge-cyan/20 blur-xl transition-opacity duration-500",
            isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-60"
          )}
        />

        {/* Core icon */}
        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-forge-cyan/50 bg-[#050508] shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-colors group-hover:border-forge-cyan">
          <Bot className={cn("h-5 w-5 text-forge-cyan", !isExpanded && "animate-pulse")} />
        </div>

        {/* Status dot */}
        {!isExpanded && (
          <span className="absolute right-0 top-0 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-black bg-emerald-500" />
          </span>
        )}
      </button>
    </div>
  );
}

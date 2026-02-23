"use client";

import { format } from "date-fns";
import { Sparkles, Quote as QuoteIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { SEASON_CONFIG, getSeasonFromMood } from "../../memory/config/seasons";
import { useDailyQuote } from "../hooks/useQuote";



export function DailyInspiration() {
  const { data: quote, isLoading } = useDailyQuote();

  if (isLoading) {
    return (
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 pt-12 pb-6">
        <div className="relative h-[300px] w-full rounded-3xl overflow-hidden bg-[#050505] border border-white/5 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/[0.02] animate-pulse" />
          <div className="flex flex-col items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/5 animate-pulse" />
            <div className="h-4 w-48 bg-white/5 rounded animate-pulse" />
            <div className="h-8 w-96 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!quote) return null;

  const seasonConfig = SEASON_CONFIG[getSeasonFromMood(quote.mood)];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 py-8">
      {/* Outer Glow Wrapper */}
      <div className="relative p-[1px] rounded-3xl bg-gradient-to-r from-forge-cyan/50 via-fuchsia-500/50 to-transparent overflow-hidden">
        {/* Ambient Back Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-forge-cyan/20 via-fuchsia-500/20 to-transparent opacity-50 blur-xl pointer-events-none" />

        <div className="relative w-full rounded-[22px] overflow-hidden group isolate bg-[#09090b]/90 backdrop-blur-xl">
          {/* -- Cinematic Background Layers -- */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] text-white mix-blend-overlay pointer-events-none z-10" />

          <div
            className={cn(
              "absolute -top-[100px] -right-[100px] w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 transition-all duration-1000 pointer-events-none",
              seasonConfig.particleColor.replace("bg-", "bg-")
            )}
          />

          {/* -- Content Grid -- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-20 min-h-[380px]">
            {/* Left Panel: Context Identification (Sidebar) */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.005] p-6 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} className="text-forge-cyan" />
                  <span className="text-xs font-bold text-forge-cyan uppercase tracking-widest">
                    Quote of the Day
                  </span>
                </div>

                <div className="relative pb-6 border-b border-white/5 mb-6">
                  <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">
                    {quote.mood.charAt(0).toUpperCase() + quote.mood.slice(1)}
                  </h2>
                  <div className="absolute -bottom-3 left-0 px-2 py-0.5 bg-[#09090b] text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    Mood Resonance
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Decorative Data Points */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-fuchsia-400 font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
                    Current Date
                  </span>
                  <span className="text-lg text-white/80 font-mono font-light">
                    {format(new Date(), "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
                    System Log ID
                  </span>
                  <span className="text-sm text-white/50 font-mono tracking-wider">
                    {quote.id.substring(0, 12).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Panel: The Content (Clean, Impactful) */}
            <div className="lg:col-span-9 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              {/* Background Detail */}
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <QuoteIcon size={200} className="text-white rotate-12" />
              </div>

              <div className="relative z-10 max-w-4xl">
                <blockquote className="space-y-8">
                  <p
                    className={cn(
                      "font-sans font-extralight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 leading-tight tracking-tight whitespace-pre-wrap break-words transition-all duration-300",
                      quote.text.length > 150
                        ? "text-2xl md:text-3xl lg:text-4xl"
                        : quote.text.length > 80
                          ? "text-3xl md:text-4xl lg:text-5xl"
                          : "text-3xl md:text-5xl lg:text-6xl"
                    )}
                  >
                    &quot;{quote.text}&quot;
                  </p>

                  <footer className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 pt-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-xl font-display font-bold text-white/50",
                          seasonConfig.accent
                        )}
                      >
                        {quote.author.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <cite className="text-xl text-white/90 not-italic font-medium tracking-tight hover:text-forge-cyan transition-colors duration-300">
                          {quote.author}
                        </cite>
                        <span className="text-xs text-white/30 uppercase tracking-widest font-mono">
                          Verified Source
                        </span>
                      </div>
                    </div>

                    <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />

                    <div className="flex items-center gap-3">
                      <button className="group relative px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl overflow-hidden transition-all duration-300">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-forge-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center gap-2">
                          <span className="text-xs font-bold text-white/70 group-hover:text-white uppercase tracking-widest">
                            Save to Vault
                          </span>
                        </div>
                      </button>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

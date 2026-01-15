"use client";

import React from "react";
import { useKnowledge } from "@/contexts/KnowledgeContext";
import { SearchWidget } from "./SearchWidget";
import { DiscoveredWidget } from "./DiscoveredWidget";
import { StatsWidget } from "./StatsWidget";
import { DiscoveryCarousel } from "./DiscoveryCarousel";
import { Globe, Layers, Zap } from "lucide-react";
import { GlassCard } from "@/shared/components/ui/GlassCard";

export const KnowledgeDashboard: React.FC = () => {
  const { history, selectConcept } = useKnowledge();

  return (
    <div className="h-full flex flex-col p-6 md:p-8 max-w-[1600px] mx-auto w-full space-y-6 overflow-y-auto scrollbar-hide">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-forge-cyan mb-2 backdrop-blur-md">
            <Globe size={12} className="animate-pulse-slow" /> Global Knowledge Grid
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Knowledge Nexus
          </h1>
          <p className="text-gray-400 mt-1 font-light">
            Access, crystalline, and connect information from the external chaos.
          </p>
        </div>

        {/* Quick Actions (Fake for now) */}
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forge-accent text-white font-medium hover:bg-forge-accent/80 transition-colors shadow-lg shadow-forge-accent/20">
            <Zap size={16} fill="currentColor" />
            <span>Quick Insight</span>
          </button>
        </div>
      </div>

      {/* 2. Search & Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Search Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <SearchWidget />

          {/* Featured / Random / Suggestion Area */}
          <DiscoveryCarousel />
        </div>

        {/* Right Column: Stats & Quick Categories */}
        <div className="flex flex-col gap-6">
          <StatsWidget totalCount={history.length} />

          {/* Categories Mini Widget */}
          <GlassCard className="flex-1 p-5">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
              <Layers size={14} className="text-forge-cyan" />
              Sectors
            </div>
            <div className="flex flex-wrap gap-2">
              {["Technology", "Science", "History", "Philosophy", "Art", "Cosmos"].map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-400 hover:text-white hover:border-white/20 cursor-pointer transition-all"
                >
                  {cat}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* 3. Discovered Area */}
      <div className="flex-1 min-h-[300px]">
        <DiscoveredWidget history={history} onSelect={(c) => selectConcept(c)} />
      </div>
    </div>
  );
};

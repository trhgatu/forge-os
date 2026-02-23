"use client";

import { BrainCircuit, Database, Share2, TrendingUp } from "lucide-react";
import React from "react";

import { GlassCard } from "@/shared/components/ui/GlassCard";

interface StatsWidgetProps {
  totalCount: number;
}

export const StatsWidget: React.FC<StatsWidgetProps> = ({ totalCount }) => {
  const stats = [
    {
      label: "Artifacts Collected",
      value: totalCount,
      icon: Database,
      color: "text-forge-cyan",
      trend: "+12% this week",
    },
    {
      label: "Synapses Active",
      value: totalCount * 4 + 7, // Fake stats for "connections"
      icon: Share2,
      color: "text-purple-400",
      trend: "Optimal Flow",
    },
    {
      label: "Cognitive Load",
      value: "42%", // Fake metric
      icon: BrainCircuit,
      color: "text-emerald-400",
      trend: "Stable",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <GlassCard
          key={i}
          className="p-4 flex flex-col justify-between relative overflow-hidden group"
        >
          {/* Bg Blob */}
          <div
            className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-xl bg-current ${stat.color}`}
          />

          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              {stat.label}
            </span>
            <stat.icon size={16} className={stat.color} />
          </div>

          <div>
            <div className="text-2xl font-bold font-display text-white mb-1">{stat.value}</div>
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <TrendingUp size={10} />
              {stat.trend}
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

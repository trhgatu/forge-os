"use client";

import React from "react";
import { History, Clock, ArrowRight, Layers } from "lucide-react";
import { GlassCard } from "@/shared/components/ui/GlassCard";
import { KnowledgeConcept } from "@/shared/types";
import Image from "next/image";

interface DiscoveredWidgetProps {
  history: KnowledgeConcept[];
  onSelect: (concept: KnowledgeConcept) => void;
}

export const DiscoveredWidget: React.FC<DiscoveredWidgetProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return (
      <GlassCard className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 min-h-[300px]">
        <div className="p-4 rounded-full bg-white/5 text-gray-600">
          <Layers size={32} />
        </div>
        <div>
          <h3 className="text-lg font-display font-medium text-white mb-1">No Recent Artifacts</h3>
          <p className="text-sm text-gray-500 max-w-[200px] mx-auto">
            Start exploring the global knowledge grid to populate your history.
          </p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="h-full flex flex-col min-h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm font-mono text-gray-400 uppercase tracking-wider">
          <History size={16} className="text-forge-cyan" />
          Recent Discovered
        </div>
        {/* <button className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1 group">
            View All <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </button> */}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {history.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="group relative flex items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer overflow-hidden"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Hover Glow */}
            <div className="absolute inset-y-0 left-0 w-1 bg-forge-cyan/0 group-hover:bg-forge-cyan transition-colors duration-300" />

            {/* Thumbnail if available */}
            <div className="relative w-12 h-12 rounded-lg bg-[#0A0A0F] border border-white/10 overflow-hidden shrink-0 mr-4">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-700">
                  <Layers size={16} />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-200 group-hover:text-white truncate font-display">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={10} className="text-gray-600" />
                <span className="text-[10px] text-gray-500 font-mono">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                {item.language && (
                  <span className="text-[9px] px-1.5 rounded bg-white/5 border border-white/5 text-gray-500 uppercase">
                    {item.language}
                  </span>
                )}
              </div>
            </div>

            <ArrowRight
              size={14}
              className="text-gray-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
            />
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

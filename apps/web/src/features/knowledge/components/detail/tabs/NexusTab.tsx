import { Network, Share2 } from "lucide-react";
import React from "react";

import { GlassCard } from "@/shared/components/ui/GlassCard";

export const NexusTab: React.FC = () => {
  return (
    <div className="min-h-[600px] flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <GlassCard className="p-12 text-center max-w-lg mx-auto border-dashed border-white/10 bg-transparent">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-400">
          <Network size={32} />
        </div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">The Nexus</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Visualizing the connections between this artifact and the broader knowledge graph. Trace
          synaptic pathways and discover hidden relations.
        </p>

        <button className="px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-medium hover:bg-white/20 transition-all flex items-center gap-2 mx-auto">
          <Share2 size={16} />
          <span>Generate Graph</span>
        </button>
      </GlassCard>
    </div>
  );
};

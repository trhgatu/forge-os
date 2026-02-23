// features/knowledge/components/KnowledgeContent.tsx
"use client";

import React from "react";
import { useKnowledge } from "../../../contexts/KnowledgeContext";
import { KnowledgeDetail } from "./KnowledgeDetail";
import { KnowledgeDashboard } from "./dashboard/KnowledgeDashboard";

const KnowledgeContent: React.FC = () => {
  const { activeConcept, clearActive } = useKnowledge();

  return (
    <div className="h-full flex bg-[#020203] text-white relative overflow-hidden selection:bg-indigo-500/30">
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-900/10 rounded-full blur-[200px] opacity-40" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-cyan-900/10 rounded-full blur-[200px] opacity-40" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      </div>

      <div className="flex-1 h-full relative z-10 flex flex-col min-h-0">
        <KnowledgeDashboard />
      </div>

      {/* Detail Overlay */}
      {activeConcept && <KnowledgeDetail concept={activeConcept} onClose={clearActive} />}
    </div>
  );
};

export default KnowledgeContent;

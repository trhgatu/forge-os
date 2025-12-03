// features/knowledge/components/KnowledgeContent.tsx
"use client";

import React from "react";
import { Globe, History, Layers } from "lucide-react";
import { useKnowledge } from "../../../contexts/KnowledgeContext";
import { KnowledgeSearch } from "./KnowledgeSearch";
import { KnowledgeDetail } from "./KnowledgeDetail";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";

const KnowledgeContent: React.FC = () => {
  const { activeConcept, clearActive, history, selectConcept } = useKnowledge();

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
              "linear-linear(rgba(255,255,255,0.5) 1px, transparent 1px), linear-linear(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      </div>

      <div className="flex-1 h-full overflow-y-auto scrollbar-hide relative z-10 flex flex-col">
        <div className="p-6 md:p-12 pb-0 max-w-7xl mx-auto w-full flex flex-col items-center">
          {/* Header Decoration */}
          <div className="text-center mb-16 relative w-full max-w-2xl">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-400 mb-6 backdrop-blur-md shadow-lg">
              <Globe size={12} className="text-forge-cyan animate-pulse-slow" /> Global Knowledge
              Graph
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/40 mb-6 tracking-tight drop-shadow-2xl">
              Knowledge Interface
            </h1>

            <p className="text-lg text-gray-400 font-light leading-relaxed">
              Seamlessly bridge the exterior world of facts into your internal operating system of
              meaning.
            </p>
          </div>

          <KnowledgeSearch />

          {/* History / Recent Concepts */}
          {history.length > 0 && (
            <div className="w-full mt-24">
              <div className="flex items-center gap-3 text-xs font-mono text-gray-500 uppercase tracking-widest mb-8 px-2 border-b border-white/5 pb-4">
                <History size={14} className="text-forge-cyan" />
                <span>Recent Artifacts</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 pb-20">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => selectConcept(item)}
                    className="group relative aspect-3/4 rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-[#0A0A0F] hover:border-white/30 hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-forge-cyan/10"
                  >
                    {/* Background Image or Fallback */}
                    {item.imageUrl ? (
                      <div className="absolute inset-0">
                        <Image
                          fill
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0F] via-[#0A0A0F]/60 to-transparent" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent group-hover:from-white/10 transition-all">
                        <div className="absolute inset-0 flex items-center justify-center text-white/5 group-hover:text-white/10 transition-colors">
                          <Layers size={48} />
                        </div>
                      </div>
                    )}

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                      {item.language && (
                        <div className="absolute top-4 right-4">
                          <span
                            className={cn(
                              "text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider backdrop-blur-md shadow-sm",
                              item.language === "vi"
                                ? "bg-red-500/20 text-red-200 border-red-500/30"
                                : "bg-blue-500/20 text-blue-200 border-blue-500/30"
                            )}
                          >
                            {item.language}
                          </span>
                        </div>
                      )}

                      <h3 className="text-lg font-display font-bold text-white leading-tight mb-1 line-clamp-2 group-hover:text-forge-cyan transition-colors">
                        {item.title}
                      </h3>
                      <div className="text-[10px] text-gray-500 font-mono group-hover:text-gray-400 transition-colors">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 border-2 border-forge-cyan/0 group-hover:border-forge-cyan/20 rounded-2xl transition-all duration-500 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Overlay */}
      {activeConcept && <KnowledgeDetail concept={activeConcept} onClose={clearActive} />}
    </div>
  );
};

export default KnowledgeContent;

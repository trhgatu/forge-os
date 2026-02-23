import { ArrowLeft, Share2, Edit3, Activity, GitMerge, Sparkles, Zap } from "lucide-react";
import React from "react";

import type { Foundation } from "../types";

interface FoundationDetailProps {
  foundation: Foundation;
  onBack: () => void;
}

export const FoundationDetail: React.FC<FoundationDetailProps> = ({ foundation, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 pb-32 animate-in fade-in slide-in-from-bottom-2 duration-700 ease-spring-out relative">
      {/* Creative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forge-accent/5 rounded-full blur-[100px] -z-10 animate-float" />
      <div className="absolute top-20 left-10 w-full h-full opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none -z-10" />

      {/* Header Tools (Floating) */}
      <div className="flex items-center justify-between mb-12 sticky top-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all group shadow-lg"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Library</span>
        </button>

        <div className="flex items-center gap-2 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
          <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <Share2 size={16} />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-forge-cyan/10 text-forge-cyan hover:bg-forge-cyan/20 transition-colors text-xs font-bold uppercase tracking-wider">
            <Edit3 size={12} /> Edit
          </button>
        </div>
      </div>

      {/* Immersive Hero Section */}
      <div className="relative mb-16 pt-8 text-center max-w-4xl mx-auto">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-forge-cyan/20 blur-[60px] rounded-full" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-sm animate-in fade-in zoom-in-50 duration-700 delay-100">
          <Sparkles size={12} className="text-yellow-400" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-300">
            {foundation.type} {"//"} {foundation.status || "Experimental"}
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight tracking-tight mb-6 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {foundation.title}
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          {foundation.description}
        </p>

        <div className="flex justify-center items-center gap-6 mt-8 animate-in fade-in opacity-0 duration-1000 delay-500 fill-mode-forwards">
          {/* Contributors Stack */}
          <div className="flex items-center -space-x-3 hover:space-x-1 transition-all">
            {foundation.author && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={foundation.author.avatar || ""}
                alt={foundation.author.name || "Author"}
                className="w-10 h-10 rounded-full border-2 border-black bg-gray-800"
                title="Author"
              />
            )}
            {foundation.contributors?.map((c, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400"
              >
                {c.name[0]}
              </div>
            ))}
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-left">
            <div className="text-xs text-gray-500 uppercase tracking-widest">Last Updated</div>
            <div className="text-sm text-white font-mono">
              {foundation.updatedAt.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content "Scroll" */}
        <div className="lg:col-span-8 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-backwards">
          {/* Abstract / Intro */}
          <div className="relative pl-6 border-l-2 border-forge-accent/30">
            <p className="text-lg text-gray-300 italic font-serif leading-loose">
              &quot;Every scalable system begins with a single, immutable truth. This document
              explores the foundational axioms that support the entire Forge infrastructure.&quot;
            </p>
          </div>

          {/* Content Blocks */}
          <div className="space-y-8">
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-display font-bold text-white mb-4">
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-mono text-gray-500">
                  01
                </span>
                The Core Loop
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                Interaction is circular, not linear. We perceive, we process, we act, and we
                reflect. The OS mimics this biological feedback loop to create a symbiotic
                relationship with the user.
              </p>
            </div>

            {/* Interactive Insight Card */}
            <div className="p-1 rounded-2xl bg-gradient-to-r from-forge-cyan/20 via-purple-500/20 to-pink-500/20">
              <div className="bg-[#0c0c0e] rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                  <Zap size={24} className="text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Key Axiom</h3>
                <p className="text-gray-300 font-light">
                  Complexity is a currency. Spend it only where it buys significantly better user
                  agency.
                </p>
              </div>
            </div>

            <div>
              <h2 className="flex items-center gap-3 text-2xl font-display font-bold text-white mb-4">
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-mono text-gray-500">
                  02
                </span>
                System Potency
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                The power of the Forge lies not in its features, but in its ability to synthesize
                disparate data points into coherent knowledge graphs.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar - "HUD" Style */}
        <div className="lg:col-span-4 space-y-6 animate-in fade-in slide-in-from-right-8 duration-1000 delay-700 fill-mode-backwards">
          {/* Metrics HUD */}
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity size={14} /> Vital Signs
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-display font-bold text-white">
                  {foundation.metrics?.impactScore}
                </div>
                <div className="text-[10px] text-gray-500 uppercase font-mono mt-1">
                  Impact Factor
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-forge-accent w-[80%] animate-pulse" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-white">
                  {foundation.metrics?.usageCount}
                </div>
                <div className="text-[10px] text-gray-500 uppercase font-mono mt-1">
                  Dependencies
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-forge-cyan w-[40%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Network Graph Placeholder */}
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm min-h-[200px] flex flex-col relative group cursor-crosshair">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <GitMerge size={14} /> Network
            </h3>

            <div className="flex-1 flex flex-col justify-center gap-2">
              {foundation.connectedNodes?.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-black/20 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                >
                  <span className="text-sm text-gray-300">{node.title}</span>
                  <div
                    className={`w-2 h-2 rounded-full ${node.type === "project" ? "bg-cyan-500" : "bg-fuchsia-500"} `}
                  />
                </div>
              ))}
              {(!foundation.connectedNodes || foundation.connectedNodes.length === 0) && (
                <div className="text-center text-xs text-gray-600 italic">No nodes linked</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import {
  Cpu,
  Sparkles,
  Binary,
  BrainCircuit,
  MoreHorizontal,
  Activity,
} from "lucide-react";
import { Agent } from "@/shared/types";
import { cn } from "@/shared/lib/utils";

// =============================================
// TAILWIND v4 FIX – MAPPING TEXT-COLOR → REAL COLORS
// =============================================
const AGENT_COLORS: Record<
  string,
  { border: string; bg: string; visualizer: string }
> = {
  "text-forge-cyan": {
    border: "border-forge-cyan/30",
    bg: "bg-forge-cyan/20",
    visualizer: "bg-forge-cyan",
  },
  "text-amber-400": {
    border: "border-amber-400/30",
    bg: "bg-amber-400/20",
    visualizer: "bg-amber-400",
  },
  "text-fuchsia-400": {
    border: "border-fuchsia-400/30",
    bg: "bg-fuchsia-400/20",
    visualizer: "bg-fuchsia-400",
  },
  "text-emerald-400": {
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/20",
    visualizer: "bg-emerald-400",
  },
};

export const AGENTS: Agent[] = [
  {
    id: "nexus",
    name: "Nexus",
    role: "System Core",
    status: "speaking",
    icon: Cpu,
    color: "text-forge-cyan",
    bg: "bg-cyan-950/30",
    border: "border-forge-cyan/30",
    gradient: "from-cyan-500 to-blue-600",
    systemPrompt:
      "You are Nexus, the core system of Forge OS. Be helpful, concise, and act as a moderator.",
  },
  {
    id: "socrates",
    name: "Socrates",
    role: "Deep Reasoning",
    status: "idle",
    icon: BrainCircuit,
    color: "text-amber-400",
    bg: "bg-amber-400/20",
    border: "border-amber-400/30",
    gradient: "from-amber-500 to-orange-600",
    systemPrompt:
      "You are Socrates. You challenge assumptions with philosophy and logic.",
  },
  {
    id: "muse",
    name: "Muse",
    role: "Creative Engine",
    status: "idle",
    icon: Sparkles,
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-400/20",
    border: "border-fuchsia-400/30",
    gradient: "from-fuchsia-500 to-pink-600",
    systemPrompt:
      "You are Muse. You think poetically, emotionally, and in metaphors.",
  },
  {
    id: "cipher",
    name: "Cipher",
    role: "Logic & Code",
    status: "offline",
    icon: Binary,
    color: "text-emerald-400",
    bg: "bg-emerald-400/20",
    border: "border-emerald-400/30",
    gradient: "from-emerald-500 to-teal-600",
    systemPrompt:
      "You are Cipher. You speak like an engineer: technical, precise, efficient.",
  },
];

// =============================================
// COMPONENT
// =============================================
interface AgentDockProps {
  isOpen: boolean;
  activeAgentIds?: string[];
}

export const AgentDock: React.FC<AgentDockProps> = ({
  isOpen,
  activeAgentIds = [],
}) => {
  return (
    <div
      className={cn(
        "relative h-full flex flex-col bg-black/40 backdrop-blur-2xl border-l border-white/5 shadow-2xl",
        "transition-all duration-500 ease-spring-out overflow-hidden",
        isOpen ? "w-80 opacity-100" : "w-0 opacity-0"
      )}
    >
      <div className="w-80 h-full flex flex-col relative">
        {/* HEADER */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
            </div>
            <span className="font-display font-bold text-white tracking-wide text-sm">
              NEURAL MESH
            </span>
          </div>
          <MoreHorizontal className="text-gray-500 hover:text-white cursor-pointer" size={16} />
        </div>

        {/* AGENT LIST */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {AGENTS.map((agent, index) => {
            const isSpeaking = activeAgentIds.includes(agent.id);
            const isOffline = agent.status === "offline";
            const Icon = agent.icon;

            const colorMap =
              AGENT_COLORS[agent.color] ??
              AGENT_COLORS["text-emerald-400"]; // fallback để tránh crash

            return (
              <div
                key={agent.id}
                className={cn(
                  "group relative p-4 rounded-2xl border border-white/5 bg-white/2",
                  "hover:bg-white/6 hover:border-white/10 hover:shadow-lg hover:-translate-y-1",
                  "transition-all duration-500 cursor-pointer"
                )}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(20px)",
                }}
              >
                {/* ACTIVE BORDER */}
                {isSpeaking && (
                  <div
                    className={cn(
                      "absolute inset-0 rounded-2xl border shadow-[0_0_20px_rgba(0,0,0,0.2)]",
                      agent.border
                    )}
                  />
                )}

                {/* CARD CONTENT */}
                <div className="flex items-center gap-4 relative z-10">
                  {/* AVATAR */}
                  <div className="relative">
                    {isSpeaking && (
                      <div
                        className={cn(
                          "absolute inset-0 -m-2 rounded-full border animate-ripple",
                          agent.border
                        )}
                      />
                    )}

                    <div
                      className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-linear-to-br",
                        isOffline ? "from-gray-800 to-gray-900" : agent.gradient
                      )}
                    >
                      <Icon size={20} className="text-white" />
                    </div>

                    {/* STATUS DOT */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-forge-bg rounded-full border border-white/10 flex items-center justify-center">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          isOffline
                            ? "bg-gray-600"
                            : isSpeaking
                            ? "bg-green-500"
                            : "bg-yellow-400"
                        )}
                      />
                    </div>
                  </div>

                  {/* TEXT INFO */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4
                        className={cn(
                          "font-medium text-sm",
                          isOffline ? "text-gray-500" : "text-white"
                        )}
                      >
                        {agent.name}
                      </h4>
                      {isSpeaking && (
                        <Activity size={12} className={agent.color} />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{agent.role}</p>
                  </div>
                </div>

                {/* VISUALIZER */}
                {isSpeaking && (
                  <div className="mt-4 flex items-end gap-1 h-4 opacity-40 group-hover:opacity-80 transition-opacity">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className={cn("w-1 rounded-full", colorMap.visualizer)}
                        style={{
                          height: `${Math.random() * 100}%`,
                          animation: `pulse 1s infinite ${i * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-xl">
          <button className="w-full py-3 rounded-xl border border-dashed border-white/20 text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
            <span className="text-lg">+</span> Initialize Agent
          </button>
        </div>
      </div>
    </div>
  );
};

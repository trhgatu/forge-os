"use client";

import React, { useState } from "react";
import { BookOpen, Hammer, Network, ArrowLeft, Share2, Bookmark, MoreVertical } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import type { KnowledgeConcept } from "@/shared/types";

import { SourceTab } from "./detail/tabs/SourceTab";
import { AnvilTab } from "./detail/tabs/AnvilTab";
import { NexusTab } from "./detail/tabs/NexusTab";

interface KnowledgeDetailProps {
  concept: KnowledgeConcept;
  onClose: () => void;
}

type Tab = "source" | "anvil" | "nexus";

export const KnowledgeDetail: React.FC<KnowledgeDetailProps> = ({ concept, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>("source");
  const [isSaved, setIsSaved] = useState(false);

  // Two-stage capture process:
  // 1. stagingExtracts: Captured in SourceTab, not yet moved to Anvil.
  // 2. committedExtracts: Explicitly moved to Anvil via "Forge Insight".
  const [stagingExtracts, setStagingExtracts] = useState<string[]>([]);
  const [committedExtracts, setCommittedExtracts] = useState<string[]>([]);

  const handleCapture = (text: string) => {
    setStagingExtracts((prev) => [...prev, text]);
  };

  const handleRemoveStaging = (index: number) => {
    setStagingExtracts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveCommitted = (index: number) => {
    setCommittedExtracts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCrystallize = () => {
    if (stagingExtracts.length > 0) {
      setCommittedExtracts((prev) => [...prev, ...stagingExtracts]);
      setStagingExtracts([]); // Clear staging after moving
    }
    setActiveTab("anvil");
  };

  const TABS = [
    { id: "source", label: "Source", icon: BookOpen },
    { id: "anvil", label: "Anvil", icon: Hammer },
    { id: "nexus", label: "Nexus", icon: Network },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-[#030304] animate-in fade-in duration-300 overflow-y-auto custom-scrollbar">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] opacity-20" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-forge-cyan/5 rounded-full blur-[100px] opacity-10" />
      </div>

      {/* HEADER BAR */}
      <div className="sticky top-0 z-50 bg-[#030304]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Left: Back & Title */}
          <div className="flex items-center justify-start gap-4 min-w-0">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="h-6 w-px bg-white/10 shrink-0" />
            <h1 className="text-sm font-bold text-white uppercase tracking-wider hidden md:block shrink-0">
              Wisdom Workspace
            </h1>
            <span className="text-gray-600 hidden md:block shrink-0">/</span>
            <span className="text-sm text-gray-300 truncate">{concept.title}</span>
          </div>

          {/* Center: Tabs */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                    activeTab === tab.id
                      ? "bg-white/10 text-white shadow-sm border border-white/5"
                      : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                  )}
                >
                  <tab.icon size={14} />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isSaved ? "text-forge-accent" : "text-gray-400 hover:text-white"
              )}
            >
              <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12 relative z-10 min-h-screen">
        {activeTab === "source" && (
          <SourceTab
            concept={concept}
            extracts={stagingExtracts}
            onCrystallize={handleCrystallize}
            onCapture={handleCapture}
            onRemoveExtract={handleRemoveStaging}
          />
        )}
        {activeTab === "anvil" && (
          <AnvilTab extracts={committedExtracts} onRemoveExtract={handleRemoveCommitted} />
        )}
        {activeTab === "nexus" && <NexusTab />}
      </div>
    </div>
  );
};

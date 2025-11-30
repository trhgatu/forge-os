"use client";

import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";

import type { MoodEntry, MoodAnalysis } from "@/shared/types/mood";
/* import { analyzeMoodPatterns } from "@/services/geminiService"; */
import { MoodChart } from "./MoodChart";
import { MoodHistoryList } from "./MoodHistoryList";
import { AddMoodModal } from "./AddMoodModal";
import { InsightPanel } from "./InsightPanel";

export function Mood() {
  const [history, setHistory] = useState<MoodEntry[]>([
    {
      id: "1",
      mood: "joy",
      intensity: 8,
      note: "Great morning meeting",
      tags: ["Work"],
      date: new Date(Date.now() - 86400000 * 6),
    },
    {
      id: "2",
      mood: "anxious",
      intensity: 6,
      note: "Deadline approaching",
      tags: ["Work", "Stress"],
      date: new Date(Date.now() - 86400000 * 5),
    },
    {
      id: "3",
      mood: "calm",
      intensity: 7,
      note: "Meditation",
      tags: ["Health"],
      date: new Date(Date.now() - 86400000 * 4),
    },
    {
      id: "4",
      mood: "tired",
      intensity: 5,
      note: "Late night coding",
      tags: ["Work"],
      date: new Date(Date.now() - 86400000 * 3),
    },
    {
      id: "5",
      mood: "inspired",
      intensity: 9,
      note: "New project idea",
      tags: ["Creativity"],
      date: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: "6",
      mood: "joy",
      intensity: 8,
      note: "Coffee with friend",
      tags: ["Social"],
      date: new Date(Date.now() - 86400000 * 1),
    },
    {
      id: "7",
      mood: "calm",
      intensity: 8,
      note: "Starting the day fresh",
      tags: ["Morning"],
      date: new Date(),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysis, setAnalysis] = useState<MoodAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSave = (entry: MoodEntry) => {
    setHistory((prev) => [...prev, entry]);
  };

  const handleAnalyze = async () => {
    if (!history.length) return;

    setIsAnalyzing(true);

    try {
      await new Promise((r) => setTimeout(r, 700));

      const mock: MoodAnalysis = {
        prediction: "Your emotional field is stabilizing this week.",
        overallTrend: "Positive Shift",
        triggers: ["Work", "Creativity", "Routine"],
        insight:
          "You're showing a strong bounce-back pattern after periods of pressure. Creative activities seem to anchor your emotional baseline.",
        actionableStep:
          "Try scheduling a small creative ritual every morning to maintain the upward trend.",
      };

      setAnalysis(mock);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative flex h-full overflow-hidden bg-forge-bg text-white animate-in fade-in duration-700">
      {/* Left / Main */}
      <div className="relative z-10 flex h-full flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Emotional Resonance</h1>
            <p className="mt-1 font-mono text-xs text-gray-500">
              Tracking internal weather patterns.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Sparkles size={16} className={isAnalyzing ? "animate-spin" : "text-forge-accent"} />
              Analyze Cycles
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black shadow-lg shadow-white/10 transition-colors hover:bg-gray-200"
            >
              <Plus size={16} />
              Log Mood
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="scrollbar-hide flex-1 overflow-y-auto px-8">
          <MoodChart history={history} />
          <MoodHistoryList history={history} />
        </div>
      </div>

      {/* Right Panel – desktop */}
      <div className="hidden h-full w-80 border-l border-white/5 bg-black/20 backdrop-blur-xl xl:block">
        <div className="border-b border-white/5 p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">
            Pattern Recognition
          </h3>
        </div>
        <InsightPanel analysis={analysis} isAnalyzing={isAnalyzing} />
      </div>

      {isModalOpen && <AddMoodModal onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
    </div>
  );
}

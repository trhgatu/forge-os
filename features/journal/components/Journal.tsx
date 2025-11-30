"use client";

import { useState } from "react";

import { JournalEntry } from "@/shared/types/journal";
import { MOCK_ENTRIES } from "../data/mockEntries";
import { analyzeJournalEntry } from "../services/analyze";

import { JournalSidebar } from "./JournalSidebar";
import { JournalEditor } from "./JournalEditor";
import { JournalContextPanel } from "./JournalContextPanel";

export function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(MOCK_ENTRIES);
  const [selectedId, setSelectedId] = useState<string>(MOCK_ENTRIES[0].id);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const selectedEntry = entries.find((e) => e.id === selectedId) ?? entries[0];

  const handleUpdateEntry = (patch: Partial<JournalEntry>) => {
    setEntries((prev) => prev.map((e) => (e.id === selectedId ? { ...e, ...patch } : e)));
  };

  const handleNewEntry = () => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: "",
      content: "",
      date: new Date(),
      mood: "neutral",
      tags: [],
      isDraft: true,
    };

    setEntries((prev) => [newEntry, ...prev]);
    setSelectedId(newEntry.id);
  };

  const handleAnalyze = async () => {
    if (!selectedEntry) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeJournalEntry(selectedEntry.content);
      handleUpdateEntry({ analysis: result });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="h-full flex bg-forge-bg text-white overflow-hidden animate-in fade-in duration-700">
      {!isFocusMode && (
        <JournalSidebar
          entries={entries}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onNew={handleNewEntry}
        />
      )}

      <JournalEditor
        entry={selectedEntry}
        onChange={handleUpdateEntry}
        onAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
        isFocusMode={isFocusMode}
        toggleFocusMode={() => setIsFocusMode((v) => !v)}
      />

      {!isFocusMode && <JournalContextPanel analysis={selectedEntry.analysis} />}
    </div>
  );
}

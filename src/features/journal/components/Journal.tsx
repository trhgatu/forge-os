"use client";

import { useState, useEffect, useMemo, useRef } from "react";

import { JournalEntry, JournalStatus, JournalType } from "@/features/journal/types";
import { toast } from "sonner";
import {
  useJournals,
  useCreateJournal,
  useUpdateJournal,
  useDeleteJournal,
} from "../hooks/useJournal";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { analyzeJournalEntry } from "../services/analyze";

import { JournalSidebar } from "./JournalSidebar";
import { JournalEditor } from "./JournalEditor";
import { JournalContextPanel } from "./JournalContextPanel";

export function Journal() {
  // --- Data & Hooks ---
  const { data, isLoading } = useJournals({ page: 1, limit: 100 }); // TODO: Infinite scroll later

  // Memoize entries to prevent exhaustive-deps warnings
  const entries = useMemo(() => data?.data || [], [data]);

  const createMutation = useCreateJournal();
  const updateMutation = useUpdateJournal();
  const deleteMutation = useDeleteJournal();

  // --- Local State ---
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [localEntry, setLocalEntry] = useState<JournalEntry | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // --- Auto-Save Logic ---
  const debouncedEntry = useDebounce(localEntry, 1000);
  const lastSavedRef = useRef<string>("");

  // 1. Select first entry on load if none selected
  useEffect(() => {
    if (!selectedId && entries.length > 0) {
      setSelectedId(entries[0].id);
    }
  }, [entries, selectedId]);

  // 2. Sync Local State when Switching Entries (or initial load)
  useEffect(() => {
    if (!selectedId) {
      setLocalEntry(null);
      return;
    }
    const remote = entries.find((e) => e.id === selectedId);
    if (remote) {
      setLocalEntry((prev) => (prev?.id === remote.id ? prev : remote));
      // Update last saved ref when switching entries
      lastSavedRef.current = JSON.stringify({
        title: remote.title,
        content: remote.content,
        mood: remote.mood,
        tags: remote.tags,
      });
    } else {
      // If selected ID not found in entries (e.g., just deleted), clear local entry
      setLocalEntry(null);
    }
  }, [selectedId, entries]);

  // 3. Trigger Auto-Save when Debounced Value Changes
  useEffect(() => {
    if (!debouncedEntry || !selectedId) return;

    const currentState = JSON.stringify({
      title: debouncedEntry.title,
      content: debouncedEntry.content,
      mood: debouncedEntry.mood,
      tags: debouncedEntry.tags,
    });

    // Only save if different from last saved state
    if (currentState !== lastSavedRef.current) {
      updateMutation.mutate({
        id: debouncedEntry.id,
        data: {
          title: debouncedEntry.title,
          content: debouncedEntry.content,
          mood: debouncedEntry.mood,
          tags: debouncedEntry.tags,
        },
      });
      lastSavedRef.current = currentState;
    }
  }, [debouncedEntry, updateMutation, selectedId]);

  // --- Handlers ---

  const handleCreate = async () => {
    try {
      const newEntry = await createMutation.mutateAsync({
        content: "",
        title: "",
        status: JournalStatus.PRIVATE,
        mood: "neutral",
        type: JournalType.THOUGHT,
        tags: [],
      });
      console.log("Created new entry:", newEntry);

      // Select the new entry after creation
      setSelectedId(newEntry.id);
    } catch (error) {
      console.error("Failed to create entry", error);
    }
  };

  const handleDelete = (id: string) => {
    toast.custom((t) => (
      <div className="flex flex-col gap-2 rounded-xl border border-red-500/20 bg-black/90 p-4 text-sm text-white shadow-xl backdrop-blur-md">
        <p className="font-bold">Delete this journal entry?</p>
        <p className="text-gray-400">This action cannot be undone.</p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t);
              try {
                // Clear selection immediately if deleting current item
                if (selectedId === id) {
                  setSelectedId(null);
                  setLocalEntry(null);
                }

                await deleteMutation.mutateAsync(id);
                toast.success("Entry deleted");
              } catch (error) {
                console.error("Failed to delete entry", error);
                toast.error("Failed to delete entry");
              }
            }}
            className="rounded-md bg-red-500/20 px-3 py-1.5 text-red-200 transition-colors hover:bg-red-500/30"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t)}
            className="rounded-md bg-white/10 px-3 py-1.5 text-gray-300 transition-colors hover:bg-white/20"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const handleUpdateLocal = (patch: Partial<JournalEntry>) => {
    setLocalEntry((prev) => (prev ? { ...prev, ...patch } : null));
  };

  const handleAnalyze = async () => {
    if (!localEntry) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeJournalEntry(localEntry.content);
      // Save analysis strictly to local state for now
      // Backend does not support 'analysis' field yet, so we don't save it to DB
      handleUpdateLocal({ analysis: result });

      // TODO: Implement backend storage for Analysis results
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Status Indicator Calculation
  let saveStatus: "saved" | "saving" | "error" = "saved";
  if (updateMutation.isPending || createMutation.isPending) saveStatus = "saving";
  if (updateMutation.isError || createMutation.isError) saveStatus = "error";

  if (isLoading && !localEntry && !createMutation.isPending)
    return <div className="p-10 text-center text-gray-500">Loading Journal...</div>;

  return (
    <div className="h-full flex bg-forge-bg text-white overflow-hidden animate-in fade-in duration-700">
      {!isFocusMode && (
        <JournalSidebar
          entries={entries}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onNew={handleCreate}
          onDelete={handleDelete}
        />
      )}

      {localEntry ? (
        <JournalEditor
          entry={localEntry}
          onChange={handleUpdateLocal}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          isFocusMode={isFocusMode}
          toggleFocusMode={() => setIsFocusMode((v) => !v)}
          saveStatus={saveStatus}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select an entry or create a new one.
        </div>
      )}

      {!isFocusMode && localEntry && <JournalContextPanel analysis={localEntry.analysis} />}
    </div>
  );
}

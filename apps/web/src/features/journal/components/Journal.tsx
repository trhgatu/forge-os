'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { toast } from 'sonner';

import type { JournalEntry } from '@/features/journal/types';
import { JournalStatus, JournalType } from '@/features/journal/types';
import { Button } from '@/shared/components/ui';
import { useDebounce } from '@/shared/hooks/useDebounce';

import {
  useJournals,
  useCreateJournal,
  useUpdateJournal,
  useDeleteJournal,
} from '../hooks/useJournal';

import { JournalEditor } from './JournalEditor';
import { JournalSidebar } from './JournalSidebar';

export function Journal() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [localEntry, setLocalEntry] = useState<JournalEntry | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data, isLoading } = useJournals({
    page: 1,
    limit: 100,
    search: debouncedSearch,
  });

  const entries = useMemo(() => data?.data || [], [data]);

  const createMutation = useCreateJournal();
  const updateMutation = useUpdateJournal();
  const deleteMutation = useDeleteJournal();

  const [visualSaveStatus, setVisualSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  useEffect(() => {
    if (updateMutation.isPending) {
      setVisualSaveStatus('saving');
    } else if (updateMutation.isError) {
      setVisualSaveStatus('error');
    } else if (updateMutation.isSuccess) {
      const timer = setTimeout(() => {
        setVisualSaveStatus('saved');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [updateMutation.isPending, updateMutation.isError, updateMutation.isSuccess]);

  const debouncedEntry = useDebounce(localEntry, 1000);
  const lastSavedRef = useRef<string>('');

  useEffect(() => {
    if (!selectedId && entries.length > 0) {
      setSelectedId(entries[0].id);
    }
  }, [entries, selectedId]);
  useEffect(() => {
    if (!selectedId) {
      setLocalEntry(null);
      return;
    }
    const remote = entries.find((e: JournalEntry) => e.id === selectedId);
    if (remote) {
      setLocalEntry((prev: JournalEntry | null) => (prev?.id === remote.id ? prev : remote));
      lastSavedRef.current = JSON.stringify({
        title: remote.title,
        content: remote.content,
        mood: remote.mood,
        tags: remote.tags,
      });
    } else {
      setLocalEntry(null);
    }
  }, [selectedId, entries]);

  useEffect(() => {
    if (!debouncedEntry || !selectedId) return;

    const currentData = {
      title: debouncedEntry.title || '',
      content: debouncedEntry.content || '',
      mood: debouncedEntry.mood,
      tags: debouncedEntry.tags || [],
    };

    const currentState = JSON.stringify(currentData);

    if (currentState === lastSavedRef.current) return;

    lastSavedRef.current = currentState;

    updateMutation.mutate({
      id: debouncedEntry.id,
      data: currentData,
    });
  }, [debouncedEntry, selectedId]);


  const handleCreate = async () => {
    try {
      const newEntry = await createMutation.mutateAsync({
        content: '',
        title: '',
        status: JournalStatus.PRIVATE,
        mood: 'neutral',
        type: JournalType.THOUGHT,
        tags: [],
      });
      setSelectedId(newEntry.id);
    } catch (error) {
      console.error('Failed to create entry', error);
    }
  };

  const handleDelete = (id: string) => {
    console.log('handleDelete entering for ID:', id);
    toast.custom((t) => (
      <div className="flex flex-col gap-2 rounded-xl border border-red-500/20 bg-black/90 p-4 text-sm text-white shadow-xl backdrop-blur-md">
        <p className="font-bold">Delete this journal entry?</p>
        <p className="text-gray-400">This action cannot be undone.</p>
        <div className="mt-2 flex gap-2">
          <Button
            variant="danger"
            size="sm"
            onClick={async () => {
              toast.dismiss(t);
              try {
                await deleteMutation.mutateAsync(id);

                // Clear selection only after successful deletion
                if (selectedId === id) {
                  setSelectedId(null);
                  setLocalEntry(null);
                }

                toast.success('Entry deleted');
              } catch (error) {
                console.error('Failed to delete entry', error);
                toast.error('Failed to delete entry');
              }
            }}
          >
            Confirm
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.dismiss(t)}
          >
            Cancel
          </Button>
        </div>
      </div>
    ));
  };

  const handleUpdateLocal = (patch: Partial<JournalEntry>) => {
    setLocalEntry((prev: JournalEntry | null) => (prev ? { ...prev, ...patch } : null));
  };

  if (isLoading && !localEntry && !createMutation.isPending)
    return <div className="p-10 text-center text-gray-500 font-mono animate-pulse">Initializing Journal...</div>;

  return (
    <div className="h-full flex bg-forge-bg text-white overflow-hidden">

      {!isFocusMode && (
        <JournalSidebar
          entries={entries}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onNew={handleCreate}
          onDelete={handleDelete}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {localEntry ? (
        <JournalEditor
          entry={localEntry}
          onChange={handleUpdateLocal}
          isFocusMode={isFocusMode}
          toggleFocusMode={() => setIsFocusMode((v) => !v)}
          saveStatus={visualSaveStatus}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select an entry or create a new one.
        </div>
      )}
    </div>
  );
}




'use client';

import { Plus, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useAuthStore } from '@/shared/store/authStore';
import type { MoodAnalysis, MoodEntry } from '@/shared/types/mood';
import { Label, Button, Link } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

import { useMoods, useCreateMood, useUpdateMood, useDeleteMood } from '../hooks/useMood';
import type { CreateMoodDto } from '../services/moodService';

import { InsightPanel } from './InsightPanel';
import { MoodChart } from './MoodChart';
import { MoodHistoryList } from './MoodHistoryList';
import { MoodModal } from './MoodModal';

export function Mood() {
  // Real Data Hook
  const { data: moodData } = useMoods({ limit: 100 }); // Fetch last 100 for charts
  const history = moodData?.data || [];

  const createMood = useCreateMood();
  const updateMood = useUpdateMood();
  const deleteMood = useDeleteMood();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMood, setEditingMood] = useState<MoodEntry | undefined>(undefined);

  const [analysis, setAnalysis] = useState<MoodAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Handle Save (Create or Update)
  const handleSave = async (data: CreateMoodDto) => {
    try {
      if (editingMood) {
        await updateMood.mutateAsync({ id: editingMood.id, data });
      } else {
        await createMood.mutateAsync(data);
      }
      setEditingMood(undefined); // Reset
    } catch (error) {
      console.error('Failed to save mood:', error);
      // Toast is handled by hook onError, so just catching prevents crash
    }
  };

  const handleEdit = (entry: MoodEntry) => {
    setEditingMood(entry);
    setIsModalOpen(true);
  };

  // Removed misplaced import

  const handleDelete = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast.custom((t: any) => (
      <div className="flex flex-col gap-2 rounded-xl border border-red-500/20 bg-black/90 p-4 text-sm text-white shadow-xl backdrop-blur-md">
        <p className="font-bold">Dissolve this emotion?</p>
        <p className="text-gray-400">It will fade into the void.</p>
        <div className="mt-2 flex gap-2">
          <Button
            onClick={() => {
              toast.dismiss(t);
              deleteMood.mutate(id, {
                onSuccess: () => toast.success('Emotion dissolved.'),
              });
            }}
            variant="danger"
            size="sm"
          >
            Confirm
          </Button>
          <Button
            onClick={() => toast.dismiss(t)}
            variant="outline"
            size="sm"
          >
            Cancel
          </Button>
        </div>
      </div>
    ));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMood(undefined);
  };

  const handleAnalyze = async () => {
    if (!history.length) return;

    setIsAnalyzing(true);

    try {
      await new Promise((r) => setTimeout(r, 700));

      const mock: MoodAnalysis = {
        prediction: 'Your emotional field is stabilizing this week.',
        overallTrend: 'Positive Shift',
        triggers: ['Work', 'Creativity', 'Routine'],
        insight:
          "You're showing a strong bounce-back pattern after periods of pressure. Creative activities seem to anchor your emotional baseline.",
        actionableStep:
          'Try scheduling a small creative ritual every morning to maintain the upward trend.',
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
            <Label variant="cyan" className="text-2xl font-bold tracking-tight block">
              Emotional Resonance
            </Label>
            <p className="mt-1 font-mono text-xs text-gray-500">
              Tracking internal weather patterns.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              variant="outline"
              className="border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition-all hover:bg-white/10 disabled:opacity-50"
            >
              <Sparkles size={16} className={cn(isAnalyzing ? 'animate-spin mr-2' : 'text-forge-accent mr-2', 'inline')} />
              Analyze Cycles
            </Button>

            {/* Only show Log Mood if authenticated */}
            {isAuthenticated ? (
              <Button
                onClick={() => {
                  setEditingMood(undefined);
                  setIsModalOpen(true);
                }}
                className="bg-white hover:bg-gray-200 text-black font-semibold"
              >
                <Plus size={16} className="inline mr-2" />
                Log Mood
              </Button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Login to Log
              </Link>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="scrollbar-hide flex-1 overflow-y-auto px-8">
          <MoodChart history={history} />
          <MoodHistoryList history={history} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      {/* Right Panel – desktop */}
      <div className="hidden h-full w-80 border-l border-white/5 bg-black/20 backdrop-blur-xl xl:block">
        <div className="border-b border-white/5 p-6">
          <Label variant="default" className="text-sm font-semibold tracking-widest uppercase block">
            Pattern Recognition
          </Label>
        </div>
        <InsightPanel analysis={analysis} isAnalyzing={isAnalyzing} />
      </div>

      {isModalOpen && (
        <MoodModal initialData={editingMood} onClose={handleCloseModal} onSave={handleSave} />
      )}
    </div>
  );
}



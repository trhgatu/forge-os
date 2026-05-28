'use client';

import { useEffect } from 'react';

import { useNovaView } from '@/contexts';
import { GoalsManagement } from '@/features/gamification/components/GoalsManagement';
import { View } from '@/shared/types/os';


export default function EpicGoalsPage() {
  const { setCurrentView } = useNovaView();
  useEffect(() => {
    setCurrentView(View.GOALS);
  }, [setCurrentView]);
  return <GoalsManagement />;
}

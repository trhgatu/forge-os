'use client';

import { useEffect } from 'react';

import { useNovaView } from '@/contexts';
import { Habits } from '@/features/habits';
import { View } from '@/shared/types/os';

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.HABITS);
  }, [setCurrentView]);

  return <Habits />;
}

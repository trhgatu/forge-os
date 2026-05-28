'use client';

import { useEffect } from 'react';

import { useNovaView } from '@/contexts';
import { Tasks } from '@/features/tasks';
import { View } from '@/shared/types/os';

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.TASKS);
  }, [setCurrentView]);

  return <Tasks />;
}

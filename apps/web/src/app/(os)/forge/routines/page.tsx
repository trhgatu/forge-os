'use client';

import { useEffect } from 'react';

import { useNovaView } from '@/contexts';
import { Routines } from '@/features/routines';
import { View } from '@/shared/types/os';

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.ROUTINES);
  }, [setCurrentView]);

  return <Routines />;
}

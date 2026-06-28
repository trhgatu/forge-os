'use client';

import { useEffect } from 'react';
import { useNovaView } from '@/contexts';
import { Vitality } from '@/features/vitality';
import { View } from '@/shared/types/os';

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.ENERGY);
  }, [setCurrentView]);

  return <Vitality />;
}

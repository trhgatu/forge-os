'use client';

import { useEffect } from 'react';

import { useNovaView } from '@/contexts';
import { SensoryEchoes } from '@/features/echoes/components/SensoryEchoes';
import { View } from '@/shared/types/os';

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.ECHOES);
  }, [setCurrentView]);

  return <SensoryEchoes />;
}

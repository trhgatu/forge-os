'use client';

import { useEffect } from 'react';

import { useNovaView } from '@/contexts';
import { ShadowWork } from '@/features/shadow-work/components/ShadowWork';
import { View } from '@/shared/types/os';

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.SHADOW_WORK);
  }, [setCurrentView]);

  return <ShadowWork />;
}

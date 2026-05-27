'use client';

import { useEffect } from 'react';

import { useNovaView } from '@/contexts';
import { Identity } from '@/features/identity';
import { View } from '@/shared/types/os';

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.IDENTITY);
  }, [setCurrentView]);

  return <Identity />;
}


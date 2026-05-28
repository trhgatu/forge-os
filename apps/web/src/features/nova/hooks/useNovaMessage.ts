'use client';

import { useEffect, useState } from 'react';

import type { View } from '@/shared/types/os';

import { NOVA_MESSAGES } from '../config/messages';

export function useNovaMessage(view: View, languageCode: string, delayMs = 800) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => setMessage(null));

    const timeoutId = window.setTimeout(() => {
      const langKey = languageCode === 'vi' ? 'vi' : 'en';
      const langMessages = NOVA_MESSAGES[langKey] ?? NOVA_MESSAGES.en;

      const viewMessages = langMessages[view] ?? [];
      const defaultMessages = langMessages.DEFAULT ?? [];

      const useDefault = Math.random() < 0.3 || viewMessages.length === 0;
      const pool = useDefault && defaultMessages.length > 0 ? defaultMessages : viewMessages;
      const finalPool = pool.length > 0 ? pool : (NOVA_MESSAGES.en.DEFAULT ?? []);

      const next = finalPool[Math.floor(Math.random() * finalPool.length)] ?? '…';

      setMessage(next);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [view, languageCode, delayMs]);

  return message;
}



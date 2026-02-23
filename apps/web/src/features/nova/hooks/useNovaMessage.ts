"use client";

import { useEffect, useState } from "react";

import type { View } from "@/shared/types/os";

import { NOVA_MESSAGES } from "../config/messages";

export function useNovaMessage(view: View, languageCode: string, delayMs = 800) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => setMessage(null));

    const timeoutId = window.setTimeout(() => {
      const langKey = languageCode === "vi" ? "vi" : "en";
      const langMessages = NOVA_MESSAGES[langKey] ?? NOVA_MESSAGES.en;

      const viewMessages = langMessages[view] ?? langMessages.DEFAULT ?? [];

      const pool = viewMessages.length > 0 ? viewMessages : (NOVA_MESSAGES.en.DEFAULT ?? []);

      const next = pool[Math.floor(Math.random() * pool.length)] ?? "…";

      setMessage(next);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [view, languageCode, delayMs]);

  return message;
}

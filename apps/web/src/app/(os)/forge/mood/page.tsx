"use client";

import { useEffect } from "react";

import { useNovaView } from "@/contexts";
import { Mood } from "@/features/mood";
import { View } from "@/shared/types/os";

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.MOOD);
  }, [setCurrentView]);

  return <Mood />;
}

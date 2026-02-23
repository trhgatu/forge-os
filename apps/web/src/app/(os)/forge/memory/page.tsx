"use client";

import { useEffect } from "react";

import { useNovaView } from "@/contexts";
import { Memory } from "@/features/memory";
import { View } from "@/shared/types/os";

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.MEMORY);
  }, [setCurrentView]);
  return <Memory />;
}

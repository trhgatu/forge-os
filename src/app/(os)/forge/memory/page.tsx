"use client";

import { useNovaView } from "@/contexts";
import { View } from "@/shared/types/os";
import { useEffect } from "react";
import { Memory } from "@/features/memory";

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.MEMORY);
  }, [setCurrentView]);
  return <Memory />;
}

"use client";

import { useEffect } from "react";

import { useNovaView } from "@/contexts";
import { Timeline } from "@/features/timeline/components/Timeline";
import { View } from "@/shared/types/os";

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.TIMELINE);
  }, [setCurrentView]);

  return <Timeline />;
}

"use client";

import { useNovaView } from "@/contexts";
import { View } from "@/shared/types/os";
import { useEffect } from "react";
import { Timeline } from "@/features/timeline/components/Timeline";

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.TIMELINE);
  }, [setCurrentView]);

  return <Timeline />;
}

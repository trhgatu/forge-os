"use client";

import { useNovaView } from "@/contexts";
import { View } from "@/shared/types/os";
import { useEffect } from "react";
import { Journal } from "@/features/journal/components/Journal";

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.JOURNAL);
  }, [setCurrentView]);

  return <Journal />;
}

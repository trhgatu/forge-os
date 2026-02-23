"use client";

import { useEffect } from "react";

import { useNovaView } from "@/contexts";
import { Journal } from "@/features/journal/components/Journal";
import { View } from "@/shared/types/os";

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.JOURNAL);
  }, [setCurrentView]);

  return <Journal />;
}

"use client";

import { useNovaView } from "@/contexts";
import { View } from "@/shared/types/os";
import { useEffect } from "react";
import { Dashboard } from "@/features/dashboard/components/Dashboard";

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.DASHBOARD);
  }, [setCurrentView]);
  return <Dashboard />;
}

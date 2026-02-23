"use client";

import { useEffect } from "react";

import { useNovaView } from "@/contexts";
import { Dashboard } from "@/features/dashboard/components/Dashboard";
import { View } from "@/shared/types/os";

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.DASHBOARD);
  }, [setCurrentView]);
  return <Dashboard />;
}

"use client";
import { useNovaView } from "@/contexts";
import { NovaGuide } from "@/features/nova/components/NovaGuide";

export function NovaGuideWrapper() {
  const { currentView } = useNovaView();
  return <NovaGuide currentView={currentView} />;
}

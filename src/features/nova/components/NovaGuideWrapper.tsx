"use client";
import { NovaGuide } from "@/features/nova/components/NovaGuide";
import { useNovaView } from "@/contexts";

export function NovaGuideWrapper() {
  const { currentView } = useNovaView();
  return <NovaGuide currentView={currentView} />;
}

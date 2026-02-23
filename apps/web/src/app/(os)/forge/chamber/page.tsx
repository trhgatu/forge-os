"use client";

import { useNovaView } from "@/contexts";
import { View } from "@/shared/types/os";
import { useEffect } from "react";
import { ForgeChamber } from "@/features/chamber/components/ForgeChamber";

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.FORGE_CHAMBER);
  }, [setCurrentView]);

  return <ForgeChamber />;
}

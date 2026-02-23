"use client";

import { useEffect } from "react";

import { useNovaView } from "@/contexts";
import { ForgeChamber } from "@/features/chamber/components/ForgeChamber";
import { View } from "@/shared/types/os";

export default function Page() {
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.FORGE_CHAMBER);
  }, [setCurrentView]);

  return <ForgeChamber />;
}

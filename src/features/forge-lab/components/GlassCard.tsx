import React from "react";
import { cn } from "@/shared/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  noPadding = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300",
        noPadding ? "" : "p-6",
        onClick && "cursor-pointer hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]",
        className
      )}
    >
      {children}
    </div>
  );
};

import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradient?: boolean;
}

export function GlassCard({ className, children, gradient = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0F]/60 backdrop-blur-xl shadow-2xl",
        gradient &&
        "before:absolute before:inset-0 before:bg-linear-to-br before:from-white/5 before:to-transparent before:pointer-events-none",
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>

      {/* Decorative Grid/Noise (optional subtle texture) */}
      <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
    </div>
  );
}

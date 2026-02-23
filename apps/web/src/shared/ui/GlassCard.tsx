import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  noPadding?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  interactive = false,
  noPadding = false,
}) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-forge-glass backdrop-blur-xl
        border border-forge-border
        shadow-lg
        transition-all duration-300 ease-out
        ${interactive ? "hover:bg-white/5 hover:border-white/20 hover:shadow-xl cursor-pointer group" : ""}
        ${noPadding ? "" : "p-6"}
        ${className}
      `}
    >
      {/* Noise texture overlay could go here */}
      {children}
    </div>
  );
};

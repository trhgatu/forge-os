import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "danger" | "glass";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forge-cyan disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          {
            // Variants
            "bg-forge-cyan text-black hover:bg-forge-cyan/90 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]":
              variant === "default",
            "border border-white/10 bg-transparent hover:bg-white/5 hover:text-white text-gray-300":
              variant === "outline",
            "hover:bg-white/5 hover:text-white text-gray-400": variant === "ghost",
            "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20":
              variant === "danger",
            "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 shadow-lg":
              variant === "glass",

            // Sizes
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        type={type}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };

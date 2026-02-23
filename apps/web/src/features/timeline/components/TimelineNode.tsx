"use client";

import { cn } from "@/shared/lib/utils";
import type { TimelineItem } from "@/shared/types/timeline";

import { TYPE_CONFIG } from "../config";

export default function TimelineNode({
  item,
  isLeft,
  isSelected,
}: {
  item: TimelineItem;
  isLeft: boolean;
  isSelected: boolean;
}) {
  const TypeIcon = TYPE_CONFIG[item.type].icon;
  const typeColor = TYPE_CONFIG[item.type].color;

  return (
    <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
      <div
        className={cn(
          "w-10 h-10 rounded-full border-2 flex items-center justify-center bg-black transition-all duration-500",
          isSelected
            ? "scale-125 border-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            : "border-white/20 hover:border-forge-cyan hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
        )}
      >
        <TypeIcon size={16} className={typeColor} />
      </div>

      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 w-8 h-0.5 bg-linear-to-r from-white/20 to-transparent",
          isLeft ? "-left-8 rotate-180" : "-right-8",
          isSelected ? "from-forge-cyan to-forge-cyan/20" : ""
        )}
      />
    </div>
  );
}

"use client";

import { cn } from "@/shared/lib/utils";
import { TYPE_CONFIG, MOOD_COLORS } from "../config";
import type { TimelineItem } from "@/shared/types/timeline";
import Image from "next/image";

export default function TimelineCard({
    item,
    isLeft,
    isSelected,
    onClick,
}: {
    item: TimelineItem;
    isLeft: boolean;
    isSelected: boolean;
    onClick: () => void;
}) {
    const config = TYPE_CONFIG[item.type];
    const moodGlow = MOOD_COLORS[item.mood];

    return (
        <div
            onClick={onClick}
            className={cn(
                "relative w-[42%] mb-24 cursor-pointer group perspective-1000",
                isLeft ? "mr-auto pr-12 text-right" : "ml-auto pl-12 text-left"
            )}
        >
            <span
                className={cn(
                    "absolute top-3 text-xs font-mono text-gray-500 font-bold tracking-widest w-20",
                    isLeft ? "-right-24 text-left" : "-left-24 text-right"
                )}
            >
                {item.date.toLocaleDateString([], { month: "short", day: "numeric" })}
            </span>

            <div
                className={cn(
                    "relative p-6 rounded-2xl border backdrop-blur-xl transition-all duration-500 ease-spring-out hover:-translate-y-1 hover:scale-[1.02]",
                    isSelected
                        ? cn("bg-white/10 z-10", moodGlow)
                        : "bg-black/40 border-white/5 hover:bg-white/5 hover:border-white/10 shadow-lg"
                )}
            >
                {/* Header type + mood */}
                <div
                    className={cn(
                        "absolute top-4 flex items-center gap-2 text-[10px] uppercase tracking-wider font-mono",
                        isLeft ? "right-6 flex-row-reverse" : "left-6"
                    )}
                >
                    <span className={config.color}>{config.label}</span>
                    {item.mood && (
                        <span className="px-1.5 py-0.5 rounded border border-white/10 text-gray-400">
                            {item.mood}
                        </span>
                    )}
                </div>

                <div
                    className={cn("mt-6 flex flex-col", isLeft ? "items-end" : "items-start")}
                >
                    {/* Memory image */}
                    {item.type === "memory" && item.imageUrl && (
                        <div className="w-full h-32 mb-4 rounded-lg overflow-hidden border border-white/5">
                            <Image
                                fill
                                alt={item.metadata}
                                src={item.imageUrl}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                    )}

                    {/* Quote */}
                    {item.type === "quote" ? (
                        <blockquote
                            className={cn(
                                "font-display text-xl italic text-white mb-2",
                                isLeft ? "text-right" : "text-left"
                            )}
                        >
                            &quot;{item.content}&quot;
                        </blockquote>
                    ) : (
                        <h3 className="font-display font-bold text-lg text-white mb-2">
                            {item.title}
                        </h3>
                    )}

                    {item.type !== "quote" && (
                        <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                            {item.content}
                        </p>
                    )}

                    {item.metadata?.author && (
                        <div className="mt-2 text-xs text-forge-cyan font-mono">
                            — {item.metadata.author}
                        </div>
                    )}

                    {/* Tags */}
                    <div
                        className={cn(
                            "flex flex-wrap gap-2 mt-4",
                            isLeft ? "justify-end" : "justify-start"
                        )}
                    >
                        {item.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

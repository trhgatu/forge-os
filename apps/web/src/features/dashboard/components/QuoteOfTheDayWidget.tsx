"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRandomQuote } from "@/features/quote/services/quoteService";
import { Quote, Sparkles } from "lucide-react";

// Let's assume I will export WidgetShell from Dashboard.tsx for now.
import { WidgetShell } from "./Dashboard";

export const QuoteOfTheDayWidget = () => {
  const { data: quote, isLoading } = useQuery({
    queryKey: ["quote-of-the-day"],
    queryFn: getRandomQuote,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });

  return (
    <WidgetShell
      className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-linear-to-br from-forge-accent/5 to-transparent"
      delay={100}
      title={
        <>
          <Quote size={12} /> Wisdom
        </>
      }
    >
      <div className="h-full flex flex-col justify-center">
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-4 bg-white/10 rounded w-1/2" />
          </div>
        ) : quote ? (
          <>
            <blockquote className="text-xl font-display font-medium text-white leading-relaxed mb-4 line-clamp-3">
              &quot;{quote.text}&quot;
            </blockquote>

            <div className="flex items-center justify-between">
              <cite className="text-sm text-forge-cyan font-mono not-italic">— {quote.author}</cite>

              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-gray-400 capitalize">
                {quote.mood || "Insight"}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5">
              <p className="text-xs text-gray-500 italic flex items-center gap-2">
                <Sparkles size={10} className="text-forge-accent" />
                Daily Wisdom
              </p>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 text-sm">No wisdom found for today.</div>
        )}
      </div>
    </WidgetShell>
  );
};

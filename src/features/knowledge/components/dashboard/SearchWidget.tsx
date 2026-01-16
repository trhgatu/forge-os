"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Loader2, CornerDownLeft, Globe, Sparkles } from "lucide-react";
import { useKnowledge } from "@/contexts"; // Assuming context is available here or adjusting path
import { cn } from "@/shared/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { KnowledgeConcept } from "@/shared/types";
import { GlassCard } from "@/shared/components/ui/GlassCard";

export const SearchWidget: React.FC = () => {
  const { search, searchResults, selectConcept, isLoading, clearResults } = useKnowledge();
  const { language } = useLanguage();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const q = debouncedQuery.trim();

    if (q.length > 1) {
      search(q);
    } else {
      clearResults();
    }
  }, [debouncedQuery, search, clearResults]);

  // Click outside → close dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (concept: KnowledgeConcept) => {
    selectConcept(concept);
    setQuery("");
    setDebouncedQuery("");
    setIsFocused(false);
  };

  const showDropdown = isFocused && (searchResults.length > 0 || isLoading);

  return (
    <div ref={containerRef} className="w-full relative z-50">
      <GlassCard className="p-1 border-white/10 bg-white/5 relative overflow-visible">
        {/* Glow Effect */}
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-r from-forge-cyan/20 via-purple-500/20 to-forge-accent/20 opacity-0 transition-opacity duration-500 rounded-xl",
            isFocused && "opacity-100"
          )}
        />

        <div className="relative flex items-center">
          <div className="pl-4 pr-3 text-gray-500">
            {isLoading ? (
              <Loader2 className="animate-spin text-forge-cyan" size={20} />
            ) : (
              <Search
                size={20}
                className={cn("transition-colors", isFocused ? "text-forge-cyan" : "text-gray-500")}
              />
            )}
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={
              language === "vi"
                ? "Truy cập Mạng lưới Tri thức..."
                : "Access Global Knowledge Grid..."
            }
            className="flex-1 bg-transparent border-none text-white text-lg placeholder-gray-500 focus:outline-none py-3 font-display font-light tracking-wide"
            autoComplete="off"
          />
          {query && (
            <div className="pr-4 hidden md:flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase">
              <span className="bg-white/5 px-2 py-1 rounded border border-white/5 flex items-center gap-1.5">
                <Sparkles size={10} className="text-forge-accent" />
                Query
              </span>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Dropdown Results */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0A0A0F]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto scrollbar-hide z-[60]">
          {isLoading && searchResults.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-500 font-mono flex items-center justify-center gap-3">
              <div className="w-1.5 h-1.5 bg-forge-cyan rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-forge-cyan rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-forge-cyan rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          {searchResults.map((result) => (
            <div
              key={result.id}
              onClick={() => handleSelect(result)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelect(result);
                }
              }}
              role="option"
              aria-selected={false}
              tabIndex={0}
              className="group flex items-start gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/5 cursor-pointer transition-colors focus:bg-white/10 focus:outline-none"
            >
              <div className="mt-1 p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-forge-cyan transition-colors">
                <Globe size={16} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white font-medium group-hover:text-forge-cyan font-display text-base">
                    {result.title}
                  </h3>
                  {result.language && (
                    <span
                      className={cn(
                        "text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider opacity-60",
                        result.language === "vi"
                          ? "bg-red-500/10 text-red-200 border-red-500/20"
                          : "bg-blue-500/10 text-blue-200 border-blue-500/20"
                      )}
                    >
                      {result.language}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {result.summary || "No summary available."}
                </p>
              </div>
              <CornerDownLeft
                size={14}
                className="text-gray-600 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 self-center"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

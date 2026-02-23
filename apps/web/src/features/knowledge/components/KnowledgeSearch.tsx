"use client";

import { Search, Loader2, CornerDownLeft, Globe, Sparkles } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

import { useKnowledge } from "@/contexts";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/shared/lib/utils";
import type { KnowledgeConcept } from "@/shared/types";

export const KnowledgeSearch: React.FC = () => {
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
    <div ref={containerRef} className="w-full max-w-3xl mx-auto flex flex-col relative z-50">
      {/* Search bar */}
      <div className="relative group z-50">
        {/* Glow */}
        <div
          className={cn(
            "absolute -inset-0.5 bg-linear-to-r from-forge-cyan via-purple-500 to-forge-accent rounded-2xl opacity-20 blur-md transition-all",
            isFocused ? "opacity-60 blur-xl" : ""
          )}
        />

        <div
          className={cn(
            "relative bg-[#050508] border transition-all rounded-2xl flex items-center p-2 shadow-2xl",
            isFocused ? "border-forge-cyan/40" : "border-white/10"
          )}
        >
          <div className="pl-4 pr-4 text-gray-500">
            {isLoading ? (
              <Loader2 className="animate-spin text-forge-cyan" size={24} />
            ) : (
              <Search
                size={24}
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
            className="flex-1 bg-transparent border-none text-white text-xl placeholder-gray-600 focus:outline-none py-4 font-display font-light tracking-wide"
            autoComplete="off"
          />

          {query && (
            <div className="pr-4 hidden md:flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase">
              <span className="bg-white/5 px-3 py-1.5 rounded border border-white/5 flex items-center gap-2">
                <Sparkles size={10} className="text-forge-accent" />
                Live Query
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-2 right-2 mt-4 bg-forge-bg/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_100px_rgba(0,0,0,0.8)] overflow-hidden max-h-[60vh] overflow-y-auto scrollbar-hide">
          {isLoading && searchResults.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-500 font-mono flex items-center justify-center gap-3">
              <div className="w-2 h-2 bg-forge-cyan rounded-full animate-ping" />
              <span className="animate-pulse">Synthesizing Results...</span>
            </div>
          )}

          {searchResults.map((result, idx) => (
            <div
              key={result.id}
              onClick={() => handleSelect(result)}
              className="group flex items-start gap-5 p-5 border-b border-white/5 last:border-0 hover:bg-white/3 cursor-pointer transition-all hover:pl-6"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="mt-1 p-3 rounded-xl bg-white/5 text-gray-400 group-hover:text-forge-cyan transition-colors shadow-inner">
                <Globe size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white font-medium group-hover:text-forge-cyan font-display text-lg">
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

                  <CornerDownLeft
                    size={14}
                    className="text-gray-600 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0"
                  />
                </div>

                <p className="text-sm text-gray-500 line-clamp-1">{result.summary || "..."}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

"use client";

import React, { useState } from "react";
import {
  X,
  Sparkles,
  BookOpen,
  ExternalLink,
  Share2,
  Bookmark,
  BrainCircuit,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
import type { KnowledgeConcept } from "@/shared/types";
import { GlassCard } from "@/shared/components/ui/GlassCard";
import Image from "next/image";

interface KnowledgeDetailProps {
  concept: KnowledgeConcept;
  onClose: () => void;
}

export const KnowledgeDetail: React.FC<KnowledgeDetailProps> = ({ concept, onClose }) => {
  const [isSaved, setIsSaved] = useState(false);

  const lastModified = concept.lastModified
    ? new Date(concept.lastModified).toLocaleDateString()
    : null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-0 md:p-6 animate-in fade-in duration-500">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      {/* MAIN CONTAINER */}
      <div className="relative w-full max-w-6xl h-full md:h-[90vh] overflow-hidden rounded-none md:rounded-3xl bg-[#050508] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row">
        {/* MOBILE CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 text-white md:hidden backdrop-blur-md border border-white/10"
        >
          <X size={20} />
        </button>

        {/* LEFT COLUMN */}
        <div className="flex-1 flex flex-col h-full relative overflow-y-auto scrollbar-hide">
          {/* HERO IMAGE */}
          <div className="relative w-full min-h-[300px] md:min-h-[400px] shrink-0">
            {concept.imageUrl ? (
              <>
                <Image
                  fill
                  src={concept.imageUrl}
                  alt={concept.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#050508] via-[#050508]/60 to-transparent" />
              </>
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-indigo-900/20 via-black to-[#050508] flex items-center justify-center">
                <BookOpen size={64} className="text-white/10" />
              </div>
            )}

            {/* Title */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-300 mb-4 backdrop-blur-md">
                <Layers size={12} /> Knowledge Node
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight drop-shadow-2xl mb-4">
                {concept.title}
              </h1>

              {lastModified && (
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <Calendar size={12} /> Last updated: {lastModified}
                </div>
              )}
            </div>
          </div>

          {/* CONTENT */}
          <div className="px-8 md:px-12 pb-24 pt-8">
            <div
              className="prose prose-invert prose-lg max-w-3xl font-serif leading-loose text-gray-200
                prose-headings:font-display prose-headings:font-bold prose-headings:text-white
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2
                prose-h3:text-xl prose-h3:text-gray-100 prose-h3:mt-8
                prose-p:mb-6 prose-p:text-lg prose-p:leading-8 prose-p:text-gray-200
                prose-a:text-forge-cyan prose-a:no-underline hover:prose-a:underline
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:mb-2 prose-li:text-gray-200
                prose-blockquote:border-l-4 prose-blockquote:border-forge-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-white/[0.03] prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-300
                prose-strong:text-white prose-strong:font-semibold"
              dangerouslySetInnerHTML={{
                __html: concept.content ?? concept.extract ?? "",
              }}
            />
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="hidden md:flex w-[380px] bg-black/40 border-l border-white/5 flex-col backdrop-blur-xl relative">
          {/* Actions */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
            <div className="flex gap-2">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={cn(
                  "p-2 rounded-lg transition-colors border",
                  isSaved
                    ? "bg-forge-accent border-forge-accent text-white"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                )}
              >
                <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
              </button>

              <a
                href={concept.url}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              >
                <ExternalLink size={18} />
              </a>

              <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white">
                <Share2 size={18} />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Reflection */}
            <div className="relative p-6 rounded-2xl bg-linear-to-br from-forge-accent/10 to-transparent border border-forge-accent/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-forge-accent/20 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-bold text-forge-accent uppercase tracking-widest mb-3">
                  <Sparkles size={14} /> Nova Reflection
                </div>
                <p className="text-base text-white font-light italic leading-relaxed font-serif">
                  &quot;{concept.reflection}&quot;
                </p>
              </div>
            </div>

            {/* Insights */}
            {concept.insights && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <BrainCircuit size={14} /> Key Extractions
                </h3>

                <div className="space-y-3">
                  {concept.insights.map((insight, i) => (
                    <GlassCard
                      key={i}
                      className="p-4 bg-white/2 border-white/5 hover:bg-white/4"
                      noPadding
                    >
                      <div className="flex gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-forge-cyan shadow-[0_0_5px_#22D3EE]" />
                        <p className="text-sm text-gray-300 leading-relaxed font-light">
                          {insight}
                        </p>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {concept.metadata?.categories && (
              <div>
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
                  Categories
                </h3>

                <div className="flex flex-wrap gap-2">
                  {concept.metadata.categories.map((cat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-400 hover:text-white hover:border-white/20"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Source */}
            <a
              href={concept.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 group"
            >
              <span className="text-xs text-gray-500 group-hover:text-gray-300">View Source</span>
              <ArrowUpRight size={14} className="text-gray-600 group-hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

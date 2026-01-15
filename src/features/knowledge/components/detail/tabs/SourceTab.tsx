import React from "react";
import { BookOpen, Calendar, Layers, Sparkles, BrainCircuit, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { KnowledgeConcept } from "@/shared/types";
import { GlassCard } from "@/shared/components/ui/GlassCard";

interface SourceTabProps {
  concept: KnowledgeConcept;
}

export const SourceTab: React.FC<SourceTabProps> = ({ concept }) => {
  const lastModified = concept.lastModified
    ? new Date(concept.lastModified).toLocaleDateString()
    : null;

  return (
    <div className="flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* LEFT COLUMN: Main Content */}
      <div className="flex-1 space-y-6">
        {/* HERO IMAGE SECTION */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden border border-white/10 group">
          {concept.imageUrl ? (
            <>
              <Image
                fill
                src={concept.imageUrl}
                alt={concept.title}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-[#050508] flex items-center justify-center">
              <BookOpen size={64} className="text-white/10" />
            </div>
          )}

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-300 mb-4 backdrop-blur-md">
              <Layers size={12} /> Knowledge Source
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

        {/* CONTENT TEXT */}
        <div className="px-4 md:px-0">
          <div
            className="prose prose-invert prose-lg max-w-none font-serif leading-loose text-gray-200
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

      {/* RIGHT SIDEBAR: Metadata & Insights */}
      <div className="w-full md:w-[350px] space-y-6 shrink-0">
        {/* Reflection */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-forge-accent/10 to-transparent border border-forge-accent/20 overflow-hidden">
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
          <GlassCard>
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <BrainCircuit size={14} /> Key Extractions
            </h3>
            <div className="space-y-3">
              {concept.insights.map((insight, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-forge-cyan shadow-[0_0_5px_#22D3EE] shrink-0" />
                    <p className="text-sm text-gray-300 leading-relaxed font-light">{insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Categories */}
        {concept.metadata?.categories && (
          <GlassCard>
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {concept.metadata.categories.map((cat, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                >
                  {cat}
                </span>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Source Link */}
        <a
          href={concept.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 group transition-all"
        >
          <span className="text-xs text-gray-500 group-hover:text-gray-300">
            View Original Source
          </span>
          <ArrowUpRight size={14} className="text-gray-600 group-hover:text-white" />
        </a>
      </div>
    </div>
  );
};

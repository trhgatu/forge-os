import React from "react";
import { Book, Search, ArrowRight, Bookmark, Plus, Users } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Foundation } from "../types";
import { FoundationDetail } from "./FoundationDetail";
import { cn } from "@/shared/lib/utils";

interface FoundationLibraryProps {
  foundations: Foundation[];
  activeFoundation: Foundation | null;
  setActiveFoundation: (foundation: Foundation | null) => void;
}

export const FoundationLibrary: React.FC<FoundationLibraryProps> = ({
  foundations,
  activeFoundation,
  setActiveFoundation,
}) => {
  if (activeFoundation) {
    return (
      <FoundationDetail foundation={activeFoundation} onBack={() => setActiveFoundation(null)} />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 pb-32 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Foundation Library</h1>
          <p className="text-gray-400 font-light">Codified knowledge and recurring patterns.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search foundations..."
              className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 w-full md:w-64 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar / Categories */}
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
              Categories
            </h3>
            <div className="space-y-1">
              {["All Foundations", "Frameworks", "Guides", "Technical", "Philosophy"].map(
                (cat, i) => (
                  <button
                    key={cat}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${i === 0 ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                  >
                    {cat}
                    {i === 0 && (
                      <span className="text-[10px] bg-white/20 px-1.5 rounded text-white">
                        {foundations.length}
                      </span>
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {foundations.map((doc) => (
            <GlassCard
              key={doc.id}
              className="group hover:border-white/20 cursor-pointer flex flex-col"
              noPadding
              onClick={() => setActiveFoundation(doc)}
            >
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-fuchsia-500/10 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors">
                      <Book size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-fuchsia-300 transition-colors line-clamp-1">
                        {doc.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 font-mono uppercase">
                          {doc.type}
                        </span>
                        {doc.status && (
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              doc.status === "stable" ? "bg-emerald-500" : "bg-amber-500"
                            )}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <Bookmark
                    size={16}
                    className="text-gray-600 hover:text-white transition-colors"
                  />
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 mb-4 h-10">{doc.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    {doc.metrics?.usageCount && <Users size={10} />}
                    {doc.updatedAt.toLocaleDateString()}
                  </span>
                  <button className="flex items-center gap-1 text-xs text-fuchsia-400 hover:text-white transition-colors">
                    Read <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}

          {/* Add New Placeholders */}
          <button className="border border-dashed border-white/10 rounded-2xl flex items-center justify-center p-6 hover:bg-white/5 hover:border-white/20 transition-all text-gray-500 hover:text-white group gap-2 min-h-[180px]">
            <Plus size={20} />
            <span className="font-medium">Add New Foundation</span>
          </button>
        </div>
      </div>
    </div>
  );
};

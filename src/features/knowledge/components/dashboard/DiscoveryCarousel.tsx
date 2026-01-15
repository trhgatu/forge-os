"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RefreshCcw } from "lucide-react";
import { GlassCard } from "@/shared/components/ui/GlassCard";

import { useKnowledge } from "@/contexts";

export const DiscoveryCarousel: React.FC = () => {
  const { discoveryItems, loadDiscovery, selectConcept, isLoading } = useKnowledge();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    loadDiscovery();
  }, [loadDiscovery]);

  useEffect(() => {
    if (discoveryItems.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % discoveryItems.length);
    }, 8000); // Rotate every 8s
    return () => clearInterval(interval);
  }, [discoveryItems]);

  const currentItem = discoveryItems[index];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % discoveryItems.length);
  };

  if (!currentItem && isLoading) {
    return (
      <GlassCard className="w-full h-[280px] relative overflow-hidden bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-white/5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <Sparkles className="text-forge-cyan" size={32} />
          <span className="text-xs text-gray-400 font-mono">Synthesizing Discovery...</span>
        </div>
      </GlassCard>
    );
  }

  if (!currentItem) return null;

  return (
    <GlassCard
      onClick={() => selectConcept(currentItem)}
      className="w-full h-[280px] p-0 relative overflow-hidden border-white/5 group flex flex-col cursor-pointer"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          {/* Abstract generated background based on ID/Title hash-like effect could go here */}
          {/* For now use a dynamic gradient based on index */}
          <div
            className="absolute inset-0 opacity-40 bg-cover bg-center transition-transform duration-[10s] ease-linear scale-110 group-hover:scale-125"
            style={{
              backgroundImage: `url(https://source.unsplash.com/random/800x400?abstract,technology,${index})`,
              background: `linear-gradient(to bottom right, ${
                ["#4f46e5", "#8b5cf6", "#ec4899", "#06b6d4"][index % 4]
              }33, #000000)`,
            }}
          />
          {/* Noise overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
        <div className="flex items-start justify-between">
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80 uppercase tracking-widest">
            <Sparkles size={10} className="text-yellow-400" />
            Discovery Mode
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <RefreshCcw size={14} />
          </button>
        </div>

        <div className="mt-auto max-w-xl relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight drop-shadow-lg line-clamp-1">
                {currentItem.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-6 max-w-md h-[3rem]">
                {currentItem.extract ||
                  "Click to unfold the details of this concept and integrate it into your knowledge graph."}
              </p>

              <div className="flex items-center gap-2 text-forge-cyan text-xs font-bold uppercase tracking-wider group-hover:gap-4 transition-all duration-300">
                Explore Entity <ArrowRight size={14} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <motion.div
          key={index}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 8, ease: "linear" }}
          className="h-full bg-forge-cyan/50"
        />
      </div>
    </GlassCard>
  );
};

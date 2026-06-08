'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useKnowledge } from '@/contexts';
import { useLanguage } from '@/contexts/LanguageContext';
import { WidgetShell, Tag, Skeleton } from '@/shared/components/ui';

export const DiscoveryCarousel: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const { discoveryItems, loadDiscovery, selectConcept, isLoading } = useKnowledge();
  const [index, setIndex] = useState(0);

  const [prevItems, setPrevItems] = useState(discoveryItems);

  if (discoveryItems !== prevItems) {
    setPrevItems(discoveryItems);
    setIndex(0);
  }

  useEffect(() => {
    loadDiscovery();
  }, [loadDiscovery]);

  useEffect(() => {
    if (discoveryItems.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % discoveryItems.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [discoveryItems]);

  const currentItem = discoveryItems[index];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % discoveryItems.length);
  };

  if (!currentItem && isLoading) {
    return (
      <Skeleton variant="glowing" className="w-full h-[280px] flex flex-col items-center justify-center gap-3">
        <Sparkles className="text-forge-cyan animate-pulse" size={32} />
        <span className="text-xs text-gray-400 font-mono">{t('knowledge.forging')}</span>
      </Skeleton>
    );
  }

  if (!currentItem) return null;

  return (
    <WidgetShell
      onClick={() => router.push(`/forge/knowledge/nexus/${encodeURIComponent(currentItem.title)}?tab=source`)}
      className="w-full h-[280px] cursor-pointer"
      noPadding={true}
      glowColor="forge-cyan"
      topGlowColor="via-forge-cyan/30"
    >

      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          {currentItem.imageUrl && (
            <>
              {/* Cover Image on the right half */}
              <div 
                className="absolute inset-y-0 right-0 w-[50%] bg-cover bg-center transition-transform duration-[10s] ease-linear scale-100 group-hover:scale-105 pointer-events-none opacity-40"
                style={{ backgroundImage: `url(${currentItem.imageUrl})` }}
              />
              {/* Gradient Mask to fade to the black/glass dashboard on the left */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
        <div className="flex items-start justify-between">
          <Tag variant="accent" size="sm" className="bg-white/5 border-white/5 backdrop-blur-md font-mono text-white/80 select-none py-1 px-3">
            <Sparkles size={10} className="text-yellow-400 mr-1.5" />
            {t('knowledge.discovery_mode')}
          </Tag>

          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-forge-cyan/40 hover:shadow-[0_0_12px_rgba(34,211,238,0.15)] text-gray-400 hover:text-white transition-all active:scale-95 z-20 cursor-pointer group/btn"
            title="Next Discovery"
          >
            <RefreshCcw size={14} className="group-hover/btn:rotate-180 transition-transform duration-500 text-gray-400 group-hover/btn:text-forge-cyan" />
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
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight drop-shadow-xl line-clamp-1 group-hover:text-forge-cyan transition-colors duration-300">
                {currentItem.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-6 max-w-md h-[3rem] font-light leading-relaxed">
                {currentItem.extract || t('knowledge.explore_desc')}
              </p>

              <div className="inline-flex items-center gap-2 text-forge-cyan text-xs font-bold uppercase tracking-wider group-hover:gap-4 transition-all duration-300">
                {t('knowledge.explore_entity')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1">
        <motion.div
          key={index}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 8, ease: 'linear' }}
          className="h-full bg-forge-cyan/50"
        />
      </div>
    </WidgetShell>
  );
};



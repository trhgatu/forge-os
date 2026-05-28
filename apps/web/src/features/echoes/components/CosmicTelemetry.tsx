'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Cpu } from 'lucide-react';
import React from 'react';

interface FlowMoment {
  id: string;
  time: string;
  fileName: string;
  gitBranch: string;
  cpuLoad: number;
  coordinates: { x: number; y: number };
}

interface CosmicTelemetryProps {
  lastLoggedMoment: FlowMoment | null;
  flowSeconds: number;
  isAudioEnabled: boolean;
  language: 'vi' | 'en';
  formatFlowTime: (secs: number) => string;
}

export const CosmicTelemetry: React.FC<CosmicTelemetryProps> = ({
  lastLoggedMoment,
  flowSeconds,
  isAudioEnabled,
  language,
  formatFlowTime,
}) => {
  return (
    <div className="absolute top-24 right-8 space-y-2 bg-transparent max-w-sm pointer-events-auto text-right flex flex-col items-end z-20">
      <h3 className="text-[8px] font-mono text-gray-500 uppercase tracking-[0.35em] font-bold flex items-center justify-end gap-1.5">
        <span>[ Cosmic Telemetry ]</span>
      </h3>

      <div className="min-h-[70px] flex flex-col justify-center items-end">
        <AnimatePresence mode="wait">
          {lastLoggedMoment ? (
            <motion.div
              key={lastLoggedMoment.id}
              initial={{ opacity: 0, x: 3 }}
              animate={{ opacity: 0.65, x: 0 }}
              exit={{ opacity: 0, x: -3 }}
              className="space-y-1.5 flex flex-col items-end"
            >
              <p className="text-[10px] text-gray-400 italic leading-normal font-light text-right max-w-xs">
                {language === 'vi'
                  ? '"Đồng điệu được kích hoạt thành công. Ngôi sao đã gắn kết vào mạng lưới."'
                  : '"Synchronicity successfully anchored. A new star is woven into your web."'}
              </p>

              <div className="flex flex-col gap-y-1 text-[8.5px] font-mono text-gray-500 mt-2 items-end">
                <span className="flex items-center justify-end gap-1.5">
                  <span>PATH // {(lastLoggedMoment.fileName || 'unknown')}::{(lastLoggedMoment.gitBranch?.slice(0, 15) || 'main')}</span>
                  <GitBranch size={9} className="text-gray-600" />
                </span>
                <span className="flex items-center justify-end gap-1.5">
                  <span>ZENITH TIME // {formatFlowTime(flowSeconds)} [Active Focus]</span>
                  <span className="w-2.5 h-2.5 rounded-full border border-gray-600 flex items-center justify-center text-[7px] font-bold">⏱</span>
                </span>
                <span className="flex items-center justify-end gap-1.5">
                  <span>RESONANCE // {isAudioEnabled ? 'Solfeggio 528Hz [Deep Focus]' : 'Silence [Vipassana Meditation]'}</span>
                  <span className="w-2.5 h-2.5 rounded-full border border-gray-600 flex items-center justify-center text-[7px] font-bold">♫</span>
                </span>
                <span className="flex items-center justify-end gap-1.5">
                  <span>SYSTEM LOAD // {lastLoggedMoment.cpuLoad}% CPU [Cold Run]</span>
                  <Cpu size={9} className="text-gray-600" />
                </span>
              </div>
            </motion.div>
          ) : (
            <p className="text-[9.5px] text-gray-500 italic font-light text-right">
              {language === 'vi'
                ? '// Hơi thở tinh vân lam ngọc đang phập phồng. Vũ trụ lờ lững trôi.'
                : '// Nebula breathes sapphire stardust. The cosmos drifts in alignment.'}
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

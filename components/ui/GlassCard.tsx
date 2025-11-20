import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  intensity?: 'low' | 'medium' | 'high';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  intensity = 'medium'
}) => {

  const bgOpacity = {
    low: 'bg-slate-900/30',
    medium: 'bg-slate-900/50',
    high: 'bg-slate-900/80'
  };

  const borderOpacity = {
    low: 'border-white/5',
    medium: 'border-white/10',
    high: 'border-white/15'
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -2, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={`
        relative backdrop-blur-xl rounded-2xl border
        shadow-lg shadow-black/20
        ${bgOpacity[intensity]}
        ${borderOpacity[intensity]}
        ${hoverEffect ? 'cursor-pointer hover:shadow-cyan-900/20 hover:border-white/20' : ''}
        ${className}
      `}
    >
      <div className="absolute inset-0 rounded-2xl opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
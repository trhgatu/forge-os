'use client';

import { Network, Share2, Brain, Sparkles, Loader2, Link2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button, EmptyState } from '@/shared/components/ui';
import { GlassCard } from '@/shared/components/ui/GlassCard';
import { cn } from '@/shared/lib/utils';
import type { KnowledgeConcept } from '@/shared/types';
import { forgeToast } from '@/shared/lib/toast';

interface NexusTabProps {
  concept: KnowledgeConcept;
}

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  type: string;
}

export const NexusTab: React.FC<NexusTabProps> = ({ concept }) => {
  const { t, language } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Generate nodes coordinates based on layout
  const width = 800;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;

  const categories = concept.metadata?.categories || [];
  const relatedLabels = [
    categories[0] || (language === 'vi' ? 'Học thuyết Stoic' : 'Stoic Doctrine'),
    categories[1] || (language === 'vi' ? 'Ý thức Hệ' : 'Cognitive Grid'),
    language === 'vi' ? 'Luyện Trí Nhớ' : 'Memory Forge',
    language === 'vi' ? 'Lực Phản Hồi' : 'Sensory Resonance',
    language === 'vi' ? 'Trục Nhận Thức' : 'Awareness Vector',
  ];

  const nodes: Node[] = [
    { id: 'center', label: concept.title, x: centerX, y: centerY, color: '#22d3ee', type: 'core' },
    { id: 'node1', label: relatedLabels[0], x: centerX - 220, y: centerY - 100, color: '#06b6d4', type: 'category' },
    { id: 'node2', label: relatedLabels[1], x: centerX + 220, y: centerY - 110, color: '#f43f5e', type: 'category' },
    { id: 'node3', label: relatedLabels[2], x: centerX - 180, y: centerY + 130, color: '#10b981', type: 'system' },
    { id: 'node4', label: relatedLabels[3], x: centerX + 180, y: centerY + 140, color: '#eab308', type: 'system' },
    { id: 'node5', label: relatedLabels[4], x: centerX, y: centerY - 180, color: '#3b82f6', type: 'stat' },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      forgeToast.system(
        language === 'vi' ? 'KẾT NỐI SYNAPSE HOÀN TẤT' : 'SYNAPSE CONNECTIONS MAP COMPLETED',
        language === 'vi' ? 'Lập bản đồ tri thức tối ưu thành công.' : 'Optimized cognitive lore graph mapping.'
      );
    }, 1800);
  };

  const handleNodeClick = (node: Node) => {
    if (node.id === 'center') return;
    forgeToast.system('SYNAPSE PATHWAY', `Navigating path to: ${node.label}`);
  };

  if (!isGenerated) {
    return (
      <div className="min-h-[600px] flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
        {/* Abstract cyber background lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.03),transparent_60%)] pointer-events-none" />
        
        {isGenerating ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-forge-cyan/20 blur-xl animate-pulse" />
              <Loader2 size={48} className="text-forge-cyan animate-spin relative z-10" />
            </div>
            <p className="text-xs font-mono tracking-widest text-forge-cyan uppercase animate-pulse">
              {language === 'vi' ? 'Đang liên kết các sợi synapse tri thức...' : 'Aligning cognitive lore synapses...'}
            </p>
          </div>
        ) : (
          <EmptyState
            icon={<Network size={32} className="text-forge-cyan animate-pulse" />}
            title={t('knowledge.nexus_title')}
            description={t('knowledge.nexus_desc')}
            glowColor="cyan"
            size="lg"
            className="max-w-lg mx-auto bg-transparent border border-white/5 backdrop-blur-sm p-8 rounded-[32px]"
          >
            <Button 
              onClick={handleGenerate}
              variant="default"
              size="lg"
              className="flex items-center gap-2"
            >
              <Share2 size={16} />
              <span>{t('knowledge.generate_graph')}</span>
            </Button>
          </EmptyState>
        )}
      </div>
    );
  }

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 min-h-[600px] flex flex-col gap-6">
      <GlassCard className="flex-1 bg-[#050508]/80 border-forge-cyan/10 p-0 relative overflow-hidden flex flex-col items-center">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        {/* Title Overlay */}
        <div className="absolute top-4 left-6 z-10 flex items-center gap-2">
          <Brain size={16} className="text-forge-cyan animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">
            {language === 'vi' ? 'MẠNG LƯỚI THẦN KINH KỶ NGUYÊN' : 'COGNITIVE LORE NETWORK SYNAPSE'}
          </span>
        </div>

        {/* SVG Network Canvas */}
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full max-w-[900px] aspect-[8/5] z-10 select-none my-auto"
        >
          {/* Defs for gradients & filters */}
          <defs>
            <radialGradient id="glow-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
            
            {/* Soft filter for nodes */}
            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection Lines (Synaptic Paths) */}
          {nodes.map((n) => {
            if (n.id === 'center') return null;
            const isHovered = hoveredNode === n.id || hoveredNode === 'center';
            return (
              <g key={`line-${n.id}`}>
                {/* Outer soft glowing line path */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={n.x}
                  y2={n.y}
                  stroke={n.color}
                  strokeWidth={isHovered ? 4 : 1.5}
                  strokeOpacity={isHovered ? 0.6 : 0.25}
                  className="transition-all duration-300"
                />
                
                {/* Pulsing Energy Dash Line */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={n.x}
                  y2={n.y}
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  strokeOpacity={isHovered ? 0.9 : 0.4}
                  strokeDasharray="6 25"
                  className="animate-[dash_10s_linear_infinite]"
                  style={{
                    animationPlayState: isHovered ? 'running' : 'paused',
                  }}
                />
              </g>
            );
          })}

          {/* Central concept halo glow */}
          <circle
            cx={centerX}
            cy={centerY}
            r="110"
            fill="url(#glow-grad)"
            className="animate-pulse"
          />

          {/* Render Nodes */}
          {nodes.map((n) => {
            const isCenter = n.id === 'center';
            const isHovered = hoveredNode === n.id;
            const size = isCenter ? 44 : 20;

            return (
              <g
                key={n.id}
                transform={`translate(${n.x}, ${n.y})`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode(n.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(n)}
              >
                {/* Node Outer Ring Ring Glow */}
                <circle
                  r={size + (isHovered ? 8 : 4)}
                  fill="none"
                  stroke={n.color}
                  strokeWidth="1.5"
                  strokeOpacity={isHovered ? 0.8 : 0.3}
                  className="transition-all duration-300 ease-out"
                  strokeDasharray={isCenter ? "5 3" : undefined}
                />

                {/* Node Main Circle Body */}
                <circle
                  r={size}
                  fill="#09090b"
                  stroke={n.color}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="transition-all duration-300 shadow-xl"
                  filter={isHovered ? 'url(#neon-glow)' : undefined}
                />

                {/* Inner Icon or Dot */}
                {isCenter ? (
                  <g transform="translate(-10, -10)">
                    <Brain size={20} className="text-forge-cyan animate-pulse" />
                  </g>
                ) : (
                  <circle
                    r="4"
                    fill={n.color}
                    className="group-hover:scale-125 transition-transform duration-300"
                  />
                )}

                {/* Label Overlay Text */}
                <foreignObject
                  x="-120"
                  y={size + 10}
                  width="240"
                  height="45"
                  className="overflow-visible pointer-events-none"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <span 
                      className={cn(
                        "text-xs px-2.5 py-1 rounded-lg backdrop-blur-md transition-all duration-300 font-medium",
                        isCenter 
                          ? "bg-cyan-950/40 text-cyan-200 border border-forge-cyan/20 text-sm font-bold tracking-wide" 
                          : "bg-black/60 text-gray-300 border border-white/5",
                        isHovered && "scale-105 border-forge-cyan/30 text-white font-semibold"
                      )}
                      style={isHovered ? { textShadow: `0 0 8px ${n.color}` } : undefined}
                    >
                      {n.label}
                    </span>
                    {!isCenter && (
                      <span className="text-[9px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 uppercase">
                        {n.type === 'category' ? 'Category Node' : 'Cognitive Stat'}
                      </span>
                    )}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* CSS Animation Keyframes Inject */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes dash {
            to {
              stroke-dashoffset: -300;
            }
          }
        `}} />
      </GlassCard>
    </div>
  );
};

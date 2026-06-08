'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  GitBranch,
  Network,
  Cpu,
  Layers,
  Database,
  ArrowUpRight,
  TrendingUp,
  Search,
  X,
  Plus,
  GitFork,
  Radio,
  FileCode2,
} from 'lucide-react';
import React, { useState } from 'react';

import { useLanguage } from '@/contexts';
import { Button, Input, Label, Tag } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

// --- Types & Interfaces ---

interface SubNode {
  id: string;
  title: string;
  desc: string;
  status: 'completed' | 'active' | 'pending';
}

interface ResearchTrail {
  id: string;
  title: string;
  category: 'ai' | 'architecture' | 'database' | 'audio';
  progress: number;
  updatedAt: string;
  nodesCount: number;
  status: 'active' | 'completed' | 'draft';
  desc: { en: string; vi: string };
  difficulty: 'low' | 'medium' | 'high';
  githubLink?: string;
  nodes: SubNode[];
}

const CATEGORIES = {
  all: { en: 'All Modules', vi: 'Tất Cả' },
  ai: { en: 'AI & Cognition', vi: 'Trí Tuệ Nhân Tạo' },
  architecture: { en: 'System Architecture', vi: 'Kiến Trúc Hệ Thống' },
  database: { en: 'Data Systems', vi: 'Hệ Thống Dữ Liệu' },
  audio: { en: 'Acoustic Engines', vi: 'Động Cơ Âm Thanh' },
};

export const ResearchTrails: React.FC = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<keyof typeof CATEGORIES>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrail, setSelectedTrail] = useState<ResearchTrail | null>(null);

  // --- Mock Research Trails Data (100% Software Centric) ---
  const RESEARCH_TRAILS: ResearchTrail[] = [
    {
      id: 'ai-cognition',
      title: 'AI Cognition Core',
      category: 'ai',
      progress: 75,
      updatedAt: '2026-05-26',
      nodesCount: 12,
      status: 'active',
      difficulty: 'high',
      desc: {
        en: 'Integrating advanced LLM context window compression, semantic vector caching, and autonomous cognitive routing pipelines for chamber agents.',
        vi: 'Tích hợp nén cửa sổ ngữ cảnh LLM nâng cao, bộ đệm vector ngữ nghĩa và các đường ống định tuyến nhận thức tự trị cho hệ thống đặc vụ.',
      },
      githubLink: 'https://github.com/thuyencode/forge-os/tree/main/apps/api/src/contexts/nova',
      nodes: [
        { id: '1-1', title: 'Context Window Compression', desc: 'Implementing summarizing middleware for historical chat buffers.', status: 'completed' },
        { id: '1-2', title: 'Vector Indexing (pgvector)', desc: 'Setting up semantic search over personal memories and journals.', status: 'completed' },
        { id: '1-3', title: 'Cognitive Routing Engine', desc: 'Routing inquiries dynamically between Socrates, Nexus, and Muse agents.', status: 'active' },
        { id: '1-4', title: 'Real-time Voice Synthesis Sync', desc: 'Syncing generated text tokens directly to audio chunk packets.', status: 'pending' },
      ],
    },
    {
      id: 'dist-sync',
      title: 'CRDT Distributed Storage',
      category: 'database',
      progress: 40,
      updatedAt: '2026-05-25',
      nodesCount: 8,
      status: 'draft',
      difficulty: 'high',
      desc: {
        en: 'Implementing Conflict-free Replicated Data Types (CRDTs) to sync local IndexedDB storage with the NestJS PostgreSQL server without master conflicts.',
        vi: 'Triển khai thuật toán đồng bộ dữ liệu phi xung đột (CRDT) để đồng bộ hóa bộ lưu trữ IndexedDB cục bộ với PostgreSQL server của NestJS.',
      },
      githubLink: 'https://github.com/thuyencode/forge-os/tree/main/packages/core',
      nodes: [
        { id: '2-1', title: 'IndexedDB Offline Cache Layer', desc: 'Wrapping local storage with dynamic transactional read-writes.', status: 'completed' },
        { id: '2-2', title: 'Yjs/Automerge Core Integration', desc: 'Integrating Automerge document structures for collaborative JSON nodes.', status: 'active' },
        { id: '2-3', title: 'Websocket Sync Protocol', desc: 'Designing heartbeat and binary payload sync frames over gateway.', status: 'active' },
        { id: '2-4', title: 'Multi-device Conflict Resolution', desc: 'Testing network partitions and edge-case resolution matrix.', status: 'pending' },
      ],
    },
    {
      id: 'acoustic-engine',
      title: 'Acoustic Synthesizer v2',
      category: 'audio',
      progress: 100,
      updatedAt: '2026-05-26',
      nodesCount: 5,
      status: 'completed',
      difficulty: 'medium',
      desc: {
        en: 'A high-performance browser synthesizer using pure Web Audio API oscillators to generate real-time ambient focus frequencies and audio UI triggers.',
        vi: 'Bộ tổng hợp âm thanh hiệu suất cao sử dụng bộ dao động Web Audio API thuần túy để tạo tần số ambient tĩnh tâm và phản hồi âm thanh giao diện.',
      },
      nodes: [
        { id: '3-1', title: 'Oscillator Chain Routing', desc: 'Wiring sine, triangle, and sawtooth oscillators to master dynamic compressor.', status: 'completed' },
        { id: '3-2', title: 'ADSR Envelope Shaper', desc: 'Designing Attack-Decay-Sustain-Release envelopes for smooth spatial plucks.', status: 'completed' },
        { id: '3-3', title: 'Binaural Beat Generator', desc: 'Generating slightly offset stereo frequencies (e.g., 40Hz) to promote deep work flow.', status: 'completed' },
      ],
    },
    {
      id: 'clean-architecture-review',
      title: 'NestJS CQRS Framework',
      category: 'architecture',
      progress: 90,
      updatedAt: '2026-05-24',
      nodesCount: 15,
      status: 'completed',
      difficulty: 'medium',
      desc: {
        en: 'Establishing the architectural codebase foundation using NestJS command/query separation, strict DDD boundary validation, and audit logging layers.',
        vi: 'Thiết lập nền tảng kiến trúc mã nguồn NestJS tách biệt hoàn chỉnh Command/Query (CQRS), kiểm định ranh giới DDD nghiêm ngặt và phân lớp ghi nhật ký.',
      },
      githubLink: 'https://github.com/thuyencode/forge-os/tree/main/apps/api',
      nodes: [
        { id: '4-1', title: 'Domain Schema Definitions', desc: 'Configuring custom prisma domain schema and mapped relational tables.', status: 'completed' },
        { id: '4-2', title: 'CQRS Command/Query Buses', desc: 'Wiring NestJS standard CommandBus/QueryBus with custom transaction handlers.', status: 'completed' },
        { id: '4-3', title: 'Interceptors & Audit Logging', desc: 'Intercepting state mutations to create write logs into DB audit collections.', status: 'completed' },
        { id: '4-4', title: 'Custom DTO & Mapper Pipelines', desc: 'Validating boundary parameters with customized ClassValidator rules.', status: 'active' },
      ],
    },
    {
      id: 'neural-memory-indexing',
      title: 'Semantic Memory Engine',
      category: 'ai',
      progress: 60,
      updatedAt: '2026-05-20',
      nodesCount: 7,
      status: 'active',
      difficulty: 'high',
      desc: {
        en: 'Designing a dynamic caching layer inside Redis and memory graphs that maps key cognitive entities (Memories, Moods, Projects) to provide instant AI recall.',
        vi: 'Kiến thiết lớp đệm hiệu năng cao trên Redis và đồ thị bộ nhớ giúp kết nối các thực thể nhận thức (Ký ức, Cảm xúc, Dự án) để đặc vụ AI truy hồi tức thì.',
      },
      nodes: [
        { id: '5-1', title: 'Redis Cache Serialization', desc: 'Serializing nesting JSON configurations with specific TTL matrices.', status: 'completed' },
        { id: '5-2', title: 'Memory Linkage Mapping', desc: 'Linking journals directly to related project nodes using metadata mapping.', status: 'active' },
        { id: '5-3', title: 'Dynamic Recency-Relevance Weighting', desc: 'Tuning recall algorithms based on frequency and emotional intensity.', status: 'pending' },
      ],
    },
  ];

  // --- Filtering & Searching Logic ---
  const filteredTrails = RESEARCH_TRAILS.filter((trail) => {
    const matchesCategory = activeCategory === 'all' || trail.category === activeCategory;
    const matchesSearch =
      trail.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.desc.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.desc.vi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-[1600px] mx-auto p-6 md:p-10 pb-32 space-y-8 animate-in fade-in duration-500">
      {/* Title Block - Synchronized Alchemical Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          {/* Ethereal label */}
          <div className="mb-3 flex items-center gap-2 opacity-85">
            <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
            <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase flex items-center gap-1.5">
              <Network size={10} className="text-forge-cyan" /> System Operations
            </Label>
          </div>

          {/* Poetic Title */}
          <Label variant="default" className="text-4xl font-bold text-white tracking-tight block capitalize mb-2">
            {language === 'vi' ? 'Sơ Đồ Nghiên Cứu' : 'Research Trails'}
          </Label>

          {/* Flowing Subtitle */}
          <p className="text-sm text-gray-400 font-light max-w-xl">
            {language === 'vi'
              ? 'Kiến thiết bản đồ nghiên cứu công nghệ, cấu trúc thuật toán và kiến trúc hệ thống cốt lõi của Forge OS.'
              : 'Map out active software research tracks, algorithmic nodes, and structural blueprints for the core operating system.'}
          </p>
        </div>

        {/* Search */}
        <Input
          placeholder={language === 'vi' ? 'Tìm kiếm luồng nghiên cứu...' : 'Search research trails...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search size={14} />}
          className="bg-black/40 text-xs h-10 border-white/10 w-full md:w-80"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2.5 border-b border-white/5 pb-5">
        {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((key) => (
          <Tag
            interactive
            active={activeCategory === key}
            variant={activeCategory === key ? 'cyan' : 'default'}
            key={key}
            onClick={() => setActiveCategory(key)}
            className="px-5 py-2.5 text-xs font-semibold tracking-wide border cursor-pointer border-none"
          >
            {language === 'vi' ? CATEGORIES[key].vi : CATEGORIES[key].en}
          </Tag>
        ))}
      </div>

      {/* Main Trails Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrails.map((trail) => {
          const isCompleted = trail.status === 'completed';
          const isDraft = trail.status === 'draft';

          return (
            <motion.div
              key={trail.id}
              layoutId={`trail-card-${trail.id}`}
              onClick={() => setSelectedTrail(trail)}
              className="group relative bg-[#ffffff]/[0.01] backdrop-blur-xl border border-white/5 hover:border-forge-cyan/20 rounded-[24px] p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="p-3 bg-black border border-white/5 rounded-xl group-hover:border-forge-cyan/25 group-hover:bg-forge-cyan/5 transition-all text-forge-cyan">
                    {trail.category === 'ai' && <Cpu size={18} />}
                    {trail.category === 'architecture' && <Layers size={18} />}
                    {trail.category === 'database' && <Database size={18} />}
                    {trail.category === 'audio' && <Radio size={18} />}
                  </div>

                  <div className="text-right">
                    <Tag
                      variant={isCompleted ? 'accent' : isDraft ? 'default' : 'cyan'}
                      className={cn(
                        'inline-block px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider',
                        !isCompleted && !isDraft && 'animate-pulse'
                      )}
                    >
                      {trail.status}
                    </Tag>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <Label
                    variant="default"
                    className="text-lg font-bold text-white tracking-tight group-hover:text-forge-cyan transition-colors block"
                  >
                    {trail.title}
                  </Label>
                  <span className="text-[10px] font-mono text-gray-500 block mt-0.5">
                    {trail.nodesCount} research nodes mapped
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-3">
                  {language === 'vi' ? trail.desc.vi : trail.desc.en}
                </p>
              </div>

              {/* Progress Bar & Footer */}
              <div className="space-y-3 mt-6 pt-5 border-t border-white/5">
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono mb-1.5">
                    <span className="text-gray-500 uppercase tracking-widest font-bold">Progress</span>
                    <span className="text-forge-cyan font-bold">{trail.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-700 bg-gradient-to-r',
                        isCompleted ? 'from-emerald-400 to-teal-500' : 'from-forge-cyan to-indigo-500'
                      )}
                      style={{ width: `${trail.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono pt-1">
                  <span>Updated: {trail.updatedAt}</span>
                  <span className="flex items-center gap-1 text-gray-400 group-hover:text-forge-cyan transition-colors">
                    <span>Inspect</span>
                    <ArrowUpRight size={10} />
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedTrail && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrail(null)}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#07070a]/95 backdrop-blur-2xl border-l border-white/5 p-8 overflow-y-auto z-50 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* Close & Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-5 mb-6">
                <div className="flex items-center gap-2">
                  <GitBranch className="text-forge-cyan" size={18} />
                  <Label variant="dim" className="text-xs font-mono uppercase tracking-widest font-bold block">
                    Research Node Details
                  </Label>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedTrail(null)}
                  className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer h-8 w-8"
                >
                  <X size={16} />
                </Button>
              </div>

              {/* Title & Meta */}
              <div className="space-y-4">
                <div>
                  <Label variant="default" className="text-2xl font-extrabold text-white tracking-tight block">
                    {selectedTrail.title}
                  </Label>
                  <Tag variant="cyan" className="inline-block px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider bg-forge-cyan/15 text-forge-cyan border border-forge-cyan/20 mt-2">
                    {selectedTrail.category} Module
                  </Tag>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {language === 'vi' ? selectedTrail.desc.vi : selectedTrail.desc.en}
                </p>

                {selectedTrail.githubLink && (
                  <a
                    href={selectedTrail.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-forge-cyan hover:underline hover:text-forge-cyan/80 transition-all pt-1 font-semibold cursor-pointer"
                  >
                    <FileCode2 size={14} />
                    <span>Open Workspace Core Context</span>
                  </a>
                )}
              </div>

              {/* Technical Node Map (Vertical Timeline style) */}
              <div className="mt-8 space-y-6">
                <Label variant="dim" className="text-xs font-mono uppercase tracking-widest font-bold block">
                  Algorithmic Nodes ({selectedTrail.nodes.length})
                </Label>

                <div className="relative border-l border-white/5 pl-6 ml-3 space-y-6">
                  {selectedTrail.nodes.map((node, idx) => {
                    const isDone = node.status === 'completed';
                    const isActive = node.status === 'active';

                    return (
                      <div key={node.id} className="relative group">
                        {/* Bullet */}
                        <div
                          className={cn(
                            'absolute -left-[30px] top-1.5 w-3 h-3 rounded-full border bg-black transition-all duration-300',
                            isDone
                              ? 'border-emerald-500 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                              : isActive
                              ? 'border-forge-cyan bg-forge-cyan animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                              : 'border-white/20'
                          )}
                        />

                        <div className="space-y-1">
                          <Label
                            variant="default"
                            className={cn(
                              'text-sm font-bold tracking-tight block',
                              isDone ? 'text-gray-300' : isActive ? 'text-forge-cyan' : 'text-gray-600'
                            )}
                          >
                            {node.title}
                          </Label>
                          <p className="text-xs text-gray-500 font-light leading-relaxed">
                            {node.desc}
                          </p>

                          <Tag
                            variant={isDone ? 'accent' : isActive ? 'cyan' : 'default'}
                            className="inline-block text-[8px] font-mono text-gray-500 uppercase tracking-wider bg-white/5 border border-white/5 px-2 py-0.5 mt-1.5"
                          >
                            {node.status}
                          </Tag>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

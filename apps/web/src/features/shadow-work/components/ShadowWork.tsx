'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Sparkles,
  Shield,
  Hourglass,
  Cpu,
  Gem,
  Zap,
  RotateCcw,
  BookOpen,
  Volume2,
  VolumeX,
  X,
  Compass,
  ArrowRight,
  Brain,
  Droplets,
  Award,
} from 'lucide-react';
import React, { useState, useEffect, useRef, useMemo } from 'react';

import { useLanguage, useNovaView } from '@/contexts';
import { cn } from '@/shared/lib/utils';
import { View } from '@/shared/types/os';


interface AlchemyElement {
  id: string;
  name: { en: string; vi: string };
  category: 'essence' | 'substrate';
  color: string;
  glowColor: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  desc: { en: string; vi: string };
}

interface AlchemicalFormula {
  id: string;
  name: { en: string; vi: string };
  desc: { en: string; vi: string };
  required: string[];
  color: string;
  badge: string;
  stats: { en: string; vi: string };
  xpReward: number;
  resultIcon: React.ComponentType<{ className?: string; size?: number }>;
}

class AlchemicalParticle {
  x = 0;
  y = 0;
  radius = 0;
  color = '';
  angle = 0;
  speed = 0;
  orbitRadius = 0;
  opacity = 0;
  growth = 0;

  constructor(canvasWidth: number, canvasHeight: number, glowColor: string) {
    this.reset(canvasWidth, canvasHeight, glowColor);
    this.orbitRadius = Math.random() * (Math.min(canvasWidth, canvasHeight) * 0.45) + 50;
    this.opacity = Math.random() * 0.8 + 0.2;
  }

  reset(canvasWidth: number, canvasHeight: number, glowColor: string) {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    this.angle = Math.random() * Math.PI * 2;
    this.orbitRadius = Math.min(canvasWidth, canvasHeight) * 0.45 + Math.random() * 50;
    this.x = centerX + Math.cos(this.angle) * this.orbitRadius;
    this.y = centerY + Math.sin(this.angle) * this.orbitRadius;
    this.radius = Math.random() * 2 + 1;
    this.color = glowColor;
    this.speed = Math.random() * 0.5 + 0.3;
    this.opacity = 0;
    this.growth = Math.random() * 0.02 + 0.01;
  }

  update(
    canvasWidth: number,
    canvasHeight: number,
    glowColor: string,
    isTransmuting: boolean,
  ) {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    this.color = glowColor;

    if (isTransmuting) {
      this.orbitRadius -= this.speed * 8;
      this.angle += 0.08;
      this.radius += 0.05;
      if (this.opacity < 1) this.opacity += 0.05;

      this.x = centerX + Math.cos(this.angle) * this.orbitRadius;
      this.y = centerY + Math.sin(this.angle) * this.orbitRadius;

      if (this.orbitRadius <= 15) {
        this.reset(canvasWidth, canvasHeight, glowColor);
      }
    } else {
      this.angle += 0.003 * this.speed;
      this.orbitRadius -= 0.15 * this.speed;
      if (this.opacity < 0.6) this.opacity += this.growth;

      this.x = centerX + Math.cos(this.angle) * this.orbitRadius;
      this.y = centerY + Math.sin(this.angle) * this.orbitRadius;

      if (this.orbitRadius <= 40) {
        this.reset(canvasWidth, canvasHeight, glowColor);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.radius * 3;
    ctx.shadowColor = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.restore();
  }
}

export const ShadowWork: React.FC = () => {
  const { language } = useLanguage();
  const { setCurrentView } = useNovaView();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Set active view in Forge OS shell
  useEffect(() => {
    setCurrentView(View.SHADOW_WORK);
  }, [setCurrentView]);

  // --- Audio Synthesis Setup ---
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  // --- Game State ---
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [alchemyState, setAlchemyState] = useState<
    'idle' | 'transmuting' | 'discovered' | 'failed'
  >('idle');
  const [discoveredRecipes, setDiscoveredRecipes] = useState<string[]>([]);
  const [lastOutcome, setLastOutcome] = useState<AlchemicalFormula | null>(null);
  const [codexOpen, setCodexOpen] = useState(false);

  const initAudio = () => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (Ctx) {
        audioCtxRef.current = new Ctx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSynthesizerTone = (
    freq: number,
    type: OscillatorType,
    duration: number,
    volume: number,
    rampEndFreq?: number,
  ) => {
    if (!isAudioEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      if (rampEndFreq) {
        osc.frequency.exponentialRampToValueAtTime(
          rampEndFreq,
          ctx.currentTime + duration,
        );
      }

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio synthesis failed', e);
    }
  };

  const playChime = (index: number) => {
    const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
    const pitch = scale[index % scale.length];
    playSynthesizerTone(pitch, 'triangle', 0.4, 0.12, pitch * 1.5);
  };

  const playSweep = () => {
    playSynthesizerTone(180, 'sawtooth', 1.8, 0.08, 1200);
    setTimeout(() => {
      playSynthesizerTone(300, 'sine', 1.4, 0.15, 600);
    }, 200);
  };

  const playSuccessChord = () => {
    const chord = [329.63, 415.3, 493.88, 659.25];
    chord.forEach((freq, idx) => {
      setTimeout(() => {
        playSynthesizerTone(freq, 'sine', 1.8, 0.08);
      }, idx * 120);
    });
  };

  const playFailedHum = () => {
    playSynthesizerTone(110, 'sawtooth', 0.8, 0.1, 80);
    setTimeout(() => {
      playSynthesizerTone(115, 'sine', 0.8, 0.1, 60);
    }, 50);
  };

  // --- Alchemical Configuration ---

  const ELEMENTS = useMemo<AlchemyElement[]>(
    () => [
      {
        id: 'inspired',
        name: { en: 'Inspired Essence', vi: 'Lửa Cảm Hứng' },
        category: 'essence',
        color: 'text-amber-400 border-amber-500/30 hover:border-amber-400 bg-amber-500/5',
        glowColor: '#fbbf24',
        icon: Flame,
        desc: {
          en: 'A volatile spark representing aesthetic epiphanies and high creative focus.',
          vi: 'Ngọn lửa nhiệt huyết khơi gợi sự sáng tạo vô tận và những đột phá nghệ thuật.',
        },
      },
      {
        id: 'focused',
        name: { en: 'Focused Stream', vi: 'Dòng Tập Trung' },
        category: 'essence',
        color: 'text-cyan-400 border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/5',
        glowColor: '#22d3ee',
        icon: Zap,
        desc: {
          en: 'A high-frequency neural vector channeling pure, undistracted execution.',
          vi: 'Sợi năng lượng mảnh sắc định hình sự chú tâm cao độ, không tì vết ngoại cảnh.',
        },
      },
      {
        id: 'calm',
        name: { en: 'Calm Resonance', vi: 'Tĩnh Tâm Trầm' },
        category: 'essence',
        color: 'text-emerald-400 border-emerald-500/30 hover:border-emerald-400 bg-emerald-500/5',
        glowColor: '#34d399',
        icon: Compass,
        desc: {
          en: 'A peaceful, resonant wavelength that stabilizes chaotic thought patterns.',
          vi: 'Dòng nước mát lành làm dịu sự hỗn mang, neo giữ tâm thức ở hiện tại.',
        },
      },
      {
        id: 'anxious',
        name: { en: 'Anxious Core', vi: 'Hạt Nhân Bất An' },
        category: 'essence',
        color: 'text-pink-400 border-pink-500/30 hover:border-pink-400 bg-pink-500/5',
        glowColor: '#f472b6',
        icon: Brain,
        desc: {
          en: 'A volatile mental pressure. Unstable, yet rich in concentrated energy.',
          vi: 'Áp lực dao động mạnh từ sự âu lo. Vừa là chướng ngại, vừa là kho năng lượng nén cực độ.',
        },
      },
      {
        id: 'tired',
        name: { en: 'Tired Residue', vi: 'Trầm Tích Mỏi Mệt' },
        category: 'essence',
        color: 'text-blue-400 border-blue-500/30 hover:border-blue-400 bg-blue-500/5',
        glowColor: '#60a5fa',
        icon: Droplets,
        desc: {
          en: 'A slow-pulsing blue sediment left after deep cognitive labor.',
          vi: 'Những trầm tích xám xịt lắng đọng sau ngày dài lao tâm, báo hiệu nhu cầu chữa lành.',
        },
      },
      {
        id: 'cognitive_load',
        name: { en: 'Cognitive Load', vi: 'Tải Nhận Thức' },
        category: 'substrate',
        color: 'text-red-400 border-red-500/30 hover:border-red-400 bg-red-500/5',
        glowColor: '#f87171',
        icon: Cpu,
        desc: {
          en: 'The thermal pressure of holding complex system architectures in short-term memory.',
          vi: 'Nhiệt lượng tỏa ra khi vận hành hàng nghìn dòng code và cấu trúc phức tạp trong trí óc.',
        },
      },
      {
        id: 'mental_ram',
        name: { en: 'Mental RAM', vi: 'Dung Lượng Thần Kinh' },
        category: 'substrate',
        color: 'text-purple-400 border-purple-500/30 hover:border-purple-400 bg-purple-500/5',
        glowColor: '#c084fc',
        icon: Shield,
        desc: {
          en: 'The active bandwidth used to digest inputs, compile logic, and map models.',
          vi: 'Băng thông não bộ tiêu hao để dịch mã, phân tách logic và kiến thiết cấu trúc.',
        },
      },
      {
        id: 'time_stream',
        name: { en: 'Time Stream', vi: 'Dòng Chảy Thời Gian' },
        category: 'substrate',
        color: 'text-yellow-500 border-yellow-500/30 hover:border-yellow-400 bg-yellow-500/5',
        glowColor: '#eab308',
        icon: Hourglass,
        desc: {
          en: 'The fluid gold sand of passing minutes. Unforgiving, yet transmutable.',
          vi: 'Những hạt cát vàng lỏng lẽo trôi tuột khỏi kẽ tay. Cần được cô đặc thành kiệt tác.',
        },
      },
    ],
    [],
  );

  const FORMULAS = useMemo<AlchemicalFormula[]>(
    () => [
      {
        id: 'philosophers_stone',
        name: { en: "The Philosopher's Stone", vi: 'Đá Triết Nhân' },
        desc: {
          en: 'The ultimate magnum opus of cognitive alchemy. Transmutes the heavy lead of mental noise and daily distractions into the pure gold of absolute mental sovereignty.',
          vi: 'Kiệt tác giả kim tối thượng. Chuyển hóa khối chì nặng nề của sự xáo trộn tâm trí thành hạt nhân vàng ròng của sự sáng suốt và quyền lực nhận thức tuyệt đối.',
        },
        required: ['inspired', 'focused', 'calm', 'mental_ram'],
        color: 'from-yellow-400 via-amber-500 to-red-500 shadow-yellow-500/20',
        badge: 'Grand Alchemist / Thần Phẩm',
        stats: { en: '+50 XP // Ultimate Sublimation Active', vi: '+50 XP // Kích Hoạt Thăng Hoa Tối Thượng' },
        xpReward: 50,
        resultIcon: Gem,
      },
      {
        id: 'sovereign_elixir',
        name: { en: 'Elixir of Sovereignty', vi: 'Nhựa Sống Tự Trị' },
        desc: {
          en: 'A crystalline liquid light that shields the mind against external noise, securing a sacred space for uninterrupted architectural creation.',
          vi: 'Một nguồn ánh sáng lỏng kết tinh, che chắn hoàn hảo cho tâm trí khỏi tạp âm xã hội và tiếng ồn kỹ thuật số, kiến tạo không gian tôn nghiêm cho sự sáng tạo.',
        },
        required: ['focused', 'calm', 'time_stream'],
        color: 'from-cyan-400 via-teal-400 to-emerald-500 shadow-cyan-500/20',
        badge: 'Royal Formula / Tiên Phẩm',
        stats: { en: '+30 XP // Focus Stability +15%', vi: '+30 XP // Tăng 15% Độ Ổn Định Sự Chú Tâm' },
        xpReward: 30,
        resultIcon: Compass,
      },
      {
        id: 'astral_chronometer',
        name: { en: 'Astral Chronometer', vi: 'Đồng Hồ Tinh Vân' },
        desc: {
          en: 'A cosmic conceptual gear system that warps time during flow state. Hours compress to minutes, while a single breath of deep intuition resolves a month of code.',
          vi: 'Bánh răng ý niệm bẻ cong dòng thời gian khi nhập định. Mười tiếng lao động nén chặt bằng một khắc thư thái, đưa cơ thể vào tần số vũ trụ.',
        },
        required: ['inspired', 'focused', 'time_stream'],
        color: 'from-purple-500 via-fuchsia-500 to-pink-500 shadow-fuchsia-500/20',
        badge: 'Epic Relic / Kỳ Vật',
        stats: { en: '+35 XP // Time Perception Distorted', vi: '+35 XP // Bóp Méo Nhận Thức Thời Gian' },
        xpReward: 35,
        resultIcon: Hourglass,
      },
      {
        id: 'architect_blueprint',
        name: { en: "The Architect's Blueprint", vi: 'Bản Thiết Kế Kiến Trúc Sư' },
        desc: {
          en: 'Condenses immense cognitive pressure and architectural complexity into an elegant, symmetrical visual blueprint of system architecture.',
          vi: 'Cô đặc áp lực nhận thức khổng lồ và độ phức tạp đa chiều thành một bản đồ cấu trúc hệ thống thanh lịch, đối xứng và tối giản.',
        },
        required: ['inspired', 'cognitive_load', 'mental_ram'],
        color: 'from-orange-500 via-rose-500 to-red-600 shadow-orange-500/20',
        badge: 'Prime Structure / Bản Thiết Kế',
        stats: { en: '+40 XP // High Complexity Sublimated', vi: '+40 XP // Hợp Nhất Độ Phức Tạp Lớn' },
        xpReward: 40,
        resultIcon: Cpu,
      },
      {
        id: 'obsidian_bastion',
        name: { en: 'The Obsidian Bastion', vi: 'Thành Trì Hắc Diệu Thạch' },
        desc: {
          en: 'Compresses nervous anxiety, fatigue, and overload into a dark, impenetrable fortress. A solid mental boundary guarding the soul against burnout.',
          vi: 'Kết nén nỗi âu lo hoang hoải, mỏi mệt chất chồng thành một pháo đài bóng tối kiên cố. Trở thành lá chắn vững chắc bảo bọc tâm hồn khỏi kiệt quệ.',
        },
        required: ['anxious', 'tired', 'cognitive_load'],
        color: 'from-gray-800 via-slate-900 to-indigo-950 shadow-indigo-950/40',
        badge: 'Sacred Defense / Phòng Ngự',
        stats: { en: '+35 XP // Burnout Immunity Active', vi: '+35 XP // Miễn Nhiễm Kiệt Sức Nhất Thời' },
        xpReward: 35,
        resultIcon: Shield,
      },
      {
        id: 'rejuvenating_elixir',
        name: { en: 'Elixir of Rejuvenation', vi: 'Trà Sống Tế Bào' },
        desc: {
          en: 'A gentle emerald infusion that purges temporary cognitive leaks, cooling down the core processing unit of the traveler.',
          vi: 'Dòng nước ngọc lục bảo xua tan đi tàn tích độc tố thần kinh, làm nguội bộ vi xử lý trung tâm đang quá tải của hành giả.',
        },
        required: ['calm', 'tired', 'mental_ram'],
        color: 'from-emerald-400 via-green-400 to-blue-500 shadow-emerald-500/20',
        badge: 'Essential Healing / Dược Phẩm',
        stats: { en: '+25 XP // Core Refreshed & Hydrated', vi: '+25 XP // Bộ Vi Xử Lý Được Làm Mát' },
        xpReward: 25,
        resultIcon: Droplets,
      },
    ],
    [],
  );

  const MERCURIAL_ASH: AlchemicalFormula = {
    id: 'mercurial_ash',
    name: { en: 'Mercurial Ash', vi: 'Tro Tàn Thủy Ngân' },
    desc: {
      en: 'A chaotic vaporization. Though no stable relic crystallized, the ritual itself has purged your consciousness of impure sediments. Refine your ratios and try again.',
      vi: 'Một phản ứng bốc hơi hỗn mang. Dẫu không kết tinh nên linh vật ổn định, lễ tế giả kim này đã gột rửa một phần tạp niệm trong ý thức. Hãy điều chỉnh nguyên tố và thử lại.',
    },
    required: [],
    color: 'from-zinc-600 via-slate-700 to-gray-800 shadow-gray-500/10',
    badge: 'Volatile Residue / Phế Phẩm',
    stats: { en: '+5 XP // Experiential Residue Added', vi: '+5 XP // Tích Lũy Bụi Kinh Nghiệm' },
    xpReward: 5,
    resultIcon: Sparkles,
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('forge_discovered_formulas');
      if (saved) {
        try {
          setDiscoveredRecipes(JSON.parse(saved));
        } catch (_) { }
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: AlchemicalParticle[] = [];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const getActiveColor = () => {
      if (selectedElements.length === 0) return 'rgba(124, 58, 237, 0.4)'; // Violet shadow glow
      const lastId = selectedElements[selectedElements.length - 1];
      const el = ELEMENTS.find((e) => e.id === lastId);
      return el ? el.glowColor : '#7c3aed';
    };

    const particleCount = 65;
    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new AlchemicalParticle(canvas.width, canvas.height, getActiveColor()),
      );
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isTransmuting = alchemyState === 'transmuting';
      const glowColor = getActiveColor();

      particles.forEach((p) => {
        p.update(canvas.width, canvas.height, glowColor, isTransmuting);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedElements, alchemyState, ELEMENTS]);

  const toggleElementSelection = (id: string, index: number) => {
    if (alchemyState === 'transmuting') return;
    playChime(index);

    setSelectedElements((prev) => {
      if (prev.includes(id)) {
        return prev.filter((elId) => elId !== id);
      } else {
        if (prev.length >= 4) {
          playSynthesizerTone(190, 'sawtooth', 0.15, 0.05);
          return prev;
        }
        return [...prev, id];
      }
    });

    if (alchemyState !== 'idle') {
      setAlchemyState('idle');
      setLastOutcome(null);
    }
  };

  const clearTransmuter = () => {
    playSynthesizerTone(300, 'triangle', 0.15, 0.1, 150);
    setSelectedElements([]);
    setAlchemyState('idle');
    setLastOutcome(null);
  };

  const triggerTransmutation = () => {
    if (selectedElements.length === 0 || alchemyState === 'transmuting') return;

    setAlchemyState('transmuting');
    playSweep();

    setTimeout(() => {
      const matched = FORMULAS.find((formula) => {
        if (formula.required.length !== selectedElements.length) return false;
        return formula.required.every((el) => selectedElements.includes(el));
      });

      if (matched) {
        setLastOutcome(matched);
        setAlchemyState('discovered');
        playSuccessChord();

        setDiscoveredRecipes((prev) => {
          if (prev.includes(matched.id)) return prev;
          const next = [...prev, matched.id];
          if (typeof window !== 'undefined') {
            localStorage.setItem('forge_discovered_formulas', JSON.stringify(next));
          }
          return next;
        });
      } else {
        setLastOutcome(MERCURIAL_ASH);
        setAlchemyState('failed');
        playFailedHum();
      }
    }, 2000);
  };

  return (
    <div className="max-w-[1600px] mx-auto p-6 md:p-10 pb-32 space-y-10 animate-in fade-in duration-700 relative select-none">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight mb-2">
            {language === 'vi' ? 'Hợp Nhất Bóng Tối' : 'Shadow Integration'}
          </h1>
          <p className="text-lg text-gray-400 font-light max-w-xl">
            {language === 'vi'
              ? 'Thừa nhận và chuyển hóa các vùng bóng tối của tâm trí (lo âu, mệt mỏi, áp lực) thành sức mạnh nội tại Stoic.'
              : 'Acknowledge and sublimate the heavy shadow regions of your mind (anxiety, fatigue, load) into sovereign Stoic relics.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className="p-3.5 rounded-full border border-white/5 bg-[#ffffff]/[0.015] backdrop-blur-xl text-gray-400 hover:text-white hover:border-forge-cyan/20 transition-all cursor-pointer"
            title="Toggle Audio Feedback"
          >
            {isAudioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <button
            onClick={() => {
              playChime(4);
              setCodexOpen(!codexOpen);
            }}
            className={cn(
              'flex items-center gap-2 px-5 py-3.5 rounded-full border text-sm font-medium transition-all cursor-pointer',
              codexOpen
                ? 'bg-forge-accent border-forge-accent text-white font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                : 'border-white/5 bg-[#ffffff]/[0.015] backdrop-blur-xl text-gray-300 hover:text-white hover:border-forge-cyan/20'
            )}
          >
            <BookOpen size={16} />
            <span>
              {language === 'vi'
                ? `Cương Mục Bóng Tối (${discoveredRecipes.length}/${FORMULAS.length})`
                : `Shadow Codex (${discoveredRecipes.length}/${FORMULAS.length})`}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#ffffff]/[0.015] backdrop-blur-xl border border-white/5 rounded-[24px] p-6 flex flex-col gap-4">
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">
              {language === 'vi' ? 'Sợi Chỉ Cảm Cực (Shadow Essences)' : 'Shadow Essences (Affective)'}
            </h3>

            <div className="flex flex-col gap-2.5">
              {ELEMENTS.filter((e) => e.category === 'essence').map((element, idx) => {
                const isSelected = selectedElements.includes(element.id);
                const Icon = element.icon;

                return (
                  <button
                    key={element.id}
                    onClick={() => toggleElementSelection(element.id, idx)}
                    className={cn(
                      'w-full flex items-start gap-4 p-3.5 rounded-xl border transition-all text-left group cursor-pointer duration-300',
                      isSelected
                        ? `${element.color} shadow-[0_0_15px_rgba(255,255,255,0.02)] scale-[1.01]`
                        : 'border-white/5 hover:bg-white/[0.01] hover:border-white/10 text-gray-400 hover:text-gray-200'
                    )}
                  >
                    <div
                      className={cn(
                        'p-2.5 rounded-lg border transition-all shrink-0',
                        isSelected
                          ? 'bg-white/5 border-white/10'
                          : 'bg-black/20 border-white/5 group-hover:border-white/10'
                      )}
                    >
                      <Icon size={16} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-sm font-semibold truncate text-white">
                          {language === 'vi' ? element.name.vi : element.name.en}
                        </span>
                        <div
                          className={cn(
                            'w-2 h-2 rounded-full transition-all duration-500',
                            isSelected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                          )}
                          style={{ backgroundColor: element.glowColor }}
                        />
                      </div>
                      <p className="text-[11px] text-gray-500 leading-normal font-light line-clamp-2">
                        {language === 'vi' ? element.desc.vi : element.desc.en}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-[#ffffff]/[0.015] backdrop-blur-xl border border-white/5 rounded-[24px] p-6 flex flex-col gap-4">
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">
              {language === 'vi' ? 'Thể Nền Khách Quan (Cognitive Substrates)' : 'Cognitive Substrates'}
            </h3>

            <div className="flex flex-col gap-2.5">
              {ELEMENTS.filter((e) => e.category === 'substrate').map((element, idx) => {
                const isSelected = selectedElements.includes(element.id);
                const Icon = element.icon;

                return (
                  <button
                    key={element.id}
                    onClick={() => toggleElementSelection(element.id, idx + 5)}
                    className={cn(
                      'w-full flex items-start gap-4 p-3.5 rounded-xl border transition-all text-left group cursor-pointer duration-300',
                      isSelected
                        ? `${element.color} shadow-[0_0_15px_rgba(255,255,255,0.02)] scale-[1.01]`
                        : 'border-white/5 hover:bg-white/[0.01] hover:border-white/10 text-gray-400 hover:text-gray-200'
                    )}
                  >
                    <div
                      className={cn(
                        'p-2.5 rounded-lg border transition-all shrink-0',
                        isSelected
                          ? 'bg-white/5 border-white/10'
                          : 'bg-black/20 border-white/5 group-hover:border-white/10'
                      )}
                    >
                      <Icon size={16} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-sm font-semibold truncate text-white">
                          {language === 'vi' ? element.name.vi : element.name.en}
                        </span>
                        <div
                          className={cn(
                            'w-2 h-2 rounded-full transition-all duration-500',
                            isSelected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                          )}
                          style={{ backgroundColor: element.glowColor }}
                        />
                      </div>
                      <p className="text-[11px] text-gray-500 leading-normal font-light line-clamp-2">
                        {language === 'vi' ? element.desc.vi : element.desc.en}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Mandala Hearth */}
        <div className="lg:col-span-8 flex flex-col gap-6 relative min-h-[500px]">
          <div className="flex-1 relative bg-[#ffffff]/[0.01] backdrop-blur-xl border border-white/5 rounded-[32px] overflow-hidden flex flex-col items-center justify-center p-8 group">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-45" />

            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-forge-accent/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

            {/* ALCHEMICAL HEARTH MANDALA */}
            <div className="relative w-[340px] h-[340px] md:w-[380px] md:h-[380px] flex items-center justify-center z-10 select-none pointer-events-none mb-4">
              {/* Outer Text Ring */}
              <motion.div
                className="absolute inset-0 border border-white/[0.03] rounded-full flex items-center justify-center"
                animate={{ rotate: alchemyState === 'transmuting' ? -360 : -45 }}
                transition={{
                  duration: alchemyState === 'transmuting' ? 2 : 50,
                  ease: alchemyState === 'transmuting' ? 'easeInOut' : 'linear',
                  repeat: Infinity,
                }}
              >
                <svg className="w-full h-full opacity-[0.12]" viewBox="0 0 100 100">
                  <path id="textPathOuter" d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="none" />
                  <text className="font-mono text-[3.8px] fill-white uppercase tracking-[0.25em] font-semibold">
                    <textPath href="#textPathOuter">
                      * C.G. Jung Shadow Integration * Solve et Coagula * Transmuting Psychological Lead *
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Middle Astrological Ring */}
              <motion.div
                className="absolute w-[86%] h-[86%] border border-forge-accent/5 rounded-full flex items-center justify-center"
                animate={{ rotate: alchemyState === 'transmuting' ? 720 : 60 }}
                transition={{
                  duration: alchemyState === 'transmuting' ? 2 : 40,
                  ease: alchemyState === 'transmuting' ? 'easeInOut' : 'linear',
                  repeat: Infinity,
                }}
              >
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-[1px] h-[98%] bg-white/[0.04]"
                    style={{ transform: `rotate(${i * 30}deg)` }}
                  />
                ))}
                <div className="absolute w-[95%] h-[95%] border border-white/[0.02] rounded-full" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
              </motion.div>

              {/* Inner Crucible */}
              <motion.div
                className="absolute w-[68%] h-[68%] border-2 border-dashed border-white/[0.05] rounded-full flex items-center justify-center bg-black/45"
                animate={{ rotate: alchemyState === 'transmuting' ? -1080 : 0 }}
                transition={{
                  duration: alchemyState === 'transmuting' ? 2 : 80,
                  ease: 'easeInOut',
                }}
              >
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60 rounded-full" />

                <div
                  className={cn(
                    'w-28 h-28 rounded-full blur-2xl opacity-40 transition-all duration-1000 bg-forge-accent',
                    alchemyState === 'transmuting' && 'scale-[1.8] opacity-90 bg-amber-400 blur-3xl',
                    selectedElements.length > 0 && `bg-gradient-to-tr`
                  )}
                  style={{
                    backgroundColor:
                      selectedElements.length > 0
                        ? ELEMENTS.find(
                          (e) => e.id === selectedElements[selectedElements.length - 1]
                        )?.glowColor
                        : undefined,
                  }}
                />

                <AnimatePresence>
                  {selectedElements.map((elId, index) => {
                    const el = ELEMENTS.find((e) => e.id === elId);
                    if (!el) return null;
                    const Icon = el.icon;

                    const total = selectedElements.length;
                    const radius = 64;
                    const angleDeg = (index * 360) / total;
                    const x = Math.cos((angleDeg * Math.PI) / 180) * radius;
                    const y = Math.sin((angleDeg * Math.PI) / 180) * radius;

                    return (
                      <motion.div
                        key={elId}
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1, x, y }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className={cn(
                          'absolute w-11 h-11 rounded-full flex items-center justify-center border bg-[#050508] shadow-lg shadow-black/80 cursor-pointer pointer-events-auto',
                          el.color
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleElementSelection(elId, index);
                        }}
                      >
                        <Icon size={16} />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                <div className="absolute w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center shadow-inner">
                  {alchemyState === 'transmuting' ? (
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Sparkles className="text-amber-400" size={16} />
                    </motion.div>
                  ) : lastOutcome ? (
                    (() => {
                      const OutcomeIcon = lastOutcome.resultIcon;
                      return (
                        <OutcomeIcon
                          className={cn(
                            'text-transparent bg-clip-text bg-gradient-to-r',
                            lastOutcome.id === 'mercurial_ash' ? 'text-gray-400' : 'text-forge-accent'
                          )}
                          size={18}
                        />
                      );
                    })()
                  ) : (
                    <Compass className="text-gray-600 animate-pulse" size={16} />
                  )}
                </div>
              </motion.div>
            </div>

            {/* STATUS / INFO AREA */}
            <div className="w-full max-w-md flex flex-col items-center gap-4 relative z-10">
              <AnimatePresence mode="wait">
                {alchemyState === 'transmuting' ? (
                  <motion.div
                    key="transmuting"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                  >
                    <p className="text-xs font-mono text-forge-accent uppercase tracking-widest font-bold animate-pulse">
                      {language === 'vi' ? 'HỢP NHẤT BÓNG TỐI...' : 'SUBLIMATING SHADOW STATE...'}
                    </p>
                    <p className="text-[11px] text-gray-500 italic mt-1 leading-normal font-light">
                      {language === 'vi'
                        ? 'Đang ngưng tụ các cảm xúc đè nén thành tinh thể kiên cường'
                        : 'Integrating vulnerable psychological variables into sovereign structures'}
                    </p>
                  </motion.div>
                ) : lastOutcome ? (
                  <motion.div
                    key="outcome"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full text-center"
                  >
                    <div
                      className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider mb-2 bg-white/5 border-white/10',
                        lastOutcome.id === 'mercurial_ash' ? 'text-gray-400' : 'text-amber-400'
                      )}
                    >
                      <Award size={10} />
                      {lastOutcome.badge}
                    </div>

                    <h4
                      className={cn(
                        'text-2xl font-display font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r',
                        lastOutcome.color
                      )}
                    >
                      {language === 'vi' ? lastOutcome.name.vi : lastOutcome.name.en}
                    </h4>

                    <p className="text-xs text-gray-400 italic px-6 leading-relaxed max-w-sm mx-auto mb-3 font-light">
                      "{language === 'vi' ? lastOutcome.desc.vi : lastOutcome.desc.en}"
                    </p>

                    <div className="inline-block px-4 py-1.5 rounded-lg bg-black/40 border border-white/5 text-[10px] font-mono text-emerald-400 font-bold">
                      {language === 'vi' ? lastOutcome.stats.vi : lastOutcome.stats.en}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                      {selectedElements.length === 0
                        ? language === 'vi'
                          ? 'CHỌN BÓNG TỐI ĐỂ HỢP NHẤT'
                          : 'SELECT SHADOWS TO TRANSMUTE'
                        : language === 'vi'
                          ? `LÒ LUYỆN ĐÃ SẴN SÀNG (${selectedElements.length}/4 NGUYÊN TỐ)`
                          : `HEARTH PREPARED (${selectedElements.length}/4 INGREDIENTS)`}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3 mt-2 w-full justify-center">
                {selectedElements.length > 0 && (
                  <button
                    onClick={clearTransmuter}
                    disabled={alchemyState === 'transmuting'}
                    className="p-3.5 rounded-xl border border-white/5 bg-black/40 hover:bg-white/5 hover:text-red-400 hover:border-red-400/20 text-gray-500 transition-all cursor-pointer"
                    title="Clear Hearth"
                  >
                    <RotateCcw size={16} />
                  </button>
                )}

                <button
                  onClick={triggerTransmutation}
                  disabled={selectedElements.length === 0 || alchemyState === 'transmuting'}
                  className={cn(
                    'flex-1 max-w-xs flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold tracking-wide border cursor-pointer select-none transition-all duration-500',
                    selectedElements.length === 0 || alchemyState === 'transmuting'
                      ? 'border-white/5 bg-white/[0.01] text-gray-600 cursor-not-allowed'
                      : 'bg-white text-black border-white font-bold hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-[1.02]'
                  )}
                >
                  <span>
                    {alchemyState === 'transmuting'
                      ? language === 'vi'
                        ? 'ĐANG LUYỆN...'
                        : 'TRANSMUTING...'
                      : language === 'vi'
                        ? 'BẮT ĐẦU CHUYỂN HÓA'
                        : 'ACTIVATE TRANSMUTATION'}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CODEX TAB PANEL */}
      <AnimatePresence>
        {codexOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="bg-[#ffffff]/[0.015] backdrop-blur-2xl border border-white/5 rounded-[28px] p-6 relative z-10"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-forge-accent/10 rounded-xl border border-forge-accent/25">
                  <BookOpen className="text-forge-accent" size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {language === 'vi' ? 'Cương Mục Giả Kim Thuật Stoic' : 'The Stoic Alchemy Codex'}
                  </h3>
                  <p className="text-xs text-gray-500 font-light">
                    {language === 'vi'
                      ? 'Khôi phục và tích lũy những linh vật Stoic bằng cách đối diện với phần bóng tối tinh thần.'
                      : 'Crystallize and record discovered Stoic relics by facing emotional and cognitive shadows.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCodexOpen(false)}
                className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FORMULAS.map((formula) => {
                const isDiscovered = discoveredRecipes.includes(formula.id);
                const ResultIcon = formula.resultIcon;

                return (
                  <div
                    key={formula.id}
                    className={cn(
                      'relative p-5 rounded-2xl border transition-all duration-500',
                      isDiscovered
                        ? 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]'
                        : 'border-white/[0.02] bg-black/20 opacity-55'
                    )}
                  >
                    <div className="flex justify-between items-start gap-4 mb-4">
                      {isDiscovered ? (
                        <div
                          className={cn(
                            'p-3 rounded-xl border bg-black flex items-center justify-center shadow-lg',
                            formula.id === 'philosophers_stone'
                              ? 'text-yellow-400 border-yellow-500/20'
                              : 'text-forge-accent border-forge-accent/20'
                          )}
                        >
                          <ResultIcon size={20} />
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl border border-white/5 bg-black/45 text-gray-700 flex items-center justify-center">
                          <Cpu size={20} className="animate-pulse" />
                        </div>
                      )}

                      <div className="text-right">
                        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest font-bold block mb-1">
                          {isDiscovered ? formula.badge : '???'}
                        </span>
                        <div className="flex gap-1 justify-end">
                          {formula.required.map((reqId) => {
                            const el = ELEMENTS.find((e) => e.id === reqId);
                            if (!el) return null;
                            const ElIcon = el.icon;
                            return (
                              <div
                                key={reqId}
                                className={cn(
                                  'p-1.5 rounded-md border text-gray-500 bg-[#050508]',
                                  isDiscovered ? el.color : 'border-white/5 text-gray-700'
                                )}
                                title={language === 'vi' ? el.name.vi : el.name.en}
                              >
                                <ElIcon size={10} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <h5 className="text-sm font-bold text-white mb-2 tracking-tight">
                      {isDiscovered
                        ? language === 'vi'
                          ? formula.name.vi
                          : formula.name.en
                        : language === 'vi'
                          ? 'Chưa khai phá'
                          : 'Locked Formula'}
                    </h5>

                    <p className="text-[11px] text-gray-500 leading-relaxed font-light mb-4 line-clamp-3">
                      {isDiscovered
                        ? language === 'vi'
                          ? formula.desc.vi
                          : formula.desc.en
                        : language === 'vi'
                          ? 'Kết hợp đúng các chất nguyên bản thần kinh để giải phóng công thức giả kim.'
                          : 'Blend the correct neural ingredients within the hearth to reveal this alchemical blueprint.'}
                    </p>

                    {isDiscovered ? (
                      <div className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2 text-center">
                        {language === 'vi' ? formula.stats.vi : formula.stats.en}
                      </div>
                    ) : (
                      <div className="text-[10px] font-mono text-gray-600 bg-white/5 border border-white/5 rounded-lg p-2 text-center">
                        {language === 'vi' ? 'Bí Ẩn Trầm Tích // Khóa' : 'Undiscovered Blueprint // Locked'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

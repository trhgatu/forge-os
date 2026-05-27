'use client';

import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Volume2 } from 'lucide-react';
import type { Program } from 'ogl';
import React, { useState, useEffect, useRef } from 'react';

import { useLanguage, useNovaView } from '@/contexts';
import { forgeToast } from '@/shared/lib/toast';
import { View } from '@/shared/types/os';

import { echoesService } from '../services/echoesService';

import { AnchorControl } from './AnchorControl';
import { ConstellationSvg } from './ConstellationSvg';
import { CosmicCanvas } from './CosmicCanvas';
import { CosmicTelemetry } from './CosmicTelemetry';
import { MaktubOverlay } from './MaktubOverlay';

interface FlowMoment {
  id: string;
  time: string;
  fileName: string;
  gitBranch: string;
  cpuLoad: number;
  coordinates: { x: number; y: number };
}

export const SensoryEchoes: React.FC = () => {
  const { language } = useLanguage();
  const { setCurrentView } = useNovaView();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const programRef = useRef<Program | null>(null);

  const mainUiRef = useRef<HTMLDivElement | null>(null);
  const centralSingularityRef = useRef<HTMLButtonElement | null>(null);
  const cinematicOverlayRef = useRef<HTMLDivElement | null>(null);
  const cinematicTitleRef = useRef<HTMLHeadingElement | null>(null);
  const dividerLineRef = useRef<HTMLDivElement | null>(null);
  const cinematicSubRef = useRef<HTMLParagraphElement | null>(null);
  const newestLineRef = useRef<SVGLineElement | null>(null);

  useEffect(() => {
    setCurrentView(View.ECHOES);
  }, [setCurrentView]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const [isFlowActive, setIsFlowActive] = useState(false);
  const [flowSeconds, setFlowSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatFlowTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSecs % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSecs % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };
  const [flowHistory, setFlowHistory] = useState<FlowMoment[]>([]);
  const [lastLoggedMoment, setLastLoggedMoment] = useState<FlowMoment | null>(null);

  const [lineToDraw, setLineToDraw] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    visible: boolean;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('forge_flow_moments');
      if (saved) {
        try {
          setFlowHistory(JSON.parse(saved));
        } catch (_) {
          // Silent recovery if localStorage content is corrupt
        }
      }
    }
  }, []);

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

  const playCelestialChord = () => {
    // Deep, grounding singing bowl tones
    const scale = [110.0, 146.83, 164.81, 220.0, 293.66, 329.63];
    scale.forEach((freq, idx) => {
      setTimeout(() => {
        playSynthesizerTone(freq, 'sine', 2.8 - idx * 0.25, 0.05);
      }, idx * 180);
    });
  };



  // --- Cinematic Scene Transition & Golden Thread Weaving Sequence ---
  const triggerMaktubAlignment = () => {
    if (isFlowActive) return;
    setIsFlowActive(true);

    // 1. Play deep Tibetan bowl drone chord
    playCelestialChord();

    // 2. Coordinate Generation
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 110 + 50;
    const targetX = 200 + Math.cos(angle) * radius;
    const targetY = 200 + Math.sin(angle) * radius;

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newMoment: FlowMoment = {
      id: Math.random().toString(36).substr(2, 9),
      time: formattedTime,
      fileName: 'ShadowWork.tsx',
      gitBranch: 'feature/alchemical-reflection',
      cpuLoad: 35 + Math.floor(Math.random() * 10),
      coordinates: { x: targetX, y: targetY },
    };

    // Calculate nearest existing star for linking, default to center if none
    let previousStar = { x: 200, y: 200 };
    if (flowHistory.length > 0) {
      // Find closest star by Euclidean distance
      let minDistance = Infinity;
      flowHistory.forEach((moment) => {
        const dist = Math.hypot(moment.coordinates.x - targetX, moment.coordinates.y - targetY);
        if (dist < minDistance) {
          minDistance = dist;
          previousStar = moment.coordinates;
        }
      });
    }

    // Prepare dynamic gold thread line coords
    setLineToDraw({
      x1: previousStar.x,
      y1: previousStar.y,
      x2: targetX,
      y2: targetY,
      visible: false,
    });

    // 3. GSAP CINEMATIC SEQUENCE TIMELINE
    const mainTimeline = gsap.timeline();

    // PHASE 1: Singularity Expansion & Screen Blackout
    mainTimeline.to(centralSingularityRef.current, {
      scale: 2.2,
      opacity: 0,
      filter: 'blur(30px)',
      duration: 1.6,
      ease: 'power2.inOut',
    });

    mainTimeline.to(
      mainUiRef.current,
      {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      },
      '-=1.2'
    );

    mainTimeline.add(() => {
      if (programRef.current) {
        programRef.current.uniforms.uPulse.value = 0.04;
      }
    }, '-=0.8');

    mainTimeline.to(cinematicOverlayRef.current, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.8,
      ease: 'power1.inOut',
    });

    const letters = cinematicTitleRef.current?.querySelectorAll('.cinematic-letter');
    const embers = cinematicOverlayRef.current?.querySelectorAll('.cinematic-ember');

    if (letters && letters.length > 0) {
      mainTimeline.fromTo(
        letters,
        { opacity: 0, y: 35, filter: 'blur(10px)', scale: 0.8 },
        {
          opacity: 0.95,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    }

    if (dividerLineRef.current) {
      mainTimeline.fromTo(
        dividerLineRef.current,
        { width: '0%', opacity: 0 },
        { width: '45%', opacity: 0.35, duration: 1.4, ease: 'power2.inOut' },
        '-=0.9'
      );
    }

    if (embers && embers.length > 0) {
      mainTimeline.fromTo(
        embers,
        { opacity: 0, y: 100 },
        {
          opacity: () => 0.15 + Math.random() * 0.45,
          y: -800,
          duration: () => 3.5 + Math.random() * 2.0,
          stagger: 0.15,
          ease: 'power1.out',
        },
        '-=1.5'
      );
    }

    mainTimeline.fromTo(
      cinematicSubRef.current,
      { opacity: 0, y: 12, filter: 'blur(4px)', letterSpacing: '0.05em' },
      { opacity: 0.45, y: 0, filter: 'blur(0px)', letterSpacing: '0.15em', duration: 1.6, ease: 'power3.out' },
      '-=1.2'
    );

    mainTimeline.to(cinematicOverlayRef.current, {
      opacity: 0,
      duration: 1.0,
      delay: 1.6,
      ease: 'power2.inOut',
      onComplete: () => {

        if (cinematicOverlayRef.current) {
          cinematicOverlayRef.current.style.pointerEvents = 'none';
        }
      }
    });

    // Trigger API call to backend asynchronously
    const syncedMomentPromise = echoesService.syncMoment({
      fileName: newMoment.fileName,
      gitBranch: newMoment.gitBranch,
      cpuLoad: newMoment.cpuLoad,
      coordinates: newMoment.coordinates,
    }).catch(err => {
      console.warn('Backend sync failed, falling back to local simulation', err);
      return newMoment;
    });

    mainTimeline.add(async () => {
      const syncedMoment = await syncedMomentPromise;
      setFlowHistory((prev) => {
        const next = [syncedMoment, ...prev].slice(0, 8);
        if (typeof window !== 'undefined') {
          localStorage.setItem('forge_flow_moments', JSON.stringify(next));
        }
        return next;
      });
      setLastLoggedMoment(syncedMoment);

      // Trigger a premium alchemical toast notification
      forgeToast.calibration(
        'presence',
        1,
        language === 'vi'
          ? `Hội tụ dòng chảy tại nhánh: ${syncedMoment.gitBranch?.slice(0, 15) || 'main'}`
          : `Synchronicity mapped on branch: ${syncedMoment.gitBranch?.slice(0, 15) || 'main'}`
      );
    });

    mainTimeline.to(mainUiRef.current, {
      opacity: 1,
      duration: 1.4,
      ease: 'power2.out',
    });

    mainTimeline.to(
      centralSingularityRef.current,
      {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.4,
        ease: 'power2.out',
      },
      '-=1.4'
    );

    mainTimeline.add(() => {
      setLineToDraw((prev) => (prev ? { ...prev, visible: true } : null));
      playSynthesizerTone(523.25, 'sine', 1.5, 0.035);

      setTimeout(() => {
        if (newestLineRef.current) {
          gsap.fromTo(
            newestLineRef.current,
            { strokeDashoffset: 400 },
            {
              strokeDashoffset: 0,
              duration: 1.8,
              ease: 'power1.inOut',
              onComplete: () => {
                setLineToDraw(null);
                setIsFlowActive(false);
              },
            }
          );
        } else {
          setIsFlowActive(false);
        }
      }, 50);
    });
  };

  const clearFlowData = async () => {
    playSynthesizerTone(90, 'sine', 0.8, 0.04);
    setFlowHistory([]);
    setLastLoggedMoment(null);
    setLineToDraw(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('forge_flow_moments');
    }
    try {
      await echoesService.clearHistory();
    } catch (err) {
      console.warn('Failed to clear echoes history on backend', err);
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full bg-[#000000] overflow-hidden flex flex-col items-center justify-between p-8 select-none"
    >
      {/* OGL Fullscreen WebGL background */}
      <CosmicCanvas containerRef={containerRef} programRef={programRef} />

      {/* SACRED CINEMATIC OVERLAY CARD - MAKTUB SCENE */}
      <MaktubOverlay
        overlayRef={cinematicOverlayRef}
        titleRef={cinematicTitleRef}
        dividerRef={dividerLineRef}
        subRef={cinematicSubRef}
        language={language}
      />

      <div ref={mainUiRef} className="absolute inset-0 w-full h-full flex flex-col items-center justify-between p-8 z-10 pointer-events-none">
        <CosmicTelemetry
          lastLoggedMoment={lastLoggedMoment}
          flowSeconds={flowSeconds}
          isAudioEnabled={isAudioEnabled}
          language={language}
          formatFlowTime={formatFlowTime}
        />

        {/* Floating Meta Panel Top - BORDERLESS, SILENT SILVER */}
        <div className="w-full max-w-[1550px] flex items-center justify-between py-2 relative mt-2 bg-transparent pointer-events-auto">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.35em] block">
              Meta // Alignment Scanner
            </span>
            <h1 className="text-base font-display font-light text-gray-300 tracking-[0.2em] uppercase">
              {language === 'vi' ? 'Tiếng Vọng Cảm Quan' : 'Sensory Echoes'}
            </h1>
          </div>

          {/* Symmetrical HUD Top-Center indicator - Safe from Nova Robot */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1.5 text-center hidden md:block select-none pointer-events-none">
            <span className="text-[7.5px] font-mono text-gray-550 uppercase tracking-[0.25em] block">
              {language === 'vi' ? 'Hệ thống định vị Maktub' : 'Maktub Positioning System'}
            </span>
            <span className="text-[11px] font-mono font-bold text-[#22d3ee] tracking-widest block mt-0.5">
              {flowHistory.length} STARS WEFTED
            </span>
          </div>

          {/* Audio Toggle & Reset - SILENT DESIGN */}
          <div className="flex items-center gap-6">
            {flowHistory.length > 0 && (
              <button
                onClick={clearFlowData}
                className="text-[9px] font-mono text-gray-600 hover:text-gray-400 tracking-[0.2em] uppercase transition-all cursor-pointer bg-transparent border-none outline-none"
              >
                [ Reset Sky ]
              </button>
            )}

            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className="text-[9px] font-mono text-gray-500 hover:text-gray-300 tracking-[0.2em] uppercase transition-all cursor-pointer bg-transparent border-none outline-none flex items-center gap-1.5"
              title="Toggle Audio Feedback"
            >
              <Volume2 size={10} className="text-gray-500" />
              <span>{isAudioEnabled ? 'Audio [On]' : 'Audio [Off]'}</span>
            </button>
          </div>
        </div>

        {/* CENTRAL MEDITATIVE SINGULARITY & ORBITAL OVERLAY */}
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center my-auto scale-[0.88] md:scale-95">

          {/* Fine, faint silver-gold astrological overlay & Constellation Map (Modular) */}
          <ConstellationSvg
            flowHistory={flowHistory}
            lineToDraw={lineToDraw}
            newestLineRef={newestLineRef}
          />

          {/* Outer rotating text */}
          <motion.div
            className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none"
            animate={{ rotate: isFlowActive ? 360 : -10 }}
            transition={{ duration: isFlowActive ? 2.2 : 150, ease: 'linear', repeat: Infinity }}
          >
            <svg className="w-full h-full opacity-[0.06]" viewBox="0 0 100 100">
              <path id="circleTextPath" d="M 50,50 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="none" />
              <text className="font-mono text-[2.2px] fill-[#22d3ee] uppercase tracking-[0.35em]">
                <textPath href="#circleTextPath">
                  * RETICULAR ACTIVATING SYSTEM ALIGNMENT * MAKTUB * RESONANCE DETECTED * 11:11 FLOW *
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Central Interactive Core Trigger (Modular) */}
          <AnchorControl
            isFlowActive={isFlowActive}
            language={language}
            onTrigger={triggerMaktubAlignment}
            anchorButtonRef={centralSingularityRef}
          />
        </div>

        {/* LOWER FLOATING SYSTEM INFORMATION - DEVOID OF BORDERS AND GLASS PANELS */}
        <div className="w-full max-w-[1550px] flex justify-end items-end bg-transparent pb-2">
          {/* Right Side: Left empty and clean to prevent overlay collision with Nova robot */}
          <div className="w-[120px] hidden md:block" />
        </div>

      </div>
    </div>
  );
};

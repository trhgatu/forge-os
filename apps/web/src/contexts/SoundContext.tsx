"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useRef, useState, useEffect } from "react";

export type SoundType = "click" | "hover" | "success" | "error" | "on" | "off";

interface SoundContextType {
  playSound: (type: SoundType) => void;
  isEnabled: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const Ctx =
        window.AudioContext ?? (window.webkitAudioContext ? window.webkitAudioContext : undefined);

      if (Ctx) {
        audioCtxRef.current = new Ctx();
      }
    }

    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  const playTone = (
    freq: number,
    type: OscillatorType,
    duration: number,
    vol: number,
    ramp?: number
  ) => {
    const ctx = audioCtxRef.current;
    if (!ctx || !isEnabled) return;

    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    if (ramp) {
      osc.frequency.exponentialRampToValueAtTime(ramp, ctx.currentTime + duration);
    }

    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const playSound = (type: SoundType) => {
    if (!isEnabled) return;

    switch (type) {
      case "click":
        playTone(420, "sine", 0.06, 0.15, 840);
        break;
      case "hover":
        playTone(1400, "triangle", 0.03, 0.04, 2400);
        break;
      case "success":
        playTone(440, "sine", 0.4, 0.12);
        setTimeout(() => playTone(554, "sine", 0.4, 0.12), 60);
        setTimeout(() => playTone(659, "sine", 0.4, 0.12), 120);
        break;
      case "error":
        playTone(160, "sawtooth", 0.3, 0.1, 80);
        break;
      case "on":
        playTone(500, "sine", 0.2, 0.1, 900);
        break;
      case "off":
        playTone(900, "triangle", 0.2, 0.1, 300);
        break;
    }
  };

  const toggleSound = () => {
    const next = !isEnabled;
    setIsEnabled(next);

    if (next) setTimeout(() => playSound("on"), 30);
  };

  return (
    <SoundContext.Provider value={{ playSound, isEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}

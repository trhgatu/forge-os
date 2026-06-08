'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft, Terminal } from 'lucide-react';
import { Button } from '@/shared/components/ui';

export default function NotFound() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-transparent text-white p-6 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-forge-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-forge-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-forge-cyan/20 rounded-2xl blur-xl group-hover:bg-forge-cyan/30 transition-all duration-700" />
            <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center justify-center">
              <Compass size={48} className="text-forge-cyan animate-spin-slow" style={{ animationDuration: '20s' }} />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 opacity-80">
            <Terminal size={12} className="text-forge-cyan" />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-forge-cyan">
              Error Code: 404
            </span>
          </div>
          <h2 className="text-3xl font-display font-semibold text-white tracking-tight">
            Chamber Not Found
          </h2>
          <p className="text-xs text-gray-500 font-light max-w-sm mx-auto leading-relaxed italic">
            "Not all those who wander are lost, but this path leads to a void." The chamber you seek does not exist in the current configuration of the Forge.
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/forge/dashboard" passHref legacyBehavior>
            <Button
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.08)] flex items-center gap-2 text-xs uppercase tracking-wider font-mono cursor-pointer"
            >
              <ArrowLeft size={14} />
              Return to Nexus
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}

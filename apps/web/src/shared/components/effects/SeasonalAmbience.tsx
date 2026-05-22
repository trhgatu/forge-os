'use client';

import { ParticleCanvas } from './ParticleCanvas';
import { ShaderFlow } from './ShaderFlow';
import { SumiLeaves } from './SumiLeaves';

export type SeasonType = 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'All';

interface SeasonalAmbienceProps {
  season: SeasonType;
  containerRef: React.RefObject<HTMLElement | null>;
  leafCount?: number;
  flowOpacity?: number;
}

export function SeasonalAmbience({
  season,
  containerRef,
  leafCount = 12,
  flowOpacity = 0.65,
}: SeasonalAmbienceProps) {
  // Encapsulate all seasonal rendering logic in a single source of truth
  switch (season) {
    case 'Autumn':
      return (
        <>
          <ShaderFlow 
            className="absolute inset-0 h-full w-full grayscale mix-blend-screen pointer-events-none z-0" 
            brightness={1.15}
            scale={3.0}
          />
          <SumiLeaves containerRef={containerRef} count={leafCount} />
        </>
      );

    case 'All':
      return (
        <>
          <ShaderFlow 
            className="absolute inset-0 h-full w-full grayscale mix-blend-screen pointer-events-none z-0" 
            brightness={1.0}
            scale={3.2}
          />
          <SumiLeaves containerRef={containerRef} count={Math.round(leafCount * 0.7)} />
          <ParticleCanvas mode="shimmer" color="rgba(214, 211, 209, 0.1)" />
        </>
      );

    case 'Spring':
      return <ParticleCanvas mode="dust" color="rgba(74, 222, 128, 0.15)" />; // Emerald rain

    case 'Summer':
      return <ParticleCanvas mode="shimmer" color="rgba(251, 191, 36, 0.12)" />; // Amber sparkles

    case 'Winter':
    default:
      return <ParticleCanvas mode="snow" color="rgba(191, 219, 254, 0.2)" />; // Ice snow flakes
  }
}

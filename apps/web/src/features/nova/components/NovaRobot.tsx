'use client';

import { useGLTF, useAnimations } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useEffect, Suspense } from 'react';
import type * as THREE from 'three';

interface ModelProps {
  url: string;
  isTalking: boolean;
}

function Model({ url, isTalking }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (names.length === 0) return;

    // Detect if there are multiple animations, e.g. talking vs idle
    // If not, play the first available animation.
    let activeActionName = names[0];

    if (isTalking && names.length > 1) {
      // Look for talking, active, or secondary animations if they exist
      const talkAnim = names.find(n => n.toLowerCase().includes('talk') || n.toLowerCase().includes('speak') || n.toLowerCase().includes('action') || n.toLowerCase().includes('run'));
      if (talkAnim) activeActionName = talkAnim;
    } else {
      // Look for idle or first animation
      const idleAnim = names.find(n => n.toLowerCase().includes('idle') || n.toLowerCase().includes('static'));
      if (idleAnim) activeActionName = idleAnim;
    }

    const action = actions[activeActionName];
    if (action) {
      action.reset().fadeIn(0.3).play();
      return () => {
        action.fadeOut(0.3);
      };
    }
  }, [actions, names, isTalking]);

  useFrame((state) => {
    if (group.current) {
      // Float up and down gently (breathing effect) sitting slightly lower to allow jump headroom
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.8) * 0.05 - 0.95;
      // Gentle rotation back and forth
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.2;
    }
  });

  return <primitive ref={group} object={scene} scale={1.75} />;
}

// Preload the GLTF model for instantaneous loading
useGLTF.preload('/assets/models/stylised_robot.glb');

interface NovaRobotProps {
  isTalking?: boolean;
  className?: string;
}

export function NovaRobot({ isTalking = false, className }: NovaRobotProps) {
  return (
    <div className={className}>
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-forge-cyan animate-ping" />
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0.2, 6.0], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full pointer-events-none"
        >
          <ambientLight intensity={2.2} />
          <pointLight position={[10, 10, 10]} intensity={1.8} color="#22d3ee" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#818cf8" />
          <directionalLight position={[0, 4, 3]} intensity={1.5} />
          <Model url="/assets/models/stylised_robot.glb" isTalking={isTalking} />
        </Canvas>
      </Suspense>
    </div>
  );
}

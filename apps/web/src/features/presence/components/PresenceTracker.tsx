'use client';

import { usePathname } from 'next/navigation';
import type React from 'react';
import { useEffect } from 'react';

import { socketService } from '@/services/socketService';
import { useAuthStore } from '@/shared/store/authStore';

export const PresenceTracker: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Connect to 'presence' namespace ONCE on mount
    socketService.connect('/presence');

    return () => {
      // Optional: disconnect on unmount
      // socketService.disconnect();
    };
  }, []); // Empty dependency array = run once

  // Handle identification logic using Auth Token
  useEffect(() => {
    const socket = socketService.getSocket('/presence');
    const accessToken = useAuthStore.getState().accessToken;

    if (socket) {
      const handleConnect = () => {
        // console.log('🔑 Socket connected, identifying...');
        if (accessToken) socket.emit('identify', { token: accessToken });
        socket.emit('updateLocation', { path: pathname });
      };

      if (socket.connected) {
        handleConnect();
      } else {
        socket.on('connect', handleConnect);
      }

      return () => {
        socket.off('connect', handleConnect);
      };
    }
  }, [pathname]); // Re-run on pathname change to update location, but identify is idempotent-ish

  return null; // Headless component
};



import type { BackendResponse } from '@forge/core';
import { apiClient } from '@/services/apiClient';

export interface StatusEffectDto {
  id: string;
  type: string;
  value?: any;
  createdAt: string;
  expiresAt: string;
}

export interface VitalityStats {
  userId: string;
  stamina: number;
  maxStamina: number;
  strength: number;
  lastStaminaUpdatedAt: string;
  totalsToday?: {
    hydrationMl: number;
    sleep?: {
      logged: boolean;
      durationHours: number;
      quality: number;
    };
    workouts: Array<{
      id: string;
      type: string;
      durationMinutes: number;
      intensity: string;
      caloriesBurned: number;
      loggedAt: string;
    }>;
  };
}

export interface LogVitalityDto {
  type: 'HYDRATION' | 'SLEEP' | 'WORKOUT' | 'CAFFEINE' | 'STEPS' | 'MAKTUB_ALIGN';
  value: number;
  metadata?: any;
}

export const vitalityService = {
  getStats: async (): Promise<VitalityStats> => {
    const res = await apiClient.get<BackendResponse<VitalityStats>>('/vitality/stats');
    return res.data.data;
  },

  logActivity: async (data: LogVitalityDto): Promise<VitalityStats> => {
    const res = await apiClient.post<BackendResponse<VitalityStats>>('/vitality/log', data);
    return res.data.data;
  },
};

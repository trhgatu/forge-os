import type { BackendResponse } from '@forge/core';
import { apiClient } from '@/services/apiClient';

export interface SystemConfigDto {
  status: string;
  data: Record<string, any>;
}

export const systemConfigService = {
  getConfigs: async (): Promise<Record<string, any>> => {
    const res = await apiClient.get<SystemConfigDto>('/system/configs');
    return res.data.data;
  },

  updateConfig: async (key: string, value: any): Promise<void> => {
    await apiClient.patch(`/system/configs/${key}`, { value });
  },
};

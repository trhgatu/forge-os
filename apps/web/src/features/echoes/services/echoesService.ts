import { apiClient } from '@/services/apiClient';

export interface FlowMoment {
  id: string;
  time: string;
  fileName: string;
  gitBranch: string;
  cpuLoad: number;
  coordinates: { x: number; y: number };
}

export const echoesService = {
  async syncMoment(data: Omit<FlowMoment, 'id' | 'time'>): Promise<FlowMoment> {
    const response = await apiClient.post('/echoes/sync', {
      fileName: data.fileName,
      gitBranch: data.gitBranch,
      cpuLoad: data.cpuLoad,
      coordX: data.coordinates.x,
      coordY: data.coordinates.y,
    });

    const backendMoment = response.data.data;
    return {
      id: backendMoment.id,
      time: new Date(backendMoment.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      fileName: backendMoment.fileName,
      gitBranch: backendMoment.gitBranch,
      cpuLoad: backendMoment.cpuLoad,
      coordinates: {
        x: backendMoment.coordX,
        y: backendMoment.coordY,
      },
    };
  },

  async getHistory(): Promise<FlowMoment[]> {
    const response = await apiClient.get('/echoes/history');
    const list = response.data.data || [];
    return list.map((item: any) => ({
      id: item.id,
      time: new Date(item.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      fileName: item.fileName,
      gitBranch: item.gitBranch,
      cpuLoad: item.cpuLoad,
      coordinates: {
        x: item.coordX,
        y: item.coordY,
      },
    }));
  },

  async clearHistory(): Promise<void> {
    await apiClient.post('/echoes/clear');
  },
};

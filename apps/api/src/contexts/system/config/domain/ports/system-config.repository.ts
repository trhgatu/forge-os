import { SystemConfig } from '../entities/system-config.entity';

export interface SystemConfigRepository {
  get(key: string): Promise<SystemConfig | null>;
  set(key: string, value: any): Promise<void>;
  getAll(): Promise<SystemConfig[]>;
}

import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { SystemConfigRepository } from '../../domain/ports/system-config.repository';

@Injectable()
export class ConfigService implements OnModuleInit {
  private readonly cache = new Map<string, any>();

  constructor(
    @Inject('SystemConfigRepository')
    private readonly configRepository: SystemConfigRepository,
  ) {}

  async onModuleInit() {
    await this.loadAllToMemory();
  }

  async loadAllToMemory() {
    const configs = await this.configRepository.getAll();
    this.cache.clear();
    configs.forEach((c) => {
      this.cache.set(c.key, c.value);
    });
  }

  get<T>(key: string, defaultValue?: T): T {
    if (this.cache.has(key)) {
      return this.cache.get(key) as T;
    }
    return defaultValue as T;
  }

  async set(key: string, value: any): Promise<void> {
    await this.configRepository.set(key, value);
    this.cache.set(key, value);
  }

  getAll(): Record<string, any> {
    const all: Record<string, any> = {};
    this.cache.forEach((val, key) => {
      all[key] = val;
    });
    return all;
  }
}

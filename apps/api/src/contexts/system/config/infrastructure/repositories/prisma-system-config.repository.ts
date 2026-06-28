import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { SystemConfig } from '../../domain/entities/system-config.entity';
import { SystemConfigRepository } from '../../domain/ports/system-config.repository';

@Injectable()
export class PrismaSystemConfigRepository implements SystemConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(key: string): Promise<SystemConfig | null> {
    const config = await this.prisma.systemConfig.findUnique({
      where: { key },
    });
    if (!config) return null;
    return new SystemConfig(config.key, config.value, config.updatedAt);
  }

  async set(key: string, value: any): Promise<void> {
    await this.prisma.systemConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  async getAll(): Promise<SystemConfig[]> {
    const configs = await this.prisma.systemConfig.findMany();
    return configs.map((c) => new SystemConfig(c.key, c.value, c.updatedAt));
  }
}

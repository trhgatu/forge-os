import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { VitalityRepository } from '../../domain/vitality.repository';
import { VitalityLog } from '../../domain/entities/vitality-log.entity';
import { UserVitality } from '../../domain/entities/user-vitality.entity';
import { VitalityMapper } from './vitality.mapper';

@Injectable()
export class PrismaVitalityRepository implements VitalityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveLog(log: VitalityLog): Promise<void> {
    const data = VitalityMapper.toLogPersistence(log);
    await this.prisma.vitalityLog.upsert({
      where: { id: log.id.value },
      create: data,
      update: data,
    });
  }

  async findLogsByUserId(
    userId: string,
    filters?: { type?: string; since?: Date },
  ): Promise<VitalityLog[]> {
    const where: any = { userId };
    if (filters?.type) {
      where.type = filters.type;
    }
    if (filters?.since) {
      where.loggedAt = { gte: filters.since };
    }

    const records = await this.prisma.vitalityLog.findMany({
      where,
      orderBy: { loggedAt: 'desc' },
    });

    return records.map((r) => VitalityMapper.toLogDomain(r));
  }

  async saveVitality(vitality: UserVitality): Promise<void> {
    await this.prisma.userStats.update({
      where: { userId: vitality.userId },
      data: {
        stamina: vitality.stamina,
        maxStamina: vitality.maxStamina,
        strength: vitality.strength,
        lastStaminaUpdatedAt: vitality.lastStaminaUpdatedAt,
      },
    });
  }

  async findVitalityByUserId(userId: string): Promise<UserVitality | null> {
    const stats = await this.prisma.userStats.findUnique({
      where: { userId },
    });

    if (!stats) return null;

    return VitalityMapper.toVitalityDomain(stats);
  }
}

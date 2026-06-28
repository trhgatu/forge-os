import { VitalityLog as PrismaVitalityLog, UserStats as PrismaUserStats } from '@prisma/client';
import { VitalityLog } from '../../domain/entities/vitality-log.entity';
import { UserVitality } from '../../domain/entities/user-vitality.entity';
import { VitalityLogId } from '../../domain/value-objects/vitality-id.vo';

export class VitalityMapper {
  static toLogDomain(raw: PrismaVitalityLog): VitalityLog {
    return VitalityLog.create({
      id: VitalityLogId.fromString(raw.id),
      userId: raw.userId,
      type: raw.type,
      value: raw.value,
      metadata: raw.metadata,
      loggedAt: raw.loggedAt,
    });
  }

  static toLogPersistence(domain: VitalityLog): any {
    return {
      id: domain.id.value,
      userId: domain.userId,
      type: domain.type,
      value: domain.value,
      metadata: domain.metadata,
      loggedAt: domain.loggedAt,
    };
  }

  static toVitalityDomain(stats: PrismaUserStats): UserVitality {
    return UserVitality.create({
      userId: stats.userId,
      stamina: stats.stamina,
      maxStamina: stats.maxStamina,
      strength: stats.strength,
      lastStaminaUpdatedAt: stats.lastStaminaUpdatedAt,
    });
  }
}

import { VitalityLog } from './entities/vitality-log.entity';
import { UserVitality } from './entities/user-vitality.entity';

export abstract class VitalityRepository {
  // Logs
  abstract saveLog(log: VitalityLog): Promise<void>;
  abstract findLogsByUserId(
    userId: string,
    filters?: { type?: string; since?: Date },
  ): Promise<VitalityLog[]>;

  // Vitality Stats
  abstract saveVitality(vitality: UserVitality): Promise<void>;
  abstract findVitalityByUserId(userId: string): Promise<UserVitality | null>;
}

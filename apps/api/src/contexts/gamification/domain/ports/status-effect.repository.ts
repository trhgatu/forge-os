import { UserStatusEffect } from '../status-effect.entity';

export abstract class StatusEffectRepository {
  abstract save(effect: UserStatusEffect): Promise<void>;
  abstract findActiveByUserId(userId: string): Promise<UserStatusEffect[]>;
  abstract delete(userId: string, type: string): Promise<void>;
}

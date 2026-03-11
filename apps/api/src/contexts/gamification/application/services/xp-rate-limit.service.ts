import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { IXpRateLimitConfig } from '../strategies/xp-strategy.decorator';

@Injectable()
export class XpRateLimitService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async check(
    userId: string,
    pattern: string,
    config: IXpRateLimitConfig,
    xpAmount: number,
    dailyTotalCap: number = 1000,
  ): Promise<{ allowed: boolean; reason?: string }> {
    const today = new Date().toISOString().split('T')[0];

    const cooldownKey = `xp:rate:${userId}:${pattern}:cooldown`;
    const cooldownExists = await this.redis.exists(cooldownKey);
    if (cooldownExists) {
      return { allowed: false, reason: `cooldown:${pattern}` };
    }

    const dailyCapKey = `xp:rate:${userId}:${pattern}:daily:${today}`;
    const dailyCount = parseInt((await this.redis.get(dailyCapKey)) || '0');
    if (dailyCount >= config.dailyCap) {
      return { allowed: false, reason: `daily_cap:${pattern}` };
    }

    const totalXpKey = `xp:rate:${userId}:total_xp:${today}`;
    const totalXpToday = parseInt((await this.redis.get(totalXpKey)) || '0');
    if (totalXpToday + xpAmount > dailyTotalCap) {
      return { allowed: false, reason: 'daily_total_cap' };
    }

    return { allowed: true };
  }

  async record(
    userId: string,
    pattern: string,
    config: IXpRateLimitConfig,
    xpAmount: number,
  ): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    const secondsUntilMidnight = this.secondsUntilMidnight();

    if (config.cooldownMinutes > 0) {
      await this.redis.set(
        `xp:rate:${userId}:${pattern}:cooldown`,
        '1',
        'EX',
        config.cooldownMinutes * 60,
      );
    }

    const dailyCapKey = `xp:rate:${userId}:${pattern}:daily:${today}`;
    await this.redis.incr(dailyCapKey);
    await this.redis.expire(dailyCapKey, secondsUntilMidnight);

    const totalXpKey = `xp:rate:${userId}:total_xp:${today}`;
    await this.redis.incrby(totalXpKey, xpAmount);
    await this.redis.expire(totalXpKey, secondsUntilMidnight);
  }

  private secondsUntilMidnight(): number {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
  }
}

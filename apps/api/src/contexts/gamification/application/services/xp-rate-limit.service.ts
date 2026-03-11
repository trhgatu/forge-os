import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { IXpRateLimitConfig } from '../strategies/xp-strategy.decorator';

@Injectable()
export class XpRateLimitService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async checkAndRecord(
    userId: string,
    pattern: string,
    config: IXpRateLimitConfig,
    xpAmount: number,
    dailyTotalCap: number = 1000,
  ): Promise<{ allowed: boolean; reason?: string }> {
    const now = new Date();
    const today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const secondsUntilMidnight = this.secondsUntilMidnight();

    const cooldownKey = `xp:rate:${userId}:${pattern}:cooldown`;
    const dailyCapKey = `xp:rate:${userId}:${pattern}:daily:${today}`;
    const totalXpKey = `xp:rate:${userId}:total_xp:${today}`;

    const script = `
      local cooldownKey = KEYS[1]
      local dailyCapKey = KEYS[2]
      local totalXpKey = KEYS[3]

      local cooldownMinutes = tonumber(ARGV[1])
      local dailyCap = tonumber(ARGV[2])
      local dailyTotalCap = tonumber(ARGV[3])
      local xpAmount = tonumber(ARGV[4])
      local secondsUntilMidnight = tonumber(ARGV[5])

      if redis.call('EXISTS', cooldownKey) == 1 then
        return 'cooldown'
      end

      local dailyCount = tonumber(redis.call('GET', dailyCapKey) or '0')
      if dailyCount >= dailyCap then
        return 'daily_cap'
      end

      local totalXpToday = tonumber(redis.call('GET', totalXpKey) or '0')
      if totalXpToday + xpAmount > dailyTotalCap then
        return 'daily_total_cap'
      end

      if cooldownMinutes > 0 then
        redis.call('SET', cooldownKey, '1', 'EX', cooldownMinutes * 60)
      end

      local newCount = redis.call('INCR', dailyCapKey)
      if newCount == 1 then
        redis.call('EXPIRE', dailyCapKey, secondsUntilMidnight)
      end

      redis.call('INCRBY', totalXpKey, xpAmount)
      redis.call('EXPIRE', totalXpKey, secondsUntilMidnight)

      return 'allowed'
    `;

    const result = await this.redis.eval(
      script,
      3,
      cooldownKey,
      dailyCapKey,
      totalXpKey,
      config.cooldownMinutes,
      config.dailyCap,
      dailyTotalCap,
      xpAmount,
      secondsUntilMidnight,
    );

    if (result === 'allowed') {
      return { allowed: true };
    }

    return { allowed: false, reason: result as string };
  }

  private secondsUntilMidnight(): number {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
  }
}

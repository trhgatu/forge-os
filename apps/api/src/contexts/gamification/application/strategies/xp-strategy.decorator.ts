import { SetMetadata } from '@nestjs/common';

export const XP_STRATEGY_KEY = 'XP_STRATEGY_KEY';
export const XpStrategy = (pattern: string) => SetMetadata(XP_STRATEGY_KEY, pattern);

export interface IXpRateLimitConfig {
  cooldownMinutes: number;
  dailyCap: number;
  dailyXpCap?: number;
}

export interface IXpStrategy<T = unknown> {
  calculate(payload: T): number;
  getDescription(payload: T): string;
  getRateLimitConfig(): IXpRateLimitConfig;
}

import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';

export interface MemoryCreatedPayload {
  memoryId: string;
}

@Injectable()
@XpStrategy('reflection.memory.created')
export class MemoryCreatedXpStrategy implements IXpStrategy<MemoryCreatedPayload> {
  calculate() {
    return 0;
  }

  getDescription() {
    return `Created a Memory Codex Entry`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    return {
      cooldownMinutes: 10,
      dailyCap: 2,
    };
  }
}

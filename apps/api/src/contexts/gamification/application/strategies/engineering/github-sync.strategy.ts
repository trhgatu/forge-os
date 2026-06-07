// apps/api/src/contexts/gamification/application/strategies/github-sync.strategy.ts
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';
import { GithubSyncPayload } from '../contracts/xp-payloads';

@XpStrategy('engineering.project.synced')
export class GithubSyncXpStrategy implements IXpStrategy<GithubSyncPayload> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculate(payload: GithubSyncPayload) {
    return 0; // Disabled direct XP to prevent inflation; Git Sync is now a Quest.
  }

  getDescription(payload: GithubSyncPayload) {
    const repo = payload?.repo ?? 'Unknown';
    const commits = payload?.commitCount ?? 0;
    return `GitHub Sync: ${repo} (+${commits} commits)`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    return {
      cooldownMinutes: 30, // 30 minutes cooldown to prevent spamming syncs
      dailyCap: 10,
    };
  }
}

// apps/api/src/contexts/gamification/application/strategies/github-sync.strategy.ts
import { IXpStrategy, XpStrategy } from '../xp-strategy.decorator';
import { GithubSyncPayload } from '../contracts/xp-payloads';

@XpStrategy('engineering.project.synced')
export class GithubSyncXpStrategy implements IXpStrategy<GithubSyncPayload> {
  calculate(payload: GithubSyncPayload) {
    const commits = payload?.commitCount ?? 0;
    return commits * 5;
  }

  getDescription(payload: GithubSyncPayload) {
    const repo = payload?.repo ?? 'Unknown';
    const commits = payload?.commitCount ?? 0;
    return `GitHub Sync: ${repo} (+${commits} commits)`;
  }
}

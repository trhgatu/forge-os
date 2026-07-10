import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';
import { GithubSyncPayload } from '../contracts/xp-payloads';
import { ConfigService } from '../../../../system/config/application/services/config.service';

@Injectable()
@XpStrategy('engineering.project.synced')
export class GithubSyncXpStrategy implements IXpStrategy<GithubSyncPayload> {
  constructor(private readonly configService: ConfigService) {}

  private getRule() {
    const rules = this.configService.get<Record<string, any>>('gamification_xp_rules', {});
    return rules['engineering.project.synced'] || { xp: 0, cooldownMinutes: 30, dailyCap: 10 };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculate(payload: GithubSyncPayload) {
    return this.getRule().xp;
  }

  getDescription(payload: GithubSyncPayload) {
    const repo = payload?.repo ?? 'Unknown';
    const commits = payload?.commitCount ?? 0;
    return `GitHub Sync: ${repo} (+${commits} commits)`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    const rule = this.getRule();
    return {
      cooldownMinutes: rule.cooldownMinutes,
      dailyCap: rule.dailyCap,
    };
  }
}

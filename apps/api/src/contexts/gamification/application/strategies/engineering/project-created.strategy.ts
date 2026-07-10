import { Injectable } from '@nestjs/common';
import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';
import { ProjectCreatedPayload } from '../contracts/xp-payloads';
import { ConfigService } from '../../../../system/config/application/services/config.service';

@Injectable()
@XpStrategy('engineering.project.created')
export class ProjectCreatedXpStrategy implements IXpStrategy<ProjectCreatedPayload> {
  constructor(private readonly configService: ConfigService) {}

  private getRule() {
    const rules = this.configService.get<Record<string, any>>('gamification_xp_rules', {});
    return rules['engineering.project.created'] || { xp: 100, cooldownMinutes: 0, dailyCap: 5 };
  }

  calculate() {
    return this.getRule().xp;
  }

  getDescription(payload: ProjectCreatedPayload) {
    return `Created project: ${payload.title || 'Unknown'}`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    const rule = this.getRule();
    return {
      cooldownMinutes: rule.cooldownMinutes,
      dailyCap: rule.dailyCap,
    };
  }
}

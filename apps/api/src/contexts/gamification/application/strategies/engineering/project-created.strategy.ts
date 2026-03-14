import { IXpStrategy, XpStrategy, IXpRateLimitConfig } from '../xp-strategy.decorator';
import { ProjectCreatedPayload } from '../contracts/xp-payloads';

@XpStrategy('engineering.project.created')
export class ProjectCreatedXpStrategy implements IXpStrategy<ProjectCreatedPayload> {
  calculate() {
    return 100;
  }

  getDescription(payload: ProjectCreatedPayload) {
    return `Created project: ${payload.title || 'Unknown'}`;
  }

  getRateLimitConfig(): IXpRateLimitConfig {
    return {
      cooldownMinutes: 0,
      dailyCap: 5,
    };
  }
}

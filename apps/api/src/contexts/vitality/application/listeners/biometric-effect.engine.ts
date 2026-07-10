import { Injectable, Logger, Inject } from '@nestjs/common';
import { ConfigService } from '../../../system/config/application/services/config.service';
import { BiometricProcessor } from './processors/biometric-processor.interface';

@Injectable()
export class BiometricEffectEngine {
  private readonly logger = new Logger(BiometricEffectEngine.name);

  constructor(
    private readonly configService: ConfigService,
    @Inject('BiometricProcessor')
    private readonly processors: BiometricProcessor[],
  ) {}

  async executeEffects(userId: string, actionType: string): Promise<void> {
    const rules = this.configService.get<Record<string, any[]>>('biometric_impact_rules', {});
    this.logger.debug(`Biometric Rules loaded from ConfigService: ${JSON.stringify(rules)}`);
    this.logger.debug(`Processing actionType: ${actionType} for user: ${userId}`);
    const effects = rules[actionType];

    if (!effects || !Array.isArray(effects)) {
      this.logger.debug(`No biometric effects mapped for actionType: ${actionType}`);
      return;
    }

    this.logger.log(
      `Executing ${effects.length} biometric effects for user ${userId} on action ${actionType}`,
    );

    for (const effect of effects) {
      if (!effect || typeof effect.type !== 'string') continue;

      const processor = this.processors.find((p) => p.supports(effect.type));
      if (!processor) {
        this.logger.warn(`No biometric processor found for effect type: ${effect.type}`);
        continue;
      }

      try {
        await processor.process(userId, effect);
      } catch (err: any) {
        if (err.message && err.message.includes('stamina')) {
          this.logger.warn(
            `Biometric effect ${effect.type} skipped for user ${userId} on action ${actionType}: ${err.message}`,
          );
        } else {
          this.logger.error(
            `Failed to process biometric effect ${effect.type} for actionType: ${actionType} and user: ${userId}`,
            err.stack,
          );
        }
      }
    }
  }
}

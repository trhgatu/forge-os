import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { GamifiedEvent } from '@shared/interfaces';
import { BiometricEffectEngine } from './biometric-effect.engine';

@Injectable()
export class VitalityEventDispatcher implements OnModuleInit {
  private readonly logger = new Logger(VitalityEventDispatcher.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly effectEngine: BiometricEffectEngine,
  ) {}

  onModuleInit() {
    this.eventBus.subject$.subscribe({
      next: async (event: any) => {
        if (this.isGamifiedEvent(event)) {
          await this.handleGamifiedEvent(event);
        }
      },
      error: (err) => {
        this.logger.error('Error in EventBus stream subscription', err);
      },
    });
  }

  private isGamifiedEvent(event: any): event is GamifiedEvent {
    return (
      event &&
      typeof event.getUserId === 'function' &&
      typeof event.getGamificationProgresses === 'function'
    );
  }

  private async handleGamifiedEvent(event: GamifiedEvent) {
    const userId = event.getUserId();
    const progresses = event.getGamificationProgresses();

    for (const progress of progresses) {
      const { actionType } = progress;
      try {
        await this.effectEngine.executeEffects(userId, actionType);
      } catch (err) {
        this.logger.error(
          `Failed to process biometric action for actionType: ${actionType} and user: ${userId}`,
          err,
        );
      }
    }
  }
}

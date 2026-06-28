import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { EventBus, CommandBus } from '@nestjs/cqrs';
import { GamifiedEvent } from '@shared/interfaces';
import { ConsumeStaminaCommand } from '../commands/consume-stamina/consume-stamina.command';
import { LogVitalityActionCommand } from '../commands/log-vitality-action/log-vitality-action.command';

@Injectable()
export class VitalityEventDispatcher implements OnModuleInit {
  private readonly logger = new Logger(VitalityEventDispatcher.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
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
        if (actionType === 'CREATE_JOURNAL') {
          this.logger.log(
            `CREATE_JOURNAL action detected for user ${userId}. Consuming 15 stamina.`,
          );
          await this.commandBus.execute(new ConsumeStaminaCommand(userId, 15));
        } else if (actionType === 'COMPLETE_TASK') {
          this.logger.log(
            `COMPLETE_TASK action detected for user ${userId}. Consuming 10 stamina.`,
          );
          await this.commandBus.execute(new ConsumeStaminaCommand(userId, 10));
        } else if (actionType === 'WS_PRESENCE') {
          this.logger.log(
            `WS_PRESENCE action detected for user ${userId}. Triggering Maktub Alignment.`,
          );
          await this.commandBus.execute(
            new LogVitalityActionCommand(userId, 'MAKTUB_ALIGN', 1, { source: 'echoes_sync' }),
          );
        }
      } catch (err) {
        this.logger.error(
          `Failed to process vitality action for actionType: ${actionType} and user: ${userId}`,
          err,
        );
      }
    }
  }
}

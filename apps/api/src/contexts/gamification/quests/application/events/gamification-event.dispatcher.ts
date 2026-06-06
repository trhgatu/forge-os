import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { EventBus, CommandBus } from '@nestjs/cqrs';
import { GamifiedEvent } from '@shared/interfaces';
import { IncrementObjectiveProgressCommand } from '../commands';

@Injectable()
export class GamificationEventDispatcher implements OnModuleInit {
  private readonly logger = new Logger(GamificationEventDispatcher.name);

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
      const { actionType, amount, referenceId } = progress;
      try {
        await this.commandBus.execute(
          new IncrementObjectiveProgressCommand(userId, actionType, amount, referenceId ?? null),
        );
        this.logger.log(
          `Dispatched increment progress command for user ${userId}, action: ${actionType}`,
        );
      } catch (err) {
        this.logger.error(
          `Failed to dispatch progress command for action: ${actionType} and user: ${userId}`,
          err,
        );
      }
    }
  }
}

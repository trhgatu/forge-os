import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { EventBus, CommandBus } from '@nestjs/cqrs';
import { GamifiedEvent } from '@shared/interfaces';
import { CompleteHabitCommand } from '../commands/complete-habit/complete-habit.command';
import { HabitsRepository } from '../../domain/habits.repository';

@Injectable()
export class HabitsAutomationDispatcher implements OnModuleInit {
  private readonly logger = new Logger(HabitsAutomationDispatcher.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    private readonly habitsRepository: HabitsRepository,
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
        const habits = await this.habitsRepository.findByActionType(userId, actionType);

        for (const habit of habits) {
          const todayStr = new Date().toISOString().split('T')[0];
          const alreadyCompleted = await this.habitsRepository.hasCompletedHabitToday(
            userId,
            habit.id.value,
            todayStr,
          );

          if (!alreadyCompleted) {
            await this.commandBus.execute(new CompleteHabitCommand(userId, habit.id.value));
            this.logger.log(
              `Automatically completed habit ${habit.id.value} ("${habit.title}") for user ${userId} via action ${actionType}`,
            );
          }
        }
      } catch (err) {
        this.logger.error(
          `Failed to automatically complete habit for action: ${actionType} and user: ${userId}`,
          err,
        );
      }
    }
  }
}

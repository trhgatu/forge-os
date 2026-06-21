import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { EventBus, CommandBus } from '@nestjs/cqrs';
import { HabitCompletedEvent } from '../../../habits/domain/events/habit-completed.event';
import { RoutinesRepository } from '../../domain/routines.repository';
import { HabitsRepository } from '../../../habits/domain/habits.repository';
import { CompleteRoutineCommand } from '../commands/complete-routine/complete-routine.command';

@Injectable()
export class RoutineAutomationListener implements OnModuleInit {
  private readonly logger = new Logger(RoutineAutomationListener.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    @Inject('RoutinesRepository')
    private readonly routinesRepository: RoutinesRepository,
    @Inject('HabitsRepository')
    private readonly habitsRepository: HabitsRepository,
  ) {}

  onModuleInit() {
    this.eventBus.subject$.subscribe({
      next: async (event: any) => {
        if (event instanceof HabitCompletedEvent) {
          await this.handleHabitCompleted(event);
        }
      },
      error: (err) => {
        this.logger.error('Error in EventBus subscription', err);
      },
    });
  }

  private async handleHabitCompleted(event: HabitCompletedEvent) {
    const { userId, habitId } = event;
    const todayStr = new Date().toISOString().split('T')[0];

    try {
      const routines = await this.routinesRepository.findAll(userId);

      const matchingRoutines = routines.filter((routine) =>
        routine.steps.some((step) => step.habitId === habitId),
      );

      for (const routine of matchingRoutines) {
        const alreadyCompleted = await this.routinesRepository.hasCompletedRoutineToday(
          userId,
          routine.id,
          todayStr,
        );

        if (alreadyCompleted) {
          continue;
        }

        const allCompleted = await Promise.all(
          routine.steps.map((step) =>
            this.habitsRepository.hasCompletedHabitToday(userId, step.habitId, todayStr),
          ),
        );

        const isRoutineFullyCompleted = allCompleted.every((completed) => completed === true);

        if (isRoutineFullyCompleted) {
          await this.commandBus.execute(new CompleteRoutineCommand(userId, routine.id));
          this.logger.log(
            `Automatically completed routine ${routine.id} ("${routine.title}") for user ${userId} because all habits are complete today.`,
          );
        }
      }
    } catch (error) {
      this.logger.error(
        `Failed to run routine auto-completion checks for user ${userId} and habit ${habitId}`,
        error,
      );
    }
  }
}

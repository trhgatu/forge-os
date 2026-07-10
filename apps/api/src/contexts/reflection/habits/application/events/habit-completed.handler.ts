import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HabitCompletedEvent } from '../../domain/events/habit-completed.event';
import { Inject, Logger } from '@nestjs/common';
import { ACTIVITY_STREAM_PORT, IActivityStreamPort } from '@shared/ports/activity-stream.port';

@EventsHandler(HabitCompletedEvent)
export class HabitCompletedHandler implements IEventHandler<HabitCompletedEvent> {
  private readonly logger = new Logger(HabitCompletedHandler.name);

  constructor(
    @Inject(ACTIVITY_STREAM_PORT)
    private readonly activityStream: IActivityStreamPort,
  ) {}

  async handle(event: HabitCompletedEvent) {
    this.logger.log(`Habit completed event handled: ${event.habitId}`);
    try {
      await this.activityStream.emit('reflection.habit.completed', event.userId, {
        habitId: event.habitId,
        title: event.habitTitle,
        xpReward: event.xpReward,
      });
      this.logger.log(
        `Emitted reflection.habit.completed event to activity stream for habit ${event.habitId}`,
      );
    } catch (error) {
      this.logger.error(`Failed to emit reflection.habit.completed event: ${error}`);
    }
  }
}

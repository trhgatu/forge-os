import { EventsHandler, IEventHandler, CommandBus } from '@nestjs/cqrs';
import { HabitCompletedEvent } from '../../../../../reflection/habits/domain/events/habit-completed.event';
import { IncrementObjectiveProgressCommand } from '../../commands';

@EventsHandler(HabitCompletedEvent)
export class HabitCompletedQuestHandler implements IEventHandler<HabitCompletedEvent> {
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: HabitCompletedEvent): Promise<void> {
    await this.commandBus.execute(
      new IncrementObjectiveProgressCommand(event.userId, 'CHECK_HABIT', 1, event.habitId),
    );
  }
}

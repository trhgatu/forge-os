import { EventsHandler, IEventHandler, CommandBus } from '@nestjs/cqrs';
import { TaskCompletedEvent } from '../../../../../reflection/tasks/application/events/task-completed.event';
import { IncrementObjectiveProgressCommand } from '../../commands';

@EventsHandler(TaskCompletedEvent)
export class TaskCompletedQuestHandler implements IEventHandler<TaskCompletedEvent> {
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: TaskCompletedEvent): Promise<void> {
    await this.commandBus.execute(
      new IncrementObjectiveProgressCommand(event.userId, 'COMPLETE_TASK', 1, event.taskId),
    );
  }
}

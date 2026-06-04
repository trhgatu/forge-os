import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TaskCompletedEvent } from './task-completed.event';
import { Logger } from '@nestjs/common';

@EventsHandler(TaskCompletedEvent)
export class TaskCompletedHandler implements IEventHandler<TaskCompletedEvent> {
  private readonly logger = new Logger(TaskCompletedHandler.name);

  handle(event: TaskCompletedEvent) {
    this.logger.log(`Task completed event handled: ${event.taskId} for user ${event.userId}`);
  }
}

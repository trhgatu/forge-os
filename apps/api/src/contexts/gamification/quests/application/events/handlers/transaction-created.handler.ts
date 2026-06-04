import { EventsHandler, IEventHandler, CommandBus } from '@nestjs/cqrs';
import { TransactionCreatedEvent } from '../../../../../wealth/application/events/transaction-created.event';
import { IncrementObjectiveProgressCommand } from '../../commands';

@EventsHandler(TransactionCreatedEvent)
export class TransactionCreatedQuestHandler implements IEventHandler<TransactionCreatedEvent> {
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: TransactionCreatedEvent): Promise<void> {
    await this.commandBus.execute(
      new IncrementObjectiveProgressCommand(event.userId, 'LOG_TRANSACTION', 1, event.id),
    );

    if (event.hasReflection) {
      await this.commandBus.execute(
        new IncrementObjectiveProgressCommand(event.userId, 'CREATE_REFLECTION', 1, event.id),
      );
    }
  }
}

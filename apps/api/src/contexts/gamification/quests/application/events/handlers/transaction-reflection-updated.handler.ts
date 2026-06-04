import { EventsHandler, IEventHandler, CommandBus } from '@nestjs/cqrs';
import { TransactionReflectionUpdatedEvent } from '../../../../../wealth/application/events/transaction-reflection-updated.event';
import { IncrementObjectiveProgressCommand } from '../../commands';

@EventsHandler(TransactionReflectionUpdatedEvent)
export class TransactionReflectionUpdatedQuestHandler implements IEventHandler<TransactionReflectionUpdatedEvent> {
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: TransactionReflectionUpdatedEvent): Promise<void> {
    await this.commandBus.execute(
      new IncrementObjectiveProgressCommand(event.userId, 'CREATE_REFLECTION', 1, event.id),
    );
  }
}

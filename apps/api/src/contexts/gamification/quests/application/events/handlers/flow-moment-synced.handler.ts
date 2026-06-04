import { EventsHandler, IEventHandler, CommandBus } from '@nestjs/cqrs';
import { FlowMomentSyncedEvent } from '../../../../../reflection/echoes/application/events/flow-moment-synced.event';
import { IncrementObjectiveProgressCommand } from '../../commands';

@EventsHandler(FlowMomentSyncedEvent)
export class FlowMomentSyncedQuestHandler implements IEventHandler<FlowMomentSyncedEvent> {
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: FlowMomentSyncedEvent): Promise<void> {
    await this.commandBus.execute(
      new IncrementObjectiveProgressCommand(event.userId, 'WS_PRESENCE', 1, null),
    );
  }
}

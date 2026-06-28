import { EventsHandler, IEventHandler, CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { VitalityActionLoggedEvent } from '../../../vitality/application/events/vitality-action-logged.event';
import { ApplyStatusEffectCommand } from '../commands/apply-status-effect/apply-status-effect.command';

@EventsHandler(VitalityActionLoggedEvent)
@Injectable()
export class VitalityActionLoggedListener implements IEventHandler<VitalityActionLoggedEvent> {
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: VitalityActionLoggedEvent) {
    const { userId, type } = event;

    if (type === 'CAFFEINE') {
      await this.commandBus.execute(
        new ApplyStatusEffectCommand(userId, 'CAFFEINE_RUSH', 180, { xpModifier: 1.1 }),
      );
    } else if (type === 'MAKTUB_ALIGN') {
      await this.commandBus.execute(
        new ApplyStatusEffectCommand(userId, 'STOIC_RESOLVE', 45, { xpModifier: 1.2 }),
      );
    }
  }
}

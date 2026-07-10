import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BiometricProcessor } from './biometric-processor.interface';
import { ConsumeStaminaCommand } from '../../commands/consume-stamina/consume-stamina.command';

@Injectable()
export class ConsumeStaminaProcessor implements BiometricProcessor {
  constructor(private readonly commandBus: CommandBus) {}

  supports(type: string): boolean {
    return type === 'CONSUME_STAMINA';
  }

  async process(userId: string, payload: any): Promise<void> {
    const amount = Number(payload.amount ?? 0);
    if (amount <= 0) return;

    await this.commandBus.execute(new ConsumeStaminaCommand(userId, amount));
  }
}

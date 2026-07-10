import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BiometricProcessor } from './biometric-processor.interface';
import { LogVitalityActionCommand } from '../../commands/log-vitality-action/log-vitality-action.command';

@Injectable()
export class LogVitalityActionProcessor implements BiometricProcessor {
  constructor(private readonly commandBus: CommandBus) {}

  supports(type: string): boolean {
    return type === 'LOG_VITALITY_ACTION';
  }

  async process(userId: string, payload: any): Promise<void> {
    const actionType = String(payload.actionType || '');
    const value = Number(payload.value ?? 1);
    const metadata = payload.metadata ?? {};

    if (!actionType) return;

    await this.commandBus.execute(
      new LogVitalityActionCommand(userId, actionType, value, metadata),
    );
  }
}

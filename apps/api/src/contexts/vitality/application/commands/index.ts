import { LogVitalityActionHandler } from './log-vitality-action/log-vitality-action.handler';
import { ConsumeStaminaHandler } from './consume-stamina/consume-stamina.handler';

export * from './log-vitality-action/log-vitality-action.command';
export * from './log-vitality-action/log-vitality-action.handler';
export * from './consume-stamina/consume-stamina.command';
export * from './consume-stamina/consume-stamina.handler';

export const VitalityCommandHandlers = [LogVitalityActionHandler, ConsumeStaminaHandler];

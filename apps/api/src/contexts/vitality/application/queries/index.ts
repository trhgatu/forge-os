import { GetVitalityStatsHandler } from './get-vitality/get-vitality.handler';

export * from './get-vitality/get-vitality.query';
export * from './get-vitality/get-vitality.handler';

export const VitalityQueryHandlers = [GetVitalityStatsHandler];

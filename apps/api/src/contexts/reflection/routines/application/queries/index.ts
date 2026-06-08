import { GetAllRoutinesHandler } from './get-all-routines/get-all-routines.handler';

export * from './get-all-routines/get-all-routines.query';
export * from './get-all-routines/get-all-routines.handler';

export const QueryHandlers = [GetAllRoutinesHandler];

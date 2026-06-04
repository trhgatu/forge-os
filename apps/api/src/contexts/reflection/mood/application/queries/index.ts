import { GetAllMoodsHandler } from './get-all-moods/get-all-moods.handler';
import { GetMoodByIdHandler } from './get-mood-by-id/get-mood-by-id.handler';

export * from './get-all-moods/get-all-moods.query';
export * from './get-mood-by-id/get-mood-by-id.query';
export * from './mood-filter';

export const MoodQueryHandlers = [GetAllMoodsHandler, GetMoodByIdHandler];

import { GetAllQuestsHandler } from './get-all-quests/get-all-quests.handler';
import { GetDailyQuestsHandler } from './get-daily-quests/get-daily-quests.handler';
import { GetQuestByIdHandler } from './get-quest-by-id/get-quest-by-id.handler';

export * from './get-all-quests/get-all-quests.query';
export * from './get-all-quests/get-all-quests.handler';
export * from './get-daily-quests/get-daily-quests.query';
export * from './get-daily-quests/get-daily-quests.handler';
export * from './get-quest-by-id/get-quest-by-id.query';
export * from './get-quest-by-id/get-quest-by-id.handler';

export const QueryHandlers = [GetAllQuestsHandler, GetDailyQuestsHandler, GetQuestByIdHandler];

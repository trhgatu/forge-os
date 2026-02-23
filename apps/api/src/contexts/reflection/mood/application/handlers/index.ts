import { CreateMoodHandler } from './create-mood.handler';
import { UpdateMoodHandler } from './update-mood.handler';
import { DeleteMoodHandler } from './delete-mood.handler';
import { SoftDeleteMoodHandler } from './soft-delete-mood.handler';
import { RestoreMoodHandler } from './restore-mood.handler';
import { GetAllMoodsHandler } from './get-all-moods.handler';
import { GetMoodByIdHandler } from './get-mood-by-id.handler';

export const MoodHandlers = [
  CreateMoodHandler,
  UpdateMoodHandler,
  DeleteMoodHandler,
  SoftDeleteMoodHandler,
  RestoreMoodHandler,
  GetAllMoodsHandler,
  GetMoodByIdHandler,
];

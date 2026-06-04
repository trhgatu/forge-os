import { CreateMoodHandler } from './create-mood/create-mood.handler';
import { UpdateMoodHandler } from './update-mood/update-mood.handler';
import { DeleteMoodHandler } from './delete-mood/delete-mood.handler';
import { SoftDeleteMoodHandler } from './soft-delete-mood/soft-delete-mood.handler';
import { RestoreMoodHandler } from './restore-mood/restore-mood.handler';

export * from './create-mood/create-mood.command';
export * from './update-mood/update-mood.command';
export * from './delete-mood/delete-mood.command';
export * from './soft-delete-mood/soft-delete-mood.command';
export * from './restore-mood/restore-mood.command';

export const MoodCommandHandlers = [
  CreateMoodHandler,
  UpdateMoodHandler,
  DeleteMoodHandler,
  SoftDeleteMoodHandler,
  RestoreMoodHandler,
];

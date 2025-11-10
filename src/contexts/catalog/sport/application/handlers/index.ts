import { CreateSportHandler } from './create-sport.handler';
import { DeleteSportHandler } from './delete-sport.handler';
import { RestoreSportHandler } from './restore-sport.handler';
import { UpdateSportHandler } from './update-sport.handler';
import { SoftDeleteSportHandler } from './soft-delete-sport.handler';
import { GetAllSportsHandler } from './get-all-sports.handler';
import { GetSportByIdHandler } from './get-sport-by-id.handler';
import { GetAllSportsForPublicHandler } from './get-all-sports-for-public.handler';
import { GetSportByIdForPublicHandler } from './get-sport-by-id-public.handler';
import { InvalidateSportCacheHandler } from './invalidate-sport-cache.handler';

export const SportHandlers = [
  CreateSportHandler,
  UpdateSportHandler,
  DeleteSportHandler,
  SoftDeleteSportHandler,
  RestoreSportHandler,

  GetAllSportsHandler,
  GetSportByIdHandler,
  GetAllSportsForPublicHandler,
  GetSportByIdForPublicHandler,

  InvalidateSportCacheHandler,
];

export * from './create-sport.handler';
export * from './delete-sport.handler';
export * from './restore-sport.handler';
export * from './update-sport.handler';
export * from './soft-delete-sport.handler';
export * from './get-all-sports.handler';
export * from './get-sport-by-id.handler';
export * from './get-all-sports-for-public.handler';
export * from './get-sport-by-id-public.handler';
export * from './invalidate-sport-cache.handler';

import { CreateCourtHandler } from './create-court.handler';
import { DeleteCourtHandler } from './delete-court.handler';
import { RestoreCourtHandler } from './restore-court.handler';
import { UpdateCourtHandler } from './update-court.handler';
import { SoftDeleteCourtHandler } from './soft-delete-court.handler';
import { GetAllCourtsHandler } from './get-all-courts.handler';
import { GetCourtByIdHandler } from './get-court-by-id.handler';
import { GetAllCourtsForPublicHandler } from './get-all-courts-for-public.handler';
import { GetCourtByIdForPublicHandler } from './get-court-by-id-public.handler';
import { InvalidateCourtCacheHandler } from './invalidate-court-cache.handler';

export const CourtHandlers = [
  CreateCourtHandler,
  UpdateCourtHandler,
  DeleteCourtHandler,
  SoftDeleteCourtHandler,
  RestoreCourtHandler,

  GetAllCourtsHandler,
  GetCourtByIdHandler,
  GetAllCourtsForPublicHandler,
  GetCourtByIdForPublicHandler,

  InvalidateCourtCacheHandler,
];

export * from './create-court.handler';
export * from './delete-court.handler';
export * from './restore-court.handler';
export * from './update-court.handler';
export * from './soft-delete-court.handler';
export * from './get-all-courts.handler';
export * from './get-court-by-id.handler';
export * from './get-all-courts-for-public.handler';
export * from './get-court-by-id-public.handler';
export * from './invalidate-court-cache.handler';

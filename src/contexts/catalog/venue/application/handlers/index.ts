import { CreateVenueHandler } from './create-venue.handler';
import { DeleteVenueHandler } from './delete-venue.handler';
import { RestoreVenueHandler } from './restore-venue.handler';
import { UpdateVenueHandler } from './update-venue.handler';
import { SoftDeleteVenueHandler } from './soft-delete-venue.handler';
import { GetAllVenuesHandler } from './get-all-venues.handler';
import { GetVenueByIdHandler } from './get-venue-by-id.handler';
import { GetAllVenuesForPublicHandler } from './get-all-venues-for-public.handler';
import { GetVenueByIdForPublicHandler } from './get-venue-by-id-public.handler';
import { InvalidateVenueCacheHandler } from './invalidate-venue-cache.handler';

export const VenueHandlers = [
  CreateVenueHandler,
  UpdateVenueHandler,
  DeleteVenueHandler,
  SoftDeleteVenueHandler,
  RestoreVenueHandler,

  GetAllVenuesHandler,
  GetVenueByIdHandler,
  GetAllVenuesForPublicHandler,
  GetVenueByIdForPublicHandler,

  InvalidateVenueCacheHandler,
];

export * from './create-venue.handler';
export * from './delete-venue.handler';
export * from './restore-venue.handler';
export * from './update-venue.handler';
export * from './soft-delete-venue.handler';
export * from './get-all-venues.handler';
export * from './get-venue-by-id.handler';
export * from './get-all-venues-for-public.handler';
export * from './get-venue-by-id-public.handler';
export * from './invalidate-venue-cache.handler';

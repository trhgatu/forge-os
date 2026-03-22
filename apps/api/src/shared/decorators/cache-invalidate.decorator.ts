import { SetMetadata } from '@nestjs/common';
export const CACHE_INVALIDATE_KEY = 'cache_invalidate';
export const CacheInvalidate = (...namespaces: string[]) =>
  SetMetadata(CACHE_INVALIDATE_KEY, namespaces);

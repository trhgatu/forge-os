// src/shared/interceptors/cache-invalidation.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { concatMap } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';
import { CACHE_INVALIDATE_KEY } from '../decorators/cache-invalidate.decorator';

@Injectable()
export class CacheInvalidationInterceptor implements NestInterceptor {
  constructor(
    private readonly cacheService: CacheService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const namespaces = this.reflector.get<string[]>(CACHE_INVALIDATE_KEY, context.getHandler());

    return next.handle().pipe(
      concatMap(async (data) => {
        if (namespaces?.length) {
          await Promise.all(namespaces.map((ns) => this.cacheService.incrementVersion(ns)));
        }
        return data;
      }),
    );
  }
}

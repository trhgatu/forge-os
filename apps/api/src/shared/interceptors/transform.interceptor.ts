import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendResponse } from '@forge/core';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, BackendResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<BackendResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        const hasData = data && typeof data === 'object' && 'data' in data;
        const hasMeta = data && typeof data === 'object' && 'meta' in data;

        return {
          success: statusCode < 400,
          message: data?.message || 'Operation successful',
          data: hasData ? data.data : data,
          meta: hasMeta
            ? data.meta
            : {
                timestamp: new Date().toISOString(),
                path: request.url,
              },
        };
      }),
    );
  }
}

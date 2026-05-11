import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
  meta: {
    timestamp: string;
    path: string;
    [key: string]: any;
  };
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => ({
        success: statusCode < 400,
        message: data?.message || 'Operation successful',
        data: data?.data !== undefined && data?.meta ? data.data : data,
        meta: {
          timestamp: new Date().toISOString(),
          path: request.url,
          ...(data?.meta || {}),
        },
      })),
    );
  }
}

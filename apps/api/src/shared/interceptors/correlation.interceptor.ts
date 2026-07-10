import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { randomUUID } from 'crypto';
import { contextStorage } from '../utils/context.storage';

@Injectable()
export class CorrelationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    if (request) {
      // Get correlation ID from request headers or generate a new one
      const correlationId = (request.headers['x-correlation-id'] || randomUUID()) as string;

      // Attach to response headers
      const response = httpContext.getResponse();
      if (response && typeof response.setHeader === 'function') {
        response.setHeader('x-correlation-id', correlationId);
      }

      // Attach to request object
      request.correlationId = correlationId;

      // Wrap execution in AsyncLocalStorage context
      return new Observable((subscriber) => {
        contextStorage.run({ correlationId }, () => {
          const subscription = next.handle().subscribe(subscriber);
          return () => subscription.unsubscribe();
        });
      });
    }

    return next.handle();
  }
}

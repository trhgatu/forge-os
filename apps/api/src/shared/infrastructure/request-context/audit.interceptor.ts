import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { RequestContextService } from './request-context.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly requestContext: RequestContextService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const userId = req?.user?.id || req?.user?.sub;
    if (userId) {
      this.requestContext.set('userId', userId);
    }
    return next.handle();
  }
}

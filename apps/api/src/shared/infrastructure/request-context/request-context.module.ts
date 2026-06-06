import { Global, Module } from '@nestjs/common';
import { RequestContextService } from './request-context.service';
import { AuditInterceptor } from './audit.interceptor';

@Global()
@Module({
  providers: [RequestContextService, AuditInterceptor],
  exports: [RequestContextService, AuditInterceptor],
})
export class RequestContextModule {}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuditLogService } from '@modules/audit-log/audit-log.service';

@Injectable()
export class CreateAuditLogMiddleware implements NestMiddleware {
  constructor(private readonly auditLogService: AuditLogService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const user = (req as any).user;

      void this.auditLogService.create({
        action: `${req.method} ${req.originalUrl}`,
        method: req.method,
        statusCode: res.statusCode,
        path: req.originalUrl,
        params: req.params,
        query: req.query,
        body: req.body,
        user: user?._id || null,
      });
    });

    next();
  }
}

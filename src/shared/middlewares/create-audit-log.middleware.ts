import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAuditLogCommand } from 'src/contexts/system/audit-log/application/commands';

@Injectable()
export class CreateAuditLogMiddleware implements NestMiddleware {
  constructor(private readonly commandBus: CommandBus) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const user = (req as any).user;

      void this.commandBus.execute(
        new CreateAuditLogCommand({
          action: `${req.method} ${req.originalUrl}`,
          method: req.method,
          statusCode: res.statusCode,
          path: req.originalUrl,
          params: req.params,
          query: req.query,
          body: req.body,
          user: user?.id || null,
        }),
      );
    });

    next();
  }
}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { AuthModule } from '@root/contexts/iam/auth/auth.module';
import { WealthService } from './application/services/wealth.service';
import { WealthController } from './presentation/controllers/wealth.controller';

@Module({
  imports: [CqrsModule, PrismaModule, AuthModule],
  controllers: [WealthController],
  providers: [WealthService],
  exports: [WealthService],
})
export class WealthModule {}

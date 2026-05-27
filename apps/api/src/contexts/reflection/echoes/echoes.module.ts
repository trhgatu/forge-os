import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { EchoesController } from './presentation/controllers/echoes.controller';
import { EchoesService } from './application/services/echoes.service';

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [EchoesController],
  providers: [EchoesService],
  exports: [EchoesService],
})
export class EchoesModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CourtSchema } from './infrastructure/court.schema';
import { MongoCourtRepository } from './infrastructure/repositories/mongo-court.repository';
import { CourtAdminController } from './presentation/controllers/court.admin.controller';
import { CourtPublicController } from './presentation/controllers/court.public.controller';
import { SharedModule } from '@shared/shared.module';
import { CourtHandlers } from './application/handlers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Court', schema: CourtSchema }]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [CourtAdminController, CourtPublicController],
  providers: [
    {
      provide: 'CourtRepository',
      useClass: MongoCourtRepository,
    },
    MongoCourtRepository,
    ...CourtHandlers,
  ],
  exports: [],
})
export class CourtModule {}

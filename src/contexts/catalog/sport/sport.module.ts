// sport.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { SportSchema } from './infrastructure/sport.schema';
import { MongoSportRepository } from './infrastructure/repositories/mongo-sport.repository';
import { SportAdminController } from './presentation/controllers/sport.admin.controller';
import { SportPublicController } from './presentation/controllers/sport.public.controller';
import { SharedModule } from '@shared/shared.module';
import { SportHandlers } from './application/handlers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Sport', schema: SportSchema }]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [SportAdminController, SportPublicController],
  providers: [
    {
      provide: 'SportRepository',
      useClass: MongoSportRepository,
    },
    MongoSportRepository,
    ...SportHandlers,
  ],
  exports: [],
})
export class SportModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { VenueSchema } from './infrastructure/venue.schema';
import { MongoVenueRepository } from './infrastructure/repositories/mongo-venue.repository';
import { VenueAdminController } from './presentation/controllers/venue.admin.controller';
import { VenuePublicController } from './presentation/controllers/venue.public.controller';
import { SharedModule } from '@shared/shared.module';
import { VenueHandlers } from './application/handlers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Venue', schema: VenueSchema }]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [VenueAdminController, VenuePublicController],
  providers: [
    {
      provide: 'VenueRepository',
      useClass: MongoVenueRepository,
    },
    MongoVenueRepository,
    ...VenueHandlers,
  ],
  exports: [],
})
export class VenueModule {}

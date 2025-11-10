import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Venue, VenueSchema } from './venue.schema';
import {
  VenuePublicController,
  VenueAdminController,
} from '@modules/venue/controllers';

import { VenueService } from './venue.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Venue.name, schema: VenueSchema }]),
    SharedModule,
  ],
  controllers: [VenueAdminController, VenuePublicController],
  providers: [VenueService],
  exports: [VenueService],
})
export class VenueModule {}

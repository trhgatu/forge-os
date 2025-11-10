import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './booking.schema';
import { Court, CourtSchema } from '@modules/court/court.schema';
import {
  BookingAdminController,
  BookingPublicController,
} from '@modules/booking/controllers';
import { BookingService } from './booking.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Court.name, schema: CourtSchema },
    ]),
    SharedModule,
  ],
  controllers: [BookingAdminController, BookingPublicController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}

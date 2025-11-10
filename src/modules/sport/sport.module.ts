import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sport, SportSchema } from './sport.schema';
import {
  SportAdminController,
  SportPublicController,
} from '@modules/sport/controllers';
import { SportService } from './sport.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sport.name, schema: SportSchema }]),
    SharedModule,
  ],
  controllers: [SportAdminController, SportPublicController],
  providers: [SportService],
  exports: [SportService],
})
export class SportModule {}

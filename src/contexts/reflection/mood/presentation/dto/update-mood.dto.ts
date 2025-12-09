import { PartialType } from '@nestjs/swagger';
import { CreateMoodDto } from './create-mood.dto';

export class UpdateMoodDto extends PartialType(CreateMoodDto) {}

import { CreateMoodDto } from '../../presentation/dto/create-mood.dto';

export class CreateMoodCommand {
  constructor(public readonly payload: CreateMoodDto) {}
}

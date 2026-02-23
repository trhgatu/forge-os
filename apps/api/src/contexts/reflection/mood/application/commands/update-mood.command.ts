import { UpdateMoodDto } from '../../presentation/dto/update-mood.dto';
import { MoodId } from '../../domain/value-objects/mood-id.vo';

export class UpdateMoodCommand {
  constructor(
    public readonly id: MoodId,
    public readonly payload: UpdateMoodDto,
  ) {}
}

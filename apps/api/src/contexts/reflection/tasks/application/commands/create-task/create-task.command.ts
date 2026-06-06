import { CreateTaskDto } from '../../../presentation/dto';

export class CreateTaskCommand {
  constructor(
    public readonly userId: string,
    public readonly dto: CreateTaskDto,
  ) {}
}

import { UpdateTaskDto } from '../../../presentation/dto';

export class UpdateTaskCommand {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly dto: UpdateTaskDto,
  ) {}
}

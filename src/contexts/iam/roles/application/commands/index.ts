import { CreateRoleDto, UpdateRoleDto } from '../../dto';

export class CreateRoleCommand {
  constructor(public readonly dto: CreateRoleDto) {}
}

export class UpdateRoleCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateRoleDto,
  ) {}
}

export class DeleteRoleCommand {
  constructor(public readonly id: string) {}
}

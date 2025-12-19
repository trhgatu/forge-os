import { CreatePermissionDto, UpdatePermissionDto } from '../../dto';

export class CreatePermissionCommand {
  constructor(public readonly dto: CreatePermissionDto) {}
}

export class UpdatePermissionCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdatePermissionDto,
  ) {}
}

export class DeletePermissionCommand {
  constructor(public readonly id: string) {}
}

import { ICommand } from '@nestjs/cqrs';

export class DeletePermissionCommand implements ICommand {
  constructor(public readonly id: string) {}
}

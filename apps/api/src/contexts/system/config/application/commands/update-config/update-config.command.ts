import { ICommand } from '@nestjs/cqrs';

export class UpdateSystemConfigCommand implements ICommand {
  constructor(
    public readonly key: string,
    public readonly value: any,
  ) {}
}

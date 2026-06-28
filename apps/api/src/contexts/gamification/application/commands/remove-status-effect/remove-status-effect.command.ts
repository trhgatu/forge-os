import { ICommand } from '@nestjs/cqrs';

export class RemoveStatusEffectCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly type: string,
  ) {}
}

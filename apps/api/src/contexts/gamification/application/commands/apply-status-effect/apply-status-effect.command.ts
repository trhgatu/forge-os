import { ICommand } from '@nestjs/cqrs';

export class ApplyStatusEffectCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly type: string,
    public readonly durationMinutes: number,
    public readonly value?: any,
  ) {}
}

import { ICommand } from '@nestjs/cqrs';

export class LogVitalityActionCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly type: string,
    public readonly value: number,
    public readonly metadata?: any,
  ) {}
}

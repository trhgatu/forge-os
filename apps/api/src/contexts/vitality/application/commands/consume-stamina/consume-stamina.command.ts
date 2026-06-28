import { ICommand } from '@nestjs/cqrs';

export class ConsumeStaminaCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly amount: number,
  ) {}
}

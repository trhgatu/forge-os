import { IQuery } from '@nestjs/cqrs';

export class GetRoleByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}

import { IQuery } from '@nestjs/cqrs';

export class GetPermissionByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}

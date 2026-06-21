import { AssetType } from '@prisma/client';

export interface CreateAccountPayload {
  userId: string;
  name: string;
  type: AssetType;
  balance?: number;
  currency?: string;
}

export class CreateAccountCommand {
  constructor(public readonly payload: CreateAccountPayload) {}
}

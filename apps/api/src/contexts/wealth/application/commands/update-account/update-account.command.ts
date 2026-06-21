import { AssetType } from '@prisma/client';

export interface UpdateAccountPayload {
  userId: string;
  id: string;
  name?: string;
  type?: AssetType;
  balance?: number;
}

export class UpdateAccountCommand {
  constructor(public readonly payload: UpdateAccountPayload) {}
}

import { BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export class JournalId {
  private constructor(private readonly value: ObjectId) {}

  static create(id?: string | ObjectId): JournalId {
    const objectId =
      typeof id === 'string' ? new ObjectId(id) : (id ?? new ObjectId());
    if (!ObjectId.isValid(objectId)) {
      throw new BadRequestException('Invalid JournalId');
    }
    return new JournalId(objectId as ObjectId);
  }

  toString() {
    return this.value.toHexString();
  }
}

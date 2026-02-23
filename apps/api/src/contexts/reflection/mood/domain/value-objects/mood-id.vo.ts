import { BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export class MoodId {
  private constructor(private readonly value: ObjectId) {}

  static create(id?: string | ObjectId): MoodId {
    const objectId =
      typeof id === 'string' ? new ObjectId(id) : (id ?? new ObjectId());
    if (!ObjectId.isValid(objectId)) {
      throw new BadRequestException('Invalid MoodId');
    }
    return new MoodId(objectId as ObjectId);
  }

  toString() {
    return this.value.toHexString();
  }
}

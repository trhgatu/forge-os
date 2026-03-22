import { ObjectId } from 'bson';
import { IdGenerator } from '../../application/ports/id-generator.port';

export class MongoIdGeneratorAdapter implements IdGenerator {
  generate(): string {
    return new ObjectId().toHexString();
  }
}

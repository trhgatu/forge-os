import { v4 as uuidv4 } from 'uuid';
import { IdGenerator } from '../../application/ports/id-generator.port';

export class UuidGeneratorAdapter implements IdGenerator {
  generate(): string {
    return uuidv4();
  }
}

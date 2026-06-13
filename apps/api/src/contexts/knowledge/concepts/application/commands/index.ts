import { SaveConceptHandler } from './save-concept/save-concept.handler';
import { UpdateConceptHandler } from './update-concept/update-concept.handler';
import { DeleteConceptHandler } from './delete-concept/delete-concept.handler';

export * from './save-concept/save-concept.command';
export * from './update-concept/update-concept.command';
export * from './delete-concept/delete-concept.command';

export const ConceptsCommandHandlers = [
  SaveConceptHandler,
  UpdateConceptHandler,
  DeleteConceptHandler,
];

import { GetAllConceptsHandler } from './get-all-concepts/get-all-concepts.handler';
import { GetConceptByIdHandler } from './get-concept-by-id/get-concept-by-id.handler';
import { ScrapeUrlHandler } from './scrape-url/scrape-url.handler';

export * from './get-all-concepts/get-all-concepts.query';
export * from './get-concept-by-id/get-concept-by-id.query';
export * from './scrape-url/scrape-url.query';

export const ConceptsQueryHandlers = [
  GetAllConceptsHandler,
  GetConceptByIdHandler,
  ScrapeUrlHandler,
];

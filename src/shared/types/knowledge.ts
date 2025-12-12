export interface KnowledgeConcept {
  id: string;
  title: string;

  // Preview text shown in search results
  summary?: string;

  // Full HTML content
  content?: string;

  // Wikipedia URL
  url?: string;

  // Image (thumbnail)
  imageUrl?: string;

  // Language: 'en' | 'vi'
  language: string;

  // Bookkeeping
  createdAt: string;
  lastModified?: string;

  // AI generated
  insights?: string[];
  reflection?: string;

  // Metadata extracted from Wikipedia
  metadata?: {
    categories?: string[];
    keywords?: string[];
  };

  // Raw extract (optional fallback)
  extract?: string;
}

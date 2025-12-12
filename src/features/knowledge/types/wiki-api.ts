export interface WikiSearchResponse {
  query?: {
    search: Array<{
      pageid: number;
      title: string;
      snippet: string;
    }>;
  };
}

export interface WikiQueryResponse {
  batchcomplete?: string;
  query: {
    pages: Record<string, WikiPage>;
  };
}

export interface WikiPage {
  pageid: number;
  title: string;
  extract?: string;
  fullurl?: string;
  touched?: string;
  displaytitle?: string;

  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };

  categories?: Array<{
    title: string;
  }>;
}

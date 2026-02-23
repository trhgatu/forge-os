import { useInfiniteQuery } from "@tanstack/react-query";

import { useLanguage } from "@/contexts/LanguageContext"; // Assuming implementation
import type { PaginatedResponse } from "@/shared/types";
import type { TimelineItem } from "@/shared/types/timeline";

import { getTimeline } from "../services/timelineService";

export const TIMELINE_QUERY_KEY = ["timeline"];

export function useTimeline() {
  const { language } = useLanguage();

  return useInfiniteQuery<PaginatedResponse<TimelineItem>>({
    queryKey: [...TIMELINE_QUERY_KEY, language],
    queryFn: ({ pageParam = 1 }) => getTimeline(pageParam as number, 20, language),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}

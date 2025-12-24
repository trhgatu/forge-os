import { apiClient } from "@/services/apiClient";
import type { PaginatedResponse } from "@/shared/types";
import type { TimelineItem } from "@/shared/types/timeline";

// Define a minimal interface for the raw response items if needed, or use unknown and type check.
// For now, let's trust the backend contract or assert specific shapes.
interface RawTimelineItem {
  id: string;
  type: string;
  tags?: string[];
  date?: string;
  createdAt?: string;
  loggedAt?: string;
  title: string;
  content: string;
  mood?: string;
  imageUrl?: string;
  note?: string;
}

export const getTimeline = async (
  page = 1,
  limit = 20,
  lang?: string
): Promise<PaginatedResponse<TimelineItem>> => {
  const res = await apiClient.get<PaginatedResponse<RawTimelineItem>>("/timeline", {
    params: { page, limit, lang },
  });

  const rawData = res.data;

  // Map Backend DTOs to Frontend TimelineItem
  const mappedData: TimelineItem[] = rawData.data.map((item) => {
    const base = {
      id: item.id,
      type: item.type as TimelineItem["type"],
      tags: item.tags || [],
      date: new Date(item.date || item.createdAt || item.loggedAt || new Date()),
    };

    if (item.type === "memory") {
      return {
        ...base,
        title: item.title,
        content: item.content,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mood: (item.mood as any) || "neutral",
        imageUrl: item.imageUrl,
      } as TimelineItem;
    } else if (item.type === "journal") {
      return {
        ...base,
        title: item.title,
        content: item.content,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mood: (item.mood as any) || "neutral",
      } as TimelineItem;
    } else if (item.type === "mood") {
      return {
        ...base,
        title: `Mood Log: ${item.mood}`,
        content: item.note || "No note provided.",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mood: item.mood as any,
      } as TimelineItem;
    }

    // Fallback
    return {
      ...base,
      title: "Unknown Artifact",
      content: "Unknown content",
      mood: "neutral",
    } as TimelineItem;
  });

  return {
    meta: rawData.meta,
    data: mappedData,
  };
};

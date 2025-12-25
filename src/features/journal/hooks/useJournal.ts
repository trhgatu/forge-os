import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { journalService } from "../services/journalService";
import type { CreateJournalDto, JournalFilter, JournalEntry } from "../types";
import type { PaginatedResponse } from "@/shared/types/api";
import { toast } from "sonner";

export const useJournals = (filter?: JournalFilter) => {
  return useQuery({
    queryKey: ["journals", filter], // Add filter back for cache isolation
    queryFn: async () => {
      console.log("🔍 FETCH: Fetching journals with filter:", filter);
      const result = await journalService.getAll(filter);
      console.log("📥 FETCH: Received", result.data.length, "journals");
      return result;
    },
    staleTime: 0, // Always consider data stale
    refetchOnMount: "always", // Always refetch when component mounts
  });
};

export const useJournal = (id: string) => {
  return useQuery({
    queryKey: ["journal", id],
    queryFn: () => journalService.getById(id),
    enabled: !!id,
  });
};

export const useCreateJournal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJournalDto) => journalService.create(data),
    onSuccess: async (newEntry) => {
      toast.success("Journal entry created successfully");

      // Manually update cache to prevent flicker
      queryClient.setQueryData<PaginatedResponse<JournalEntry>>(
        ["journals", { page: 1, limit: 100 }],
        (old: PaginatedResponse<JournalEntry> | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: [newEntry, ...old.data],
          };
        }
      );

      // Also invalidate to ensure potential order/filter correctness eventually
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create journal entry");
    },
  });
};

export const useUpdateJournal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateJournalDto> }) =>
      journalService.update(id, data),
    onSuccess: () => {
      // toast.success("Journal entry updated successfully"); // Too noisy for auto-save
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      queryClient.invalidateQueries({ queryKey: ["journal"] });
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update journal entry");
    },
  });
};

export const useDeleteJournal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      console.log("🗑️ DELETE: Starting deletion for ID:", id);
      return journalService.delete(id);
    },
    onSuccess: () => {
      console.log("✅ DELETE: Success, invalidating queries...");

      // Log current cache state before invalidation
      const cacheData = queryClient.getQueriesData({ queryKey: ["journals"] });
      console.log("📦 CACHE BEFORE INVALIDATE:", cacheData);

      queryClient.invalidateQueries({ queryKey: ["journals"] });
      queryClient.invalidateQueries({ queryKey: ["timeline"] });

      console.log("🔄 DELETE: Invalidation triggered");
    },
    onError: (error) => {
      console.error("❌ DELETE ERROR:", error);
      toast.error("Failed to delete journal entry");
    },
  });
};

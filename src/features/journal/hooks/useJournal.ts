import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { journalService } from "../services/journalService";
import type { CreateJournalDto, JournalFilter } from "../types";
import { toast } from "sonner";

export const useJournals = (filter?: JournalFilter) => {
  return useQuery({
    queryKey: ["journals", filter],
    queryFn: () => journalService.getAll(filter),
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
    onSuccess: () => {
      toast.success("Journal entry created successfully");
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
      toast.success("Journal entry updated successfully");
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
    mutationFn: (id: string) => journalService.delete(id),
    onSuccess: () => {
      // Handled in UI component for custom message if needed, or default here
      // toast.success("Journal deleted");
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete journal entry");
    },
  });
};

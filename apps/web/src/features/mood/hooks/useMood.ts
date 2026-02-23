import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { moodService, CreateMoodDto, MoodFilter } from "../services/moodService";
import { toast } from "sonner";

export const useMoods = (filter?: MoodFilter) => {
  return useQuery({
    queryKey: ["moods", filter],
    queryFn: () => moodService.getAll(filter),
  });
};

export const useCreateMood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMoodDto) => moodService.create(data),
    onSuccess: () => {
      toast.success("Mood logged successfully");
      queryClient.invalidateQueries({ queryKey: ["moods"] });
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to log mood");
    },
  });
};

export const useUpdateMood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateMoodDto> }) =>
      moodService.update(id, data),
    onSuccess: () => {
      toast.success("Mood updated successfully");
      queryClient.invalidateQueries({ queryKey: ["moods"] });
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update mood");
    },
  });
};

export const useDeleteMood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => moodService.delete(id),
    onSuccess: () => {
      // toast.success("Mood deleted"); // Handled in UI component for custom message
      queryClient.invalidateQueries({ queryKey: ["moods"] });
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
    },
    onError: () => {
      toast.error("Failed to delete mood");
    },
  });
};

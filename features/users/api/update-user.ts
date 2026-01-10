import { apiClient } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { User } from "../types";
import { getUserQueryOptions } from "./get-user";

export const updateUserInputSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  email: z.email().optional(),
  theme: z.enum(["light", "dark"]).optional(),
  language: z.enum(["en", "el"]).optional(),
  user_type: z.enum(["local", "tourist"]).optional(),
  opt_in_events_push: z.boolean().optional(),
  opt_in_events_email: z.boolean().optional(),
  onboarding_step: z.number().optional(),
  onboarding_completed: z.boolean().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

export const updateUser = ({
  data,
  userId,
}: {
  data: UpdateUserInput;
  userId: string;
}): Promise<User> => {
  return apiClient.put(`/users/${userId}`, data);
};

type UseUpdateUserOptions = {
  mutationConfig?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = ({
  mutationConfig,
}: UseUpdateUserOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getUserQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateUser,
  });
};

import { useAuthClient } from "@/hooks/use-auth-client";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { User } from "../types";

export const getUser = (
  client: AxiosInstance,
  userId: string
): Promise<User> => {
  return client.get(`/users/${userId}`);
};

export const getUserQueryOptions = (userId: string) => ({
  queryKey: ["users", userId],
  queryFn: (client: AxiosInstance) => getUser(client, userId),
});

type UseUserOptions = {
  userId: string;
  queryConfig?: QueryConfig<typeof getUser>;
};

export const useUser = ({ userId, queryConfig }: UseUserOptions) => {
  const client = useAuthClient();

  return useQuery({
    ...getUserQueryOptions(userId),
    queryFn: () => getUser(client, userId),
    ...queryConfig,
  });
};

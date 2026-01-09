import { useAuthClient } from "@/hooks/use-auth-client";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { User } from "../types";

export const getUser = async (
  client: AxiosInstance,
  userId: string
): Promise<User> => {
  const { data } = await client.get(`/users/${userId}`);
  return data;
};

type UseUserOptions = {
  userId: string;
  config?: QueryConfig<typeof getUser>;
};

export const useUser = ({ userId, config }: UseUserOptions) => {
  const client = useAuthClient();

  return useQuery({
    ...config,
    queryKey: ["users", userId],
    queryFn: () => getUser(client, userId),
  });
};

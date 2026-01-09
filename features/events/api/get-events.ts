import { useAuthClient } from "@/hooks/use-auth-client";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { Event } from "../types";

export const getEvents = async (client: AxiosInstance): Promise<Event[]> => {
  const { data } = await client.get(`/events`);
  return data;
};

type UseEventsOptions = {
  config?: QueryConfig<typeof getEvents>;
};

export const useEvents = ({ config }: UseEventsOptions = {}) => {
  const client = useAuthClient();

  return useQuery({
    ...config,
    queryKey: ["events"],
    queryFn: () => getEvents(client),
  });
};

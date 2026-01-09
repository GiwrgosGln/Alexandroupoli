/* eslint-disable */
import {
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

// 1. Global Defaults
export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
};

// 2. Initialize the Client here
export const queryClient = new QueryClient({ defaultOptions: queryConfig });

// 3. Type Utilities
export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

// REFINED: Extracts the return type of the API function for the Query Options
export type QueryConfig<FnType extends (...args: any) => Promise<any>> = Omit<
  UseQueryOptions<ApiFnReturnType<FnType>, AxiosError>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[1]
>;

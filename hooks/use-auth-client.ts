import { apiClient } from "@/lib/api-client";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useRef } from "react";

export const useAuthClient = () => {
  const { getToken } = useAuth();
  const interceptorRef = useRef<number | null>(null);

  useEffect(() => {
    if (interceptorRef.current !== null) {
      apiClient.interceptors.request.eject(interceptorRef.current);
    }

    interceptorRef.current = apiClient.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      if (interceptorRef.current !== null) {
        apiClient.interceptors.request.eject(interceptorRef.current);
        interceptorRef.current = null;
      }
    };
  }, [getToken]);

  return apiClient;
};

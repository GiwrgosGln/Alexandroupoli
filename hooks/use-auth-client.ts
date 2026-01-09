import { apiClient } from "@/axios";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";

export const useAuthClient = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const requestIntercept = apiClient.interceptors.request.use(
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
      apiClient.interceptors.request.eject(requestIntercept);
    };
  }, [getToken]);

  return apiClient;
};

import axios from "axios";

const BASE_URL = "https://alex-polis-app.vercel.app/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

import axios, { AxiosError } from "axios";
import { getAuthToken, removeAuthToken } from "@/lib/auth-storage";
import type { ApiResponse, ValidationErrors } from "@/types/api";

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ||
  "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeAuthToken();
    }

    return Promise.reject(error);
  },
);

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (!axios.isAxiosError<ApiResponse>(error)) {
    return fallback;
  }

  const data = error.response?.data;

  if (data?.message) {
    return data.message;
  }

  return fallback;
}

export function getValidationErrors(error: unknown): ValidationErrors {
  if (!axios.isAxiosError<ApiResponse>(error)) {
    return {};
  }

  return error.response?.data?.errors ?? {};
}

export default api;

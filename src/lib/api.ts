import axios from "axios";

import { clearAuth, getToken } from "@/lib/auth-storage";
import type { ApiValidationError } from "@/types/auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: baseURL.replace(/\/+$/, ""),
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && getToken()) {
      clearAuth();
    }

    return Promise.reject(error);
  },
);

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (!axios.isAxiosError<ApiValidationError>(error)) {
    return fallback;
  }

  const data = error.response?.data;

  if (data?.errors) {
    const firstError = Object.values(data.errors).flat().find(Boolean);

    if (firstError) {
      return firstError;
    }
  }

  return data?.message ?? fallback;
}

/*
 * Used by existing forms whose state is:
 * Record<string, string[]>
 */
export function getValidationErrors(error: unknown): Record<string, string[]> {
  if (!axios.isAxiosError<ApiValidationError>(error)) {
    return {};
  }

  return error.response?.data?.errors ?? {};
}

/*
 * Used by newer forms that display one error per field.
 */
export function getFieldErrors(error: unknown): Record<string, string> {
  const errors = getValidationErrors(error);

  return Object.fromEntries(
    Object.entries(errors).map(([field, messages]) => [
      field,
      messages[0] ?? "This field is invalid.",
    ]),
  );
}

export default api;

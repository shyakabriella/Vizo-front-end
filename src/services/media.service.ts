import axios from "axios";

import { api } from "@/lib/api";
import type {
  MediaAsset,
  MediaFilters,
  MediaListResponse,
  MediaMessageResponse,
  MediaPagination,
  MediaResponse,
  MediaUpdateForm,
} from "@/types/media";

function nullable(value: string): string | null {
  const normalized = value.trim();

  return normalized === "" ? null : normalized;
}

export async function getMedia(
  businessId: string,
  filters: MediaFilters = {},
): Promise<{
  items: MediaAsset[];
  pagination: MediaPagination;
}> {
  const response = await api.get<MediaListResponse>(
    `/businesses/${businessId}/media`,
    {
      params: {
        search: filters.search?.trim() || undefined,
        type: filters.type && filters.type !== "all" ? filters.type : undefined,
        is_active:
          typeof filters.is_active === "boolean"
            ? filters.is_active
              ? 1
              : 0
            : undefined,
        page: filters.page ?? 1,
        per_page: filters.per_page ?? 20,
      },
    },
  );

  return response.data.data.media;
}

export async function uploadMedia(
  businessId: string,
  file: File,
): Promise<MediaResponse> {
  const data = new FormData();

  data.append("file", file);
  data.append("name", file.name.replace(/\.[^/.]+$/, ""));
  data.append("is_active", "1");

  const response = await api.post<MediaResponse>(
    `/businesses/${businessId}/media`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}

export async function updateMedia(
  businessId: string,
  mediaId: string,
  form: MediaUpdateForm,
): Promise<MediaResponse> {
  const response = await api.patch<MediaResponse>(
    `/businesses/${businessId}/media/${mediaId}`,
    {
      name: form.name.trim(),
      alt_text: nullable(form.alt_text),
      caption: nullable(form.caption),
      is_active: form.is_active,
    },
  );

  return response.data;
}

export async function deleteMedia(
  businessId: string,
  mediaId: string,
): Promise<MediaMessageResponse> {
  const response = await api.delete<MediaMessageResponse>(
    `/businesses/${businessId}/media/${mediaId}`,
  );

  return response.data;
}

export function getMediaError(
  error: unknown,
  fallback = "The media request could not be completed.",
): string {
  if (!axios.isAxiosError(error)) {
    return fallback;
  }

  const errors = error.response?.data?.errors;

  if (errors && typeof errors === "object") {
    const firstMessage = Object.values(errors)
      .flat()
      .find((message) => typeof message === "string");

    if (typeof firstMessage === "string") {
      return firstMessage;
    }
  }

  const message = error.response?.data?.message;

  if (typeof message === "string" && message.trim()) {
    return message;
  }

  if (error.response?.status === 403) {
    return "You do not have permission to manage this media library.";
  }

  if (!error.response) {
    return "Unable to connect to the Vizo API.";
  }

  return fallback;
}

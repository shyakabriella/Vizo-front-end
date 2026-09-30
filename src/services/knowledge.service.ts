import axios from "axios";

import { api } from "@/lib/api";
import type {
  KnowledgeEntry,
  KnowledgeForm,
  KnowledgeListResponse,
  KnowledgeMessageResponse,
  KnowledgeResponse,
  KnowledgeStatus,
  KnowledgeType,
} from "@/types/knowledge";

function nullable(value: string): string | null {
  const normalized = value.trim();

  return normalized === "" ? null : normalized;
}

function payload(form: KnowledgeForm) {
  return {
    type: form.type,
    category: nullable(form.category),
    title: form.type === "faq" ? null : nullable(form.title),
    question: form.type === "faq" ? nullable(form.question) : null,
    content: form.content.trim(),
    language: form.language.trim().toLowerCase(),
    source_url: nullable(form.source_url),
    is_featured: form.is_featured,
    sort_order: Number(form.sort_order || 0),
    valid_from: nullable(form.valid_from),
    valid_until: nullable(form.valid_until),
  };
}

export async function getKnowledgeEntries(
  businessId: string,
  filters: {
    search?: string;
    type?: "all" | KnowledgeType;
    status?: "all" | KnowledgeStatus;
  } = {},
): Promise<KnowledgeEntry[]> {
  const response = await api.get<KnowledgeListResponse>(
    `/businesses/${businessId}/knowledge`,
    {
      params: {
        search: filters.search?.trim() || undefined,
        type: filters.type && filters.type !== "all" ? filters.type : undefined,
        status:
          filters.status && filters.status !== "all"
            ? filters.status
            : undefined,
        per_page: 50,
      },
    },
  );

  return response.data.data.knowledge.items;
}

export async function createKnowledgeEntry(
  businessId: string,
  form: KnowledgeForm,
): Promise<KnowledgeResponse> {
  const response = await api.post<KnowledgeResponse>(
    `/businesses/${businessId}/knowledge`,
    payload(form),
  );

  return response.data;
}

export async function updateKnowledgeEntry(
  businessId: string,
  entryId: string,
  form: KnowledgeForm,
): Promise<KnowledgeResponse> {
  const response = await api.patch<KnowledgeResponse>(
    `/businesses/${businessId}/knowledge/${entryId}`,
    payload(form),
  );

  return response.data;
}

export async function updateKnowledgeStatus(
  businessId: string,
  entryId: string,
  status: KnowledgeStatus,
): Promise<KnowledgeResponse> {
  const response = await api.patch<KnowledgeResponse>(
    `/businesses/${businessId}/knowledge/${entryId}/status`,
    {
      status,
    },
  );

  return response.data;
}

export async function deleteKnowledgeEntry(
  businessId: string,
  entryId: string,
): Promise<KnowledgeMessageResponse> {
  const response = await api.delete<KnowledgeMessageResponse>(
    `/businesses/${businessId}/knowledge/${entryId}`,
  );

  return response.data;
}

export function getKnowledgeFieldErrors(
  error: unknown,
): Record<string, string> {
  if (!axios.isAxiosError(error)) {
    return {};
  }

  const errors = error.response?.data?.errors;

  if (!errors || typeof errors !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(errors).map(([field, messages]) => [
      field,
      Array.isArray(messages) ? String(messages[0] ?? "") : String(messages),
    ]),
  );
}

export function getKnowledgeError(
  error: unknown,
  fallback = "The knowledge request could not be completed.",
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

  if (typeof error.response?.data?.message === "string") {
    return error.response.data.message;
  }

  if (!error.response) {
    return "Unable to connect to the Vizo API.";
  }

  return fallback;
}

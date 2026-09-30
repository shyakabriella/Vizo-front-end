import axios from "axios";

import { api } from "@/lib/api";
import type {
  Business,
  BusinessForm,
  BusinessListResponse,
  BusinessResponse,
  BusinessTypeListResponse,
  BusinessTypeSummary,
} from "@/types/business";

export async function getBusinesses(): Promise<Business[]> {
  const response = await api.get<BusinessListResponse>("/businesses", {
    params: {
      per_page: 50,
    },
  });

  const payload = response.data.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  return Array.isArray(payload.businesses) ? payload.businesses : [];
}

export async function getBusiness(publicId: string): Promise<Business> {
  const response = await api.get<BusinessResponse>(`/businesses/${publicId}`);

  return response.data.data.business;
}

export async function getBusinessTypes(): Promise<BusinessTypeSummary[]> {
  const response = await api.get<BusinessTypeListResponse>("/business-types");

  return Array.isArray(response.data.data) ? response.data.data : [];
}

function prepareBusinessPayload(
  form: BusinessForm,
): Record<string, string | number | null> {
  function nullable(value: string): string | null {
    const normalized = value.trim();

    return normalized === "" ? null : normalized;
  }

  return {
    business_type_id: Number(form.business_type_id),
    name: form.name.trim(),
    legal_name: nullable(form.legal_name),
    description: nullable(form.description),
    email: nullable(form.email),
    phone: nullable(form.phone),
    whatsapp: nullable(form.whatsapp),
    website: nullable(form.website),
    currency: form.currency.trim().toUpperCase(),
    timezone: form.timezone,
    default_language: form.default_language,
  };
}

export async function createBusiness(form: BusinessForm): Promise<Business> {
  const response = await api.post<BusinessResponse>(
    "/businesses",
    prepareBusinessPayload(form),
  );

  return response.data.data.business;
}

export async function updateBusiness(
  publicId: string,
  form: BusinessForm,
): Promise<Business> {
  const response = await api.patch<BusinessResponse>(
    `/businesses/${publicId}`,
    prepareBusinessPayload(form),
  );

  return response.data.data.business;
}

export function getBusinessFieldErrors(error: unknown): Record<string, string> {
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

export function getBusinessError(
  error: unknown,
  fallback = "The business request could not be completed.",
): string {
  if (axios.isAxiosError(error)) {
    const validationErrors = error.response?.data?.errors;

    if (validationErrors && typeof validationErrors === "object") {
      const firstMessage = Object.values(validationErrors)
        .flat()
        .find((message) => typeof message === "string" && message.trim());

      if (typeof firstMessage === "string") {
        return firstMessage;
      }
    }

    const message = error.response?.data?.message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }

    if (error.response?.status === 401) {
      return "Your session has expired. Please sign in again.";
    }

    if (error.response?.status === 403) {
      return "You do not have permission to perform this action.";
    }

    if (error.response?.status === 404) {
      return "The selected business could not be found.";
    }

    if (!error.response) {
      return "Unable to connect to the Vizo API.";
    }
  }

  return fallback;
}

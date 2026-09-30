import axios from "axios";

import { api } from "@/lib/api";
import type {
  CategoryListResponse,
  CategoryResponse,
  Offering,
  OfferingCategory,
  OfferingCategoryForm,
  OfferingForm,
  OfferingListResponse,
  OfferingMessageResponse,
  OfferingResponse,
  OfferingStatus,
} from "@/types/offering";

function nullable(value: string): string | null {
  const normalized = value.trim();

  return normalized === "" ? null : normalized;
}

export async function getOfferingCategories(
  businessId: string,
): Promise<OfferingCategory[]> {
  const response = await api.get<CategoryListResponse>(
    `/businesses/${businessId}/offering-categories`,
  );

  return response.data.data.categories;
}

export async function createOfferingCategory(
  businessId: string,
  form: OfferingCategoryForm,
): Promise<CategoryResponse> {
  const response = await api.post<CategoryResponse>(
    `/businesses/${businessId}/offering-categories`,
    {
      name: form.name.trim(),
      description: nullable(form.description),
      sort_order: Number(form.sort_order || 0),
      is_active: form.is_active,
    },
  );

  return response.data;
}

export async function updateOfferingCategory(
  businessId: string,
  categoryId: string,
  form: OfferingCategoryForm,
): Promise<CategoryResponse> {
  const response = await api.patch<CategoryResponse>(
    `/businesses/${businessId}/offering-categories/${categoryId}`,
    {
      name: form.name.trim(),
      description: nullable(form.description),
      sort_order: Number(form.sort_order || 0),
      is_active: form.is_active,
    },
  );

  return response.data;
}

export async function deleteOfferingCategory(
  businessId: string,
  categoryId: string,
): Promise<OfferingMessageResponse> {
  const response = await api.delete<OfferingMessageResponse>(
    `/businesses/${businessId}/offering-categories/${categoryId}`,
  );

  return response.data;
}

function append(
  data: FormData,
  key: string,
  value: string | number | boolean | null,
): void {
  if (value === null) {
    data.append(key, "");
    return;
  }

  if (typeof value === "boolean") {
    data.append(key, value ? "1" : "0");
    return;
  }

  data.append(key, String(value));
}

function makeOfferingFormData(form: OfferingForm, editing: boolean): FormData {
  const data = new FormData();

  append(data, "category_public_id", nullable(form.category_public_id));
  append(data, "type", form.type);
  append(data, "name", form.name.trim());
  append(data, "short_description", nullable(form.short_description));
  append(data, "description", nullable(form.description));
  append(data, "pricing_type", form.pricing_type);
  append(data, "price", form.price.trim() === "" ? null : Number(form.price));
  append(
    data,
    "price_min",
    form.price_min.trim() === "" ? null : Number(form.price_min),
  );
  append(
    data,
    "price_max",
    form.price_max.trim() === "" ? null : Number(form.price_max),
  );
  append(data, "currency", form.currency.trim().toUpperCase());
  append(data, "unit", nullable(form.unit));
  append(
    data,
    "duration_minutes",
    form.duration_minutes.trim() === "" ? null : Number(form.duration_minutes),
  );
  append(data, "action_url", nullable(form.action_url));
  append(data, "is_available", form.is_available);
  append(data, "sort_order", Number(form.sort_order || 0));

  if (form.image) {
    data.append("image", form.image);
  }

  if (editing) {
    append(data, "remove_image", form.remove_image);
    data.append("_method", "PATCH");
  }

  return data;
}

export async function getOfferings(businessId: string): Promise<Offering[]> {
  const response = await api.get<OfferingListResponse>(
    `/businesses/${businessId}/offerings`,
    {
      params: {
        per_page: 50,
      },
    },
  );

  return response.data.data.offerings.items;
}

export async function createOffering(
  businessId: string,
  form: OfferingForm,
): Promise<OfferingResponse> {
  const response = await api.post<OfferingResponse>(
    `/businesses/${businessId}/offerings`,
    makeOfferingFormData(form, false),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}

export async function updateOffering(
  businessId: string,
  offeringId: string,
  form: OfferingForm,
): Promise<OfferingResponse> {
  /*
   * Laravel/PHP reliably reads multipart files through POST.
   * _method changes the request into PATCH inside Laravel.
   */
  const response = await api.post<OfferingResponse>(
    `/businesses/${businessId}/offerings/${offeringId}`,
    makeOfferingFormData(form, true),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}

export async function updateOfferingStatus(
  businessId: string,
  offeringId: string,
  status: OfferingStatus,
): Promise<OfferingResponse> {
  const response = await api.patch<OfferingResponse>(
    `/businesses/${businessId}/offerings/${offeringId}/status`,
    {
      status,
    },
  );

  return response.data;
}

export async function deleteOffering(
  businessId: string,
  offeringId: string,
): Promise<OfferingMessageResponse> {
  const response = await api.delete<OfferingMessageResponse>(
    `/businesses/${businessId}/offerings/${offeringId}`,
  );

  return response.data;
}

export function getOfferingFieldErrors(error: unknown): Record<string, string> {
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

export function getOfferingError(
  error: unknown,
  fallback = "The request could not be completed.",
): string {
  if (axios.isAxiosError(error)) {
    const fieldErrors = error.response?.data?.errors;

    if (fieldErrors && typeof fieldErrors === "object") {
      const firstMessage = Object.values(fieldErrors)
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
      return "You do not have permission to manage services.";
    }

    if (!error.response) {
      return "Unable to connect to the Vizo API.";
    }
  }

  return fallback;
}

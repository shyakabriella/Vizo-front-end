import axios from "axios";

import { api } from "@/lib/api";
import type {
  AdminBusinessType,
  AdminBusinessTypeForm,
  BusinessTypeListResponse,
  BusinessTypeMessageResponse,
  BusinessTypeResponse,
  BusinessTypeStatusFilter,
} from "@/types/admin-business-type";

interface BusinessTypeFilters {
  search?: string;
  status?: BusinessTypeStatusFilter;
  page?: number;
  per_page?: number;
}

export async function getAdminBusinessTypes(
  filters: BusinessTypeFilters = {},
): Promise<BusinessTypeListResponse["data"]> {
  const response = await api.get<BusinessTypeListResponse>(
    "/admin/business-types",
    {
      params: {
        search: filters.search?.trim() || undefined,
        status:
          filters.status && filters.status !== "all"
            ? filters.status
            : undefined,
        page: filters.page ?? 1,
        per_page: filters.per_page ?? 15,
      },
    },
  );

  return response.data.data;
}

export async function createAdminBusinessType(
  form: AdminBusinessTypeForm,
): Promise<BusinessTypeResponse> {
  const response = await api.post<BusinessTypeResponse>(
    "/admin/business-types",
    form,
  );

  return response.data;
}

export async function updateAdminBusinessType(
  id: number,
  form: AdminBusinessTypeForm,
): Promise<BusinessTypeResponse> {
  const response = await api.patch<BusinessTypeResponse>(
    `/admin/business-types/${id}`,
    form,
  );

  return response.data;
}

export async function updateAdminBusinessTypeStatus(
  businessType: AdminBusinessType,
): Promise<BusinessTypeResponse> {
  const response = await api.patch<BusinessTypeResponse>(
    `/admin/business-types/${businessType.id}/status`,
    {
      is_active: !businessType.is_active,
    },
  );

  return response.data;
}

export async function deleteAdminBusinessType(
  id: number,
): Promise<BusinessTypeMessageResponse> {
  const response = await api.delete<BusinessTypeMessageResponse>(
    `/admin/business-types/${id}`,
  );

  return response.data;
}

export function getBusinessTypeError(
  error: unknown,
  fallback = "The request could not be completed.",
): string {
  if (axios.isAxiosError(error)) {
    const validationErrors = error.response?.data?.errors;

    if (validationErrors && typeof validationErrors === "object") {
      const firstError = Object.values(validationErrors)
        .flat()
        .find((message) => typeof message === "string");

      if (typeof firstError === "string") {
        return firstError;
      }
    }

    const message = error.response?.data?.message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }

    if (error.response?.status === 403) {
      return "You do not have permission to manage business types.";
    }

    if (!error.response) {
      return "Unable to connect to the Vizo API.";
    }
  }

  return fallback;
}

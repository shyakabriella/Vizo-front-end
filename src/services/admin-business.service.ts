import axios from "axios";

import { api } from "@/lib/api";
import type {
  AdminBusiness,
  AdminBusinessFilters,
  AdminBusinessListData,
  AdminBusinessListResponse,
  AdminBusinessResponse,
} from "@/types/admin-business";

function cleanFilters(
  filters: AdminBusinessFilters,
): Record<string, string | number> {
  const parameters: Record<string, string | number> = {};

  if (filters.search?.trim()) {
    parameters.search = filters.search.trim();
  }

  if (filters.status) {
    parameters.status = filters.status;
  }

  if (filters.business_type_id) {
    parameters.business_type_id = filters.business_type_id;
  }

  if (filters.page) {
    parameters.page = filters.page;
  }

  parameters.per_page = filters.per_page ?? 15;

  return parameters;
}

export async function getAdminBusinesses(
  filters: AdminBusinessFilters = {},
): Promise<AdminBusinessListData> {
  const response = await api.get<AdminBusinessListResponse>(
    "/admin/businesses",
    {
      params: cleanFilters(filters),
    },
  );

  return response.data.data;
}

export async function getAdminBusiness(
  publicId: string,
): Promise<AdminBusiness> {
  const response = await api.get<AdminBusinessResponse>(
    `/admin/businesses/${publicId}`,
  );

  return response.data.data.business;
}

export async function suspendAdminBusiness(
  publicId: string,
): Promise<AdminBusinessResponse> {
  const response = await api.post<AdminBusinessResponse>(
    `/admin/businesses/${publicId}/suspend`,
  );

  return response.data;
}

export async function reactivateAdminBusiness(
  publicId: string,
): Promise<AdminBusinessResponse> {
  const response = await api.post<AdminBusinessResponse>(
    `/admin/businesses/${publicId}/reactivate`,
  );

  return response.data;
}

export function getAdminBusinessError(
  error: unknown,
  fallback = "The request could not be completed.",
): string {
  if (axios.isAxiosError(error)) {
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

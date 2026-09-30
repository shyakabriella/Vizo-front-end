import axios from "axios";

import { api } from "@/lib/api";
import type {
  AdminPlan,
  AdminPlanForm,
  PlanListResponse,
  PlanMessageResponse,
  PlanResponse,
  PlanStatusFilter,
} from "@/types/admin-plan";

interface PlanFilters {
  search?: string;
  status?: PlanStatusFilter;
  page?: number;
  per_page?: number;
}

export async function getAdminPlans(
  filters: PlanFilters = {},
): Promise<PlanListResponse["data"]> {
  const response = await api.get<PlanListResponse>("/admin/plans", {
    params: {
      search: filters.search?.trim() || undefined,
      status:
        filters.status && filters.status !== "all" ? filters.status : undefined,
      page: filters.page ?? 1,
      per_page: filters.per_page ?? 15,
    },
  });

  return response.data.data;
}

export async function createAdminPlan(
  form: AdminPlanForm,
): Promise<PlanResponse> {
  const response = await api.post<PlanResponse>("/admin/plans", form);

  return response.data;
}

export async function updateAdminPlan(
  id: number,
  form: AdminPlanForm,
): Promise<PlanResponse> {
  const response = await api.patch<PlanResponse>(`/admin/plans/${id}`, form);

  return response.data;
}

export async function updateAdminPlanStatus(
  plan: AdminPlan,
): Promise<PlanResponse> {
  const response = await api.patch<PlanResponse>(
    `/admin/plans/${plan.id}/status`,
    {
      is_active: !plan.is_active,
    },
  );

  return response.data;
}

export async function deleteAdminPlan(
  id: number,
): Promise<PlanMessageResponse> {
  const response = await api.delete<PlanMessageResponse>(`/admin/plans/${id}`);

  return response.data;
}

export function getAdminPlanError(
  error: unknown,
  fallback = "The request could not be completed.",
): string {
  if (axios.isAxiosError(error)) {
    const errors = error.response?.data?.errors;

    if (errors && typeof errors === "object") {
      const firstError = Object.values(errors)
        .flat()
        .find((item) => typeof item === "string");

      if (typeof firstError === "string") {
        return firstError;
      }
    }

    const message = error.response?.data?.message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }

    if (error.response?.status === 403) {
      return "You do not have permission to manage plans.";
    }

    if (!error.response) {
      return "Unable to connect to the Vizo API.";
    }
  }

  return fallback;
}

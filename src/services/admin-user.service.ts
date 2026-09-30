import { api } from "@/lib/api";
import type {
  AdminUser,
  AdminUserFilters,
  AdminUserListData,
  AdminUserListResponse,
  AdminUserDetailResponse,
  AdminUserStatusResponse,
} from "@/types/admin-user";

function cleanFilters(
  filters: AdminUserFilters,
): Record<string, string | number> {
  const params: Record<string, string | number> = {};

  if (filters.search?.trim()) {
    params.search = filters.search.trim();
  }

  if (filters.status) {
    params.status = filters.status;
  }

  if (filters.role) {
    params.role = filters.role;
  }

  if (filters.page) {
    params.page = filters.page;
  }

  if (filters.per_page) {
    params.per_page = filters.per_page;
  }

  return params;
}

export const adminUserService = {
  async list(filters: AdminUserFilters = {}): Promise<AdminUserListData> {
    const response = await api.get<AdminUserListResponse>("/admin/users", {
      params: cleanFilters(filters),
    });

    return response.data.data;
  },

  async show(userId: number): Promise<AdminUser> {
    const response = await api.get<AdminUserDetailResponse>(
      `/admin/users/${userId}`,
    );

    return response.data.data.user;
  },

  async updateStatus(
    userId: number,
    isActive: boolean,
  ): Promise<AdminUserStatusResponse> {
    const response = await api.patch<AdminUserStatusResponse>(
      `/admin/users/${userId}/status`,
      {
        is_active: isActive,
      },
    );

    return response.data;
  },
};

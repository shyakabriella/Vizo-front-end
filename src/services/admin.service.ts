import { api } from "@/lib/api";
import type { AdminDashboardData, AdminDashboardResponse } from "@/types/admin";

export const adminService = {
  async dashboard(): Promise<AdminDashboardData> {
    const response = await api.get<AdminDashboardResponse>("/admin/dashboard");

    return response.data.data;
  },
};

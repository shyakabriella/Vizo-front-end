import { api } from "@/lib/api";
import type { AdminAnalytics } from "@/types/admin-analytics";

export async function getAdminAnalytics(days = 30): Promise<AdminAnalytics> {
  const response = await api.get<{
    success: boolean;
    data: {
      analytics: AdminAnalytics;
    };
  }>("/admin/analytics", {
    params: {
      days,
    },
  });

  return response.data.data.analytics;
}

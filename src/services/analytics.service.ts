import { api, getApiErrorMessage } from "@/lib/api";

import type {
  BusinessAnalytics,
  BusinessAnalyticsResponse,
} from "@/types/business-analytics";

export async function getBusinessAnalytics(
  businessId: string,
  days = 30,
): Promise<BusinessAnalytics> {
  const response = await api.get<BusinessAnalyticsResponse>(
    `/businesses/${businessId}/analytics`,
    {
      params: {
        days,
      },
    },
  );

  return response.data.data.analytics;
}

export function getBusinessAnalyticsError(
  error: unknown,
  fallback = "Business analytics could not be loaded.",
): string {
  return getApiErrorMessage(error, fallback);
}

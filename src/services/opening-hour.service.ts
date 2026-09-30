import axios from "axios";

import { api } from "@/lib/api";
import type { OpeningDay, OpeningHoursResponse } from "@/types/opening-hour";

export async function getOpeningHours(
  businessId: string,
  locationId: string,
): Promise<OpeningDay[]> {
  const response = await api.get<OpeningHoursResponse>(
    `/businesses/${businessId}/locations/${locationId}/opening-hours`,
  );

  return response.data.data.days;
}

export async function saveOpeningHours(
  businessId: string,
  locationId: string,
  days: OpeningDay[],
): Promise<OpeningHoursResponse> {
  const response = await api.put<OpeningHoursResponse>(
    `/businesses/${businessId}/locations/${locationId}/opening-hours`,
    {
      days: days
        .slice()
        .sort((first, second) => first.day_of_week - second.day_of_week)
        .map((day) => ({
          day_of_week: day.day_of_week,
          is_closed: day.is_closed,
          periods: day.is_closed
            ? []
            : day.periods.map((period) => ({
                opens_at: period.opens_at,
                closes_at: period.closes_at,
              })),
        })),
    },
  );

  return response.data;
}

export function getOpeningHoursError(
  error: unknown,
  fallback = "The opening-hours request could not be completed.",
): string {
  if (axios.isAxiosError(error)) {
    const errors = error.response?.data?.errors;

    if (errors && typeof errors === "object") {
      const firstMessage = Object.values(errors)
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

    if (error.response?.status === 403) {
      return "You do not have permission to manage these opening hours.";
    }

    if (error.response?.status === 404) {
      return "The selected business location could not be found.";
    }

    if (!error.response) {
      return "Unable to connect to the Vizo API.";
    }
  }

  return fallback;
}

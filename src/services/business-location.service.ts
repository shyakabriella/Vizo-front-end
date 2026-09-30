import axios from "axios";

import { api } from "@/lib/api";
import type {
  BusinessLocation,
  BusinessLocationForm,
  BusinessLocationListResponse,
  BusinessLocationMessageResponse,
  BusinessLocationResponse,
} from "@/types/business-location";

function nullable(value: string): string | null {
  const normalized = value.trim();

  return normalized === "" ? null : normalized;
}

function makePayload(form: BusinessLocationForm) {
  return {
    name: form.name.trim(),
    is_main: form.is_main,
    is_active: form.is_active,

    country_code: form.country_code.trim().toUpperCase(),
    country: nullable(form.country),
    province: nullable(form.province),
    district: nullable(form.district),
    city: nullable(form.city),
    sector: nullable(form.sector),
    cell: nullable(form.cell),
    village: nullable(form.village),
    street_address: nullable(form.street_address),
    postal_code: nullable(form.postal_code),

    latitude: form.latitude.trim() === "" ? null : Number(form.latitude),
    longitude: form.longitude.trim() === "" ? null : Number(form.longitude),

    phone: nullable(form.phone),
    whatsapp: nullable(form.whatsapp),
    email: nullable(form.email),
    google_maps_url: nullable(form.google_maps_url),
    offers_delivery: form.offers_delivery,
  };
}

export async function getBusinessLocations(
  businessId: string,
): Promise<BusinessLocation[]> {
  const response = await api.get<BusinessLocationListResponse>(
    `/businesses/${businessId}/locations`,
  );

  return Array.isArray(response.data.data) ? response.data.data : [];
}

export async function createBusinessLocation(
  businessId: string,
  form: BusinessLocationForm,
): Promise<BusinessLocationResponse> {
  const response = await api.post<BusinessLocationResponse>(
    `/businesses/${businessId}/locations`,
    makePayload(form),
  );

  return response.data;
}

export async function updateBusinessLocation(
  businessId: string,
  locationId: string,
  form: BusinessLocationForm,
): Promise<BusinessLocationResponse> {
  const response = await api.patch<BusinessLocationResponse>(
    `/businesses/${businessId}/locations/${locationId}`,
    makePayload(form),
  );

  return response.data;
}

export async function deleteBusinessLocation(
  businessId: string,
  locationId: string,
): Promise<BusinessLocationMessageResponse> {
  const response = await api.delete<BusinessLocationMessageResponse>(
    `/businesses/${businessId}/locations/${locationId}`,
  );

  return response.data;
}

export function getLocationFieldErrors(error: unknown): Record<string, string> {
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

export function getLocationError(
  error: unknown,
  fallback = "The location request could not be completed.",
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
      return "You do not have permission to manage locations.";
    }

    if (error.response?.status === 422) {
      return "Review the location information and try again.";
    }

    if (!error.response) {
      return "Unable to connect to the Vizo API.";
    }
  }

  return fallback;
}

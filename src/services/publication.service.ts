import { api, getApiErrorMessage } from "@/lib/api";

import type {
  BusinessPublication,
  InstallationVerification,
  InstallationVerificationResponse,
  PublicationResponse,
  UpdatePublicationPayload,
} from "@/types/publication";

export async function getPublication(
  businessId: string,
): Promise<BusinessPublication> {
  const response = await api.get<PublicationResponse>(
    `/businesses/${businessId}/publication`,
  );

  return response.data.data.publication;
}

export async function updatePublication(
  businessId: string,
  payload: UpdatePublicationPayload,
): Promise<PublicationResponse> {
  const response = await api.put<PublicationResponse>(
    `/businesses/${businessId}/publication`,
    payload,
  );

  return response.data;
}

export async function activatePublication(
  businessId: string,
): Promise<PublicationResponse> {
  const response = await api.post<PublicationResponse>(
    `/businesses/${businessId}/publication/activate`,
  );

  return response.data;
}

export async function pausePublication(
  businessId: string,
): Promise<PublicationResponse> {
  const response = await api.post<PublicationResponse>(
    `/businesses/${businessId}/publication/pause`,
  );

  return response.data;
}

export async function regeneratePublication(
  businessId: string,
): Promise<PublicationResponse> {
  const response = await api.post<PublicationResponse>(
    `/businesses/${businessId}/publication/regenerate`,
  );

  return response.data;
}

export async function verifyWebsiteInstallation(
  businessId: string,
): Promise<InstallationVerification> {
  const response = await api.post<InstallationVerificationResponse>(
    `/businesses/${businessId}/installation/verify`,
  );

  return response.data.data.verification;
}

export function makeConnectScriptTag(publication: BusinessPublication): string {
  return `<script async src="${publication.urls.script}" data-vizo-site-id="${publication.site_id}"></script>`;
}

export function getPublicationError(
  error: unknown,
  fallback = "The request could not be completed.",
): string {
  return getApiErrorMessage(error, fallback);
}

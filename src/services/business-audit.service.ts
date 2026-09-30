import { api, getApiErrorMessage } from "@/lib/api";

import type {
  BusinessAudit,
  BusinessAuditResponse,
} from "@/types/business-audit";

export async function getBusinessAudit(
  businessId: string,
): Promise<BusinessAudit> {
  const response = await api.get<BusinessAuditResponse>(
    `/businesses/${businessId}/audit`,
  );

  return response.data.data.audit;
}

export function getBusinessAuditError(
  error: unknown,
  fallback = "The visibility audit could not be loaded.",
): string {
  return getApiErrorMessage(error, fallback);
}

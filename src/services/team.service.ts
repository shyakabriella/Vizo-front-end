import { api, getApiErrorMessage } from "@/lib/api";

import type {
  BusinessTeam,
  BusinessTeamActionResponse,
  BusinessTeamResponse,
  InviteBusinessMemberPayload,
} from "@/types/business-team";

export async function getBusinessTeam(
  businessId: string,
): Promise<BusinessTeam> {
  const response = await api.get<BusinessTeamResponse>(
    `/businesses/${businessId}/team`,
  );

  return response.data.data;
}

export async function inviteBusinessMember(
  businessId: string,
  payload: InviteBusinessMemberPayload,
): Promise<BusinessTeamActionResponse> {
  const response = await api.post<BusinessTeamActionResponse>(
    `/businesses/${businessId}/invitations`,
    payload,
  );

  return response.data;
}

export async function updateBusinessMemberRole(
  businessId: string,
  memberId: number,
  role: InviteBusinessMemberPayload["role"],
): Promise<BusinessTeamActionResponse> {
  const response = await api.patch<BusinessTeamActionResponse>(
    `/businesses/${businessId}/team/${memberId}`,
    {
      role,
    },
  );

  return response.data;
}

export async function removeBusinessMember(
  businessId: string,
  memberId: number,
): Promise<BusinessTeamActionResponse> {
  const response = await api.delete<BusinessTeamActionResponse>(
    `/businesses/${businessId}/team/${memberId}`,
  );

  return response.data;
}

export async function revokeBusinessInvitation(
  businessId: string,
  invitationId: string,
): Promise<BusinessTeamActionResponse> {
  const response = await api.delete<BusinessTeamActionResponse>(
    `/businesses/${businessId}/invitations/${invitationId}`,
  );

  return response.data;
}

export function getBusinessTeamError(
  error: unknown,
  fallback = "The team request could not be completed.",
): string {
  return getApiErrorMessage(error, fallback);
}

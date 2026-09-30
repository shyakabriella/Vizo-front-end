export type BusinessTeamRole = "owner" | "manager" | "editor" | "analyst";

export type BusinessInvitationStatus =
  "pending" | "accepted" | "revoked" | "expired";

export interface BusinessTeamOwner {
  id: number;
  name: string;
  email: string;
}

export interface BusinessTeamMember {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
  is_active: boolean;
  role: BusinessTeamRole;
  is_owner: boolean;
  joined_at?: string | null;
}

export interface BusinessInvitation {
  public_id: string;
  email: string;
  role: Exclude<BusinessTeamRole, "owner">;
  status: BusinessInvitationStatus;
  expires_at: string;
  accepted_at?: string | null;
  revoked_at?: string | null;
  created_at: string;
}

export interface BusinessTeam {
  owner: BusinessTeamOwner;
  members: BusinessTeamMember[];
  pending_invitations: BusinessInvitation[];
}

export interface BusinessTeamResponse {
  success: boolean;
  data: BusinessTeam;
}

export interface BusinessTeamActionResponse {
  success: boolean;
  message?: string;
  data?: {
    member?: Partial<BusinessTeamMember>;
    invitation?: BusinessInvitation;
  };
}

export interface InviteBusinessMemberPayload {
  email: string;
  role: Exclude<BusinessTeamRole, "owner">;
}

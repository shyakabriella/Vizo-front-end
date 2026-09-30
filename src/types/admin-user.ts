import type { UserRole } from "@/types/auth";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  language: "en" | "fr" | "rw";
  timezone: string;
  is_active: boolean;
  email_verified_at: string | null;
  last_login_at: string | null;
  roles: UserRole[];
  owned_businesses_count: number | null;
  businesses_count: number | null;
  created_at: string;
  updated_at: string;
}

export interface AdminUserPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface AdminUserListData {
  users: AdminUser[];
  pagination: AdminUserPagination;
}

export interface AdminUserListResponse {
  success: boolean;
  data: AdminUserListData;
}

export interface AdminUserDetailResponse {
  success: boolean;
  data: {
    user: AdminUser;
  };
}

export interface AdminUserStatusResponse {
  success: boolean;
  message: string;
  data: {
    user: AdminUser;
  };
}

export interface AdminUserFilters {
  search?: string;
  status?: "" | "active" | "suspended";
  role?: "" | UserRole;
  page?: number;
  per_page?: number;
}

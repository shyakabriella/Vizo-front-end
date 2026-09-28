export type UserRole =
  "super_admin" | "business_owner" | "manager" | "content_editor" | "analyst";

export interface AuthUser {
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
  permissions: string[];
  created_at: string;
}

export type User = AuthUser;

export interface LoginPayload {
  email: string;
  password: string;
  device_name?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
  language?: "en" | "fr" | "rw";
  timezone?: string;
  device_name?: string;
}

export interface AuthData {
  user: AuthUser;
  token: string;
  token_type: "Bearer";
}

export interface BackendAuthResponse {
  success: boolean;
  message: string;
  data: AuthData;
}

/*
 * The service exposes user and token at the top level for
 * compatibility with the existing AuthContext. The original
 * backend data is also kept inside data.
 */
export interface AuthResponse extends BackendAuthResponse {
  user: AuthUser;
  token: string;
  token_type: "Bearer";
}

export interface BackendMeResponse {
  success: boolean;
  data: {
    user: AuthUser;
  };
}

export interface MeResponse extends BackendMeResponse {
  user: AuthUser;
}

export interface ApiValidationError {
  success?: false;
  message?: string;
  errors?: Record<string, string[]>;
}

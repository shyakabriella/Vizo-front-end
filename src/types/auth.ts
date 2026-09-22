export type Language = "en" | "fr" | "rw";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  language: Language;
  timezone: string;
  is_active: boolean;
  email_verified_at: string | null;
  last_login_at: string | null;
  roles: string[];
  permissions: string[];
  created_at: string;
}

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
  language?: Language;
  timezone?: string;
  device_name?: string;
}

export interface AuthData {
  user: User;
  token: string;
  token_type: "Bearer";
}

export interface UserData {
  user: User;
}

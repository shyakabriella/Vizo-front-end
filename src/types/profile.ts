import type { AuthUser } from "@/types/auth";

export interface UpdateProfilePayload {
  name: string;
  email: string;
  phone: string | null;
  language: "en" | "fr" | "rw";
  timezone: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
  };
}

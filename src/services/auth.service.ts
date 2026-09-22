import api from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type {
  AuthData,
  LoginPayload,
  RegisterPayload,
  UserData,
} from "@/types/auth";

export const authService = {
  async login(payload: LoginPayload): Promise<AuthData> {
    const response = await api.post<ApiResponse<AuthData>>("/auth/login", {
      ...payload,
      device_name: payload.device_name ?? "vizo-dashboard",
    });

    if (!response.data.data) {
      throw new Error("The login response did not contain user data.");
    }

    return response.data.data;
  },

  async register(payload: RegisterPayload): Promise<AuthData> {
    const response = await api.post<ApiResponse<AuthData>>("/auth/register", {
      ...payload,
      device_name: payload.device_name ?? "vizo-dashboard",
      timezone: payload.timezone ?? "Africa/Kigali",
      language: payload.language ?? "en",
    });

    if (!response.data.data) {
      throw new Error("The registration response did not contain user data.");
    }

    return response.data.data;
  },

  async me(): Promise<UserData> {
    const response = await api.get<ApiResponse<UserData>>("/me");

    if (!response.data.data) {
      throw new Error("The profile response did not contain user data.");
    }

    return response.data.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  async logoutAll(): Promise<void> {
    await api.post("/auth/logout-all");
  },
};

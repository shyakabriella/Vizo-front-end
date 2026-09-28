import { api } from "@/lib/api";
import { clearAuth, saveAuth, updateStoredUser } from "@/lib/auth-storage";
import type {
  AuthResponse,
  BackendAuthResponse,
  BackendMeResponse,
  LoginPayload,
  MeResponse,
  RegisterPayload,
} from "@/types/auth";

export {
  getApiErrorMessage,
  getFieldErrors,
  getValidationErrors,
} from "@/lib/api";

interface MessageResponse {
  success: boolean;
  message: string;
}

interface ResetPasswordPayload {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface ChangePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

function normalizeAuthResponse(response: BackendAuthResponse): AuthResponse {
  return {
    ...response,
    user: response.data.user,
    token: response.data.token,
    token_type: response.data.token_type,
  };
}

export const authService = {
  async login(payload: LoginPayload, remember = true): Promise<AuthResponse> {
    const response = await api.post<BackendAuthResponse>(
      "/auth/login",
      payload,
    );

    const result = normalizeAuthResponse(response.data);

    saveAuth(result.token, result.user, remember);

    return result;
  },

  async register(
    payload: RegisterPayload,
    remember = true,
  ): Promise<AuthResponse> {
    const response = await api.post<BackendAuthResponse>(
      "/auth/register",
      payload,
    );

    const result = normalizeAuthResponse(response.data);

    saveAuth(result.token, result.user, remember);

    return result;
  },

  async me(): Promise<MeResponse> {
    const response = await api.get<BackendMeResponse>("/me");
    const user = response.data.data.user;

    updateStoredUser(user);

    return {
      ...response.data,
      user,
    };
  },

  async forgotPassword(email: string): Promise<MessageResponse> {
    const response = await api.post<MessageResponse>("/auth/forgot-password", {
      email,
    });

    return response.data;
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<MessageResponse> {
    const response = await api.post<MessageResponse>(
      "/auth/reset-password",
      payload,
    );

    return response.data;
  },

  async changePassword(
    payload: ChangePasswordPayload,
  ): Promise<MessageResponse> {
    const response = await api.post<MessageResponse>(
      "/auth/change-password",
      payload,
    );

    return response.data;
  },

  async resendVerification(): Promise<MessageResponse> {
    const response = await api.post<MessageResponse>(
      "/auth/email/verification-notification",
    );

    return response.data;
  },

  async verifyEmail(
    id: string,
    hash: string,
    expires?: string,
    signature?: string,
  ): Promise<MessageResponse> {
    const params = new URLSearchParams();

    if (expires) {
      params.set("expires", expires);
    }

    if (signature) {
      params.set("signature", signature);
    }

    const query = params.toString();

    const response = await api.get<MessageResponse>(
      `/auth/verify-email/${id}/${hash}${query ? `?${query}` : ""}`,
    );

    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } finally {
      clearAuth();
    }
  },

  async logoutAll(): Promise<void> {
    try {
      await api.post("/auth/logout-all");
    } finally {
      clearAuth();
    }
  },
};

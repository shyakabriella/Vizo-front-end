import { api } from "@/lib/api";
import { updateStoredUser } from "@/lib/auth-storage";
import type { ProfileResponse, UpdateProfilePayload } from "@/types/profile";

export const profileService = {
  async update(payload: UpdateProfilePayload): Promise<ProfileResponse> {
    const response = await api.patch<ProfileResponse>("/profile", payload);

    updateStoredUser(response.data.data.user);

    return response.data;
  },
};

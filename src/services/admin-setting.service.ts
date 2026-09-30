import { api } from "@/lib/api";
import type {
  GroupedSystemSettings,
  UpdateSystemSettingsPayload,
} from "@/types/admin-setting";

export async function getAdminSystemSettings(): Promise<GroupedSystemSettings> {
  const response = await api.get<{
    success: boolean;
    data: {
      settings: GroupedSystemSettings;
    };
  }>("/admin/settings");

  return response.data.data.settings;
}

export async function updateAdminSystemSettings(
  payload: UpdateSystemSettingsPayload,
): Promise<GroupedSystemSettings> {
  const response = await api.patch<{
    success: boolean;
    message: string;
    data: {
      settings: GroupedSystemSettings;
    };
  }>("/admin/settings", payload);

  return response.data.data.settings;
}

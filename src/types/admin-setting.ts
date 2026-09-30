export type SystemSettingGroup =
  "general" | "billing" | "support" | "media" | "analytics" | "publication";

export type SystemSettingType = "string" | "integer" | "boolean" | "array";

export type SystemSettingValue = string | number | boolean | string[] | null;

export type SystemSettingEntry = {
  key: string;
  label: string;
  description?: string | null;
  type: SystemSettingType;
  value: SystemSettingValue;
};

export type GroupedSystemSettings = Partial<
  Record<SystemSettingGroup, Record<string, SystemSettingEntry>>
>;

export type SystemSettingFormValues = Partial<
  Record<SystemSettingGroup, Record<string, SystemSettingValue>>
>;

export type UpdateSystemSettingsPayload = {
  settings: SystemSettingFormValues;
};

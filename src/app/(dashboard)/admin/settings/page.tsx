"use client";

import {
  AlertCircle,
  BarChart3,
  Clock3,
  CreditCard,
  Globe2,
  HardDrive,
  Headphones,
  Loader2,
  RefreshCw,
  Save,
  Settings2,
} from "lucide-react";
import {
  type ComponentType,
  type FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { getApiErrorMessage } from "@/lib/api";
import {
  getAdminSystemSettings,
  updateAdminSystemSettings,
} from "@/services/admin-setting.service";
import type {
  GroupedSystemSettings,
  SystemSettingEntry,
  SystemSettingFormValues,
  SystemSettingGroup,
  SystemSettingValue,
} from "@/types/admin-setting";

type GroupInformation = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
};

const groups: SystemSettingGroup[] = [
  "general",
  "billing",
  "support",
  "media",
  "analytics",
  "publication",
];

const groupInformation: Record<SystemSettingGroup, GroupInformation> = {
  general: {
    title: "General settings",
    description:
      "Configure the default language, currency and timezone used by Vizo.",
    icon: Globe2,
    color: "bg-blue-50 text-blue-700",
  },
  billing: {
    title: "Billing settings",
    description:
      "Control invoice payment periods and the default subscription trial.",
    icon: CreditCard,
    color: "bg-violet-50 text-violet-700",
  },
  support: {
    title: "Support settings",
    description:
      "Configure the support email and automatic ticket closing period.",
    icon: Headphones,
    color: "bg-amber-50 text-amber-700",
  },
  media: {
    title: "Media settings",
    description: "Control how large uploaded business images and files can be.",
    icon: HardDrive,
    color: "bg-rose-50 text-rose-700",
  },
  analytics: {
    title: "Analytics settings",
    description:
      "Configure how long visibility and script analytics are retained.",
    icon: BarChart3,
    color: "bg-emerald-50 text-emerald-700",
  },
  publication: {
    title: "Publication settings",
    description:
      "Control how frequently business visibility files can be regenerated.",
    icon: Clock3,
    color: "bg-cyan-50 text-cyan-700",
  },
};

const numberLimits: Record<
  string,
  { min: number; max: number; suffix?: string }
> = {
  invoice_due_days: {
    min: 1,
    max: 365,
    suffix: "days",
  },
  default_trial_days: {
    min: 0,
    max: 365,
    suffix: "days",
  },
  ticket_auto_close_days: {
    min: 1,
    max: 365,
    suffix: "days",
  },
  max_upload_mb: {
    min: 1,
    max: 100,
    suffix: "MB",
  },
  retention_days: {
    min: 30,
    max: 3650,
    suffix: "days",
  },
  regeneration_cooldown_minutes: {
    min: 1,
    max: 1440,
    suffix: "minutes",
  },
};

function extractValues(
  settings: GroupedSystemSettings,
): SystemSettingFormValues {
  const values: SystemSettingFormValues = {};

  for (const group of groups) {
    const groupSettings = settings[group];

    if (!groupSettings) continue;

    values[group] = Object.fromEntries(
      Object.entries(groupSettings).map(([name, setting]) => [
        name,
        setting.value,
      ]),
    );
  }

  return values;
}

function SettingInput({
  name,
  setting,
  value,
  disabled,
  onChange,
}: {
  name: string;
  setting: SystemSettingEntry;
  value: SystemSettingValue;
  disabled: boolean;
  onChange: (value: SystemSettingValue) => void;
}) {
  const inputClass =
    "h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100";

  if (name === "default_language") {
    return (
      <select
        value={String(value ?? "en")}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      >
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="rw">Kinyarwanda</option>
      </select>
    );
  }

  if (name === "default_currency") {
    return (
      <select
        value={String(value ?? "USD")}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      >
        <option value="USD">USD — United States Dollar</option>
        <option value="RWF">RWF — Rwandan Franc</option>
        <option value="EUR">EUR — Euro</option>
        <option value="GBP">GBP — British Pound</option>
        <option value="KES">KES — Kenyan Shilling</option>
        <option value="UGX">UGX — Ugandan Shilling</option>
        <option value="TZS">TZS — Tanzanian Shilling</option>
      </select>
    );
  }

  if (name === "default_timezone") {
    return (
      <select
        value={String(value ?? "Africa/Kigali")}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      >
        <option value="Africa/Kigali">Africa/Kigali</option>
        <option value="Africa/Juba">Africa/Juba</option>
        <option value="Africa/Nairobi">Africa/Nairobi</option>
        <option value="Africa/Kampala">Africa/Kampala</option>
        <option value="Africa/Dar_es_Salaam">Africa/Dar es Salaam</option>
        <option value="UTC">UTC</option>
      </select>
    );
  }

  if (setting.type === "boolean") {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!Boolean(value))}
        className={`relative h-7 w-12 rounded-full transition ${
          Boolean(value) ? "bg-blue-600" : "bg-slate-300"
        }`}
        aria-pressed={Boolean(value)}
      >
        <span
          className={`absolute top-1 size-5 rounded-full bg-white shadow-sm transition ${
            Boolean(value) ? "left-6" : "left-1"
          }`}
        />
      </button>
    );
  }

  if (setting.type === "integer") {
    const limits = numberLimits[name];

    return (
      <div className="relative">
        <input
          type="number"
          value={typeof value === "number" ? value : Number(value ?? 0)}
          min={limits?.min}
          max={limits?.max}
          disabled={disabled}
          onChange={(event) => onChange(Number(event.target.value))}
          className={`${inputClass} ${limits?.suffix ? "pr-24" : ""}`}
        />

        {limits?.suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
            {limits.suffix}
          </span>
        ) : null}
      </div>
    );
  }

  if (setting.type === "array") {
    return (
      <textarea
        rows={4}
        value={Array.isArray(value) ? value.join("\n") : ""}
        disabled={disabled}
        onChange={(event) =>
          onChange(
            event.target.value
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),
          )
        }
        className="w-full resize-none rounded-xl border border-slate-300 bg-white p-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
      />
    );
  }

  return (
    <input
      type={name === "email" ? "email" : "text"}
      value={String(value ?? "")}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      className={inputClass}
    />
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<GroupedSystemSettings>({});
  const [values, setValues] = useState<SystemSettingFormValues>({});
  const [loading, setLoading] = useState(true);
  const [savingGroup, setSavingGroup] = useState<SystemSettingGroup | null>(
    null,
  );
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const result = await getAdminSystemSettings();

      setSettings(result);
      setValues(extractValues(result));
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to load system settings."),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  function updateValue(
    group: SystemSettingGroup,
    name: string,
    value: SystemSettingValue,
  ) {
    setValues((current) => ({
      ...current,
      [group]: {
        ...(current[group] ?? {}),
        [name]: value,
      },
    }));
  }

  async function saveGroup(
    event: FormEvent<HTMLFormElement>,
    group: SystemSettingGroup,
  ) {
    event.preventDefault();

    const groupValues = values[group];

    if (!groupValues) return;

    try {
      setSavingGroup(group);
      setError("");
      setMessage("");

      const result = await updateAdminSystemSettings({
        settings: {
          [group]: groupValues,
        },
      });

      setSettings(result);
      setValues(extractValues(result));
      setMessage(`${groupInformation[group].title} updated successfully.`);
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to update system settings."),
      );
    } finally {
      setSavingGroup(null);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Platform configuration
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            System settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Configure platform defaults for businesses, billing, support, media,
            analytics and publication.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadSettings()}
          disabled={loading || savingGroup !== null}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-50"
        >
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Reload settings
        </button>
      </header>

      {error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>{error}</p>
        </div>
      ) : null}

      {message ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
          {message}
        </div>
      ) : null}

      {loading ? (
        <div className="grid min-h-96 place-items-center rounded-3xl border border-slate-200 bg-white">
          <div className="text-center">
            <Loader2 className="mx-auto size-8 animate-spin text-blue-600" />

            <p className="mt-3 text-sm font-semibold text-slate-500">
              Loading system settings...
            </p>
          </div>
        </div>
      ) : (
        <div className="grid items-start gap-5 xl:grid-cols-2">
          {groups.map((group) => {
            const information = groupInformation[group];
            const Icon = information.icon;
            const groupSettings = settings[group] ?? {};
            const groupValues = values[group] ?? {};
            const saving = savingGroup === group;

            return (
              <form
                key={group}
                onSubmit={(event) => void saveGroup(event, group)}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex items-start gap-4 border-b border-slate-100 p-5 sm:p-6">
                  <div
                    className={`grid size-12 shrink-0 place-items-center rounded-2xl ${information.color}`}
                  >
                    <Icon className="size-6" />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-slate-950">
                      {information.title}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {information.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  {Object.entries(groupSettings).map(([name, setting]) => (
                    <div key={setting.key}>
                      <label
                        htmlFor={setting.key}
                        className="text-sm font-black text-slate-800"
                      >
                        {setting.label}
                      </label>

                      {setting.description ? (
                        <p className="mb-2 mt-1 text-xs leading-5 text-slate-500">
                          {setting.description}
                        </p>
                      ) : (
                        <div className="h-2" />
                      )}

                      <div id={setting.key}>
                        <SettingInput
                          name={name}
                          setting={setting}
                          value={groupValues[name] ?? setting.value}
                          disabled={saving}
                          onChange={(value) => updateValue(group, name, value)}
                        />
                      </div>
                    </div>
                  ))}

                  {Object.keys(groupSettings).length === 0 ? (
                    <div className="rounded-2xl bg-slate-50 p-5 text-center">
                      <Settings2 className="mx-auto size-7 text-slate-300" />

                      <p className="mt-2 text-sm font-semibold text-slate-500">
                        No settings are available in this group.
                      </p>
                    </div>
                  ) : null}
                </div>

                {Object.keys(groupSettings).length > 0 ? (
                  <div className="flex justify-end border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-6">
                    <button
                      type="submit"
                      disabled={
                        saving ||
                        (savingGroup !== null && savingGroup !== group)
                      }
                      className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#10104b] px-5 text-sm font-black text-white transition hover:bg-[#211e67] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {saving ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Save className="size-4" />
                      )}
                      Save {information.title.toLowerCase()}
                    </button>
                  </div>
                ) : null}
              </form>
            );
          })}
        </div>
      )}
    </div>
  );
}

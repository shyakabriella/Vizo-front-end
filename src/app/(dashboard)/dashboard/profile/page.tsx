"use client";

import {
  BadgeCheck,
  CheckCircle2,
  Globe2,
  KeyRound,
  LoaderCircle,
  LogOut,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";

import { AuthGuard } from "@/components/guards/auth-guard";
import { useAuth } from "@/hooks/use-auth";
import {
  authService,
  getApiErrorMessage,
  getFieldErrors,
} from "@/services/auth.service";
import { profileService } from "@/services/profile.service";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  language: "en" | "fr" | "rw";
  timezone: string;
}

const emptyForm: FormValues = {
  name: "",
  email: "",
  phone: "",
  language: "en",
  timezone: "Africa/Kigali",
};

const languageOptions = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "rw", label: "Kinyarwanda" },
] as const;

const timezoneOptions = [
  "Africa/Kigali",
  "Africa/Nairobi",
  "Africa/Johannesburg",
  "Africa/Lagos",
  "Europe/London",
  "America/New_York",
];

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function readableRole(role: string): string {
  return role
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function ProfileContent() {
  const { user, refreshUser } = useAuth();

  const [form, setForm] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [resending, setResending] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone ?? "",
      language: user.language ?? "en",
      timezone: user.timezone ?? "Africa/Kigali",
    });
  }, [user]);

  function updateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));

    setMessage("");
    setErrorMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");
    setErrors({});

    if (!form.name.trim()) {
      setErrors({
        name: "Your name is required.",
      });

      return;
    }

    if (!form.email.trim()) {
      setErrors({
        email: "Your email address is required.",
      });

      return;
    }

    try {
      setSaving(true);

      const response = await profileService.update({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
        language: form.language,
        timezone: form.timezone,
      });

      setMessage(response.message);
      await refreshUser();
    } catch (error) {
      setErrors(getFieldErrors(error));
      setErrorMessage(
        getApiErrorMessage(error, "Your profile could not be updated."),
      );
    } finally {
      setSaving(false);
    }
  }

  async function resendVerification() {
    try {
      setResending(true);
      setMessage("");
      setErrorMessage("");

      const response = await authService.resendVerification();

      setMessage(response.message);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setResending(false);
    }
  }

  async function logoutAll() {
    const confirmed = window.confirm(
      "Sign out from every device, including this one?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoggingOut(true);
      await authService.logoutAll();
      window.location.href = "/login";
    } catch (error) {
      setLoggingOut(false);
      setErrorMessage(getApiErrorMessage(error));
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-7">
        <p className="text-sm font-semibold text-[#08758a]">Account settings</p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#10233f] sm:text-3xl">
          Profile and account
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Keep your personal information and security settings up to date.
        </p>
      </div>

      {message ? (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
          <p>{message}</p>
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mx-auto grid size-24 place-items-center rounded-full bg-gradient-to-br from-[#0b3b70] to-[#08758a] text-2xl font-bold text-white shadow-lg">
              {initials(user.name) || "V"}
            </div>

            <div className="mt-4 text-center">
              <h2 className="font-bold text-[#10233f]">{user.name}</h2>

              <p className="mt-1 break-all text-sm text-slate-500">
                {user.email}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {user.roles.map((role) => (
                <span
                  key={role}
                  className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-[#08758a]"
                >
                  {readableRole(role)}
                </span>
              ))}
            </div>

            <div className="mt-5 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-2 text-sm">
                {user.email_verified_at ? (
                  <>
                    <BadgeCheck className="size-5 text-emerald-500" />
                    <span className="text-emerald-700">Email verified</span>
                  </>
                ) : (
                  <>
                    <Mail className="size-5 text-amber-500" />
                    <span className="text-amber-700">
                      Verification required
                    </span>
                  </>
                )}
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm">
                <ShieldCheck className="size-5 text-[#08758a]" />
                <span className="text-slate-600">
                  {user.is_active ? "Account active" : "Account suspended"}
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#10233f]">Permissions</h3>

            <p className="mt-2 text-sm text-slate-500">
              {user.permissions.length} permission
              {user.permissions.length === 1 ? "" : "s"} assigned
            </p>

            <div className="mt-4 max-h-44 space-y-2 overflow-y-auto pr-1">
              {user.permissions.slice(0, 12).map((permission) => (
                <div
                  key={permission}
                  className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600"
                >
                  {permission}
                </div>
              ))}

              {user.permissions.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No direct permissions assigned.
                </p>
              ) : null}
            </div>
          </section>
        </aside>

        <div className="space-y-6">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-[#0b3b70]">
                <UserRound className="size-5" />
              </span>

              <div>
                <h2 className="font-bold text-[#10233f]">
                  Personal information
                </h2>

                <p className="text-sm text-slate-500">
                  Information associated with your account
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>

                <div className="relative">
                  <UserRound className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />

                  <input
                    id="name"
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    className="h-12 w-full rounded-2xl border border-slate-200 pl-12 pr-4 outline-none transition focus:border-[#08758a] focus:ring-4 focus:ring-[#08758a]/10"
                  />
                </div>

                {errors.name ? (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />

                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    className="h-12 w-full rounded-2xl border border-slate-200 pl-12 pr-4 outline-none transition focus:border-[#08758a] focus:ring-4 focus:ring-[#08758a]/10"
                  />
                </div>

                {errors.email ? (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone number
                </label>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />

                  <input
                    id="phone"
                    value={form.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    placeholder="+250..."
                    className="h-12 w-full rounded-2xl border border-slate-200 pl-12 pr-4 outline-none transition focus:border-[#08758a] focus:ring-4 focus:ring-[#08758a]/10"
                  />
                </div>

                {errors.phone ? (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="language"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Language
                </label>

                <select
                  id="language"
                  value={form.language}
                  onChange={(event) =>
                    updateField(
                      "language",
                      event.target.value as FormValues["language"],
                    )
                  }
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none focus:border-[#08758a] focus:ring-4 focus:ring-[#08758a]/10"
                >
                  {languageOptions.map((language) => (
                    <option key={language.value} value={language.value}>
                      {language.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="timezone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Timezone
                </label>

                <div className="relative">
                  <Globe2 className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />

                  <select
                    id="timezone"
                    value={form.timezone}
                    onChange={(event) =>
                      updateField("timezone", event.target.value)
                    }
                    className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-[#08758a] focus:ring-4 focus:ring-[#08758a]/10"
                  >
                    {timezoneOptions.map((timezone) => (
                      <option key={timezone} value={timezone}>
                        {timezone}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-7 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0b3b70] to-[#08758a] px-6 font-semibold text-white shadow-lg disabled:opacity-60"
              >
                {saving ? (
                  <LoaderCircle className="size-5 animate-spin" />
                ) : (
                  <Save className="size-5" />
                )}

                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>

          {!user.email_verified_at ? (
            <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
              <h2 className="font-bold text-amber-900">
                Verify your email address
              </h2>

              <p className="mt-2 text-sm leading-6 text-amber-700">
                Check your inbox or request a new verification message.
              </p>

              <button
                type="button"
                onClick={resendVerification}
                disabled={resending}
                className="mt-4 rounded-xl bg-amber-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {resending ? "Sending..." : "Resend verification email"}
              </button>
            </section>
          ) : null}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-violet-50 text-violet-700">
                <KeyRound className="size-5" />
              </span>

              <div>
                <h2 className="font-bold text-[#10233f]">
                  Password and security
                </h2>

                <p className="text-sm text-slate-500">
                  Manage your password and active sessions
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/change-password"
                className="flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-[#10233f] transition hover:bg-slate-50"
              >
                Change password
              </Link>

              <button
                type="button"
                onClick={logoutAll}
                disabled={loggingOut}
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-red-200 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
              >
                {loggingOut ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <LogOut className="size-4" />
                )}
                Sign out all devices
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}

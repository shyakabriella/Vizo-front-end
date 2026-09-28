"use client";

import { LoaderCircle, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";

import { AuthCard } from "@/components/auth/auth-card";
import { getToken } from "@/lib/auth-storage";
import { authService, getApiErrorMessage } from "@/services/auth.service";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!getToken()) {
      setError("Please sign in before changing your password.");
      return;
    }

    if (password.length < 8) {
      setError("New password must have at least 8 characters.");
      return;
    }

    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setError("New password must contain letters and numbers.");
      return;
    }

    if (password !== confirmation) {
      setError("Password confirmation does not match.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await authService.changePassword({
        current_password: currentPassword,
        password,
        password_confirmation: confirmation,
      });

      setSuccess(response.message);
      setCurrentPassword("");
      setPassword("");
      setConfirmation("");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Change password"
      description="Update your account password. Other active sessions will be signed out."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? (
          <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">
            {success}
          </div>
        ) : null}

        {[
          {
            value: currentPassword,
            setter: setCurrentPassword,
            placeholder: "Current password",
          },
          {
            value: password,
            setter: setPassword,
            placeholder: "New password",
          },
          {
            value: confirmation,
            setter: setConfirmation,
            placeholder: "Confirm new password",
          },
        ].map((field) => (
          <div key={field.placeholder} className="relative">
            <LockKeyhole className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />

            <input
              type="password"
              value={field.value}
              onChange={(event) => field.setter(event.target.value)}
              placeholder={field.placeholder}
              className="h-13 w-full rounded-2xl border border-slate-200 pl-12 pr-4 outline-none focus:border-[#08758a] focus:ring-4 focus:ring-[#08758a]/10"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={submitting}
          className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0b3b70] to-[#08758a] font-semibold text-white disabled:opacity-60"
        >
          {submitting ? <LoaderCircle className="size-5 animate-spin" /> : null}
          {submitting ? "Updating..." : "Update password"}
        </button>

        <Link
          href="/dashboard"
          className="flex h-12 items-center justify-center rounded-2xl border border-slate-200 font-semibold text-slate-600"
        >
          Cancel
        </Link>
      </form>
    </AuthCard>
  );
}

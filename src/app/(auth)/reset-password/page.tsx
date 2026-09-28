"use client";

import { Eye, EyeOff, LoaderCircle, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type FormEvent, Suspense, useState } from "react";

import { AuthCard } from "@/components/auth/auth-card";
import { authService, getApiErrorMessage } from "@/services/auth.service";

function ResetPasswordForm() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";
  const initialEmail = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("The password reset token is missing.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setError("Password must contain letters and numbers.");
      return;
    }

    if (password !== confirmation) {
      setError("Password confirmation does not match.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await authService.resetPassword({
        token,
        email: email.trim().toLowerCase(),
        password,
        password_confirmation: confirmation,
      });

      setSuccess(response.message);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Create a new password"
      description="Choose a strong password containing letters and numbers."
    >
      {success ? (
        <div className="space-y-5">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            {success}
          </div>

          <Link
            href="/login"
            className="flex h-13 items-center justify-center rounded-2xl bg-[#0b3b70] font-semibold text-white"
          >
            Continue to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="h-13 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-[#08758a] focus:ring-4 focus:ring-[#08758a]/10"
          />

          <div className="relative">
            <LockKeyhole className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New password"
              className="h-13 w-full rounded-2xl border border-slate-200 pl-12 pr-12 outline-none focus:border-[#08758a] focus:ring-4 focus:ring-[#08758a]/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center text-slate-400"
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>

          <input
            type={showPassword ? "text" : "password"}
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            placeholder="Confirm new password"
            className="h-13 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-[#08758a] focus:ring-4 focus:ring-[#08758a]/10"
          />

          <button
            type="submit"
            disabled={submitting}
            className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0b3b70] to-[#08758a] font-semibold text-white disabled:opacity-60"
          >
            {submitting ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : null}
            {submitting ? "Resetting..." : "Reset password"}
          </button>
        </form>
      )}
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}

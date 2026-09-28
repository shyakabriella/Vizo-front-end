"use client";

import { ArrowRight, LoaderCircle, Mail } from "lucide-react";
import { type FormEvent, useState } from "react";

import { AuthCard } from "@/components/auth/auth-card";
import { authService, getApiErrorMessage } from "@/services/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await authService.forgotPassword(
        email.trim().toLowerCase(),
      );

      setSuccess(response.message);
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "We could not process your request."),
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Forgot your password?"
      description="Enter your email and we will send password reset instructions if an account exists."
    >
      {success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-700">
          {success}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#1b2b43]"
            >
              Email address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />

              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="h-13 w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-[#08758a] focus:ring-4 focus:ring-[#08758a]/10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0b3b70] to-[#08758a] font-semibold text-white shadow-lg disabled:opacity-60"
          >
            {submitting ? (
              <>
                <LoaderCircle className="size-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send reset link
                <ArrowRight className="size-5" />
              </>
            )}
          </button>
        </form>
      )}
    </AuthCard>
  );
}

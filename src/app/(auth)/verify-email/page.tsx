"use client";

import { CheckCircle2, LoaderCircle, MailCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { AuthCard } from "@/components/auth/auth-card";
import { authService, getApiErrorMessage } from "@/services/auth.service";

function VerifyEmailContent() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const id = searchParams.get("id");
  const hash = searchParams.get("hash");
  const expires = searchParams.get("expires");
  const signature = searchParams.get("signature");

  useEffect(() => {
    if (!id || !hash) {
      return;
    }

    async function verify() {
      try {
        setLoading(true);

        const response = await authService.verifyEmail(
          id!,
          hash!,
          expires ?? undefined,
          signature ?? undefined,
        );

        setSuccess(response.message);
      } catch (requestError) {
        setError(getApiErrorMessage(requestError));
      } finally {
        setLoading(false);
      }
    }

    void verify();
  }, [id, hash, expires, signature]);

  async function resend() {
    try {
      setSending(true);
      setError("");

      const response = await authService.resendVerification();

      setSuccess(response.message);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setSending(false);
    }
  }

  return (
    <AuthCard
      title="Verify your email"
      description="Email verification protects your account and enables all Vizo features."
    >
      <div className="text-center">
        {loading ? (
          <LoaderCircle className="mx-auto size-12 animate-spin text-[#08758a]" />
        ) : success ? (
          <CheckCircle2 className="mx-auto size-14 text-emerald-500" />
        ) : (
          <MailCheck className="mx-auto size-14 text-[#08758a]" />
        )}

        {success ? (
          <p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-700">
            {success}
          </p>
        ) : null}

        {error ? (
          <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm leading-6 text-red-700">
            {error}
          </p>
        ) : null}

        {!loading && !id ? (
          <button
            type="button"
            disabled={sending}
            onClick={resend}
            className="mt-6 h-13 w-full rounded-2xl bg-gradient-to-r from-[#0b3b70] to-[#08758a] font-semibold text-white disabled:opacity-60"
          >
            {sending ? "Sending..." : "Resend verification email"}
          </button>
        ) : null}

        <Link
          href="/dashboard"
          className="mt-4 flex h-12 items-center justify-center rounded-2xl border border-slate-200 font-semibold text-[#10233f]"
        >
          Continue to dashboard
        </Link>
      </div>
    </AuthCard>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}

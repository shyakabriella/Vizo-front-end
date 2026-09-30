"use client";

import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";

import { VizoLogo } from "@/components/public/vizo-logo";
import { useAuth } from "@/hooks/use-auth";
import { getApiErrorMessage, getFieldErrors } from "@/services/auth.service";
import type { AuthUser } from "@/types/auth";

interface LoginFields {
  email?: string;
  password?: string;
}

function redirectForUser(user: AuthUser): string {
  return user.roles.includes("super_admin") ? "/admin" : "/dashboard";
}

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<LoginFields>({});

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(redirectForUser(user));
    }
  }, [isLoading, router, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setErrors({});

    const normalizedEmail = email.trim().toLowerCase();
    const clientErrors: LoginFields = {};

    if (!normalizedEmail) {
      clientErrors.email = "Email address is required.";
    }

    if (!password) {
      clientErrors.password = "Password is required.";
    }

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    try {
      setSubmitting(true);

      const authenticatedUser = await login(
        {
          email: normalizedEmail,
          password,
          device_name: "vizo-web-dashboard",
        },
        remember,
      );

      router.replace(redirectForUser(authenticatedUser));
      router.refresh();
    } catch (error) {
      setErrors(getFieldErrors(error));
      setMessage(
        getApiErrorMessage(
          error,
          "We could not sign you in. Check your details and try again.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading || user) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f8fc]">
        <div className="text-center">
          <VizoLogo size={56} className="mx-auto size-14" />

          <LoaderCircle className="mx-auto mt-5 size-6 animate-spin text-blue-600" />

          <p className="mt-3 text-sm font-semibold text-slate-500">
            Checking your session...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#07152b] text-white lg:flex lg:flex-col lg:justify-between">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
        >
          <source src="/viz-clean-background.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#061225]/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061225]/95 via-[#061225]/80 to-[#061225]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061225]/85 via-transparent to-[#061225]/30" />

        <div className="relative z-10 flex items-center justify-between px-10 py-8 xl:px-14">
          <Link href="/" className="flex items-center gap-3">
            <VizoLogo size={48} className="size-12" />

            <span>
              <span className="block text-xl font-black">Vizo</span>
              <span className="block text-xs text-white/50">
                Business visibility platform
              </span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur transition hover:bg-white/15"
          >
            <ArrowLeft className="size-4" />
            Home
          </Link>
        </div>

        <div className="relative z-10 max-w-2xl px-10 pb-10 xl:px-14 xl:pb-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
            <Sparkles className="size-4 text-blue-300" />
            Continue your visibility journey
          </p>

          <h1 className="mt-6 text-4xl font-black leading-[1.06] tracking-[-0.05em] xl:text-6xl">
            Keep your business information accurate and discoverable.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-white/65">
            Sign in to manage business profiles, locations, services, website
            connections and visibility measurements.
          </p>

          <div className="mt-9 grid gap-3 xl:grid-cols-3">
            {[
              {
                icon: Bot,
                title: "AI visibility",
                description: "Prepare accurate business information.",
              },
              {
                icon: BarChart3,
                title: "Measure progress",
                description: "Review scores and recommendations.",
              },
              {
                icon: ShieldCheck,
                title: "Stay consistent",
                description: "Manage information from one profile.",
              },
            ].map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm"
                >
                  <Icon className="size-5 text-blue-300" />

                  <h2 className="mt-3 text-sm font-black">{feature.title}</h2>

                  <p className="mt-1 text-xs leading-5 text-white/50">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-12">
        <div className="absolute -right-20 top-20 size-64 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -left-20 bottom-10 size-64 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="relative w-full max-w-[470px]">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center gap-3">
              <VizoLogo size={44} className="size-11" />

              <span>
                <span className="block font-black text-[#10104b]">Vizo</span>
                <span className="block text-xs text-slate-500">
                  Business visibility
                </span>
              </span>
            </Link>

            <Link
              href="/"
              className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600"
              aria-label="Return to homepage"
            >
              <ArrowLeft className="size-5" />
            </Link>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/8 sm:p-8">
            <div>
              <p className="text-sm font-black text-blue-600">Welcome back</p>

              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-4xl">
                Sign in to Vizo
              </h2>

              <p className="mt-3 leading-6 text-slate-500">
                Continue managing your business visibility.
              </p>
            </div>

            {message ? (
              <div
                role="alert"
                aria-live="polite"
                className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {message}
              </div>
            ) : null}

            <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setMessage("");
                      setErrors((current) => ({
                        ...current,
                        email: undefined,
                      }));
                    }}
                    placeholder="you@business.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`h-13 w-full rounded-xl border bg-white py-3 pl-12 pr-4 text-[#10104b] outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {errors.email ? (
                  <p
                    id="email-error"
                    className="mt-2 text-sm font-semibold text-red-600"
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="password"
                    className="text-sm font-bold text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-bold text-blue-700 transition hover:text-blue-900"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setMessage("");
                      setErrors((current) => ({
                        ...current,
                        password: undefined,
                      }));
                    }}
                    placeholder="Enter your password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    className={`h-13 w-full rounded-xl border bg-white py-3 pl-12 pr-12 text-[#10104b] outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="size-[18px]" />
                    ) : (
                      <Eye className="size-[18px]" />
                    )}
                  </button>
                </div>

                {errors.password ? (
                  <p
                    id="password-error"
                    className="mt-2 text-sm font-semibold text-red-600"
                  >
                    {errors.password}
                  </p>
                ) : null}
              </div>

              <label className="flex w-fit cursor-pointer items-center gap-3 text-sm font-semibold text-slate-600">
                <span
                  className={`grid size-5 place-items-center rounded-md border transition ${
                    remember
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="sr-only"
                  />

                  {remember ? (
                    <Check className="size-3.5" strokeWidth={3} />
                  ) : null}
                </span>
                Keep me signed in
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#10104b] px-6 font-black text-white transition hover:bg-[#211e67] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <LoaderCircle className="size-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="size-5 transition group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold text-slate-400">
                New to Vizo?
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <Link
              href="/register"
              className="flex h-13 w-full items-center justify-center rounded-xl border border-slate-300 bg-white font-black text-[#10104b] transition hover:border-blue-300 hover:bg-blue-50"
            >
              Create a business account
            </Link>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="size-4 text-emerald-500" />
              Your account connection is protected.
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500">
            <Link href="/help" className="hover:text-blue-700">
              Help centre
            </Link>

            <Link href="/contact" className="hover:text-blue-700">
              Contact support
            </Link>

            <span>© {new Date().getFullYear()} Vizo</span>
          </div>
        </div>
      </section>
    </main>
  );
}

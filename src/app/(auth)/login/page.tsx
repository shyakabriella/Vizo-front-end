"use client";

import {
  ArrowRight,
  BarChart3,
  Check,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";

import styles from "./login.module.css";

import {
  authService,
  getApiErrorMessage,
  getFieldErrors,
} from "@/services/auth.service";
import type { AuthUser } from "@/types/auth";
import { getStoredUser, getToken } from "@/lib/auth-storage";

interface LoginFields {
  email?: string;
  password?: string;
}

function redirectForUser(user: AuthUser): string {
  return user.roles.includes("super_admin") ? "/admin" : "/dashboard";
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<LoginFields>({});

  useEffect(() => {
    const token = getToken();
    const user = getStoredUser();

    if (token && user) {
      router.replace(redirectForUser(user));
    }
  }, [router]);

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

      const response = await authService.login(
        {
          email: normalizedEmail,
          password,
          device_name: "vizo-web-dashboard",
        },
        remember,
      );

      router.replace(redirectForUser(response.data.user));
      router.refresh();
    } catch (error) {
      setErrors(getFieldErrors(error));
      setMessage(
        getApiErrorMessage(
          error,
          "We could not sign you in. Please try again.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      className={`${styles.page} min-h-screen bg-[#f6f8fc] lg:grid lg:grid-cols-[minmax(390px,0.92fr)_1.08fr]`}
    >
      <section
        className={`${styles.brandPanel} ${styles.grid} hidden min-h-screen bg-gradient-to-br from-[#081c3a] via-[#0b3566] to-[#086d7c] px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-16`}
      >
        <div className="relative z-10 flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-white text-[#0b3b70] shadow-xl shadow-black/10">
            <SearchCheck className="size-6" />
          </div>

          <div>
            <p className="text-xl font-bold tracking-tight">Vizo</p>
            <p className="text-xs text-white/60">AI visibility platform</p>
          </div>
        </div>

        <div className={`${styles.brandContent} relative z-10 max-w-xl`}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur">
            <Sparkles className="size-4 text-cyan-300" />
            Help AI understand your business
          </div>

          <h1 className="max-w-lg text-4xl font-bold leading-[1.12] tracking-[-0.04em] xl:text-5xl">
            Make your business visible in the age of AI.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-white/70 xl:text-lg">
            Organize your business information, publish machine-readable
            content, and understand how customers discover you.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              {
                icon: SearchCheck,
                title: "Get discovered",
                text: "Help AI find accurate information.",
              },
              {
                icon: BarChart3,
                title: "Track visibility",
                text: "Measure activity and performance.",
              },
              {
                icon: ShieldCheck,
                title: "Stay accurate",
                text: "Control what systems publish.",
              },
            ].map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm"
                >
                  <Icon className="size-5 text-cyan-300" />
                  <p className="mt-3 text-sm font-semibold">{feature.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/45">
          © {new Date().getFullYear()} Vizo. Built for modern businesses.
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className={`${styles.formCard} w-full max-w-md`}>
          <div className="mb-9 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-[#0b3b70] text-white shadow-lg shadow-blue-950/15">
                <SearchCheck className="size-5" />
              </div>

              <div>
                <p className="font-bold text-[#10233f]">Vizo</p>
                <p className="text-xs text-slate-500">AI visibility platform</p>
              </div>
            </div>

            <span
              className={`${styles.pulse} size-2.5 rounded-full bg-emerald-500`}
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#08758a]">Welcome back</p>

            <h2 className="mt-2 text-3xl font-bold tracking-[-0.035em] text-[#10233f] sm:text-4xl">
              Sign in to Vizo
            </h2>

            <p className="mt-3 leading-6 text-slate-500">
              Continue managing your business visibility.
            </p>
          </div>

          {message ? (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
            >
              {message}
            </div>
          ) : null}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#1b2b43]"
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
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setErrors((current) => ({
                      ...current,
                      email: undefined,
                    }));
                  }}
                  placeholder="you@company.com"
                  aria-invalid={Boolean(errors.email)}
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-[#10233f] outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0b6f83] focus:ring-4 focus:ring-[#0b6f83]/10"
                />
              </div>

              {errors.email ? (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              ) : null}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#1b2b43]"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-[#08758a] transition hover:text-[#064e63]"
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
                    setErrors((current) => ({
                      ...current,
                      password: undefined,
                    }));
                  }}
                  placeholder="Enter your password"
                  aria-invalid={Boolean(errors.password)}
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-12 text-[#10233f] outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0b6f83] focus:ring-4 focus:ring-[#0b6f83]/10"
                />

                <button
                  type="button"
                  onClick={() => {
                    setShowPassword((current) => !current);
                  }}
                  className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-[18px]" />
                  ) : (
                    <Eye className="size-[18px]" />
                  )}
                </button>
              </div>

              {errors.password ? (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              ) : null}
            </div>

            <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-slate-600">
              <span className="relative grid size-5 place-items-center">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => {
                    setRemember(event.target.checked);
                  }}
                  className="peer size-5 appearance-none rounded-md border border-slate-300 bg-white transition checked:border-[#0b6f83] checked:bg-[#0b6f83] focus:outline-none focus:ring-4 focus:ring-[#0b6f83]/10"
                />

                <Check className="pointer-events-none absolute size-3.5 text-white opacity-0 transition peer-checked:opacity-100" />
              </span>
              Keep me signed in
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0b3b70] to-[#08758a] px-5 font-semibold text-white shadow-xl shadow-[#0b3b70]/15 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#0b3b70]/20 disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
            >
              {submitting ? (
                <>
                  <LoaderCircle className="size-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            New to Vizo?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#08758a] transition hover:text-[#064e63]"
            >
              Create an account
            </Link>
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="size-4" />
            Your account is protected by secure authentication
          </div>
        </div>
      </section>
    </main>
  );
}

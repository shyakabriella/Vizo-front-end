"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { getApiErrorMessage, getValidationErrors } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailError("");
    setLoading(true);

    try {
      const user = await login({ email, password });

      toast.success("Welcome back to Vizo.");

      const admin = user.roles.some((role) =>
        ["admin", "super_admin"].includes(role),
      );

      router.replace(admin ? "/admin" : "/dashboard");
    } catch (error) {
      const errors = getValidationErrors(error);

      if (errors.email?.[0]) {
        setEmailError(errors.email[0]);
      }

      toast.error(
        getApiErrorMessage(
          error,
          "We could not sign you in. Check your details.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden bg-[#12204a] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Link href="/" className="text-3xl font-black tracking-tight">
          vizo<span className="text-blue-400">.</span>
        </Link>

        <div className="max-w-xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-blue-300">
            Be visible everywhere
          </p>
          <h1 className="text-5xl font-bold leading-tight">
            Make your business easy to discover.
          </h1>
          <p className="mt-6 text-lg leading-8 text-blue-100/80">
            Keep your business information accurate for customers, search
            engines and AI assistants.
          </p>
        </div>

        <p className="text-sm text-blue-100/60">
          © {new Date().getFullYear()} Vizo
        </p>
      </section>

      <section className="flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-10 inline-block text-3xl font-black tracking-tight text-[#12204a] lg:hidden"
          >
            vizo<span className="text-blue-600">.</span>
          </Link>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Welcome back
          </h2>
          <p className="mt-2 text-slate-500">
            Sign in to manage your business visibility.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-600">{emailError}</p>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-400"
                  aria-label="Show or hide password"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <LoaderCircle size={19} className="animate-spin" />}
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-blue-600 hover:text-blue-700"
            >
              Create one
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

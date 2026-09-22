"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { getApiErrorMessage, getValidationErrors } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  function updateField(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: [] }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    if (form.password !== form.password_confirmation) {
      setErrors({
        password_confirmation: ["The passwords do not match."],
      });
      return;
    }

    setLoading(true);

    try {
      await register({
        ...form,
        phone: form.phone || undefined,
        language: "en",
        timezone: "Africa/Kigali",
      });

      toast.success(
        "Account created. Please check your email for verification.",
      );
      router.replace("/dashboard");
    } catch (error) {
      setErrors(getValidationErrors(error));
      toast.error(
        getApiErrorMessage(error, "We could not create your account."),
      );
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    {
      name: "name" as const,
      label: "Full name",
      type: "text",
      placeholder: "Your full name",
      autoComplete: "name",
      required: true,
    },
    {
      name: "email" as const,
      label: "Email address",
      type: "email",
      placeholder: "you@example.com",
      autoComplete: "email",
      required: true,
    },
    {
      name: "phone" as const,
      label: "Phone number",
      type: "tel",
      placeholder: "+250 7XX XXX XXX",
      autoComplete: "tel",
      required: false,
    },
    {
      name: "password" as const,
      label: "Password",
      type: "password",
      placeholder: "At least 8 characters",
      autoComplete: "new-password",
      required: true,
    },
    {
      name: "password_confirmation" as const,
      label: "Confirm password",
      type: "password",
      placeholder: "Repeat your password",
      autoComplete: "new-password",
      required: true,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-3xl font-black tracking-tight text-[#12204a]"
          >
            vizo<span className="text-blue-600">.</span>
          </Link>
          <h1 className="mt-7 text-3xl font-bold text-slate-950">
            Create your Vizo account
          </h1>
          <p className="mt-2 text-slate-500">
            Start improving your business visibility.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-5">
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  {field.label}
                  {!field.required && (
                    <span className="ml-1 font-normal text-slate-400">
                      (optional)
                    </span>
                  )}
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  value={form[field.name]}
                  onChange={(event) =>
                    updateField(field.name, event.target.value)
                  }
                  placeholder={field.placeholder}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
                {errors[field.name]?.[0] && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors[field.name][0]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-500">
            Your password must contain at least 8 characters, including letters
            and numbers.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <LoaderCircle size={19} className="animate-spin" />}
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-blue-600 hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

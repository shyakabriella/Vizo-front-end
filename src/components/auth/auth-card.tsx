import { SearchCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  backHref?: string;
  backLabel?: string;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
  backHref = "/login",
  backLabel = "Back to sign in",
}: AuthCardProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f3f7fb] px-5 py-10">
      <div className="pointer-events-none absolute -left-32 -top-32 size-80 animate-pulse rounded-full bg-cyan-200/35 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 animate-pulse rounded-full bg-blue-200/40 blur-3xl" />

      <section className="relative w-full max-w-md animate-[authEnter_500ms_ease-out] rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-2xl shadow-blue-950/10 backdrop-blur sm:p-8">
        <Link href="/" className="mb-8 inline-flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-[#0b3b70] to-[#08758a] text-white shadow-lg">
            <SearchCheck className="size-6" />
          </span>

          <span>
            <span className="block font-bold text-[#10233f]">Vizo</span>

            <span className="block text-xs text-slate-500">
              AI visibility platform
            </span>
          </span>
        </Link>

        <h1 className="text-3xl font-bold tracking-[-0.035em] text-[#10233f]">
          {title}
        </h1>

        <p className="mt-3 leading-6 text-slate-500">{description}</p>

        <div className="mt-7">{children}</div>

        {footer ? (
          <div className="mt-7 text-center text-sm text-slate-500">
            {footer}
          </div>
        ) : (
          <div className="mt-7 text-center">
            <Link
              href={backHref}
              className="text-sm font-semibold text-[#08758a] transition hover:text-[#064e63]"
            >
              {backLabel}
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

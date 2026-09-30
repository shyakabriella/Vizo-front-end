import Link from "next/link";

export function AdminFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} Vizo by AsyncAfrica. Administration
          portal.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/help" className="transition hover:text-blue-700">
            Help centre
          </Link>

          <Link href="/privacy" className="transition hover:text-blue-700">
            Privacy
          </Link>

          <Link href="/terms" className="transition hover:text-blue-700">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

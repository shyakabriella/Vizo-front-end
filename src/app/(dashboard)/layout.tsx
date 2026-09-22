"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import {
  Bell,
  Building2,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const links = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/businesses",
    label: "Businesses",
    icon: Building2,
  },
  {
    href: "/dashboard/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: UserRound,
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="text-center text-slate-500">
          <LoaderCircle
            className="mx-auto animate-spin text-blue-600"
            size={32}
          />
          <p className="mt-3 text-sm">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <aside className="border-b border-slate-200 bg-[#12204a] text-white lg:fixed lg:inset-y-0 lg:w-64 lg:border-b-0">
        <div className="flex h-20 items-center justify-between px-6">
          <Link href="/dashboard" className="text-2xl font-black">
            vizo<span className="text-blue-400">.</span>
          </Link>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
            Dashboard
          </span>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-2">
          {links.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(`${item.href}/`));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-blue-100/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={19} />
                {item.label}
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              href="/admin"
              className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-blue-100/75 transition hover:bg-white/10 hover:text-white"
            >
              <ShieldCheck size={19} />
              Administration
            </Link>
          )}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 lg:ml-64">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur sm:px-8">
          <div>
            <p className="text-sm text-slate-500">Welcome back</p>
            <p className="font-bold text-slate-900">{user.name}</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={17} />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </header>

        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}

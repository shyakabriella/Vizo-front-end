"use client";

import {
  BarChart3,
  Bell,
  BookOpenText,
  Building2,
  Clock3,
  CreditCard,
  FileCheck2,
  Globe2,
  ImageIcon,
  LayoutDashboard,
  LifeBuoy,
  LoaderCircle,
  LogOut,
  MapPin,
  Menu,
  SearchCheck,
  Settings2,
  ShieldCheck,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

import { BusinessSelector } from "@/components/business-workspace/business-selector";
import { BusinessWorkspaceProvider } from "@/contexts/business-workspace-context";
import { useAuth } from "@/hooks/use-auth";

const navigation = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/business-profile",
    label: "Business profile",
    icon: Building2,
  },
  {
    href: "/dashboard/locations",
    label: "Locations",
    icon: MapPin,
  },
  {
    href: "/dashboard/opening-hours",
    label: "Opening hours",
    icon: Clock3,
  },
  {
    href: "/dashboard/services",
    label: "Services & prices",
    icon: UtensilsCrossed,
  },
  {
    href: "/dashboard/media",
    label: "Media",
    icon: ImageIcon,
  },
  {
    href: "/dashboard/knowledge",
    label: "Knowledge entries",
    icon: BookOpenText,
  },
  {
    href: "/dashboard/website-connect",
    label: "Website Connect",
    icon: Globe2,
  },
  {
    href: "/dashboard/publication",
    label: "Publication",
    icon: FileCheck2,
  },
  {
    href: "/dashboard/visibility-audit",
    label: "Visibility audit",
    icon: SearchCheck,
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    href: "/dashboard/team",
    label: "Team members",
    icon: Users,
  },
  {
    href: "/dashboard/billing",
    label: "Subscription & billing",
    icon: CreditCard,
  },
  {
    href: "/dashboard/support",
    label: "Support",
    icon: LifeBuoy,
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, isAdmin, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    if (!isAdminRoute && !isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAdminRoute, isAuthenticated, isLoading, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isAdminRoute) {
    return children;
  }

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

  const sidebar = (
    <aside className="flex h-full flex-col bg-[#10173d] text-white">
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
        <Link href="/dashboard" className="text-2xl font-black">
          vizo
          <span className="text-blue-400">.</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="grid size-10 place-items-center rounded-xl bg-white/10 lg:hidden"
          aria-label="Close navigation"
        >
          <X size={19} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {navigation.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-950/25"
                  : "text-blue-100/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}

        {isAdmin ? (
          <Link
            href="/admin"
            className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-blue-100/70 transition hover:bg-white/10 hover:text-white"
          >
            <ShieldCheck size={18} />
            Administration
          </Link>
        ) : null}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/10"
        >
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-blue-600 font-black">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{user.name}</p>
            <p className="truncate text-xs text-blue-100/55">{user.email}</p>
          </div>
        </Link>
      </div>
    </aside>
  );

  return (
    <BusinessWorkspaceProvider>
      <div className="min-h-screen bg-slate-50 lg:flex">
        <div className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">
          {sidebar}
        </div>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            <div className="relative h-full w-[86%] max-w-72">{sidebar}</div>
          </div>
        ) : null}

        <div className="min-w-0 flex-1 lg:ml-72">
          <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-7">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="grid size-11 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
                aria-label="Open navigation"
              >
                <Menu size={20} />
              </button>

              <BusinessSelector />
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/notifications"
                className="grid size-11 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
                aria-label="Notifications"
              >
                <Bell size={19} />
              </Link>

              <Link
                href="/dashboard/profile"
                className="hidden size-11 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600 sm:grid"
                aria-label="Account settings"
              >
                <Settings2 size={19} />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="grid size-11 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                aria-label="Sign out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </header>

          <main className="p-4 sm:p-7 lg:p-8">{children}</main>
        </div>
      </div>
    </BusinessWorkspaceProvider>
  );
}

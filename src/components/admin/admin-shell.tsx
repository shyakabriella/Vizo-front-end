"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

import { AdminFooter } from "@/components/admin/admin-footer";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { useAuth } from "@/hooks/use-auth";

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [navigationOpen, setNavigationOpen] = useState(false);

  const isSuperAdmin = user?.roles.includes("super_admin") ?? false;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!isSuperAdmin) {
      router.replace("/dashboard");
    }
  }, [isLoading, isSuperAdmin, router, user]);

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  if (isLoading || !user || !isSuperAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#10104b] text-white shadow-xl">
            <Loader2 className="size-6 animate-spin" />
          </span>

          <p className="mt-4 text-sm font-bold text-slate-600">
            Preparing administration portal…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <AdminSidebar
        user={user}
        open={navigationOpen}
        onClose={() => setNavigationOpen(false)}
        onLogout={handleLogout}
      />

      <div className="flex min-h-screen flex-col lg:pl-[290px]">
        <AdminHeader
          user={user}
          onOpenNavigation={() => setNavigationOpen(true)}
        />

        <div className="flex-1">{children}</div>

        <AdminFooter />
      </div>
    </div>
  );
}

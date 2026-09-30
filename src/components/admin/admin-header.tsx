"use client";

import { ChevronDown, Menu, Search } from "lucide-react";
import Link from "next/link";

import { AdminNotificationMenu } from "@/components/admin/admin-notification-menu";
import type { AuthUser } from "@/types/auth";

interface AdminHeaderProps {
  user: AuthUser;
  onOpenNavigation: () => void;
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function AdminHeader({ user, onOpenNavigation }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-20 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenNavigation}
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
          aria-label="Open admin navigation"
        >
          <Menu className="size-5" />
        </button>

        <div className="hidden max-w-md flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 sm:flex">
          <Search className="size-4 text-slate-400" />

          <input
            type="search"
            placeholder="Search users, businesses or tickets"
            className="h-11 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <AdminNotificationMenu />

          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-1.5 pr-2 transition hover:border-blue-200"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-[#10104b] text-xs font-black text-white">
              {initials(user.name)}
            </span>

            <span className="hidden min-w-0 sm:block">
              <span className="block max-w-32 truncate text-xs font-black text-slate-900">
                {user.name}
              </span>

              <span className="block text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                Super admin
              </span>
            </span>

            <ChevronDown className="hidden size-4 text-slate-400 sm:block" />
          </Link>
        </div>
      </div>
    </header>
  );
}

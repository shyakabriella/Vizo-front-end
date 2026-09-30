"use client";

import { ExternalLink, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { VizoLogo } from "@/components/public/vizo-logo";
import { adminNavigation } from "@/config/admin-navigation";
import type { AuthUser } from "@/types/auth";

interface AdminSidebarProps {
  user: AuthUser;
  open: boolean;
  onClose: () => void;
  onLogout: () => Promise<void>;
}

function isCurrentRoute(pathname: string, href: string): boolean {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({
  user,
  open,
  onClose,
  onLogout,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close admin navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[290px] flex-col border-r border-white/10 bg-[#09072f] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <VizoLogo size={42} className="size-11" />

            <span>
              <span className="block text-xl font-black tracking-[-0.04em]">
                Vizo
              </span>

              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300">
                Administration
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-xl bg-white/10 text-white lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
          {adminNavigation.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isCurrentRoute(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`group flex items-center gap-3 rounded-2xl px-3 py-3 transition duration-200 ${
                        active
                          ? "bg-white text-[#10104b] shadow-lg"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-xl transition ${
                          active
                            ? "bg-blue-50 text-blue-700"
                            : "bg-white/10 text-white/75 group-hover:bg-white/15"
                        }`}
                      >
                        <Icon className="size-5" />
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold">
                          {item.label}
                        </span>

                        <span
                          className={`mt-0.5 block truncate text-[11px] ${
                            active ? "text-slate-500" : "text-white/35"
                          }`}
                        >
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 rounded-2xl bg-white/5 p-3">
            <p className="truncate text-sm font-bold">{user.name}</p>
            <p className="mt-1 truncate text-xs text-white/45">{user.email}</p>
          </div>

          <Link
            href="/"
            className="mb-2 flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 text-sm font-bold text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            View website
            <ExternalLink className="size-4" />
          </Link>

          <button
            type="button"
            onClick={() => void onLogout()}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 text-sm font-bold text-red-200 transition hover:bg-red-500/20"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

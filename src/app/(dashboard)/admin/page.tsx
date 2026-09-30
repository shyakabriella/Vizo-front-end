"use client";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Headphones,
  Loader2,
  RefreshCw,
  Settings,
  ShieldCheck,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { getApiErrorMessage } from "@/lib/api";
import { adminService } from "@/services/admin.service";
import type {
  AdminDashboardData,
  AdminDashboardStatistics,
} from "@/types/admin";

interface StatCardProps {
  title: string;
  value: number;
  detail: string;
  icon: LucideIcon;
  href: string;
  color: "blue" | "violet" | "emerald" | "amber";
}

const colors = {
  blue: {
    icon: "bg-blue-50 text-blue-700",
    line: "bg-blue-600",
  },
  violet: {
    icon: "bg-violet-50 text-violet-700",
    line: "bg-violet-600",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-700",
    line: "bg-emerald-600",
  },
  amber: {
    icon: "bg-amber-50 text-amber-700",
    line: "bg-amber-500",
  },
};

function StatCard({
  title,
  value,
  detail,
  icon: Icon,
  href,
  color,
}: StatCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6"
    >
      <span className={`absolute inset-x-0 top-0 h-1 ${colors[color].line}`} />

      <div className="flex items-start justify-between gap-4">
        <span
          className={`grid size-12 place-items-center rounded-2xl ${colors[color].icon}`}
        >
          <Icon className="size-6" />
        </span>

        <ArrowRight className="size-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
      </div>

      <p className="mt-6 text-sm font-bold text-slate-500">{title}</p>

      <p className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-950">
        {value.toLocaleString()}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p>
    </Link>
  );
}

function BreakdownRow({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const percentage = total > 0 ? Math.min((value / total) * 100, 100) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-600">{label}</span>

        <span className="text-sm font-black text-slate-900">
          {value.toLocaleString()}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function StatisticsBreakdown({
  statistics,
}: {
  statistics: AdminDashboardStatistics;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
            <Users className="size-5" />
          </span>

          <div>
            <h2 className="font-black text-slate-950">User health</h2>
            <p className="text-xs text-slate-500">
              Account activity across Vizo
            </p>
          </div>
        </div>

        <div className="mt-7 space-y-6">
          <BreakdownRow
            label="Active users"
            value={statistics.users.active}
            total={statistics.users.total}
            color="bg-emerald-500"
          />

          <BreakdownRow
            label="Suspended users"
            value={statistics.users.suspended}
            total={statistics.users.total}
            color="bg-red-500"
          />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-violet-50 text-violet-700">
            <Building2 className="size-5" />
          </span>

          <div>
            <h2 className="font-black text-slate-950">Business status</h2>
            <p className="text-xs text-slate-500">
              Profiles managed by the platform
            </p>
          </div>
        </div>

        <div className="mt-7 space-y-5">
          <BreakdownRow
            label="Published"
            value={statistics.businesses.published}
            total={statistics.businesses.total}
            color="bg-emerald-500"
          />

          <BreakdownRow
            label="Draft"
            value={statistics.businesses.draft}
            total={statistics.businesses.total}
            color="bg-amber-500"
          />

          <BreakdownRow
            label="Suspended"
            value={statistics.businesses.suspended}
            total={statistics.businesses.total}
            color="bg-red-500"
          />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
            <WalletCards className="size-5" />
          </span>

          <div>
            <h2 className="font-black text-slate-950">Subscriptions</h2>
            <p className="text-xs text-slate-500">
              Current subscription lifecycle
            </p>
          </div>
        </div>

        <div className="mt-7 space-y-5">
          <BreakdownRow
            label="Active"
            value={statistics.subscriptions.active}
            total={statistics.subscriptions.total}
            color="bg-emerald-500"
          />

          <BreakdownRow
            label="Trialing"
            value={statistics.subscriptions.trialing}
            total={statistics.subscriptions.total}
            color="bg-blue-500"
          />

          <BreakdownRow
            label="Cancelled"
            value={statistics.subscriptions.cancelled}
            total={statistics.subscriptions.total}
            color="bg-slate-400"
          />
        </div>
      </section>
    </div>
  );
}

const quickActions = [
  {
    title: "Manage users",
    description: "Review, activate or suspend platform accounts.",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Review businesses",
    description: "Inspect published, draft and suspended businesses.",
    href: "/admin/businesses",
    icon: Building2,
  },
  {
    title: "Manage plans",
    description: "Create and update Vizo subscription plans.",
    href: "/admin/plans",
    icon: WalletCards,
  },
  {
    title: "Support tickets",
    description: "Respond to customers and manage ticket status.",
    href: "/admin/support",
    icon: Headphones,
  },
  {
    title: "Billing records",
    description: "Review subscriptions, invoices and payments.",
    href: "/admin/billing",
    icon: CreditCard,
  },
  {
    title: "System settings",
    description: "Control platform-wide settings and limits.",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async (refresh = false) => {
    if (refresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const data = await adminService.dashboard();
      setDashboard(data);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Unable to load the administration dashboard.",
        ),
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return (
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid min-h-[55vh] place-items-center">
          <div className="text-center">
            <Loader2 className="mx-auto size-8 animate-spin text-blue-700" />

            <p className="mt-4 text-sm font-bold text-slate-500">
              Loading platform information…
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !dashboard) {
    return (
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-red-50 text-red-600">
            <ShieldCheck className="size-7" />
          </span>

          <h1 className="mt-5 text-2xl font-black text-slate-950">
            Dashboard unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {error || "The server did not return dashboard information."}
          </p>

          <button
            type="button"
            onClick={() => void loadDashboard()}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[#10104b] px-5 text-sm font-black text-white"
          >
            <RefreshCw className="size-4" />
            Try again
          </button>
        </div>
      </main>
    );
  }

  const { statistics } = dashboard;

  return (
    <main className="px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-blue-700">
              <CheckCircle2 className="size-4" />
              Platform operational
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Administration overview
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Monitor users, businesses, subscriptions and billing activity
              across the Vizo platform.
            </p>
          </div>

          <button
            type="button"
            disabled={refreshing}
            onClick={() => void loadDashboard(true)}
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw
              className={`size-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh data
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total users"
            value={statistics.users.total}
            detail={`${statistics.users.active.toLocaleString()} active accounts`}
            icon={Users}
            href="/admin/users"
            color="blue"
          />

          <StatCard
            title="Businesses"
            value={statistics.businesses.total}
            detail={`${statistics.businesses.published.toLocaleString()} published profiles`}
            icon={Building2}
            href="/admin/businesses"
            color="violet"
          />

          <StatCard
            title="Subscriptions"
            value={statistics.subscriptions.total}
            detail={`${statistics.subscriptions.active.toLocaleString()} active subscriptions`}
            icon={CreditCard}
            href="/admin/billing"
            color="emerald"
          />

          <StatCard
            title="Successful payments"
            value={statistics.billing.successful_payments}
            detail={`${statistics.billing.invoices.toLocaleString()} total invoices`}
            icon={DollarSign}
            href="/admin/billing"
            color="amber"
          />
        </div>

        <div className="mt-5">
          <StatisticsBreakdown statistics={statistics} />
        </div>

        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
                Administration tools
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Quickly open the main platform management modules.
              </p>
            </div>

            <p className="text-xs font-bold text-slate-400">
              {statistics.billing.payment_transactions.toLocaleString()} payment
              transactions recorded
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex gap-4 rounded-2xl border border-slate-200 p-4 transition duration-200 hover:border-blue-200 hover:bg-blue-50/40"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-blue-100 group-hover:text-blue-700">
                    <Icon className="size-5" />
                  </span>

                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-black text-slate-900">
                      {action.title}
                      <ArrowRight className="size-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      {action.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

"use client";

import {
  Activity,
  AlertCircle,
  BarChart3,
  Building2,
  CheckCircle2,
  Eye,
  Globe2,
  Loader2,
  RefreshCw,
  UsersRound,
  Zap,
} from "lucide-react";
import {
  type ComponentType,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getApiErrorMessage } from "@/lib/api";
import { getAdminAnalytics } from "@/services/admin-analytics.service";
import type {
  AdminAnalytics,
  AdminAnalyticsDaily,
} from "@/types/admin-analytics";

function number(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: value >= 10000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function date(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function dateTime(value?: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function eventLabel(value: string) {
  return value.replaceAll("_", " ");
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`grid size-11 place-items-center rounded-xl ${color}`}>
        <Icon className="size-5" />
      </div>

      <p className="mt-4 text-sm font-bold text-slate-500">{label}</p>

      <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">
        {number(value)}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
    </article>
  );
}

function DailyChart({ daily }: { daily: AdminAnalyticsDaily[] }) {
  const maximum = Math.max(...daily.map((item) => item.events), 1);

  const visibleLabels = daily.length <= 14;

  return (
    <div>
      <div className="flex h-64 items-end gap-1 overflow-hidden rounded-2xl bg-slate-50 px-3 pb-3 pt-6 sm:gap-2 sm:px-5">
        {daily.map((item) => {
          const percentage =
            item.events === 0 ? 2 : Math.max(5, (item.events / maximum) * 100);

          return (
            <div
              key={item.date}
              className="group flex h-full min-w-0 flex-1 flex-col justify-end"
              title={`${date(item.date)}: ${item.events} events`}
            >
              <div className="relative flex h-full items-end">
                <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-2 py-1 text-[10px] font-bold text-white group-hover:block">
                  {item.events} events
                </span>

                <div
                  style={{
                    height: `${percentage}%`,
                  }}
                  className="w-full rounded-t-md bg-gradient-to-t from-blue-700 to-cyan-400 transition duration-300 group-hover:from-violet-700 group-hover:to-blue-400"
                />
              </div>

              {visibleLabels ? (
                <p className="mt-2 truncate text-center text-[9px] font-bold text-slate-400">
                  {date(item.date)}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {!visibleLabels && daily.length > 0 ? (
        <div className="mt-3 flex justify-between text-xs font-semibold text-slate-400">
          <span>{date(daily[0].date)}</span>
          <span>{date(daily[daily.length - 1].date)}</span>
        </div>
      ) : null}
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      setAnalytics(await getAdminAnalytics(days));
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to load platform analytics."),
      );
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    void loadAnalytics();
  }, [loadAnalytics]);

  const maximumBusinessEvents = useMemo(
    () =>
      Math.max(
        ...(analytics?.top_businesses.map((business) => business.events) ?? [
          1,
        ]),
        1,
      ),
    [analytics],
  );

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Platform performance
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Analytics
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Monitor Vizo installations, website activity, businesses, sessions
            and visibility events across the platform.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            className="h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-700 outline-none focus:border-blue-500"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={180}>Last 180 days</option>
            <option value={365}>Last 365 days</option>
          </select>

          <button
            type="button"
            onClick={() => void loadAnalytics()}
            disabled={loading}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </header>

      {error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>{error}</p>
        </div>
      ) : null}

      {loading && !analytics ? (
        <div className="grid min-h-[500px] place-items-center rounded-3xl border border-slate-200 bg-white">
          <div className="text-center">
            <Loader2 className="mx-auto size-9 animate-spin text-blue-600" />

            <p className="mt-3 text-sm font-bold text-slate-500">
              Loading platform analytics...
            </p>
          </div>
        </div>
      ) : analytics ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total events"
              value={analytics.summary.total_events}
              description={`${number(
                analytics.summary.events_today,
              )} events recorded today`}
              icon={Activity}
              color="bg-blue-50 text-blue-700"
            />

            <StatCard
              label="Script loads"
              value={analytics.summary.script_loads}
              description="Successful Vizo script installations and loads"
              icon={Zap}
              color="bg-violet-50 text-violet-700"
            />

            <StatCard
              label="Page views"
              value={analytics.summary.page_views}
              description={`${number(
                analytics.summary.unique_pages,
              )} unique pages reached`}
              icon={Eye}
              color="bg-emerald-50 text-emerald-700"
            />

            <StatCard
              label="Unique sessions"
              value={analytics.summary.unique_sessions}
              description={`${number(
                analytics.summary.unique_visitors,
              )} identifiable visitors`}
              icon={UsersRound}
              color="bg-amber-50 text-amber-700"
            />
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              label="All businesses"
              value={analytics.platform.total_businesses}
              description={`${number(
                analytics.platform.published_businesses,
              )} currently published`}
              icon={Building2}
              color="bg-slate-100 text-slate-700"
            />

            <StatCard
              label="Active publications"
              value={analytics.platform.active_publications}
              description={`${number(
                analytics.platform.total_publications,
              )} total publications`}
              icon={Globe2}
              color="bg-cyan-50 text-cyan-700"
            />

            <StatCard
              label="Verified scripts"
              value={analytics.platform.verified_scripts}
              description={`${number(
                analytics.platform.reachable_websites,
              )} reachable websites`}
              icon={CheckCircle2}
              color="bg-teal-50 text-teal-700"
            />
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                  Event activity
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-950">
                  Platform events over time
                </h2>
              </div>

              <p className="text-xs font-semibold text-slate-400">
                {date(analytics.period.from)} – {date(analytics.period.to)}
              </p>
            </div>

            <div className="mt-6">
              <DailyChart daily={analytics.daily} />
            </div>
          </section>

          <div className="grid items-start gap-6 xl:grid-cols-2">
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                  Business performance
                </p>

                <h2 className="mt-1 text-lg font-black text-slate-950">
                  Top businesses
                </h2>
              </div>

              {analytics.top_businesses.length === 0 ? (
                <div className="p-10 text-center">
                  <Building2 className="mx-auto size-9 text-slate-300" />
                  <p className="mt-3 text-sm font-bold text-slate-500">
                    No business activity recorded yet.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {analytics.top_businesses.map((business, index) => (
                    <div key={business.public_id} className="p-5 sm:px-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-xs font-black text-blue-600">
                            #{index + 1}
                          </p>

                          <p className="mt-1 truncate font-black text-slate-900">
                            {business.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {number(business.unique_sessions)} unique sessions
                          </p>
                        </div>

                        <p className="shrink-0 text-lg font-black text-slate-950">
                          {number(business.events)}
                        </p>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          style={{
                            width: `${Math.max(
                              3,
                              (business.events / maximumBusinessEvents) * 100,
                            )}%`,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-700 to-cyan-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                  Website reach
                </p>

                <h2 className="mt-1 text-lg font-black text-slate-950">
                  Top pages
                </h2>
              </div>

              {analytics.top_pages.length === 0 ? (
                <div className="p-10 text-center">
                  <Globe2 className="mx-auto size-9 text-slate-300" />
                  <p className="mt-3 text-sm font-bold text-slate-500">
                    No page activity recorded yet.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {analytics.top_pages.map((page, index) => (
                    <div
                      key={`${page.page_url}-${index}`}
                      className="flex items-start justify-between gap-4 p-5 sm:px-6"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-slate-900">
                          {page.page_host ?? "Unknown website"}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {page.page_url}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                        {number(page.events)} events
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                Live activity
              </p>

              <h2 className="mt-1 text-lg font-black text-slate-950">
                Recent events
              </h2>
            </div>

            {analytics.recent_events.length === 0 ? (
              <div className="p-12 text-center">
                <BarChart3 className="mx-auto size-10 text-slate-300" />

                <p className="mt-3 font-black text-slate-800">
                  No recent events
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Events will appear after websites install and use the Vizo
                  Connect script.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[850px] w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Event</th>
                      <th className="px-6 py-4">Business</th>
                      <th className="px-6 py-4">Website page</th>
                      <th className="px-6 py-4">Session</th>
                      <th className="px-6 py-4">Time</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {analytics.recent_events.map((event, index) => (
                      <tr
                        key={`${event.occurred_at}-${index}`}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-black capitalize text-blue-700">
                            {eventLabel(event.event_type)}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-bold text-slate-800">
                          {event.business?.name ?? "Unknown"}
                        </td>

                        <td className="max-w-xs px-6 py-4">
                          <p className="truncate text-slate-700">
                            {event.page_host ?? "—"}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-400">
                            {event.page_url ?? "—"}
                          </p>
                        </td>

                        <td className="max-w-40 px-6 py-4">
                          <p className="truncate font-mono text-xs text-slate-500">
                            {event.session_id ?? "—"}
                          </p>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                          {dateTime(event.occurred_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      ) : null}
    </div>
  );
}

"use client";

import {
  Activity,
  BarChart3,
  Clock3,
  Eye,
  FileText,
  Globe2,
  LoaderCircle,
  RefreshCw,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import {
  getBusinessAnalytics,
  getBusinessAnalyticsError,
} from "@/services/analytics.service";
import type {
  BusinessAnalytics,
  BusinessAnalyticsDaily,
  BusinessAnalyticsRecentEvent,
} from "@/types/business-analytics";

const periods = [
  { label: "7 days", value: 7 },
  { label: "30 days", value: 30 },
  { label: "90 days", value: 90 },
  { label: "1 year", value: 365 },
];

function number(value: number): string {
  return new Intl.NumberFormat("en").format(value);
}

function formatDate(value?: string | null): string {
  if (!value) {
    return "Unknown";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function shortDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function eventLabel(eventType: string): string {
  return eventType
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function metadataTitle(
  metadata?: Record<string, unknown> | null,
): string | null {
  const value = metadata?.page_title;

  return typeof value === "string" && value.trim() ? value : null;
}

function compactChartData(
  values: BusinessAnalyticsDaily[],
  maximumPoints = 30,
): BusinessAnalyticsDaily[] {
  if (values.length <= maximumPoints) {
    return values;
  }

  const groupSize = Math.ceil(values.length / maximumPoints);
  const grouped: BusinessAnalyticsDaily[] = [];

  for (let index = 0; index < values.length; index += groupSize) {
    const group = values.slice(index, index + groupSize);

    grouped.push({
      date: group[0].date,
      events: group.reduce((total, item) => total + item.events, 0),
    });
  }

  return grouped;
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
  icon: typeof Activity;
  color: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="break-words text-sm font-bold text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
            {number(value)}
          </p>
        </div>

        <div
          className={`grid size-10 shrink-0 place-items-center rounded-xl ${color}`}
        >
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500">{description}</p>
    </div>
  );
}

function RecentEventCard({ event }: { event: BusinessAnalyticsRecentEvent }) {
  const title =
    metadataTitle(event.metadata) ?? event.page_host ?? "Website event";

  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex min-w-0 items-start gap-3">
        <div
          className={`grid size-9 shrink-0 place-items-center rounded-xl ${
            event.event_type === "page_view"
              ? "bg-blue-50 text-blue-600"
              : "bg-violet-50 text-violet-600"
          }`}
        >
          {event.event_type === "page_view" ? (
            <Eye size={17} />
          ) : (
            <Activity size={17} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="break-words font-black text-slate-900">{title}</p>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-600">
              {eventLabel(event.event_type)}
            </span>
          </div>

          {event.page_url && (
            <p className="mt-2 break-all text-xs leading-5 text-slate-500">
              {event.page_url}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-slate-400">
            <span>{formatDate(event.occurred_at)}</span>

            {event.session_id && (
              <span className="break-all">Session: {event.session_id}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const { selectedBusiness, isLoading: businessLoading } =
    useBusinessWorkspace();

  const [analytics, setAnalytics] = useState<BusinessAnalytics | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadAnalytics = useCallback(
    async (refresh = false) => {
      if (!selectedBusiness) {
        setAnalytics(null);
        setLoading(false);
        return;
      }

      try {
        if (refresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const result = await getBusinessAnalytics(
          selectedBusiness.public_id,
          days,
        );

        setAnalytics(result);
      } catch (requestError) {
        setError(
          getBusinessAnalyticsError(
            requestError,
            "Business analytics could not be loaded.",
          ),
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [days, selectedBusiness],
  );

  useEffect(() => {
    void loadAnalytics();
  }, [loadAnalytics]);

  const chartData = useMemo(
    () => compactChartData(analytics?.daily ?? []),
    [analytics],
  );

  const maximumEvents = useMemo(
    () => Math.max(1, ...chartData.map((item) => item.events)),
    [chartData],
  );

  if (businessLoading || loading) {
    return (
      <div className="grid min-h-[420px] place-items-center">
        <div className="text-center">
          <LoaderCircle
            className="mx-auto animate-spin text-blue-600"
            size={32}
          />
          <p className="mt-3 text-sm font-semibold text-slate-500">
            Loading business analytics...
          </p>
        </div>
      </div>
    );
  }

  if (!selectedBusiness) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-12">
        <BarChart3 className="mx-auto text-slate-300" size={44} />

        <h1 className="mt-4 text-xl font-black text-slate-950">
          No business selected
        </h1>

        <p className="mt-2 text-slate-500">
          Create or select a business before viewing analytics.
        </p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 sm:p-8">
        <p className="font-black text-red-900">Analytics unavailable</p>

        <p className="mt-2 text-sm leading-6 text-red-700">
          {error || "Please try again."}
        </p>

        <button
          type="button"
          onClick={() => void loadAnalytics()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-black text-white"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }

  const hasEvents = analytics.summary.total_events > 0;

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden pb-10">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Analytics
          </p>

          <h1 className="mt-2 break-words text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            {selectedBusiness.name}
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
            Monitor Website Connect activity, page views and audience sessions.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
          <select
            value={days}
            disabled={refreshing}
            onChange={(event) => setDays(Number(event.target.value))}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-700 outline-none focus:border-blue-500 sm:w-auto"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            disabled={refreshing}
            onClick={() => void loadAnalytics(true)}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-50 sm:w-auto"
          >
            <RefreshCw className={refreshing ? "animate-spin" : ""} size={17} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {error}
        </div>
      )}

      {!hasEvents && (
        <section className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:rounded-3xl sm:p-6">
          <div className="flex items-start gap-3">
            <Globe2 className="mt-0.5 shrink-0 text-blue-600" size={21} />

            <div>
              <p className="font-black text-blue-950">No tracking data yet</p>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                Install and verify Website Connect, activate the publication,
                and visit the business website. Analytics will appear when Vizo
                receives events.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard
          label="Total events"
          value={analytics.summary.total_events}
          description="All recorded website interactions."
          icon={Activity}
          color="bg-blue-50 text-blue-600"
        />

        <StatCard
          label="Script loads"
          value={analytics.summary.script_loads}
          description="Times Website Connect loaded."
          icon={FileText}
          color="bg-violet-50 text-violet-600"
        />

        <StatCard
          label="Page views"
          value={analytics.summary.page_views}
          description="Tracked page-view events."
          icon={Eye}
          color="bg-cyan-50 text-cyan-600"
        />

        <StatCard
          label="Unique sessions"
          value={analytics.summary.unique_sessions}
          description="Different browsing sessions."
          icon={Users}
          color="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          label="Unique pages"
          value={analytics.summary.unique_pages}
          description="Different URLs receiving events."
          icon={Globe2}
          color="bg-amber-50 text-amber-600"
        />

        <StatCard
          label="Events today"
          value={analytics.summary.events_today}
          description="Events recorded today."
          icon={Clock3}
          color="bg-rose-50 text-rose-600"
        />
      </section>

      <section className="mt-6 min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Activity trend
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {analytics.period.from} to {analytics.period.to}
            </p>
          </div>

          <p className="text-sm font-bold text-slate-500">
            {analytics.period.days}-day period
          </p>
        </div>

        <div className="mt-6 min-w-0">
          <div className="flex h-64 min-w-0 items-end gap-1 rounded-2xl bg-slate-50 px-3 pb-3 pt-6 sm:gap-2 sm:px-5">
            {chartData.map((item) => {
              const height =
                item.events === 0
                  ? 3
                  : Math.max(8, (item.events / maximumEvents) * 100);

              return (
                <div
                  key={item.date}
                  className="group relative flex h-full min-w-0 flex-1 items-end"
                  title={`${shortDate(item.date)}: ${item.events} events`}
                >
                  <div
                    className="w-full rounded-t-md bg-blue-500 transition hover:bg-blue-600"
                    style={{ height: `${height}%` }}
                  />

                  <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-2.5 py-1.5 text-xs font-bold text-white shadow-lg group-hover:block">
                    {shortDate(item.date)}: {item.events}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex justify-between text-xs font-semibold text-slate-400">
            <span>{chartData[0] ? shortDate(chartData[0].date) : ""}</span>

            <span>
              {chartData.at(-1) ? shortDate(chartData.at(-1)!.date) : ""}
            </span>
          </div>
        </div>
      </section>

      <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
          <h2 className="text-lg font-black text-slate-950">Top pages</h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Website pages receiving the most events.
          </p>

          {analytics.top_pages.length === 0 ? (
            <div className="mt-5 rounded-2xl bg-slate-50 p-6 text-center">
              <Globe2 className="mx-auto text-slate-300" size={32} />
              <p className="mt-3 text-sm font-bold text-slate-500">
                No page activity recorded.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {analytics.top_pages.map((page, index) => (
                <div
                  key={`${page.page_url}-${index}`}
                  className="flex min-w-0 items-start gap-3 rounded-2xl border border-slate-200 p-4"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-sm font-black text-blue-700">
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="break-all text-sm font-black text-slate-900">
                      {page.page_url}
                    </p>

                    {page.page_host && (
                      <p className="mt-1 break-all text-xs text-slate-500">
                        {page.page_host}
                      </p>
                    )}
                  </div>

                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                    {number(page.events)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:rounded-3xl sm:p-6">
          <h2 className="text-lg font-black text-slate-950">Recent events</h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Latest activity received through Website Connect.
          </p>

          {analytics.recent_events.length === 0 ? (
            <div className="mt-5 rounded-2xl bg-white p-6 text-center">
              <Activity className="mx-auto text-slate-300" size={32} />
              <p className="mt-3 text-sm font-bold text-slate-500">
                No recent events found.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid min-w-0 gap-3">
              {analytics.recent_events.map((event, index) => (
                <RecentEventCard
                  key={`${event.occurred_at}-${event.session_id}-${index}`}
                  event={event}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

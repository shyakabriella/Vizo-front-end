"use client";

import {
  ArrowRight,
  BookOpenText,
  Check,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FileCheck2,
  Globe2,
  Images,
  LoaderCircle,
  MapPin,
  RefreshCw,
  SearchCheck,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import {
  getBusinessAudit,
  getBusinessAuditError,
} from "@/services/business-audit.service";
import type {
  AuditPriority,
  AuditStatus,
  BusinessAudit,
  BusinessAuditCheck,
} from "@/types/business-audit";

const actionRoutes: Record<string, string> = {
  business_profile: "/dashboard/business-profile",
  locations: "/dashboard/locations",
  opening_hours: "/dashboard/opening-hours",
  offerings: "/dashboard/services",
  knowledge: "/dashboard/knowledge",
  media: "/dashboard/media",
  publication: "/dashboard/publication",
  installation: "/dashboard/website-connect",
};

const checkIcons: Record<string, typeof Store> = {
  business_profile: Store,
  locations: MapPin,
  opening_hours: Clock3,
  offerings: Store,
  knowledge: BookOpenText,
  media: Images,
  publication: FileCheck2,
  installation: Globe2,
};

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function statusInformation(status: AuditStatus) {
  switch (status) {
    case "excellent":
      return {
        label: "Excellent visibility",
        description:
          "Your business information is complete, published and ready for strong discovery.",
        color: "text-emerald-700",
        background: "bg-emerald-50",
        border: "border-emerald-200",
        ring: "#10b981",
      };

    case "good":
      return {
        label: "Good visibility",
        description:
          "Your business has a strong foundation, with a few improvements remaining.",
        color: "text-blue-700",
        background: "bg-blue-50",
        border: "border-blue-200",
        ring: "#2563eb",
      };

    case "needs_improvement":
      return {
        label: "Needs improvement",
        description:
          "Important information is missing or has not yet been published.",
        color: "text-amber-700",
        background: "bg-amber-50",
        border: "border-amber-200",
        ring: "#f59e0b",
      };

    default:
      return {
        label: "Low visibility",
        description:
          "Complete the recommended actions to help customers and AI systems find your business.",
        color: "text-red-700",
        background: "bg-red-50",
        border: "border-red-200",
        ring: "#ef4444",
      };
  }
}

function priorityClasses(priority: AuditPriority): string {
  switch (priority) {
    case "high":
      return "bg-red-50 text-red-700";
    case "medium":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-blue-50 text-blue-700";
  }
}

function statisticLabel(key: keyof BusinessAudit["statistics"]): string {
  const labels: Record<keyof BusinessAudit["statistics"], string> = {
    active_locations: "Active locations",
    opening_hour_records: "Opening hour records",
    published_offerings: "Published services",
    published_knowledge_entries: "Knowledge entries",
    active_media_assets: "Active media",
  };

  return labels[key];
}

function CheckCard({ check }: { check: BusinessAuditCheck }) {
  const Icon = checkIcons[check.key] ?? SearchCheck;
  const href = actionRoutes[check.key] ?? "/dashboard";

  return (
    <div
      className={`min-w-0 rounded-2xl border p-4 transition sm:p-5 ${
        check.passed
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div
          className={`grid size-10 shrink-0 place-items-center rounded-xl ${
            check.passed
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          <Icon size={19} />
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-black ${
            check.passed
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {check.score}/{check.weight}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="min-w-0 break-words font-black text-slate-950">
            {check.title}
          </h3>

          {check.passed && (
            <CheckCircle2 className="shrink-0 text-emerald-600" size={17} />
          )}
        </div>

        {typeof check.count === "number" && (
          <p className="mt-1 text-sm font-bold text-slate-600">
            Current total: {check.count}
          </p>
        )}

        {typeof check.completed_items === "number" &&
          typeof check.total_items === "number" && (
            <p className="mt-1 text-sm font-bold text-slate-600">
              {check.completed_items} of {check.total_items} items completed
            </p>
          )}

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {check.passed
            ? "This visibility requirement is complete."
            : check.recommendation}
        </p>
      </div>

      {!check.passed && (
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-600 transition hover:text-blue-700"
        >
          Improve this area
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}

export default function VisibilityAuditPage() {
  const { selectedBusiness, isLoading: businessLoading } =
    useBusinessWorkspace();

  const [audit, setAudit] = useState<BusinessAudit | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadAudit = useCallback(
    async (refresh = false) => {
      if (!selectedBusiness) {
        setAudit(null);
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

        const result = await getBusinessAudit(selectedBusiness.public_id);

        setAudit(result);
      } catch (requestError) {
        setError(
          getBusinessAuditError(
            requestError,
            "The visibility audit could not be loaded.",
          ),
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [selectedBusiness],
  );

  useEffect(() => {
    void loadAudit();
  }, [loadAudit]);

  const status = useMemo(
    () => (audit ? statusInformation(audit.status) : null),
    [audit],
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
            Analysing business visibility...
          </p>
        </div>
      </div>
    );
  }

  if (!selectedBusiness) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-12">
        <SearchCheck className="mx-auto text-slate-300" size={44} />

        <h1 className="mt-4 text-xl font-black text-slate-950">
          No business selected
        </h1>

        <p className="mt-2 text-slate-500">
          Create or select a business before running a visibility audit.
        </p>
      </div>
    );
  }

  if (!audit || !status) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 sm:p-8">
        <p className="font-black text-red-900">Visibility audit unavailable</p>

        <p className="mt-2 text-sm leading-6 text-red-700">
          {error || "Please try again."}
        </p>

        <button
          type="button"
          onClick={() => void loadAudit()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-black text-white"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }

  const statisticEntries = Object.entries(audit.statistics) as Array<
    [keyof BusinessAudit["statistics"], number]
  >;

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden pb-10">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Visibility audit
          </p>

          <h1 className="mt-2 break-words text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            {audit.business_name}
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
            Measure how complete, visible and AI-ready your business information
            is across Vizo.
          </p>
        </div>

        <button
          type="button"
          disabled={refreshing}
          onClick={() => void loadAudit(true)}
          className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-50 sm:w-auto"
        >
          <RefreshCw className={refreshing ? "animate-spin" : ""} size={17} />
          {refreshing ? "Checking..." : "Run audit again"}
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {error}
        </div>
      )}

      <section
        className={`mt-6 min-w-0 rounded-2xl border p-5 sm:rounded-3xl sm:p-7 ${status.background} ${status.border}`}
      >
        <div className="grid min-w-0 gap-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
          <div
            className="relative grid size-36 shrink-0 place-items-center rounded-full sm:size-40"
            style={{
              background: `conic-gradient(${status.ring} ${audit.percentage}%, #e2e8f0 ${audit.percentage}% 100%)`,
            }}
          >
            <div className="grid size-28 place-items-center rounded-full bg-white text-center shadow-sm sm:size-32">
              <div>
                <p className="text-4xl font-black text-slate-950">
                  {audit.percentage}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  out of 100
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <span
              className={`inline-flex rounded-full bg-white px-3 py-1 text-sm font-black ${status.color}`}
            >
              Grade {audit.grade}
            </span>

            <h2
              className={`mt-3 break-words text-2xl font-black ${status.color}`}
            >
              {status.label}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {status.description}
            </p>

            <p className="mt-3 text-xs font-semibold text-slate-500">
              Generated {formatDate(audit.generated_at)}
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 p-4 text-center shadow-sm">
            <p className="text-3xl font-black text-slate-950">
              {audit.checks.filter((check) => check.passed).length}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-500">
              of {audit.checks.length} checks passed
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
            Audit checks
          </p>

          <h2 className="mt-2 text-xl font-black text-slate-950">
            Visibility requirements
          </h2>
        </div>

        <div className="mt-5 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {audit.checks.map((check) => (
            <CheckCard key={check.key} check={check} />
          ))}
        </div>
      </section>

      <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.38fr)]">
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
          <div className="flex items-start gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700">
              <CircleAlert size={20} />
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-950">
                Recommended improvements
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Complete these actions to increase your visibility score.
              </p>
            </div>
          </div>

          {audit.recommendations.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-emerald-600"
                  size={21}
                />

                <div>
                  <p className="font-black text-emerald-900">
                    All checks completed
                  </p>
                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    Your business currently meets every Vizo visibility
                    requirement.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {audit.recommendations.map((recommendation, index) => (
                <div
                  key={recommendation.key}
                  className="min-w-0 rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-sm font-black text-slate-700">
                        {index + 1}
                      </span>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="break-words font-black text-slate-950">
                            {recommendation.title}
                          </p>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-black capitalize ${priorityClasses(
                              recommendation.priority,
                            )}`}
                          >
                            {recommendation.priority}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {recommendation.action}
                        </p>

                        <p className="mt-2 text-xs font-black text-blue-600">
                          +{recommendation.possible_points} possible points
                        </p>
                      </div>
                    </div>

                    <Link
                      href={actionRoutes[recommendation.key] ?? "/dashboard"}
                      className="inline-flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-slate-800 sm:w-auto"
                    >
                      Fix now
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
          <h2 className="font-black text-slate-950">Business content totals</h2>

          <div className="mt-5 space-y-3">
            {statisticEntries.map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3"
              >
                <span className="min-w-0 text-sm font-semibold text-slate-600">
                  {statisticLabel(key)}
                </span>

                <span className="shrink-0 text-lg font-black text-slate-950">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-blue-50 p-4">
            <div className="flex gap-3">
              <Check className="mt-0.5 shrink-0 text-blue-600" size={19} />

              <p className="text-sm leading-6 text-blue-800">
                Run the audit again after updating your business information to
                calculate a new score.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

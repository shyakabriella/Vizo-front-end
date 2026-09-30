"use client";

import {
  Ban,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CreditCard,
  Eye,
  Globe2,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
  RotateCcw,
  Search,
  ShieldCheck,
  Store,
  UserRound,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import {
  getAdminBusiness,
  getAdminBusinessError,
  getAdminBusinesses,
  reactivateAdminBusiness,
  suspendAdminBusiness,
} from "@/services/admin-business.service";
import type {
  AdminBusiness,
  AdminBusinessPagination,
  AdminBusinessStatus,
} from "@/types/admin-business";

const emptyPagination: AdminBusinessPagination = {
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0,
};

const statusFilters: Array<{
  label: string;
  value: AdminBusinessStatus | "";
}> = [
  { label: "All businesses", value: "" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Suspended", value: "suspended" },
];

function formatDate(value: string | null): string {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function statusClasses(status: AdminBusinessStatus): string {
  if (status === "published") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-600/15";
  }

  if (status === "suspended") {
    return "bg-rose-50 text-rose-700 ring-rose-600/15";
  }

  return "bg-amber-50 text-amber-700 ring-amber-600/15";
}

function StatusBadge({ status }: { status: AdminBusinessStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ring-inset ${statusClasses(
        status,
      )}`}
    >
      {status}
    </span>
  );
}

interface DetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string | null | undefined;
}

function DetailItem({ icon: Icon, label, value }: DetailItemProps) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
        <Icon className="size-5" />
      </span>

      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
}

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<AdminBusiness[]>([]);
  const [pagination, setPagination] =
    useState<AdminBusinessPagination>(emptyPagination);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<AdminBusinessStatus | "">("");

  const [selectedBusiness, setSelectedBusiness] =
    useState<AdminBusiness | null>(null);

  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
    }, 400);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const loadBusinesses = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError("");

      try {
        const data = await getAdminBusinesses({
          search,
          status,
          page,
          per_page: 15,
        });

        setBusinesses(data.businesses);
        setPagination(data.pagination);
      } catch (requestError) {
        setError(
          getAdminBusinessError(requestError, "Unable to load businesses."),
        );
      } finally {
        setLoading(false);
      }
    },
    [search, status],
  );

  useEffect(() => {
    void loadBusinesses(1);
  }, [loadBusinesses]);

  async function openBusiness(publicId: string) {
    setDetailsLoading(true);
    setError("");

    try {
      const business = await getAdminBusiness(publicId);
      setSelectedBusiness(business);
    } catch (requestError) {
      setError(
        getAdminBusinessError(requestError, "Unable to load business details."),
      );
    } finally {
      setDetailsLoading(false);
    }
  }

  async function suspendBusiness(business: AdminBusiness) {
    const confirmed = window.confirm(
      `Suspend ${business.name}? Its active publication will be paused.`,
    );

    if (!confirmed) {
      return;
    }

    setActionLoading(business.public_id);
    setError("");
    setMessage("");

    try {
      const response = await suspendAdminBusiness(business.public_id);

      setMessage(response.message ?? "Business suspended successfully.");
      setSelectedBusiness(response.data.business);

      await loadBusinesses(pagination.current_page);
    } catch (requestError) {
      setError(
        getAdminBusinessError(requestError, "Unable to suspend the business."),
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function reactivateBusiness(business: AdminBusiness) {
    const confirmed = window.confirm(
      `Reactivate ${business.name}? It will return to draft status.`,
    );

    if (!confirmed) {
      return;
    }

    setActionLoading(business.public_id);
    setError("");
    setMessage("");

    try {
      const response = await reactivateAdminBusiness(business.public_id);

      setMessage(response.message ?? "Business reactivated successfully.");
      setSelectedBusiness(response.data.business);

      await loadBusinesses(pagination.current_page);
    } catch (requestError) {
      setError(
        getAdminBusinessError(
          requestError,
          "Unable to reactivate the business.",
        ),
      );
    } finally {
      setActionLoading(null);
    }
  }

  function resetFilters() {
    setSearchInput("");
    setSearch("");
    setStatus("");
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-[#10104b] px-5 py-7 text-white shadow-xl sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-200">
              Business management
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Vizo businesses
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Review registered businesses, monitor publication and subscription
              status, and control suspended accounts.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm">
            <span className="grid size-12 place-items-center rounded-2xl bg-white text-[#10104b]">
              <Building2 className="size-6" />
            </span>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                Total businesses
              </p>
              <p className="text-2xl font-black">{pagination.total}</p>
            </div>
          </div>
        </div>
      </section>

      {message ? (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="size-5" />
            {message}
          </span>

          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Close message"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}

      {error ? (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
          <span className="flex items-center gap-2">
            <CircleAlert className="size-5" />
            {error}
          </span>

          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Close error"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-xl">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search business, owner email or business ID"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {statusFilters.map((filter) => (
              <button
                key={filter.label}
                type="button"
                onClick={() => setStatus(filter.value)}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  status === filter.value
                    ? "bg-[#10104b] text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter.label}
              </button>
            ))}

            {(search || status) && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                <RefreshCw className="size-4" />
                Reset
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="grid min-h-72 place-items-center">
            <div className="text-center">
              <Loader2 className="mx-auto size-8 animate-spin text-blue-600" />
              <p className="mt-3 text-sm font-semibold text-slate-500">
                Loading businesses...
              </p>
            </div>
          </div>
        ) : businesses.length === 0 ? (
          <div className="grid min-h-72 place-items-center px-5 text-center">
            <div>
              <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-slate-100 text-slate-400">
                <Store className="size-8" />
              </span>

              <h2 className="mt-4 text-xl font-black text-slate-900">
                No businesses found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try changing the search or status filter.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full">
                <thead className="bg-slate-50 text-left">
                  <tr className="text-xs font-black uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Business</th>
                    <th className="px-6 py-4">Owner</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Subscription</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {businesses.map((business) => (
                    <tr
                      key={business.public_id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                            <Building2 className="size-5" />
                          </span>

                          <div>
                            <p className="font-black text-slate-900">
                              {business.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {business.public_id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-slate-700">
                          {business.owner?.name ?? "No owner"}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {business.owner?.email ?? "No email"}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm font-semibold text-slate-600">
                        {business.type?.name ?? "Not assigned"}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge status={business.status} />
                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-slate-700">
                          {business.subscription?.plan ?? "No plan"}
                        </p>
                        <p className="mt-1 text-xs capitalize text-slate-400">
                          {business.subscription?.status ?? "Not subscribed"}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              void openBusiness(business.public_id)
                            }
                            className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                            aria-label={`View ${business.name}`}
                          >
                            <Eye className="size-4" />
                          </button>

                          {business.status === "suspended" ? (
                            <button
                              type="button"
                              disabled={actionLoading === business.public_id}
                              onClick={() => void reactivateBusiness(business)}
                              className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                              aria-label={`Reactivate ${business.name}`}
                            >
                              {actionLoading === business.public_id ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <RotateCcw className="size-4" />
                              )}
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={actionLoading === business.public_id}
                              onClick={() => void suspendBusiness(business)}
                              className="grid size-10 place-items-center rounded-xl bg-rose-50 text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
                              aria-label={`Suspend ${business.name}`}
                            >
                              {actionLoading === business.public_id ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <Ban className="size-4" />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-100 lg:hidden">
              {businesses.map((business) => (
                <article key={business.public_id} className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                      <Building2 className="size-5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="truncate font-black text-slate-900">
                          {business.name}
                        </h2>
                        <StatusBadge status={business.status} />
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        {business.public_id}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-400">
                        Owner
                      </p>
                      <p className="mt-1 truncate font-semibold text-slate-700">
                        {business.owner?.name ?? "No owner"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase text-slate-400">
                        Type
                      </p>
                      <p className="mt-1 truncate font-semibold text-slate-700">
                        {business.type?.name ?? "Not assigned"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => void openBusiness(business.public_id)}
                      className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 text-sm font-bold text-slate-700"
                    >
                      <Eye className="size-4" />
                      View
                    </button>

                    {business.status === "suspended" ? (
                      <button
                        type="button"
                        disabled={actionLoading === business.public_id}
                        onClick={() => void reactivateBusiness(business)}
                        className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-50 text-sm font-bold text-emerald-700 disabled:opacity-50"
                      >
                        <RotateCcw className="size-4" />
                        Reactivate
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={actionLoading === business.public_id}
                        onClick={() => void suspendBusiness(business)}
                        className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-rose-50 text-sm font-bold text-rose-700 disabled:opacity-50"
                      >
                        <Ban className="size-4" />
                        Suspend
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {!loading && pagination.total > 0 ? (
          <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Page {pagination.current_page} of {pagination.last_page} ·{" "}
              {pagination.total} businesses
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={pagination.current_page <= 1}
                onClick={() => void loadBusinesses(pagination.current_page - 1)}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="size-4" />
                Previous
              </button>

              <button
                type="button"
                disabled={pagination.current_page >= pagination.last_page}
                onClick={() => void loadBusinesses(pagination.current_page + 1)}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        ) : null}
      </section>

      {detailsLoading ? (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/60 backdrop-blur-sm">
          <div className="rounded-3xl bg-white px-8 py-7 text-center shadow-2xl">
            <Loader2 className="mx-auto size-8 animate-spin text-blue-600" />
            <p className="mt-3 text-sm font-semibold text-slate-600">
              Loading business...
            </p>
          </div>
        </div>
      ) : null}

      {selectedBusiness ? (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedBusiness(null);
            }
          }}
        >
          <div className="mx-auto my-6 w-full max-w-4xl overflow-hidden rounded-3xl bg-slate-50 shadow-2xl">
            <div className="flex items-start justify-between gap-4 bg-[#10104b] px-5 py-6 text-white sm:px-7">
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10">
                  <Building2 className="size-6" />
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-black sm:text-2xl">
                      {selectedBusiness.name}
                    </h2>
                    <StatusBadge status={selectedBusiness.status} />
                  </div>

                  <p className="mt-1 text-sm text-white/60">
                    {selectedBusiness.public_id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBusiness(null)}
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20"
                aria-label="Close details"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-6 p-5 sm:p-7">
              {selectedBusiness.description ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                    Business description
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {selectedBusiness.description}
                  </p>
                </div>
              ) : null}

              <div>
                <h3 className="mb-3 font-black text-slate-900">
                  Business information
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  <DetailItem
                    icon={Store}
                    label="Legal name"
                    value={selectedBusiness.legal_name}
                  />
                  <DetailItem
                    icon={ShieldCheck}
                    label="Business type"
                    value={selectedBusiness.type?.name}
                  />
                  <DetailItem
                    icon={Mail}
                    label="Business email"
                    value={selectedBusiness.email}
                  />
                  <DetailItem
                    icon={Phone}
                    label="Business phone"
                    value={selectedBusiness.phone}
                  />
                  <DetailItem
                    icon={Globe2}
                    label="Website"
                    value={selectedBusiness.website}
                  />
                  <DetailItem
                    icon={Globe2}
                    label="Timezone"
                    value={selectedBusiness.timezone}
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-black text-slate-900">
                  Owner and subscription
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  <DetailItem
                    icon={UserRound}
                    label="Owner"
                    value={selectedBusiness.owner?.name}
                  />
                  <DetailItem
                    icon={Mail}
                    label="Owner email"
                    value={selectedBusiness.owner?.email}
                  />
                  <DetailItem
                    icon={CreditCard}
                    label="Subscription plan"
                    value={selectedBusiness.subscription?.plan}
                  />
                  <DetailItem
                    icon={CreditCard}
                    label="Subscription status"
                    value={selectedBusiness.subscription?.status}
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-black text-slate-900">
                  Publication and dates
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  <DetailItem
                    icon={ShieldCheck}
                    label="Publication status"
                    value={selectedBusiness.publication?.status}
                  />
                  <DetailItem
                    icon={Globe2}
                    label="Publication site ID"
                    value={selectedBusiness.publication?.site_id}
                  />
                  <DetailItem
                    icon={CalendarDays}
                    label="Created"
                    value={formatDate(selectedBusiness.created_at)}
                  />
                  <DetailItem
                    icon={CalendarDays}
                    label="Published"
                    value={formatDate(selectedBusiness.published_at)}
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedBusiness(null)}
                  className="h-11 rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-700"
                >
                  Close
                </button>

                {selectedBusiness.status === "suspended" ? (
                  <button
                    type="button"
                    disabled={actionLoading === selectedBusiness.public_id}
                    onClick={() => void reactivateBusiness(selectedBusiness)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-black text-white disabled:opacity-50"
                  >
                    {actionLoading === selectedBusiness.public_id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <RotateCcw className="size-4" />
                    )}
                    Reactivate business
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={actionLoading === selectedBusiness.public_id}
                    onClick={() => void suspendBusiness(selectedBusiness)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 text-sm font-black text-white disabled:opacity-50"
                  >
                    {actionLoading === selectedBusiness.public_id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Ban className="size-4" />
                    )}
                    Suspend business
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

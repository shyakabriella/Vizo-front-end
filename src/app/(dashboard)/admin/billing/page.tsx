"use client";

import {
  AlertCircle,
  Banknote,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  Loader2,
  RefreshCw,
  Search,
  UsersRound,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { getApiErrorMessage } from "@/lib/api";
import {
  getAdminInvoices,
  getAdminSubscriptions,
  getAdminTransactions,
  getBillingSummary,
} from "@/services/admin-billing.service";
import type {
  AdminInvoice,
  AdminPaymentTransaction,
  AdminSubscription,
  BillingPagination,
  BillingSummary,
} from "@/types/admin-billing";

type BillingTab = "subscriptions" | "invoices" | "transactions";

const emptyPagination: BillingPagination = {
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0,
};

function money(amount: string | number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));
}

function dateTime(value?: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function statusClass(status: string) {
  if (["active", "paid", "succeeded"].includes(status)) {
    return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
  }

  if (["trialing", "pending", "processing", "open"].includes(status)) {
    return "bg-blue-50 text-blue-700 ring-blue-600/20";
  }

  if (["past_due", "failed", "uncollectible"].includes(status)) {
    return "bg-rose-50 text-rose-700 ring-rose-600/20";
  }

  return "bg-slate-100 text-slate-700 ring-slate-500/20";
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize ring-1 ring-inset ${statusClass(
        status,
      )}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

function Pagination({
  pagination,
  onPageChange,
}: {
  pagination: BillingPagination;
  onPageChange: (page: number) => void;
}) {
  if (pagination.last_page <= 1) return null;

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-slate-500">
        Page {pagination.current_page} of {pagination.last_page} ·{" "}
        {pagination.total} records
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={pagination.current_page <= 1}
          onClick={() => onPageChange(pagination.current_page - 1)}
          className="rounded-lg border border-slate-300 px-4 py-2 font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <button
          type="button"
          disabled={pagination.current_page >= pagination.last_page}
          onClick={() => onPageChange(pagination.current_page + 1)}
          className="rounded-lg border border-slate-300 px-4 py-2 font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function AdminBillingPage() {
  const [tab, setTab] = useState<BillingTab>("subscriptions");
  const [summary, setSummary] = useState<BillingSummary | null>(null);
  const [subscriptions, setSubscriptions] = useState<AdminSubscription[]>([]);
  const [invoices, setInvoices] = useState<AdminInvoice[]>([]);
  const [transactions, setTransactions] = useState<AdminPaymentTransaction[]>(
    [],
  );

  const [pagination, setPagination] =
    useState<BillingPagination>(emptyPagination);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [provider, setProvider] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);
  const [error, setError] = useState("");

  const loadSummary = useCallback(async () => {
    try {
      setLoadingSummary(true);
      setSummary(await getBillingSummary());
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to load billing summary."),
      );
    } finally {
      setLoadingSummary(false);
    }
  }, []);

  const loadTable = useCallback(async () => {
    try {
      setLoadingTable(true);
      setError("");

      const filters = {
        page,
        per_page: 15,
        status: status || undefined,
        search: search || undefined,
      };

      if (tab === "subscriptions") {
        const data = await getAdminSubscriptions(filters);
        setSubscriptions(data.subscriptions);
        setPagination(data.pagination);
      }

      if (tab === "invoices") {
        const data = await getAdminInvoices(filters);
        setInvoices(data.invoices);
        setPagination(data.pagination);
      }

      if (tab === "transactions") {
        const data = await getAdminTransactions({
          ...filters,
          provider: provider || undefined,
        });

        setTransactions(data.transactions);
        setPagination(data.pagination);
      }
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to load billing records."),
      );
    } finally {
      setLoadingTable(false);
    }
  }, [page, provider, search, status, tab]);

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  useEffect(() => {
    void loadTable();
  }, [loadTable]);

  function changeTab(nextTab: BillingTab) {
    setTab(nextTab);
    setPage(1);
    setStatus("");
    setProvider("");
    setSearch("");
    setSearchInput("");
  }

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  const cards = summary
    ? [
        {
          label: "Active subscriptions",
          value: summary.subscriptions.active,
          detail: `${summary.subscriptions.total} total subscriptions`,
          icon: UsersRound,
          color: "bg-blue-50 text-blue-700",
        },
        {
          label: "Paid invoices",
          value: summary.invoices.paid,
          detail: `${summary.invoices.open} currently open`,
          icon: FileText,
          color: "bg-violet-50 text-violet-700",
        },
        {
          label: "Outstanding",
          value: money(summary.invoices.outstanding_amount),
          detail: `${summary.invoices.past_due} past due invoices`,
          icon: Clock3,
          color: "bg-amber-50 text-amber-700",
        },
        {
          label: "Successful payments",
          value: money(summary.transactions.successful_amount),
          detail: `${summary.transactions.succeeded} transactions`,
          icon: Banknote,
          color: "bg-emerald-50 text-emerald-700",
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Revenue management
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Billing
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Monitor subscriptions, invoices, payment activity and outstanding
            balances.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            void loadSummary();
            void loadTable();
          }}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
        >
          <RefreshCw className="size-4" />
          Refresh
        </button>
      </div>

      {error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>{error}</p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loadingSummary
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-2xl border border-slate-200 bg-white"
              />
            ))
          : cards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div
                    className={`grid size-11 place-items-center rounded-xl ${card.color}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <p className="mt-4 text-sm font-bold text-slate-500">
                    {card.label}
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-950">
                    {card.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{card.detail}</p>
                </div>
              );
            })}
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-4 pt-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto">
            {(
              [
                ["subscriptions", "Subscriptions", CreditCard],
                ["invoices", "Invoices", FileText],
                ["transactions", "Transactions", CheckCircle2],
              ] as const
            ).map(([value, label, Icon]) => (
              <button
                key={value}
                type="button"
                onClick={() => changeTab(value)}
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-black ${
                  tab === value
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <form onSubmit={submitSearch} className="flex w-full max-w-lg gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder={`Search ${tab}...`}
                className="h-11 w-full rounded-xl border border-slate-300 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              className="h-11 rounded-xl bg-[#10104b] px-5 text-sm font-black text-white"
            >
              Search
            </button>
          </form>

          <div className="flex gap-2">
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
              className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 outline-none"
            >
              <option value="">All statuses</option>

              {tab === "subscriptions" ? (
                <>
                  <option value="trialing">Trialing</option>
                  <option value="active">Active</option>
                  <option value="past_due">Past due</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="expired">Expired</option>
                </>
              ) : null}

              {tab === "invoices" ? (
                <>
                  <option value="draft">Draft</option>
                  <option value="open">Open</option>
                  <option value="paid">Paid</option>
                  <option value="past_due">Past due</option>
                  <option value="void">Void</option>
                  <option value="uncollectible">Uncollectible</option>
                  <option value="refunded">Refunded</option>
                </>
              ) : null}

              {tab === "transactions" ? (
                <>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="succeeded">Succeeded</option>
                  <option value="failed">Failed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                </>
              ) : null}
            </select>

            {tab === "transactions" ? (
              <input
                value={provider}
                onChange={(event) => {
                  setProvider(event.target.value);
                  setPage(1);
                }}
                placeholder="Provider"
                className="h-11 w-32 rounded-xl border border-slate-300 px-3 text-sm outline-none"
              />
            ) : null}
          </div>
        </div>

        {loadingTable ? (
          <div className="grid min-h-72 place-items-center">
            <div className="text-center text-slate-500">
              <Loader2 className="mx-auto size-7 animate-spin text-blue-600" />
              <p className="mt-3 text-sm">Loading billing records...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {tab === "subscriptions" ? (
              <table className="min-w-[900px] w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Business</th>
                    <th className="px-6 py-4">Plan</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Cycle</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Period ends</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subscriptions.map((item) => (
                    <tr key={item.public_id} className="hover:bg-slate-50/70">
                      <td className="px-6 py-4">
                        <p className="font-black text-slate-900">
                          {item.business.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.business.owner_email ?? "No owner email"}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">
                        {item.plan.name}
                      </td>
                      <td className="px-6 py-4 font-black text-slate-900">
                        {money(item.price, item.currency)}
                      </td>
                      <td className="px-6 py-4 capitalize text-slate-600">
                        {item.billing_cycle}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {dateTime(item.current_period_ends_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}

            {tab === "invoices" ? (
              <table className="min-w-[980px] w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Invoice</th>
                    <th className="px-6 py-4">Business</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Paid</th>
                    <th className="px-6 py-4">Due</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Issued</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.map((item) => (
                    <tr key={item.public_id} className="hover:bg-slate-50/70">
                      <td className="px-6 py-4">
                        <p className="font-black text-slate-900">
                          {item.invoice_number}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.plan?.name ?? "No plan"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">
                          {item.business.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.business.owner_email}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-bold">
                        {money(item.total, item.currency)}
                      </td>
                      <td className="px-6 py-4 text-emerald-700">
                        {money(item.amount_paid, item.currency)}
                      </td>
                      <td className="px-6 py-4 font-black text-slate-900">
                        {money(item.amount_due, item.currency)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {dateTime(item.issued_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}

            {tab === "transactions" ? (
              <table className="min-w-[1050px] w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Reference</th>
                    <th className="px-6 py-4">Business</th>
                    <th className="px-6 py-4">Provider</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((item) => (
                    <tr key={item.public_id} className="hover:bg-slate-50/70">
                      <td className="px-6 py-4">
                        <p className="font-black text-slate-900">
                          {item.reference}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.invoice_number ?? "No invoice"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">
                          {item.business.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.customer_email ??
                            item.business.owner_email ??
                            "—"}
                        </p>
                      </td>
                      <td className="px-6 py-4 capitalize text-slate-700">
                        {item.provider ?? "—"}
                      </td>
                      <td className="px-6 py-4 capitalize text-slate-700">
                        {item.payment_method?.replaceAll("_", " ") ?? "—"}
                      </td>
                      <td className="px-6 py-4 font-black text-slate-900">
                        {money(item.amount, item.currency)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {dateTime(item.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}

            {pagination.total === 0 ? (
              <div className="grid min-h-64 place-items-center p-8 text-center">
                <div>
                  <CreditCard className="mx-auto size-9 text-slate-300" />
                  <p className="mt-3 font-black text-slate-800">
                    No billing records found
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or status filter.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        )}

        <Pagination pagination={pagination} onPageChange={setPage} />
      </section>
    </div>
  );
}

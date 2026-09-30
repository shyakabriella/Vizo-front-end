"use client";

import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Loader2,
  MessageSquare,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Ticket,
  UserRound,
} from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";

import { getApiErrorMessage } from "@/lib/api";
import {
  getAdminSupportTicket,
  getAdminSupportTickets,
  replyToAdminSupportTicket,
  updateAdminSupportTicket,
} from "@/services/admin-support.service";
import type {
  AdminSupportTicket,
  SupportPagination,
  SupportTicketCategory,
  SupportTicketPriority,
  SupportTicketStatus,
} from "@/types/admin-support";

const emptyPagination: SupportPagination = {
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0,
};

function formatLabel(value: string) {
  return value.replaceAll("_", " ");
}

function formatDate(value?: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusClass(status: SupportTicketStatus) {
  const classes: Record<SupportTicketStatus, string> = {
    open: "bg-blue-50 text-blue-700 ring-blue-600/20",
    in_progress: "bg-violet-50 text-violet-700 ring-violet-600/20",
    waiting_customer: "bg-amber-50 text-amber-700 ring-amber-600/20",
    resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    closed: "bg-slate-100 text-slate-700 ring-slate-500/20",
  };

  return classes[status];
}

function priorityClass(priority: SupportTicketPriority) {
  const classes: Record<SupportTicketPriority, string> = {
    low: "bg-slate-100 text-slate-600",
    normal: "bg-blue-50 text-blue-700",
    high: "bg-orange-50 text-orange-700",
    urgent: "bg-rose-50 text-rose-700",
  };

  return classes[priority];
}

function TicketStatus({ status }: { status: SupportTicketStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black capitalize ring-1 ring-inset ${statusClass(
        status,
      )}`}
    >
      {formatLabel(status)}
    </span>
  );
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<AdminSupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] =
    useState<AdminSupportTicket | null>(null);
  const [pagination, setPagination] =
    useState<SupportPagination>(emptyPagination);

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<SupportTicketStatus | "">("");
  const [priority, setPriority] = useState<SupportTicketPriority | "">("");
  const [category, setCategory] = useState<SupportTicketCategory | "">("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [reply, setReply] = useState("");
  const [internalNote, setInternalNote] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingTicket, setLoadingTicket] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminSupportTickets({
        page,
        per_page: 15,
        status,
        priority,
        category,
        search: search || undefined,
      });

      setTickets(data.tickets);
      setPagination(data.pagination);

      if (
        selectedTicket &&
        !data.tickets.some(
          (ticket) => ticket.public_id === selectedTicket.public_id,
        )
      ) {
        setSelectedTicket(null);
      }
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to load support tickets."),
      );
    } finally {
      setLoading(false);
    }
  }, [category, page, priority, search, selectedTicket, status]);

  useEffect(() => {
    void loadTickets();
  }, [loadTickets]);

  async function openTicket(ticket: AdminSupportTicket) {
    try {
      setLoadingTicket(true);
      setError("");
      setMessage("");

      const result = await getAdminSupportTicket(ticket.public_id);

      setSelectedTicket(result);
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to open this support ticket."),
      );
    } finally {
      setLoadingTicket(false);
    }
  }

  async function changeTicket(
    payload:
      { status: SupportTicketStatus } | { priority: SupportTicketPriority },
  ) {
    if (!selectedTicket) return;

    try {
      setUpdating(true);
      setError("");
      setMessage("");

      await updateAdminSupportTicket(selectedTicket.public_id, payload);

      const refreshed = await getAdminSupportTicket(selectedTicket.public_id);

      setSelectedTicket(refreshed);
      setMessage("Ticket updated successfully.");
      await loadTickets();
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to update this ticket."),
      );
    } finally {
      setUpdating(false);
    }
  }

  async function submitReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedTicket || reply.trim().length < 2) return;

    try {
      setSending(true);
      setError("");
      setMessage("");

      await replyToAdminSupportTicket(selectedTicket.public_id, {
        message: reply.trim(),
        is_internal: internalNote,
      });

      const refreshed = await getAdminSupportTicket(selectedTicket.public_id);

      setSelectedTicket(refreshed);
      setReply("");
      setInternalNote(false);
      setMessage(
        internalNote
          ? "Internal note added successfully."
          : "Reply sent successfully.",
      );

      await loadTickets();
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to send your message."),
      );
    } finally {
      setSending(false);
    }
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Customer care
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Support tickets
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Review customer requests, send replies, add private notes and manage
            ticket progress.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadTickets()}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
        >
          <RefreshCw className="size-4" />
          Refresh
        </button>
      </header>

      {error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
          {message}
        </div>
      ) : null}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-3 border-b border-slate-200 p-4 lg:grid-cols-[1fr_auto_auto_auto] lg:p-5">
          <form onSubmit={submitSearch} className="flex min-w-0 gap-2">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search reference, subject or business..."
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

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as SupportTicketStatus | "");
              setPage(1);
            }}
            className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 outline-none"
          >
            <option value="">All statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In progress</option>
            <option value="waiting_customer">Waiting for customer</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={priority}
            onChange={(event) => {
              setPriority(event.target.value as SupportTicketPriority | "");
              setPage(1);
            }}
            className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 outline-none"
          >
            <option value="">All priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>

          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value as SupportTicketCategory | "");
              setPage(1);
            }}
            className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 outline-none"
          >
            <option value="">All categories</option>
            <option value="general">General</option>
            <option value="billing">Billing</option>
            <option value="technical">Technical</option>
            <option value="installation">Installation</option>
            <option value="account">Account</option>
            <option value="feature_request">Feature request</option>
          </select>
        </div>

        <div className="grid min-h-[620px] lg:grid-cols-[390px_minmax(0,1fr)]">
          <div className="border-b border-slate-200 lg:border-b-0 lg:border-r">
            {loading ? (
              <div className="grid min-h-72 place-items-center">
                <Loader2 className="size-7 animate-spin text-blue-600" />
              </div>
            ) : tickets.length === 0 ? (
              <div className="grid min-h-72 place-items-center p-8 text-center">
                <div>
                  <Ticket className="mx-auto size-10 text-slate-300" />
                  <p className="mt-3 font-black text-slate-800">
                    No tickets found
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try changing the filters.
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {tickets.map((ticket) => (
                  <button
                    key={ticket.public_id}
                    type="button"
                    onClick={() => void openTicket(ticket)}
                    className={`block w-full p-5 text-left transition hover:bg-slate-50 ${
                      selectedTicket?.public_id === ticket.public_id
                        ? "bg-blue-50/70"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-black uppercase tracking-wide text-blue-600">
                          {ticket.reference}
                        </p>

                        <p className="mt-1 line-clamp-2 font-black text-slate-900">
                          {ticket.subject}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-black uppercase ${priorityClass(
                          ticket.priority,
                        )}`}
                      >
                        {ticket.priority}
                      </span>
                    </div>

                    <p className="mt-3 truncate text-sm text-slate-500">
                      {ticket.business?.name ?? "Unknown business"}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <TicketStatus status={ticket.status} />

                      <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                        <MessageSquare className="size-3.5" />
                        {ticket.messages_count ?? 0}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {pagination.last_page > 1 ? (
              <div className="flex items-center justify-between border-t border-slate-200 p-4">
                <button
                  type="button"
                  disabled={pagination.current_page <= 1}
                  onClick={() => setPage((current) => current - 1)}
                  className="grid size-9 place-items-center rounded-lg border border-slate-300 disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" />
                </button>

                <p className="text-xs font-bold text-slate-500">
                  Page {pagination.current_page} of {pagination.last_page}
                </p>

                <button
                  type="button"
                  disabled={pagination.current_page >= pagination.last_page}
                  onClick={() => setPage((current) => current + 1)}
                  className="grid size-9 place-items-center rounded-lg border border-slate-300 disabled:opacity-40"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            ) : null}
          </div>

          <div className="min-w-0">
            {loadingTicket ? (
              <div className="grid min-h-[500px] place-items-center">
                <Loader2 className="size-8 animate-spin text-blue-600" />
              </div>
            ) : !selectedTicket ? (
              <div className="grid min-h-[500px] place-items-center p-8 text-center">
                <div className="max-w-sm">
                  <MessageSquare className="mx-auto size-12 text-slate-300" />

                  <h2 className="mt-4 text-xl font-black text-slate-900">
                    Select a support ticket
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Choose a ticket to view its conversation and manage its
                    progress.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="border-b border-slate-200 p-5 lg:p-7">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <TicketStatus status={selectedTicket.status} />

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-black capitalize ${priorityClass(
                            selectedTicket.priority,
                          )}`}
                        >
                          {selectedTicket.priority}
                        </span>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold capitalize text-slate-600">
                          {formatLabel(selectedTicket.category)}
                        </span>
                      </div>

                      <h2 className="mt-4 text-2xl font-black text-slate-950">
                        {selectedTicket.subject}
                      </h2>

                      <p className="mt-2 text-sm font-bold text-blue-600">
                        {selectedTicket.reference}
                      </p>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <select
                        value={selectedTicket.priority}
                        disabled={updating}
                        onChange={(event) =>
                          void changeTicket({
                            priority: event.target
                              .value as SupportTicketPriority,
                          })
                        }
                        className="h-10 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold"
                      >
                        <option value="low">Low priority</option>
                        <option value="normal">Normal priority</option>
                        <option value="high">High priority</option>
                        <option value="urgent">Urgent priority</option>
                      </select>

                      <select
                        value={selectedTicket.status}
                        disabled={updating}
                        onChange={(event) =>
                          void changeTicket({
                            status: event.target.value as SupportTicketStatus,
                          })
                        }
                        className="h-10 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In progress</option>
                        <option value="waiting_customer">
                          Waiting for customer
                        </option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="flex items-center gap-2 text-xs font-black uppercase text-slate-400">
                        <UserRound className="size-4" />
                        Business
                      </p>
                      <p className="mt-2 font-black text-slate-800">
                        {selectedTicket.business?.name ?? "Unknown"}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {selectedTicket.business?.owner_email ?? "—"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="flex items-center gap-2 text-xs font-black uppercase text-slate-400">
                        <UserRound className="size-4" />
                        Created by
                      </p>
                      <p className="mt-2 font-black text-slate-800">
                        {selectedTicket.creator?.name ?? "Unknown"}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {selectedTicket.creator?.email ?? "—"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="flex items-center gap-2 text-xs font-black uppercase text-slate-400">
                        <Clock3 className="size-4" />
                        Created
                      </p>
                      <p className="mt-2 text-sm font-black text-slate-800">
                        {formatDate(selectedTicket.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="max-h-[540px] space-y-4 overflow-y-auto bg-slate-50 p-5 lg:p-7">
                  {(selectedTicket.messages ?? []).map((ticketMessage) => (
                    <div
                      key={ticketMessage.id}
                      className={`rounded-2xl border p-4 ${
                        ticketMessage.is_internal
                          ? "border-amber-200 bg-amber-50"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {ticketMessage.is_internal ? (
                            <ShieldCheck className="size-4 text-amber-600" />
                          ) : (
                            <MessageSquare className="size-4 text-blue-600" />
                          )}

                          <p className="text-sm font-black text-slate-800">
                            {ticketMessage.user?.name ?? "Unknown user"}
                          </p>

                          {ticketMessage.is_internal ? (
                            <span className="rounded-full bg-amber-200/70 px-2 py-0.5 text-[10px] font-black uppercase text-amber-800">
                              Internal note
                            </span>
                          ) : null}
                        </div>

                        <p className="text-xs text-slate-400">
                          {formatDate(ticketMessage.created_at)}
                        </p>
                      </div>

                      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                        {ticketMessage.message}
                      </p>
                    </div>
                  ))}

                  {(selectedTicket.messages ?? []).length === 0 ? (
                    <p className="py-12 text-center text-sm text-slate-500">
                      This ticket has no messages.
                    </p>
                  ) : null}
                </div>

                <form
                  onSubmit={submitReply}
                  className="border-t border-slate-200 p-5 lg:p-7"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="font-black text-slate-900">Add response</p>

                    <label className="flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-600">
                      <input
                        type="checkbox"
                        checked={internalNote}
                        onChange={(event) =>
                          setInternalNote(event.target.checked)
                        }
                        className="size-4 rounded border-slate-300"
                      />
                      Private internal note
                    </label>
                  </div>

                  <textarea
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    rows={4}
                    maxLength={10000}
                    placeholder={
                      internalNote
                        ? "Write a private note for administrators..."
                        : "Write a reply to the customer..."
                    }
                    className="w-full resize-none rounded-2xl border border-slate-300 p-4 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  <div className="mt-3 flex items-center justify-between gap-4">
                    <p className="text-xs text-slate-400">
                      {reply.length}/10,000 characters
                    </p>

                    <button
                      type="submit"
                      disabled={
                        sending ||
                        reply.trim().length < 2 ||
                        (selectedTicket.status === "closed" && !internalNote)
                      }
                      className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {sending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Send className="size-4" />
                      )}

                      {internalNote ? "Add note" : "Send reply"}
                    </button>
                  </div>

                  {selectedTicket.status === "closed" && !internalNote ? (
                    <p className="mt-3 text-sm font-semibold text-rose-600">
                      Closed tickets cannot receive public replies. You can add
                      an internal note or reopen the ticket.
                    </p>
                  ) : null}
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

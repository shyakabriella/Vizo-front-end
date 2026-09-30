"use client";

import {
  AlertTriangle,
  LifeBuoy,
  LoaderCircle,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { type FormEvent, useCallback, useEffect, useState } from "react";

import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import {
  createSupportTicket,
  getSupportError,
  getSupportTickets,
} from "@/services/support.service";
import type {
  SupportCategory,
  SupportPriority,
  SupportStatus,
  SupportTicket,
} from "@/types/support";

const categories: Array<{
  value: SupportCategory;
  label: string;
}> = [
  { value: "general", label: "General" },
  { value: "billing", label: "Billing" },
  { value: "technical", label: "Technical" },
  { value: "installation", label: "Installation" },
  { value: "account", label: "Account" },
  { value: "feature_request", label: "Feature request" },
];

const priorities: SupportPriority[] = ["low", "normal", "high", "urgent"];

const statuses: SupportStatus[] = [
  "open",
  "in_progress",
  "waiting_customer",
  "resolved",
  "closed",
];

const statusColors: Record<string, string> = {
  open: "bg-blue-50 text-blue-700",
  in_progress: "bg-purple-50 text-purple-700",
  waiting_customer: "bg-amber-50 text-amber-700",
  resolved: "bg-emerald-50 text-emerald-700",
  closed: "bg-slate-100 text-slate-600",
};

const priorityColors: Record<string, string> = {
  low: "text-slate-500",
  normal: "text-blue-600",
  high: "text-orange-600",
  urgent: "text-red-600",
};

function label(value: string): string {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDate(value?: string | null): string {
  if (!value) {
    return "Not available";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

function attachmentList(value: string): string[] {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5);
}

export default function SupportPage() {
  const {
    selectedBusiness,
    selectedBusinessId,
    isLoading: businessLoading,
  } = useBusinessWorkspace();

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<SupportStatus | "">("");
  const [category, setCategory] = useState<SupportCategory | "">("");
  const [priority, setPriority] = useState<SupportPriority | "">("");

  const [subject, setSubject] = useState("");
  const [newCategory, setNewCategory] = useState<SupportCategory>("general");
  const [newPriority, setNewPriority] = useState<SupportPriority>("normal");
  const [ticketMessage, setTicketMessage] = useState("");
  const [attachments, setAttachments] = useState("");

  const loadTickets = useCallback(async () => {
    if (!selectedBusinessId) {
      setTickets([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await getSupportTickets(selectedBusinessId, {
        search,
        status,
        category,
        priority,
        perPage: 50,
      });

      setTickets(result.tickets);
    } catch (requestError) {
      setError(
        getSupportError(requestError, "Unable to load support tickets."),
      );
    } finally {
      setLoading(false);
    }
  }, [category, priority, search, selectedBusinessId, status]);

  useEffect(() => {
    void loadTickets();
  }, [loadTickets]);

  function openCreateModal() {
    setSubject("");
    setNewCategory("general");
    setNewPriority("normal");
    setTicketMessage("");
    setAttachments("");
    setError("");
    setMessage("");
    setModalOpen(true);
  }

  async function submitTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedBusinessId) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const result = await createSupportTicket(selectedBusinessId, {
        subject: subject.trim(),
        category: newCategory,
        priority: newPriority,
        message: ticketMessage.trim(),
        attachments: attachmentList(attachments),
      });

      setMessage(result.message ?? "Support ticket created successfully.");
      setModalOpen(false);
      await loadTickets();
    } catch (requestError) {
      setError(
        getSupportError(requestError, "Unable to create the support ticket."),
      );
    } finally {
      setSaving(false);
    }
  }

  if (businessLoading) {
    return (
      <div className="grid min-h-[55vh] place-items-center">
        <LoaderCircle className="animate-spin text-blue-600" size={34} />
      </div>
    );
  }

  if (!selectedBusinessId || !selectedBusiness) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <LifeBuoy className="mx-auto text-slate-400" size={32} />
        <h2 className="mt-3 font-black text-slate-950">Select a business</h2>
        <p className="mt-1 text-sm text-slate-500">
          Select or create a business before contacting support.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-blue-600">
            Support
          </p>
          <h1 className="mt-2 break-words text-2xl font-black text-slate-950 sm:text-3xl">
            How can we help {selectedBusiness.name}?
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Create a ticket, follow its progress and communicate with the Vizo
            support team.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white"
        >
          <Plus size={17} />
          New ticket
        </button>
      </div>

      {error && !modalOpen ? (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <AlertTriangle className="mt-0.5 shrink-0" size={18} />
          <p className="min-w-0 break-words">{error}</p>
        </div>
      ) : null}

      {message ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
          {message}
        </div>
      ) : null}

      <div className="grid min-w-0 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_180px_180px_180px_auto]">
        <label className="relative min-w-0">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={17}
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search subject or reference"
            className="h-11 w-full min-w-0 rounded-xl border border-slate-300 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
          />
        </label>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as SupportStatus | "")
          }
          className="h-11 min-w-0 rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
        >
          <option value="">All statuses</option>
          {statuses.map((item) => (
            <option key={item} value={item}>
              {label(item)}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as SupportCategory | "")
          }
          className="h-11 min-w-0 rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as SupportPriority | "")
          }
          className="h-11 min-w-0 rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
        >
          <option value="">All priorities</option>
          {priorities.map((item) => (
            <option key={item} value={item}>
              {label(item)}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => void loadTickets()}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-black text-slate-700"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="grid min-h-64 place-items-center">
          <LoaderCircle className="animate-spin text-blue-600" size={32} />
        </div>
      ) : tickets.length ? (
        <div className="grid min-w-0 gap-4">
          {tickets.map((ticket) => (
            <Link
              key={ticket.public_id}
              href={`/dashboard/support/${ticket.public_id}`}
              className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md sm:p-5"
            >
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="break-all text-xs font-black uppercase tracking-wide text-blue-600">
                      {ticket.reference}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-black ${
                        statusColors[ticket.status]
                      }`}
                    >
                      {label(ticket.status)}
                    </span>
                  </div>

                  <h2 className="mt-3 break-words text-lg font-black text-slate-950 group-hover:text-blue-700">
                    {ticket.subject}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                    <span>{label(ticket.category)}</span>
                    <span
                      className={`font-black ${
                        priorityColors[ticket.priority]
                      }`}
                    >
                      {label(ticket.priority)} priority
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare size={14} />
                      {ticket.messages_count ?? 0}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-sm text-slate-500 sm:text-right">
                  <p>Last reply</p>
                  <p className="mt-1 font-bold text-slate-700">
                    {formatDate(ticket.last_reply_at)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <LifeBuoy className="mx-auto text-slate-400" size={34} />
          <h2 className="mt-3 font-black text-slate-950">
            No support tickets found
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Create a ticket when you need help from the Vizo team.
          </p>
        </div>
      )}

      {modalOpen ? (
        <div className="fixed inset-0 z-[120] overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center">
            <form
              onSubmit={submitTicket}
              className="my-6 w-full max-w-2xl rounded-3xl bg-white p-5 shadow-2xl sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-950">
                    Create support ticket
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Explain the problem clearly so we can help quickly.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              {error ? (
                <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              ) : null}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="text-sm font-black text-slate-700">
                    Subject
                  </span>
                  <input
                    required
                    minLength={5}
                    maxLength={200}
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="Example: Connect script is not loading"
                    className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                  />
                </label>

                <label>
                  <span className="text-sm font-black text-slate-700">
                    Category
                  </span>
                  <select
                    value={newCategory}
                    onChange={(event) =>
                      setNewCategory(event.target.value as SupportCategory)
                    }
                    className="mt-2 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
                  >
                    {categories.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="text-sm font-black text-slate-700">
                    Priority
                  </span>
                  <select
                    value={newPriority}
                    onChange={(event) =>
                      setNewPriority(event.target.value as SupportPriority)
                    }
                    className="mt-2 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
                  >
                    {priorities.map((item) => (
                      <option key={item} value={item}>
                        {label(item)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="sm:col-span-2">
                  <span className="text-sm font-black text-slate-700">
                    Message
                  </span>
                  <textarea
                    required
                    minLength={10}
                    maxLength={10000}
                    rows={6}
                    value={ticketMessage}
                    onChange={(event) => setTicketMessage(event.target.value)}
                    placeholder="Describe what happened and what you expected."
                    className="mt-2 w-full resize-none rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-500"
                  />
                </label>

                <label className="sm:col-span-2">
                  <span className="text-sm font-black text-slate-700">
                    Attachment URLs
                  </span>
                  <textarea
                    rows={3}
                    value={attachments}
                    onChange={(event) => setAttachments(event.target.value)}
                    placeholder="One URL per line, maximum 5"
                    className="mt-2 w-full resize-none rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-500"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white disabled:opacity-60"
              >
                {saving ? (
                  <LoaderCircle className="animate-spin" size={17} />
                ) : (
                  <Plus size={17} />
                )}
                Create ticket
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import {
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  LoaderCircle,
  MessageSquare,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type FormEvent, useCallback, useEffect, useState } from "react";

import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import {
  getSupportError,
  getSupportTicket,
  replyToSupportTicket,
} from "@/services/support.service";
import type { SupportTicket } from "@/types/support";

const statusColors: Record<string, string> = {
  open: "bg-blue-50 text-blue-700",
  in_progress: "bg-purple-50 text-purple-700",
  waiting_customer: "bg-amber-50 text-amber-700",
  resolved: "bg-emerald-50 text-emerald-700",
  closed: "bg-slate-100 text-slate-600",
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

export default function SupportTicketPage() {
  const params = useParams<{ ticket: string }>();
  const ticketPublicId = params.ticket;

  const { selectedBusinessId, isLoading: businessLoading } =
    useBusinessWorkspace();

  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [reply, setReply] = useState("");
  const [attachments, setAttachments] = useState("");

  const loadTicket = useCallback(async () => {
    if (!selectedBusinessId || !ticketPublicId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await getSupportTicket(selectedBusinessId, ticketPublicId);

      setTicket(result);
    } catch (requestError) {
      setError(
        getSupportError(requestError, "Unable to load the support ticket."),
      );
    } finally {
      setLoading(false);
    }
  }, [selectedBusinessId, ticketPublicId]);

  useEffect(() => {
    void loadTicket();
  }, [loadTicket]);

  async function sendReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedBusinessId || !ticket) {
      return;
    }

    try {
      setSending(true);
      setError("");

      await replyToSupportTicket(selectedBusinessId, ticket.public_id, {
        message: reply.trim(),
        attachments: attachmentList(attachments),
      });

      setReply("");
      setAttachments("");
      await loadTicket();
    } catch (requestError) {
      setError(getSupportError(requestError, "Unable to send your reply."));
    } finally {
      setSending(false);
    }
  }

  if (businessLoading || loading) {
    return (
      <div className="grid min-h-[55vh] place-items-center">
        <LoaderCircle className="animate-spin text-blue-600" size={34} />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="font-black text-red-800">
          {error || "Support ticket not found."}
        </p>
        <Link
          href="/dashboard/support"
          className="mt-4 inline-flex items-center gap-2 text-sm font-black text-red-700"
        >
          <ArrowLeft size={16} />
          Back to support
        </Link>
      </div>
    );
  }

  const closed = ticket.status === "closed";

  return (
    <div className="min-w-0 space-y-6">
      <Link
        href="/dashboard/support"
        className="inline-flex items-center gap-2 text-sm font-black text-blue-700"
      >
        <ArrowLeft size={16} />
        Back to support
      </Link>

      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
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

            <h1 className="mt-3 break-words text-2xl font-black text-slate-950">
              {ticket.subject}
            </h1>

            <p className="mt-2 break-words text-sm text-slate-500">
              {label(ticket.category)} · {label(ticket.priority)} priority ·
              Created {formatDate(ticket.created_at)}
            </p>
          </div>

          <div className="shrink-0 rounded-xl bg-slate-50 px-4 py-3 text-sm">
            <p className="text-slate-500">Assigned to</p>
            <p className="mt-1 font-black text-slate-800">
              {ticket.assignee?.name ?? "Vizo support team"}
            </p>
          </div>
        </div>
      </div>

      {error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <AlertTriangle className="mt-0.5 shrink-0" size={18} />
          <p className="min-w-0 break-words">{error}</p>
        </div>
      ) : null}

      <section className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <MessageSquare className="text-blue-600" size={20} />
          <h2 className="font-black text-slate-950">Conversation</h2>
        </div>

        <div className="grid min-w-0 gap-4">
          {ticket.messages?.map((supportMessage) => (
            <article
              key={supportMessage.id}
              className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="break-words text-sm font-black text-slate-900">
                  {supportMessage.user?.name ?? "Vizo support"}
                </p>
                <p className="shrink-0 text-xs text-slate-500">
                  {formatDate(supportMessage.created_at)}
                </p>
              </div>

              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
                {supportMessage.message}
              </p>

              {supportMessage.attachments?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {supportMessage.attachments.map((attachment, index) => (
                    <a
                      key={`${attachment}-${index}`}
                      href={attachment}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex max-w-full items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-xs font-black text-blue-700"
                    >
                      <ExternalLink className="shrink-0" size={14} />
                      <span className="truncate">Attachment {index + 1}</span>
                    </a>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {closed ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-100 p-5 text-center">
          <p className="font-black text-slate-800">This ticket is closed</p>
          <p className="mt-1 text-sm text-slate-500">
            Closed tickets cannot receive additional replies. Create a new
            ticket if you still need help.
          </p>
        </div>
      ) : (
        <form
          onSubmit={sendReply}
          className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
        >
          <h2 className="font-black text-slate-950">Add a reply</h2>

          <textarea
            required
            minLength={2}
            maxLength={10000}
            rows={5}
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            placeholder="Write your response..."
            className="mt-4 w-full resize-none rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-500"
          />

          <textarea
            rows={2}
            value={attachments}
            onChange={(event) => setAttachments(event.target.value)}
            placeholder="Optional attachment URLs, one per line"
            className="mt-3 w-full resize-none rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={sending}
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white disabled:opacity-60 sm:w-auto"
          >
            {sending ? (
              <LoaderCircle className="animate-spin" size={17} />
            ) : (
              <Send size={17} />
            )}
            Send reply
          </button>
        </form>
      )}
    </div>
  );
}

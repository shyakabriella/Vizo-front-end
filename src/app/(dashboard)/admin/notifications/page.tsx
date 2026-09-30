"use client";

import {
  Bell,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { getApiErrorMessage } from "@/lib/api";
import {
  notificationDescription,
  notificationHref,
  notificationTitle,
} from "@/lib/notification-display";
import {
  deleteNotification,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/services/notification.service";
import type {
  NotificationPagination,
  NotificationStatus,
  VizoNotification,
} from "@/types/notification";

const emptyPagination: NotificationPagination = {
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0,
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function notifyHeader() {
  window.dispatchEvent(new CustomEvent("vizo:notifications-changed"));
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<VizoNotification[]>([]);
  const [pagination, setPagination] =
    useState<NotificationPagination>(emptyPagination);
  const [unreadCount, setUnreadCount] = useState(0);
  const [status, setStatus] = useState<NotificationStatus>("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [markingAll, setMarkingAll] = useState(false);
  const [error, setError] = useState("");

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getNotifications(page, status, 15);

      setNotifications(result.notifications);
      setPagination(result.pagination);
      setUnreadCount(result.unread_count);
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to load notifications."),
      );
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    void loadNotifications();
  }, [loadNotifications]);

  async function markRead(notification: VizoNotification) {
    if (notification.is_read) return;

    try {
      setWorkingId(notification.id);

      const updated = await markNotificationAsRead(notification.id);

      setNotifications((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );

      setUnreadCount((current) => Math.max(0, current - 1));
      notifyHeader();
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Unable to mark the notification as read.",
        ),
      );
    } finally {
      setWorkingId(null);
    }
  }

  async function markAllRead() {
    try {
      setMarkingAll(true);
      setError("");

      await markAllNotificationsAsRead();

      setNotifications((current) =>
        current.map((item) => ({
          ...item,
          is_read: true,
          read_at: item.read_at ?? new Date().toISOString(),
        })),
      );

      setUnreadCount(0);
      notifyHeader();

      if (status === "unread") {
        await loadNotifications();
      }
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Unable to mark all notifications as read.",
        ),
      );
    } finally {
      setMarkingAll(false);
    }
  }

  async function removeNotification(notificationId: string) {
    try {
      setWorkingId(notificationId);
      setError("");

      await deleteNotification(notificationId);

      await loadNotifications();
      notifyHeader();
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to delete the notification."),
      );
    } finally {
      setWorkingId(null);
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Account activity
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Notifications
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            You currently have {unreadCount} unread notification
            {unreadCount === 1 ? "" : "s"}.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {unreadCount > 0 ? (
            <button
              type="button"
              disabled={markingAll}
              onClick={() => void markAllRead()}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white disabled:opacity-50"
            >
              {markingAll ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <CheckCheck className="size-4" />
              )}
              Mark all as read
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => void loadNotifications()}
            disabled={loading}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-700 disabled:opacity-50"
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </header>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
          {error}
        </div>
      ) : null}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex gap-2 overflow-x-auto border-b border-slate-200 p-4 sm:p-5">
          {(
            [
              ["all", "All"],
              ["unread", "Unread"],
              ["read", "Read"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setStatus(value);
                setPage(1);
              }}
              className={`rounded-xl px-4 py-2.5 text-sm font-black transition ${
                status === value
                  ? "bg-[#10104b] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid min-h-96 place-items-center">
            <Loader2 className="size-8 animate-spin text-blue-600" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="grid min-h-96 place-items-center p-8 text-center">
            <div>
              <Bell className="mx-auto size-12 text-slate-300" />

              <h2 className="mt-4 text-xl font-black text-slate-900">
                No notifications found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Notifications related to your account will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((notification) => (
              <article
                key={notification.id}
                className={`relative flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:p-6 ${
                  notification.is_read ? "bg-white" : "bg-blue-50/50"
                }`}
              >
                <div
                  className={`grid size-11 shrink-0 place-items-center rounded-2xl ${
                    notification.is_read
                      ? "bg-slate-100 text-slate-500"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  <Bell className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-black text-slate-950">
                      {notificationTitle(notification)}
                    </h2>

                    {!notification.is_read ? (
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-black uppercase text-blue-700">
                        New
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {notificationDescription(notification)}
                  </p>

                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    {formatDate(notification.created_at)}
                  </p>

                  <Link
                    href={notificationHref(notification)}
                    onClick={() => void markRead(notification)}
                    className="mt-3 inline-flex text-sm font-black text-blue-600 hover:text-blue-800"
                  >
                    View related information
                  </Link>
                </div>

                <div className="flex shrink-0 gap-2">
                  {!notification.is_read ? (
                    <button
                      type="button"
                      disabled={workingId === notification.id}
                      onClick={() => void markRead(notification)}
                      title="Mark as read"
                      className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-50"
                    >
                      {workingId === notification.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Check className="size-4" />
                      )}
                    </button>
                  ) : null}

                  <button
                    type="button"
                    disabled={workingId === notification.id}
                    onClick={() => void removeNotification(notification.id)}
                    title="Delete notification"
                    className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {pagination.last_page > 1 ? (
          <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
            <button
              type="button"
              disabled={pagination.current_page <= 1}
              onClick={() => setPage((current) => current - 1)}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-black text-slate-700 disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
              Previous
            </button>

            <p className="text-xs font-bold text-slate-500">
              Page {pagination.current_page} of {pagination.last_page}
            </p>

            <button
              type="button"
              disabled={pagination.current_page >= pagination.last_page}
              onClick={() => setPage((current) => current + 1)}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-black text-slate-700 disabled:opacity-40"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}

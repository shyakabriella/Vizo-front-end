"use client";

import { Bell, CheckCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import {
  notificationDescription,
  notificationHref,
  notificationTitle,
} from "@/lib/notification-display";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/services/notification.service";
import type { VizoNotification } from "@/types/notification";

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function AdminNotificationMenu() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<VizoNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  const loadNotifications = useCallback(async () => {
    try {
      const result = await getNotifications(1, "all", 6);

      setNotifications(result.notifications);
      setUnreadCount(result.unread_count);
    } catch {
      // Header notifications must not break the dashboard.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNotifications();

    const interval = window.setInterval(() => {
      void loadNotifications();
    }, 60000);

    function refreshNotifications() {
      void loadNotifications();
    }

    window.addEventListener("vizo:notifications-changed", refreshNotifications);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener(
        "vizo:notifications-changed",
        refreshNotifications,
      );
    };
  }, [loadNotifications]);

  async function readNotification(notification: VizoNotification) {
    if (notification.is_read) return;

    try {
      const updated = await markNotificationAsRead(notification.id);

      setNotifications((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );

      setUnreadCount((current) => Math.max(0, current - 1));
    } catch {
      // The notification page can retry the action.
    }
  }

  async function readAll() {
    try {
      setMarkingAll(true);

      await markAllNotificationsAsRead();

      setUnreadCount(0);
      setNotifications((current) =>
        current.map((item) => ({
          ...item,
          is_read: true,
          read_at: item.read_at ?? new Date().toISOString(),
        })),
      );
    } finally {
      setMarkingAll(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
      >
        <Bell className="size-5" />

        {unreadCount > 0 ? (
          <span className="absolute -right-1.5 -top-1.5 grid min-h-5 min-w-5 place-items-center rounded-full bg-rose-600 px-1 text-[10px] font-black text-white ring-2 ring-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 top-14 z-50 w-[min(390px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/15">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <p className="font-black text-slate-950">Notifications</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {unreadCount} unread
                </p>
              </div>

              {unreadCount > 0 ? (
                <button
                  type="button"
                  disabled={markingAll}
                  onClick={() => void readAll()}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 disabled:opacity-50"
                >
                  {markingAll ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <CheckCheck className="size-3.5" />
                  )}
                  Mark all read
                </button>
              ) : null}
            </div>

            <div className="max-h-[430px] overflow-y-auto">
              {loading ? (
                <div className="grid min-h-48 place-items-center">
                  <Loader2 className="size-6 animate-spin text-blue-600" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Bell className="mx-auto size-8 text-slate-300" />
                  <p className="mt-3 font-black text-slate-800">
                    No notifications
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    New account activity will appear here.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {notifications.map((notification) => (
                    <Link
                      key={notification.id}
                      href={notificationHref(notification)}
                      onClick={() => {
                        void readNotification(notification);
                        setOpen(false);
                      }}
                      className={`relative block px-5 py-4 transition hover:bg-slate-50 ${
                        notification.is_read ? "bg-white" : "bg-blue-50/60"
                      }`}
                    >
                      {!notification.is_read ? (
                        <span className="absolute left-2 top-6 size-2 rounded-full bg-blue-600" />
                      ) : null}

                      <p className="pr-4 text-sm font-black text-slate-900">
                        {notificationTitle(notification)}
                      </p>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                        {notificationDescription(notification)}
                      </p>

                      <p className="mt-2 text-[11px] font-semibold text-slate-400">
                        {dateLabel(notification.created_at)}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/admin/notifications"
              onClick={() => setOpen(false)}
              className="block border-t border-slate-100 px-5 py-4 text-center text-sm font-black text-blue-600 transition hover:bg-slate-50"
            >
              View all notifications
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

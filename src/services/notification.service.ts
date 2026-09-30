import { api } from "@/lib/api";
import type {
  NotificationListResult,
  NotificationStatus,
  VizoNotification,
} from "@/types/notification";

export async function getNotifications(
  page = 1,
  status: NotificationStatus = "all",
  perPage = 15,
): Promise<NotificationListResult> {
  const response = await api.get<{
    success: boolean;
    data: NotificationListResult;
  }>("/notifications", {
    params: {
      page,
      per_page: perPage,
      status: status === "all" ? undefined : status,
    },
  });

  return response.data.data;
}

export async function getUnreadNotificationCount(): Promise<number> {
  const response = await api.get<{
    success: boolean;
    data: {
      unread_count: number;
    };
  }>("/notifications/unread-count");

  return response.data.data.unread_count;
}

export async function markNotificationAsRead(
  notificationId: string,
): Promise<VizoNotification> {
  const response = await api.patch<{
    success: boolean;
    data: {
      notification: VizoNotification;
    };
  }>(`/notifications/${notificationId}/read`);

  return response.data.data.notification;
}

export async function markAllNotificationsAsRead(): Promise<number> {
  const response = await api.post<{
    success: boolean;
    data: {
      marked_count: number;
      unread_count: number;
    };
  }>("/notifications/read-all");

  return response.data.data.marked_count;
}

export async function deleteNotification(
  notificationId: string,
): Promise<void> {
  await api.delete(`/notifications/${notificationId}`);
}

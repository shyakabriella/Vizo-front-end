export type NotificationStatus = "all" | "read" | "unread";

export type NotificationData = Record<
  string,
  string | number | boolean | null | undefined
>;

export type VizoNotification = {
  id: string;
  type: string;
  data: NotificationData;
  is_read: boolean;
  read_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type NotificationPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type NotificationListResult = {
  notifications: VizoNotification[];
  unread_count: number;
  pagination: NotificationPagination;
};

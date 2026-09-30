export type SupportCategory =
  | "general"
  | "billing"
  | "technical"
  | "installation"
  | "account"
  | "feature_request";

export type SupportPriority = "low" | "normal" | "high" | "urgent";

export type SupportStatus =
  "open" | "in_progress" | "waiting_customer" | "resolved" | "closed";

export type SupportUser = {
  id: number | null;
  name: string | null;
  email?: string | null;
};

export type SupportMessage = {
  id: number;
  message: string;
  is_internal: boolean;
  attachments?: string[] | null;
  user?: SupportUser | null;
  created_at?: string | null;
};

export type SupportTicket = {
  public_id: string;
  reference: string;
  subject: string;
  category: SupportCategory;
  priority: SupportPriority;
  status: SupportStatus;
  creator?: SupportUser | null;
  assignee?: SupportUser | null;
  messages_count?: number | null;
  messages?: SupportMessage[];
  last_reply_at?: string | null;
  resolved_at?: string | null;
  closed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type SupportPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type SupportTicketList = {
  tickets: SupportTicket[];
  pagination: SupportPagination;
};

export type CreateSupportTicketPayload = {
  subject: string;
  category: SupportCategory;
  priority: SupportPriority;
  message: string;
  attachments?: string[];
};

export type ReplySupportTicketPayload = {
  message: string;
  attachments?: string[];
};

export type SupportTicketFilters = {
  status?: SupportStatus | "";
  category?: SupportCategory | "";
  priority?: SupportPriority | "";
  search?: string;
  page?: number;
  perPage?: number;
};

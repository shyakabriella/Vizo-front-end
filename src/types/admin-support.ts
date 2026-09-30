export type SupportTicketStatus =
  "open" | "in_progress" | "waiting_customer" | "resolved" | "closed";

export type SupportTicketPriority = "low" | "normal" | "high" | "urgent";

export type SupportTicketCategory =
  | "general"
  | "billing"
  | "technical"
  | "installation"
  | "account"
  | "feature_request";

export type SupportUser = {
  id: number | null;
  name?: string | null;
  email?: string | null;
};

export type SupportMessage = {
  id: number;
  message: string;
  is_internal: boolean;
  attachments?: string[] | null;
  user?: {
    id: number | null;
    name?: string | null;
  } | null;
  created_at: string;
};

export type AdminSupportTicket = {
  public_id: string;
  reference: string;
  subject: string;
  category: SupportTicketCategory;
  priority: SupportTicketPriority;
  status: SupportTicketStatus;
  business?: {
    public_id: string;
    name: string;
    owner_email?: string | null;
  } | null;
  creator?: SupportUser | null;
  assignee?: SupportUser | null;
  messages_count?: number | null;
  messages?: SupportMessage[];
  last_reply_at?: string | null;
  resolved_at?: string | null;
  closed_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type SupportPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type SupportTicketFilters = {
  page?: number;
  per_page?: number;
  status?: SupportTicketStatus | "";
  priority?: SupportTicketPriority | "";
  category?: SupportTicketCategory | "";
  search?: string;
};

export type UpdateSupportTicketPayload = {
  assigned_to?: number | null;
  priority?: SupportTicketPriority;
  status?: SupportTicketStatus;
};

export type SupportReplyPayload = {
  message: string;
  is_internal: boolean;
  attachments?: string[];
};

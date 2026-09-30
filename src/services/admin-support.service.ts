import { api } from "@/lib/api";
import type {
  AdminSupportTicket,
  SupportMessage,
  SupportPagination,
  SupportReplyPayload,
  SupportTicketFilters,
  UpdateSupportTicketPayload,
} from "@/types/admin-support";

export async function getAdminSupportTickets(
  filters: SupportTicketFilters = {},
): Promise<{
  tickets: AdminSupportTicket[];
  pagination: SupportPagination;
}> {
  const response = await api.get<{
    success: boolean;
    data: {
      tickets: AdminSupportTicket[];
      pagination: SupportPagination;
    };
  }>("/admin/support-tickets", {
    params: filters,
  });

  return response.data.data;
}

export async function getAdminSupportTicket(
  publicId: string,
): Promise<AdminSupportTicket> {
  const response = await api.get<{
    success: boolean;
    data: {
      ticket: AdminSupportTicket;
    };
  }>(`/admin/support-tickets/${publicId}`);

  return response.data.data.ticket;
}

export async function updateAdminSupportTicket(
  publicId: string,
  payload: UpdateSupportTicketPayload,
): Promise<AdminSupportTicket> {
  const response = await api.patch<{
    success: boolean;
    message: string;
    data: {
      ticket: AdminSupportTicket;
    };
  }>(`/admin/support-tickets/${publicId}`, payload);

  return response.data.data.ticket;
}

export async function replyToAdminSupportTicket(
  publicId: string,
  payload: SupportReplyPayload,
): Promise<SupportMessage> {
  const response = await api.post<{
    success: boolean;
    message: string;
    data: {
      message: SupportMessage;
    };
  }>(`/admin/support-tickets/${publicId}/messages`, payload);

  return response.data.data.message;
}

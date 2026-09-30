import { api, getApiErrorMessage } from "@/lib/api";
import type {
  CreateSupportTicketPayload,
  ReplySupportTicketPayload,
  SupportMessage,
  SupportTicket,
  SupportTicketFilters,
  SupportTicketList,
} from "@/types/support";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

function supportUrl(businessPublicId: string, path = ""): string {
  return `/businesses/${businessPublicId}/support-tickets${path}`;
}

export async function getSupportTickets(
  businessPublicId: string,
  filters: SupportTicketFilters = {},
): Promise<SupportTicketList> {
  const response = await api.get<ApiResponse<SupportTicketList>>(
    supportUrl(businessPublicId),
    {
      params: {
        status: filters.status || undefined,
        category: filters.category || undefined,
        priority: filters.priority || undefined,
        search: filters.search?.trim() || undefined,
        page: filters.page ?? 1,
        per_page: filters.perPage ?? 15,
      },
    },
  );

  return response.data.data;
}

export async function createSupportTicket(
  businessPublicId: string,
  payload: CreateSupportTicketPayload,
): Promise<{
  message?: string;
  ticket: SupportTicket;
}> {
  const response = await api.post<
    ApiResponse<{
      ticket: SupportTicket;
    }>
  >(supportUrl(businessPublicId), payload);

  return {
    message: response.data.message,
    ticket: response.data.data.ticket,
  };
}

export async function getSupportTicket(
  businessPublicId: string,
  ticketPublicId: string,
): Promise<SupportTicket> {
  const response = await api.get<
    ApiResponse<{
      ticket: SupportTicket;
    }>
  >(supportUrl(businessPublicId, `/${ticketPublicId}`));

  return response.data.data.ticket;
}

export async function replyToSupportTicket(
  businessPublicId: string,
  ticketPublicId: string,
  payload: ReplySupportTicketPayload,
): Promise<{
  message?: string;
  supportMessage: SupportMessage;
}> {
  const response = await api.post<
    ApiResponse<{
      message: SupportMessage;
    }>
  >(supportUrl(businessPublicId, `/${ticketPublicId}/messages`), payload);

  return {
    message: response.data.message,
    supportMessage: response.data.data.message,
  };
}

export function getSupportError(
  error: unknown,
  fallback = "The support request could not be completed.",
): string {
  return getApiErrorMessage(error, fallback);
}

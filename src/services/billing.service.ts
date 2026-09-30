import { api } from "@/lib/api";
import type {
  ApiMessageResponse,
  BillingInvoice,
  BillingPlan,
  BillingSummary,
  BusinessSubscription,
  CancelSubscriptionPayload,
  InitializePaymentPayload,
  InitializePaymentResult,
  InvoiceStatus,
  PaginatedResponse,
  PaymentStatus,
  PaymentTransaction,
  SubscribePayload,
  SubscribeResult,
} from "@/types/billing";

type ListInvoiceOptions = {
  status?: InvoiceStatus | "";
  page?: number;
  perPage?: number;
};

type ListTransactionOptions = {
  status?: PaymentStatus | "";
  provider?: string;
  page?: number;
  perPage?: number;
};

function businessUrl(businessPublicId: string, path: string): string {
  return `/businesses/${businessPublicId}${path}`;
}

export async function getBillingPlans(): Promise<BillingPlan[]> {
  const response = await api.get<
    | PaginatedResponse<BillingPlan>
    | {
        data: BillingPlan[];
      }
  >("/plans");

  return response.data.data ?? [];
}

export async function getBillingSummary(
  businessPublicId: string,
): Promise<BillingSummary> {
  const response = await api.get<
    ApiMessageResponse<{
      billing: BillingSummary;
    }>
  >(businessUrl(businessPublicId, "/billing/summary"));

  return response.data.data.billing;
}

export async function getBusinessSubscription(
  businessPublicId: string,
): Promise<BusinessSubscription | null> {
  const response = await api.get<
    ApiMessageResponse<{
      subscription: BusinessSubscription | null;
    }>
  >(businessUrl(businessPublicId, "/subscription"));

  return response.data.data.subscription;
}

export async function subscribeToPlan(
  businessPublicId: string,
  payload: SubscribePayload,
): Promise<{
  message?: string;
  result: SubscribeResult;
}> {
  const response = await api.post<ApiMessageResponse<SubscribeResult>>(
    businessUrl(businessPublicId, "/subscription"),
    payload,
  );

  return {
    message: response.data.message,
    result: response.data.data,
  };
}

export async function cancelBusinessSubscription(
  businessPublicId: string,
  payload: CancelSubscriptionPayload,
): Promise<{
  message?: string;
  subscription: BusinessSubscription;
}> {
  const response = await api.post<
    ApiMessageResponse<{
      subscription: BusinessSubscription;
    }>
  >(businessUrl(businessPublicId, "/subscription/cancel"), payload);

  return {
    message: response.data.message,
    subscription: response.data.data.subscription,
  };
}

export async function getBillingInvoices(
  businessPublicId: string,
  options: ListInvoiceOptions = {},
): Promise<PaginatedResponse<BillingInvoice>> {
  const response = await api.get<PaginatedResponse<BillingInvoice>>(
    businessUrl(businessPublicId, "/billing/invoices"),
    {
      params: {
        status: options.status || undefined,
        page: options.page ?? 1,
        per_page: options.perPage ?? 15,
      },
    },
  );

  return response.data;
}

export async function getBillingInvoice(
  businessPublicId: string,
  invoicePublicId: string,
): Promise<BillingInvoice> {
  const response = await api.get<
    ApiMessageResponse<{
      invoice: BillingInvoice;
    }>
  >(businessUrl(businessPublicId, `/billing/invoices/${invoicePublicId}`));

  return response.data.data.invoice;
}

export async function getBillingTransactions(
  businessPublicId: string,
  options: ListTransactionOptions = {},
): Promise<PaginatedResponse<PaymentTransaction>> {
  const response = await api.get<PaginatedResponse<PaymentTransaction>>(
    businessUrl(businessPublicId, "/billing/transactions"),
    {
      params: {
        status: options.status || undefined,
        provider: options.provider || undefined,
        page: options.page ?? 1,
        per_page: options.perPage ?? 15,
      },
    },
  );

  return response.data;
}

export async function initializeInvoicePayment(
  businessPublicId: string,
  invoicePublicId: string,
  payload: InitializePaymentPayload,
): Promise<{
  message?: string;
  payment: InitializePaymentResult;
}> {
  const response = await api.post<
    ApiMessageResponse<{
      payment: InitializePaymentResult;
    }>
  >(
    businessUrl(businessPublicId, `/billing/invoices/${invoicePublicId}/pay`),
    payload,
  );

  return {
    message: response.data.message,
    payment: response.data.data.payment,
  };
}

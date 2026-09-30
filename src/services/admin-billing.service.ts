import { api } from "@/lib/api";
import type {
  AdminInvoice,
  AdminPaymentTransaction,
  AdminSubscription,
  BillingListResponse,
  BillingSummary,
} from "@/types/admin-billing";

type BillingFilters = {
  page?: number;
  per_page?: number;
  status?: string;
  search?: string;
  provider?: string;
  plan_id?: number;
};

export async function getBillingSummary(): Promise<BillingSummary> {
  const response = await api.get<{
    success: boolean;
    data: {
      billing: BillingSummary;
    };
  }>("/admin/billing/summary");

  return response.data.data.billing;
}

export async function getAdminSubscriptions(filters: BillingFilters = {}) {
  const response = await api.get<
    BillingListResponse<AdminSubscription, "subscriptions">
  >("/admin/billing/subscriptions", {
    params: filters,
  });

  return response.data.data;
}

export async function getAdminInvoices(filters: BillingFilters = {}) {
  const response = await api.get<BillingListResponse<AdminInvoice, "invoices">>(
    "/admin/billing/invoices",
    {
      params: filters,
    },
  );

  return response.data.data;
}

export async function getAdminTransactions(filters: BillingFilters = {}) {
  const response = await api.get<
    BillingListResponse<AdminPaymentTransaction, "transactions">
  >("/admin/billing/transactions", {
    params: filters,
  });

  return response.data.data;
}

export type BillingPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type BillingSummary = {
  subscriptions: {
    total: number;
    trialing: number;
    active: number;
    past_due: number;
    cancelled: number;
    expired: number;
  };
  invoices: {
    total: number;
    open: number;
    paid: number;
    past_due: number;
    outstanding_amount: string;
    total_paid: string;
  };
  transactions: {
    total: number;
    pending: number;
    succeeded: number;
    failed: number;
    successful_amount: string;
  };
};

export type AdminSubscription = {
  public_id: string;
  status: string;
  billing_cycle: string;
  price: string;
  currency: string;
  provider?: string | null;
  trial_ends_at?: string | null;
  current_period_ends_at?: string | null;
  cancel_at_period_end: boolean;
  plan: {
    id: number;
    name: string;
    slug: string;
  };
  business: {
    public_id: string;
    name: string;
    owner_name?: string | null;
    owner_email?: string | null;
  };
  created_at: string;
};

export type AdminInvoice = {
  public_id: string;
  invoice_number: string;
  status: string;
  billing_cycle?: string | null;
  description?: string | null;
  total: string;
  amount_paid: string;
  amount_due: string;
  currency: string;
  issued_at?: string | null;
  due_at?: string | null;
  paid_at?: string | null;
  transactions_count: number;
  plan?: {
    id: number;
    name: string;
  } | null;
  business: {
    public_id: string;
    name: string;
    owner_email?: string | null;
  };
};

export type AdminPaymentTransaction = {
  public_id: string;
  reference: string;
  status: string;
  payment_method?: string | null;
  provider?: string | null;
  provider_transaction_id?: string | null;
  amount: string;
  currency: string;
  customer_phone?: string | null;
  customer_email?: string | null;
  failure_message?: string | null;
  paid_at?: string | null;
  failed_at?: string | null;
  invoice_number?: string | null;
  business: {
    public_id: string;
    name: string;
    owner_email?: string | null;
  };
  created_at: string;
};

export type BillingListResponse<T, K extends string> = {
  success: boolean;
  data: Record<K, T[]> & {
    pagination: BillingPagination;
  };
};

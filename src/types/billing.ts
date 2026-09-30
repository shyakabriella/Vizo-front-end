export type BillingCycle = "monthly" | "yearly";

export type SubscriptionStatus =
  "trialing" | "active" | "past_due" | "cancelled" | "expired";

export type InvoiceStatus =
  | "draft"
  | "open"
  | "paid"
  | "past_due"
  | "void"
  | "uncollectible"
  | "refunded";

export type PaymentStatus =
  "pending" | "processing" | "succeeded" | "failed" | "cancelled" | "refunded";

export type PaymentMethod =
  "mobile_money" | "card" | "bank_transfer" | "manual";

export type BillingAmount = string | number;

export type BillingPlan = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  pricing: {
    monthly: BillingAmount;
    yearly: BillingAmount;
    currency: string;
  };
  trial_days: number;
  limits: Record<string, unknown>;
  features: string[] | Record<string, unknown>;
  is_featured: boolean;
};

export type BusinessSubscription = {
  public_id: string;
  status: SubscriptionStatus;
  billing_cycle: BillingCycle;
  price: BillingAmount;
  currency: string;
  provider?: string | null;
  is_active: boolean;
  is_on_trial: boolean;
  cancel_at_period_end: boolean;
  trial_ends_at?: string | null;
  starts_at?: string | null;
  current_period_starts_at?: string | null;
  current_period_ends_at?: string | null;
  cancelled_at?: string | null;
  ends_at?: string | null;
  plan: BillingPlan;
};

export type InvoiceLineItem = {
  name?: string;
  description?: string;
  quantity?: number;
  unit_amount?: BillingAmount;
  total?: BillingAmount;
  [key: string]: unknown;
};

export type PaymentInvoiceReference = {
  public_id: string;
  invoice_number: string;
};

export type PaymentTransaction = {
  public_id: string;
  reference: string;
  status: PaymentStatus;
  payment_method: PaymentMethod;
  provider?: string | null;
  provider_transaction_id?: string | null;
  amount: BillingAmount;
  currency: string;
  customer_phone?: string | null;
  customer_email?: string | null;
  failure_code?: string | null;
  failure_message?: string | null;
  paid_at?: string | null;
  failed_at?: string | null;
  refunded_at?: string | null;
  invoice?: PaymentInvoiceReference | null;
  created_at?: string | null;
};

export type BillingInvoice = {
  public_id: string;
  invoice_number: string;
  status: InvoiceStatus;
  billing_cycle: BillingCycle;
  description?: string | null;
  line_items: InvoiceLineItem[];
  subtotal: BillingAmount;
  discount_amount: BillingAmount;
  tax_amount: BillingAmount;
  total: BillingAmount;
  amount_paid: BillingAmount;
  amount_due: BillingAmount;
  currency: string;
  is_paid: boolean;
  is_payable: boolean;
  period_starts_at?: string | null;
  period_ends_at?: string | null;
  issued_at?: string | null;
  due_at?: string | null;
  paid_at?: string | null;
  voided_at?: string | null;
  plan?: BillingPlan | null;
  transactions_count?: number;
  transactions?: PaymentTransaction[];
  created_at?: string | null;
};

export type BillingTotals = {
  invoices: number;
  open_invoices: number;
  outstanding_amount: BillingAmount;
  total_paid: BillingAmount;
  successful_payments: number;
};

export type BillingSummary = {
  currency: string;
  subscription: BusinessSubscription | null;
  latest_invoice: BillingInvoice | null;
  totals: BillingTotals;
};

export type PaginationMeta = {
  current_page: number;
  from?: number | null;
  last_page: number;
  path?: string;
  per_page: number;
  to?: number | null;
  total: number;
};

export type PaginationLinks = {
  first?: string | null;
  last?: string | null;
  prev?: string | null;
  next?: string | null;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
  links?: PaginationLinks;
};

export type SubscribePayload = {
  plan_id: number;
  billing_cycle: BillingCycle;
};

export type SubscribeResult = {
  subscription: BusinessSubscription;
  invoice: BillingInvoice | null;
  payment_required: boolean;
};

export type CancelSubscriptionPayload = {
  immediately?: boolean;
  reason?: string;
};

export type InitializePaymentPayload = {
  payment_method: PaymentMethod;
  customer_phone?: string;
  customer_email?: string;
};

export type InitializePaymentResult = {
  created: boolean;
  checkout_url?: string | null;
  transaction: PaymentTransaction;
  invoice: BillingInvoice;
};

export type ApiMessageResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

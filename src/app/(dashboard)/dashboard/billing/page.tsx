"use client";

import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  LoaderCircle,
  RefreshCw,
  ReceiptText,
  WalletCards,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import { getApiErrorMessage } from "@/lib/api";
import {
  cancelBusinessSubscription,
  getBillingInvoices,
  getBillingPlans,
  getBillingSummary,
  getBillingTransactions,
  initializeInvoicePayment,
  subscribeToPlan,
} from "@/services/billing.service";
import type {
  BillingCycle,
  BillingInvoice,
  BillingPlan,
  BillingSummary,
  InitializePaymentPayload,
  PaymentMethod,
  PaymentTransaction,
} from "@/types/billing";

type Modal = "plan" | "payment" | "cancel" | null;

const statusColors: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700",
  trialing: "bg-blue-50 text-blue-700",
  paid: "bg-emerald-50 text-emerald-700",
  succeeded: "bg-emerald-50 text-emerald-700",
  open: "bg-amber-50 text-amber-700",
  past_due: "bg-red-50 text-red-700",
  pending: "bg-amber-50 text-amber-700",
  processing: "bg-blue-50 text-blue-700",
  cancelled: "bg-slate-100 text-slate-600",
  expired: "bg-slate-100 text-slate-600",
  void: "bg-slate-100 text-slate-600",
  failed: "bg-red-50 text-red-700",
  refunded: "bg-purple-50 text-purple-700",
};

function statusLabel(value: string): string {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function money(value: string | number, currency = "RWF"): string {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return `${value} ${currency}`;
  }

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "RWF" ? 0 : 2,
  }).format(amount);
}

function date(value?: string | null): string {
  if (!value) {
    return "Not available";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(parsed);
}

function planFeatures(plan: BillingPlan): string[] {
  if (Array.isArray(plan.features)) {
    return plan.features.map(String);
  }

  return Object.entries(plan.features)
    .filter(([, enabled]) => Boolean(enabled))
    .map(([feature]) => statusLabel(feature));
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black ${
        statusColors[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {statusLabel(status)}
    </span>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <ReceiptText className="mx-auto text-slate-400" size={30} />
      <h3 className="mt-3 font-black text-slate-900">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default function BillingPage() {
  const {
    selectedBusiness,
    selectedBusinessId,
    isLoading: businessLoading,
  } = useBusinessWorkspace();

  const [summary, setSummary] = useState<BillingSummary | null>(null);
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [invoices, setInvoices] = useState<BillingInvoice[]>([]);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState<Modal>(null);

  const [selectedPlan, setSelectedPlan] = useState<BillingPlan | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const [selectedInvoice, setSelectedInvoice] = useState<BillingInvoice | null>(
    null,
  );
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("mobile_money");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [cancelImmediately, setCancelImmediately] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const loadBilling = useCallback(async () => {
    if (!selectedBusinessId) {
      setSummary(null);
      setPlans([]);
      setInvoices([]);
      setTransactions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const [summaryResult, planResult, invoiceResult, transactionResult] =
        await Promise.all([
          getBillingSummary(selectedBusinessId),
          getBillingPlans(),
          getBillingInvoices(selectedBusinessId, {
            perPage: 20,
          }),
          getBillingTransactions(selectedBusinessId, {
            perPage: 20,
          }),
        ]);

      setSummary(summaryResult);
      setPlans(planResult);
      setInvoices(invoiceResult.data);
      setTransactions(transactionResult.data);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Unable to load subscription and billing information.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }, [selectedBusinessId]);

  useEffect(() => {
    void loadBilling();
  }, [loadBilling]);

  const currentPlanId = summary?.subscription?.plan?.id ?? null;

  const outstandingInvoice = useMemo(
    () =>
      invoices.find(
        (invoice) => invoice.is_payable && Number(invoice.amount_due) > 0,
      ) ?? null,
    [invoices],
  );

  function openPlan(plan: BillingPlan) {
    setSelectedPlan(plan);
    setBillingCycle(summary?.subscription?.billing_cycle ?? "monthly");
    setError("");
    setMessage("");
    setModal("plan");
  }

  function openPayment(invoice: BillingInvoice) {
    setSelectedInvoice(invoice);
    setPaymentMethod("mobile_money");
    setCustomerPhone("");
    setCustomerEmail("");
    setError("");
    setMessage("");
    setModal("payment");
  }

  async function savePlan() {
    if (!selectedBusinessId || !selectedPlan) {
      return;
    }

    try {
      setWorking(true);
      setError("");

      const response = await subscribeToPlan(selectedBusinessId, {
        plan_id: selectedPlan.id,
        billing_cycle: billingCycle,
      });

      setMessage(response.message ?? "Subscription updated successfully.");
      setModal(null);
      await loadBilling();

      if (
        response.result.payment_required &&
        response.result.invoice?.is_payable
      ) {
        openPayment(response.result.invoice);
      }
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to update the subscription."),
      );
    } finally {
      setWorking(false);
    }
  }

  async function startPayment() {
    if (!selectedBusinessId || !selectedInvoice) {
      return;
    }

    if (paymentMethod === "mobile_money" && !customerPhone.trim()) {
      setError("Enter the Mobile Money phone number.");
      return;
    }

    const payload: InitializePaymentPayload = {
      payment_method: paymentMethod,
      customer_phone:
        paymentMethod === "mobile_money" ? customerPhone.trim() : undefined,
      customer_email: customerEmail.trim() || undefined,
    };

    try {
      setWorking(true);
      setError("");

      const response = await initializeInvoicePayment(
        selectedBusinessId,
        selectedInvoice.public_id,
        payload,
      );

      setMessage(response.message ?? "Payment initialized successfully.");
      setModal(null);
      await loadBilling();

      if (response.payment.checkout_url) {
        window.location.assign(response.payment.checkout_url);
      }
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to initialize the payment."),
      );
    } finally {
      setWorking(false);
    }
  }

  async function cancelSubscription() {
    if (!selectedBusinessId) {
      return;
    }

    try {
      setWorking(true);
      setError("");

      const response = await cancelBusinessSubscription(selectedBusinessId, {
        immediately: cancelImmediately,
        reason: cancelReason.trim() || undefined,
      });

      setMessage(response.message ?? "Subscription cancellation saved.");
      setModal(null);
      setCancelReason("");
      setCancelImmediately(false);
      await loadBilling();
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to cancel the subscription."),
      );
    } finally {
      setWorking(false);
    }
  }

  if (businessLoading || loading) {
    return (
      <div className="grid min-h-[55vh] place-items-center">
        <div className="text-center text-slate-500">
          <LoaderCircle
            className="mx-auto animate-spin text-blue-600"
            size={34}
          />
          <p className="mt-3 text-sm font-semibold">
            Loading billing information...
          </p>
        </div>
      </div>
    );
  }

  if (!selectedBusinessId || !selectedBusiness) {
    return (
      <EmptyState
        title="Select a business"
        description="Select or create a business before managing subscription and billing."
      />
    );
  }

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-blue-600">
            Subscription & billing
          </p>
          <h1 className="mt-2 break-words text-2xl font-black text-slate-950 sm:text-3xl">
            Manage {selectedBusiness.name}&apos;s plan
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Review your subscription, invoices, outstanding payments and payment
            history.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadBilling()}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-700"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <AlertTriangle className="mt-0.5 shrink-0" size={18} />
          <p className="min-w-0 break-words">{error}</p>
        </div>
      ) : null}

      {message ? (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
          <p className="min-w-0 break-words">{message}</p>
        </div>
      ) : null}

      <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="min-w-0 rounded-2xl bg-[#11113f] p-5 text-white shadow-sm">
          <p className="text-sm font-bold text-blue-100">Current plan</p>
          <p className="mt-3 break-words text-2xl font-black">
            {summary?.subscription?.plan?.name ?? "No plan"}
          </p>
          <div className="mt-3">
            {summary?.subscription ? (
              <StatusBadge status={summary.subscription.status} />
            ) : null}
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">
            Outstanding balance
          </p>
          <p className="mt-3 break-words text-2xl font-black text-slate-950">
            {money(summary?.totals.outstanding_amount ?? 0, summary?.currency)}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            {summary?.totals.open_invoices ?? 0} open invoices
          </p>
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Total paid</p>
          <p className="mt-3 break-words text-2xl font-black text-slate-950">
            {money(summary?.totals.total_paid ?? 0, summary?.currency)}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            {summary?.totals.successful_payments ?? 0} successful payments
          </p>
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Billing period</p>
          <p className="mt-3 text-2xl font-black capitalize text-slate-950">
            {summary?.subscription?.billing_cycle ?? "None"}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Ends {date(summary?.subscription?.current_period_ends_at)}
          </p>
        </div>
      </div>

      {outstandingInvoice ? (
        <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="font-black text-amber-900">Payment required</p>
            <p className="mt-1 break-words text-sm text-amber-700">
              Invoice {outstandingInvoice.invoice_number} has an outstanding
              balance of{" "}
              {money(
                outstandingInvoice.amount_due,
                outstandingInvoice.currency,
              )}
              .
            </p>
          </div>

          <button
            type="button"
            onClick={() => openPayment(outstandingInvoice)}
            className="h-11 shrink-0 rounded-xl bg-amber-600 px-5 text-sm font-black text-white"
          >
            Pay invoice
          </button>
        </div>
      ) : null}

      <section className="min-w-0">
        <div className="mb-4">
          <h2 className="text-xl font-black text-slate-950">Available plans</h2>
          <p className="mt-1 text-sm text-slate-500">
            Select the plan that matches your visibility needs.
          </p>
        </div>

        <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => {
            const isCurrent = plan.id === currentPlanId;
            const features = planFeatures(plan).slice(0, 5);

            return (
              <article
                key={plan.id}
                className={`min-w-0 rounded-2xl border bg-white p-5 shadow-sm ${
                  plan.is_featured
                    ? "border-blue-400 ring-2 ring-blue-100"
                    : "border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="break-words text-lg font-black text-slate-950">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {plan.description}
                    </p>
                  </div>

                  {isCurrent ? (
                    <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">
                      Current
                    </span>
                  ) : null}
                </div>

                <p className="mt-5 text-2xl font-black text-slate-950">
                  {money(plan.pricing.monthly, plan.pricing.currency)}
                  <span className="text-sm font-semibold text-slate-500">
                    {" "}
                    / month
                  </span>
                </p>

                {features.length ? (
                  <ul className="mt-4 space-y-2">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex min-w-0 items-start gap-2 text-sm text-slate-600"
                      >
                        <CheckCircle2
                          className="mt-0.5 shrink-0 text-emerald-600"
                          size={15}
                        />
                        <span className="min-w-0 break-words">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <button
                  type="button"
                  onClick={() => openPlan(plan)}
                  className={`mt-5 h-11 w-full rounded-xl text-sm font-black ${
                    isCurrent
                      ? "border border-slate-300 text-slate-700"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {isCurrent ? "Change billing cycle" : "Choose plan"}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <ReceiptText className="text-blue-600" size={22} />
          <div>
            <h2 className="font-black text-slate-950">Invoices</h2>
            <p className="text-sm text-slate-500">
              Your latest subscription invoices.
            </p>
          </div>
        </div>

        {invoices.length ? (
          <div className="grid min-w-0 gap-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.public_id}
                className="flex min-w-0 flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="break-all font-black text-slate-900">
                      {invoice.invoice_number}
                    </p>
                    <StatusBadge status={invoice.status} />
                  </div>
                  <p className="mt-1 break-words text-sm text-slate-500">
                    Issued {date(invoice.issued_at)} · Due{" "}
                    {date(invoice.due_at)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                  <p className="font-black text-slate-950">
                    {money(invoice.total, invoice.currency)}
                  </p>

                  {invoice.is_payable ? (
                    <button
                      type="button"
                      onClick={() => openPayment(invoice)}
                      className="h-10 rounded-xl bg-blue-600 px-4 text-sm font-black text-white"
                    >
                      Pay
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No invoices yet"
            description="Invoices created for subscriptions will appear here."
          />
        )}
      </section>

      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <CreditCard className="text-blue-600" size={22} />
          <div>
            <h2 className="font-black text-slate-950">Payment history</h2>
            <p className="text-sm text-slate-500">
              Recent billing transactions.
            </p>
          </div>
        </div>

        {transactions.length ? (
          <div className="grid min-w-0 gap-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.public_id}
                className="flex min-w-0 flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="break-all font-black text-slate-900">
                      {transaction.reference}
                    </p>
                    <StatusBadge status={transaction.status} />
                  </div>
                  <p className="mt-1 break-words text-sm text-slate-500">
                    {statusLabel(transaction.payment_method)} ·{" "}
                    {date(transaction.created_at)}
                  </p>
                </div>

                <p className="shrink-0 font-black text-slate-950">
                  {money(transaction.amount, transaction.currency)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No payments yet"
            description="Your payment transactions will appear here."
          />
        )}
      </section>

      {summary?.subscription &&
      !["cancelled", "expired"].includes(summary.subscription.status) ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <h2 className="font-black text-red-900">Cancel subscription</h2>
          <p className="mt-1 text-sm leading-6 text-red-700">
            You can schedule cancellation for the end of the billing period or
            cancel immediately.
          </p>
          <button
            type="button"
            onClick={() => {
              setError("");
              setMessage("");
              setModal("cancel");
            }}
            className="mt-4 h-10 rounded-xl border border-red-300 bg-white px-4 text-sm font-black text-red-700"
          >
            Cancel subscription
          </button>
        </div>
      ) : null}

      {modal ? (
        <div className="fixed inset-0 z-[120] overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center">
            <div className="my-6 w-full max-w-xl rounded-3xl bg-white p-5 shadow-2xl sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-950">
                    {modal === "plan"
                      ? `Choose ${selectedPlan?.name}`
                      : modal === "payment"
                        ? "Pay invoice"
                        : "Cancel subscription"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {modal === "plan"
                      ? "Select your preferred billing cycle."
                      : modal === "payment"
                        ? selectedInvoice?.invoice_number
                        : "Tell us how you want to cancel."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              {error ? (
                <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              ) : null}

              {modal === "plan" && selectedPlan ? (
                <div className="mt-6">
                  <div className="grid grid-cols-2 gap-3">
                    {(["monthly", "yearly"] as BillingCycle[]).map((cycle) => (
                      <button
                        key={cycle}
                        type="button"
                        onClick={() => setBillingCycle(cycle)}
                        className={`min-w-0 rounded-2xl border p-4 text-left ${
                          billingCycle === cycle
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200"
                        }`}
                      >
                        <span className="block font-black capitalize text-slate-950">
                          {cycle}
                        </span>
                        <span className="mt-1 block break-words text-sm text-slate-500">
                          {money(
                            selectedPlan.pricing[cycle],
                            selectedPlan.pricing.currency,
                          )}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={working}
                    onClick={() => void savePlan()}
                    className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white disabled:opacity-60"
                  >
                    {working ? (
                      <LoaderCircle className="animate-spin" size={17} />
                    ) : (
                      <WalletCards size={17} />
                    )}
                    Confirm subscription
                  </button>
                </div>
              ) : null}

              {modal === "payment" && selectedInvoice ? (
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Amount due</p>
                    <p className="mt-1 text-2xl font-black text-slate-950">
                      {money(
                        selectedInvoice.amount_due,
                        selectedInvoice.currency,
                      )}
                    </p>
                  </div>

                  <label className="block">
                    <span className="text-sm font-black text-slate-700">
                      Payment method
                    </span>
                    <select
                      value={paymentMethod}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value as PaymentMethod)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
                    >
                      <option value="mobile_money">Mobile Money</option>
                      <option value="card">Card</option>
                      <option value="bank_transfer">Bank transfer</option>
                      <option value="manual">Manual payment</option>
                    </select>
                  </label>

                  {paymentMethod === "mobile_money" ? (
                    <label className="block">
                      <span className="text-sm font-black text-slate-700">
                        Mobile Money phone
                      </span>
                      <input
                        value={customerPhone}
                        onChange={(event) =>
                          setCustomerPhone(event.target.value)
                        }
                        placeholder="+250 788 000 000"
                        className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                      />
                    </label>
                  ) : null}

                  <label className="block">
                    <span className="text-sm font-black text-slate-700">
                      Email address
                    </span>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(event) => setCustomerEmail(event.target.value)}
                      placeholder="billing@business.com"
                      className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                    />
                  </label>

                  <button
                    type="button"
                    disabled={working}
                    onClick={() => void startPayment()}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white disabled:opacity-60"
                  >
                    {working ? (
                      <LoaderCircle className="animate-spin" size={17} />
                    ) : (
                      <CreditCard size={17} />
                    )}
                    Continue to payment
                  </button>
                </div>
              ) : null}

              {modal === "cancel" ? (
                <div className="mt-6 space-y-4">
                  <label className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
                    <input
                      type="checkbox"
                      checked={cancelImmediately}
                      onChange={(event) =>
                        setCancelImmediately(event.target.checked)
                      }
                      className="mt-1 size-4"
                    />
                    <span>
                      <span className="block font-black text-red-900">
                        Cancel immediately
                      </span>
                      <span className="mt-1 block text-sm leading-5 text-red-700">
                        Open invoices will be voided and plan access will end
                        immediately.
                      </span>
                    </span>
                  </label>

                  <label className="block">
                    <span className="text-sm font-black text-slate-700">
                      Cancellation reason
                    </span>
                    <textarea
                      value={cancelReason}
                      onChange={(event) => setCancelReason(event.target.value)}
                      maxLength={500}
                      rows={4}
                      placeholder="Optional reason"
                      className="mt-2 w-full resize-none rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-red-500"
                    />
                  </label>

                  <button
                    type="button"
                    disabled={working}
                    onClick={() => void cancelSubscription()}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-black text-white disabled:opacity-60"
                  >
                    {working ? (
                      <LoaderCircle className="animate-spin" size={17} />
                    ) : null}
                    {cancelImmediately
                      ? "Cancel immediately"
                      : "Cancel at period end"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

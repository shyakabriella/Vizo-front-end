"use client";

import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Crown,
  Loader2,
  Pencil,
  Plus,
  Power,
  Search,
  Trash2,
  WalletCards,
  X,
} from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";

import {
  createAdminPlan,
  deleteAdminPlan,
  getAdminPlanError,
  getAdminPlans,
  updateAdminPlan,
  updateAdminPlanStatus,
} from "@/services/admin-plan.service";
import type {
  AdminPlan,
  AdminPlanForm,
  PlanFeature,
  PlanLimitKey,
  PlanPagination,
  PlanStatusFilter,
} from "@/types/admin-plan";

const features: Array<{ value: PlanFeature; label: string }> = [
  { value: "profile", label: "Business profile" },
  { value: "schema", label: "Schema.org data" },
  { value: "llms", label: "llms.txt" },
  { value: "connect_script", label: "Website Connect" },
  {
    value: "installation_verification",
    label: "Installation verification",
  },
  { value: "basic_analytics", label: "Basic analytics" },
  { value: "advanced_analytics", label: "Advanced analytics" },
  { value: "priority_generation", label: "Priority generation" },
  { value: "priority_support", label: "Priority support" },
  { value: "custom_domain", label: "Custom domain" },
];

const limitFields: Array<{ value: PlanLimitKey; label: string }> = [
  { value: "businesses", label: "Businesses" },
  { value: "locations", label: "Locations" },
  { value: "offerings", label: "Offerings" },
  { value: "media_assets", label: "Media assets" },
  { value: "knowledge_entries", label: "Knowledge entries" },
  { value: "team_members", label: "Team members" },
];

const emptyForm: AdminPlanForm = {
  name: "",
  slug: "",
  description: "",
  monthly_price: "0",
  yearly_price: "0",
  currency: "USD",
  trial_days: 0,
  limits: {
    businesses: 1,
    locations: 1,
    offerings: 10,
    media_assets: 10,
    knowledge_entries: 10,
    team_members: 1,
  },
  features: ["profile"],
  is_active: true,
  is_featured: false,
  sort_order: 0,
};

const emptyPagination: PlanPagination = {
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0,
};

function makeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatMoney(value: string, currency: string): string {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return `${currency} 0`;
  }

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<AdminPlan[]>([]);
  const [pagination, setPagination] = useState<PlanPagination>(emptyPagination);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PlanStatusFilter>("all");

  const [form, setForm] = useState<AdminPlanForm>(emptyForm);
  const [editing, setEditing] = useState<AdminPlan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState<number | null>(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
    }, 400);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const loadPlans = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError("");

      try {
        const data = await getAdminPlans({
          search,
          status,
          page,
          per_page: 15,
        });

        setPlans(data.plans);
        setPagination(data.pagination);
      } catch (requestError) {
        setError(getAdminPlanError(requestError, "Unable to load plans."));
      } finally {
        setLoading(false);
      }
    },
    [search, status],
  );

  useEffect(() => {
    void loadPlans(1);
  }, [loadPlans]);

  function openCreateModal() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(plan: AdminPlan) {
    setEditing(plan);
    setForm({
      name: plan.name,
      slug: plan.slug,
      description: plan.description ?? "",
      monthly_price: plan.monthly_price,
      yearly_price: plan.yearly_price,
      currency: plan.currency,
      trial_days: plan.trial_days,
      limits: {
        businesses: plan.limits.businesses ?? null,
        locations: plan.limits.locations ?? null,
        offerings: plan.limits.offerings ?? null,
        media_assets: plan.limits.media_assets ?? null,
        knowledge_entries: plan.limits.knowledge_entries ?? null,
        team_members: plan.limits.team_members ?? null,
      },
      features: plan.features,
      is_active: plan.is_active,
      is_featured: plan.is_featured,
      sort_order: plan.sort_order,
    });
    setModalOpen(true);
  }

  function toggleFeature(feature: PlanFeature) {
    setForm((current) => ({
      ...current,
      features: current.features.includes(feature)
        ? current.features.filter((item) => item !== feature)
        : [...current.features, feature],
    }));
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = editing
        ? await updateAdminPlan(editing.id, form)
        : await createAdminPlan(form);

      setMessage(
        response.message ??
          (editing
            ? "Plan updated successfully."
            : "Plan created successfully."),
      );

      setModalOpen(false);
      setEditing(null);
      setForm(emptyForm);

      await loadPlans(editing ? pagination.current_page : 1);
    } catch (requestError) {
      setError(
        getAdminPlanError(
          requestError,
          editing ? "Unable to update plan." : "Unable to create plan.",
        ),
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(plan: AdminPlan) {
    if (
      !window.confirm(
        `${plan.is_active ? "Deactivate" : "Activate"} ${plan.name}?`,
      )
    ) {
      return;
    }

    setActionId(plan.id);
    setError("");
    setMessage("");

    try {
      const response = await updateAdminPlanStatus(plan);
      setMessage(response.message ?? "Plan status updated.");
      await loadPlans(pagination.current_page);
    } catch (requestError) {
      setError(getAdminPlanError(requestError));
    } finally {
      setActionId(null);
    }
  }

  async function removePlan(plan: AdminPlan) {
    if (!window.confirm(`Permanently delete ${plan.name}?`)) {
      return;
    }

    setActionId(plan.id);
    setError("");
    setMessage("");

    try {
      const response = await deleteAdminPlan(plan.id);
      setMessage(response.message);
      await loadPlans(pagination.current_page);
    } catch (requestError) {
      setError(getAdminPlanError(requestError));
    } finally {
      setActionId(null);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-[#10104b] px-5 py-7 text-white shadow-xl sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-200">
              Revenue management
            </p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
              Subscription plans
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
              Configure pricing, limits and visibility features for every Vizo
              subscription level.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-[#10104b]"
          >
            <Plus className="size-5" />
            Create plan
          </button>
        </div>
      </section>

      {message ? (
        <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="size-5" />
            {message}
          </span>
          <button type="button" onClick={() => setMessage("")}>
            <X className="size-4" />
          </button>
        </div>
      ) : null}

      {error ? (
        <div className="flex items-center justify-between rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-800">
          <span className="flex items-center gap-2">
            <CircleAlert className="size-5" />
            {error}
          </span>
          <button type="button" onClick={() => setError("")}>
            <X className="size-4" />
          </button>
        </div>
      ) : null}

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
          <div className="relative w-full lg:max-w-xl">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search plan name or slug"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex gap-2">
            {(["all", "active", "inactive"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatus(filter)}
                className={`rounded-xl px-4 py-2 text-sm font-bold capitalize ${
                  status === filter
                    ? "bg-[#10104b] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="grid min-h-72 place-items-center">
          <Loader2 className="size-9 animate-spin text-blue-600" />
        </div>
      ) : plans.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white py-20 text-center">
          <WalletCards className="mx-auto size-12 text-slate-300" />
          <h2 className="mt-4 text-xl font-black">No plans found</h2>
        </div>
      ) : (
        <section className="grid gap-5 xl:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm ${
                plan.is_featured
                  ? "border-blue-300 ring-4 ring-blue-50"
                  : "border-slate-200"
              }`}
            >
              {plan.is_featured ? (
                <span className="absolute right-0 top-0 inline-flex items-center gap-1 rounded-bl-2xl bg-blue-600 px-4 py-2 text-xs font-black text-white">
                  <Crown className="size-4" />
                  Featured
                </span>
              ) : null}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-950">
                    {plan.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">{plan.slug}</p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-black ${
                    plan.is_active
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {plan.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="mt-5 min-h-12 text-sm leading-6 text-slate-600">
                {plan.description || "No plan description."}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Monthly
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-900">
                    {formatMoney(plan.monthly_price, plan.currency)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Yearly
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-900">
                    {formatMoney(plan.yearly_price, plan.currency)}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {plan.features.slice(0, 5).map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
                  >
                    <Check className="size-3" />
                    {feature.replaceAll("_", " ")}
                  </span>
                ))}

                {plan.features.length > 5 ? (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    +{plan.features.length - 5} more
                  </span>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                <p className="text-sm font-semibold text-slate-500">
                  {plan.subscriptions_count ?? 0} subscriptions
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(plan)}
                    className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700"
                  >
                    <Pencil className="size-4" />
                  </button>

                  <button
                    type="button"
                    disabled={actionId === plan.id || plan.slug === "free"}
                    onClick={() => void toggleStatus(plan)}
                    className="grid size-10 place-items-center rounded-xl bg-amber-50 text-amber-700 disabled:opacity-30"
                  >
                    <Power className="size-4" />
                  </button>

                  <button
                    type="button"
                    disabled={
                      actionId === plan.id ||
                      plan.slug === "free" ||
                      (plan.subscriptions_count ?? 0) > 0
                    }
                    onClick={() => void removePlan(plan)}
                    className="grid size-10 place-items-center rounded-xl bg-rose-50 text-rose-700 disabled:opacity-30"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {!loading && pagination.total > 0 ? (
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-500">
            Page {pagination.current_page} of {pagination.last_page}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={pagination.current_page <= 1}
              onClick={() => void loadPlans(pagination.current_page - 1)}
              className="grid size-10 place-items-center rounded-xl border border-slate-200 disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              disabled={pagination.current_page >= pagination.last_page}
              onClick={() => void loadPlans(pagination.current_page + 1)}
              className="grid size-10 place-items-center rounded-xl border border-slate-200 disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      ) : null}

      {modalOpen ? (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center">
            <form
              onSubmit={submitForm}
              className="my-6 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-xl font-black">
                    {editing ? "Edit plan" : "Create plan"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Configure pricing, limits and available features.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="grid size-10 place-items-center rounded-xl bg-slate-100"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-2">
                <FormInput
                  label="Plan name"
                  value={form.name}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      name: value,
                      slug:
                        !editing || current.slug === makeSlug(current.name)
                          ? makeSlug(value)
                          : current.slug,
                    }))
                  }
                />

                <FormInput
                  label="Slug"
                  value={form.slug}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      slug: makeSlug(value),
                    }))
                  }
                />

                <FormInput
                  label="Monthly price"
                  type="number"
                  value={form.monthly_price}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      monthly_price: value,
                    }))
                  }
                />

                <FormInput
                  label="Yearly price"
                  type="number"
                  value={form.yearly_price}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      yearly_price: value,
                    }))
                  }
                />

                <FormInput
                  label="Currency"
                  value={form.currency}
                  maxLength={3}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      currency: value.toUpperCase(),
                    }))
                  }
                />

                <FormInput
                  label="Trial days"
                  type="number"
                  value={String(form.trial_days)}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      trial_days: Number(value),
                    }))
                  }
                />

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-bold text-slate-700">
                    Description
                  </span>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </label>

                <div className="sm:col-span-2">
                  <h3 className="font-black text-slate-900">Usage limits</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Leave a limit empty for unlimited access.
                  </p>

                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {limitFields.map((limit) => (
                      <FormInput
                        key={limit.value}
                        label={limit.label}
                        type="number"
                        required={false}
                        value={
                          form.limits[limit.value] === null
                            ? ""
                            : String(form.limits[limit.value])
                        }
                        onChange={(value) =>
                          setForm((current) => ({
                            ...current,
                            limits: {
                              ...current.limits,
                              [limit.value]:
                                value === "" ? null : Number(value),
                            },
                          }))
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <h3 className="font-black text-slate-900">Plan features</h3>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                      const selected = form.features.includes(feature.value);

                      return (
                        <button
                          key={feature.value}
                          type="button"
                          onClick={() => toggleFeature(feature.value)}
                          className={`flex items-center gap-3 rounded-xl border p-3 text-left text-sm font-bold ${
                            selected
                              ? "border-blue-300 bg-blue-50 text-blue-700"
                              : "border-slate-200 text-slate-600"
                          }`}
                        >
                          <span
                            className={`grid size-5 place-items-center rounded ${
                              selected
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100"
                            }`}
                          >
                            {selected ? <Check className="size-3" /> : null}
                          </span>
                          {feature.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <FormInput
                  label="Sort order"
                  type="number"
                  value={String(form.sort_order)}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      sort_order: Number(value),
                    }))
                  }
                />

                <div className="flex flex-col justify-end gap-3">
                  <Checkbox
                    label="Active plan"
                    checked={form.is_active}
                    onChange={(checked) =>
                      setForm((current) => ({
                        ...current,
                        is_active: checked,
                      }))
                    }
                  />

                  <Checkbox
                    label="Featured plan"
                    checked={form.is_featured}
                    onChange={(checked) =>
                      setForm((current) => ({
                        ...current,
                        is_featured: checked,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="h-11 rounded-xl border border-slate-300 px-5 text-sm font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-black text-white disabled:opacity-50"
                >
                  {saving ? <Loader2 className="size-4 animate-spin" /> : null}
                  {editing ? "Save changes" : "Create plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  type = "text",
  maxLength,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  maxLength?: number;
  required?: boolean;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input
        required={required}
        min={type === "number" ? 0 : undefined}
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-blue-600"
      />
      {label}
    </label>
  );
}

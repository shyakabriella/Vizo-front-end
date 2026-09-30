"use client";

import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Loader2,
  Pencil,
  Plus,
  Power,
  Search,
  Tags,
  Trash2,
  X,
} from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";

import {
  createAdminBusinessType,
  deleteAdminBusinessType,
  getAdminBusinessTypes,
  getBusinessTypeError,
  updateAdminBusinessType,
  updateAdminBusinessTypeStatus,
} from "@/services/admin-business-type.service";
import type {
  AdminBusinessType,
  AdminBusinessTypeForm,
  BusinessTypePagination,
  BusinessTypeStatusFilter,
} from "@/types/admin-business-type";

const emptyForm: AdminBusinessTypeForm = {
  name: "",
  slug: "",
  schema_type: "LocalBusiness",
  icon: "",
  description: "",
  is_active: true,
  sort_order: 0,
};

const emptyPagination: BusinessTypePagination = {
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

export default function AdminBusinessTypesPage() {
  const [businessTypes, setBusinessTypes] = useState<AdminBusinessType[]>([]);
  const [pagination, setPagination] =
    useState<BusinessTypePagination>(emptyPagination);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<BusinessTypeStatusFilter>("all");

  const [form, setForm] = useState<AdminBusinessTypeForm>(emptyForm);
  const [editing, setEditing] = useState<AdminBusinessType | null>(null);
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

  const loadBusinessTypes = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError("");

      try {
        const data = await getAdminBusinessTypes({
          search,
          status,
          page,
          per_page: 15,
        });

        setBusinessTypes(data.business_types);
        setPagination(data.pagination);
      } catch (requestError) {
        setError(
          getBusinessTypeError(requestError, "Unable to load business types."),
        );
      } finally {
        setLoading(false);
      }
    },
    [search, status],
  );

  useEffect(() => {
    void loadBusinessTypes(1);
  }, [loadBusinessTypes]);

  function openCreateModal() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
    setError("");
  }

  function openEditModal(businessType: AdminBusinessType) {
    setEditing(businessType);
    setForm({
      name: businessType.name,
      slug: businessType.slug,
      schema_type: businessType.schema_type,
      icon: businessType.icon ?? "",
      description: businessType.description ?? "",
      is_active: businessType.is_active,
      sort_order: businessType.sort_order,
    });
    setModalOpen(true);
    setError("");
  }

  function closeModal() {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm);
  }

  function updateField<K extends keyof AdminBusinessTypeForm>(
    field: K,
    value: AdminBusinessTypeForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateName(name: string) {
    setForm((current) => ({
      ...current,
      name,
      slug:
        !editing || current.slug === makeSlug(current.name)
          ? makeSlug(name)
          : current.slug,
    }));
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = editing
        ? await updateAdminBusinessType(editing.id, form)
        : await createAdminBusinessType(form);

      setMessage(
        response.message ??
          (editing
            ? "Business type updated successfully."
            : "Business type created successfully."),
      );

      setModalOpen(false);
      setEditing(null);
      setForm(emptyForm);

      await loadBusinessTypes(editing ? pagination.current_page : 1);
    } catch (requestError) {
      setError(
        getBusinessTypeError(
          requestError,
          editing
            ? "Unable to update the business type."
            : "Unable to create the business type.",
        ),
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(businessType: AdminBusinessType) {
    const action = businessType.is_active ? "deactivate" : "activate";

    if (
      !window.confirm(
        `Are you sure you want to ${action} ${businessType.name}?`,
      )
    ) {
      return;
    }

    setActionId(businessType.id);
    setError("");
    setMessage("");

    try {
      const response = await updateAdminBusinessTypeStatus(businessType);

      setMessage(response.message ?? `Business type ${action}d successfully.`);

      await loadBusinessTypes(pagination.current_page);
    } catch (requestError) {
      setError(
        getBusinessTypeError(
          requestError,
          `Unable to ${action} the business type.`,
        ),
      );
    } finally {
      setActionId(null);
    }
  }

  async function removeBusinessType(businessType: AdminBusinessType) {
    if (
      !window.confirm(
        `Permanently delete ${businessType.name}? This action cannot be undone.`,
      )
    ) {
      return;
    }

    setActionId(businessType.id);
    setError("");
    setMessage("");

    try {
      const response = await deleteAdminBusinessType(businessType.id);

      setMessage(response.message);
      await loadBusinessTypes(pagination.current_page);
    } catch (requestError) {
      setError(
        getBusinessTypeError(
          requestError,
          "Unable to delete the business type.",
        ),
      );
    } finally {
      setActionId(null);
    }
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-[#10104b] px-5 py-7 text-white shadow-xl sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-200">
              Platform configuration
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Business types
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Control the business categories available during registration and
              connect every type to the correct Schema.org definition.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3">
              <Tags className="size-5 text-blue-200" />

              <div>
                <p className="text-xs font-bold uppercase text-white/50">
                  Total types
                </p>
                <p className="text-xl font-black">{pagination.total}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-[#10104b] transition hover:bg-blue-50"
            >
              <Plus className="size-5" />
              Add business type
            </button>
          </div>
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

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xl">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search name, slug or Schema.org type"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(["all", "active", "inactive"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatus(filter)}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold capitalize transition ${
                  status === filter
                    ? "bg-[#10104b] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="grid min-h-72 place-items-center">
            <div className="text-center">
              <Loader2 className="mx-auto size-8 animate-spin text-blue-600" />
              <p className="mt-3 text-sm font-semibold text-slate-500">
                Loading business types...
              </p>
            </div>
          </div>
        ) : businessTypes.length === 0 ? (
          <div className="grid min-h-72 place-items-center px-5 text-center">
            <div>
              <Tags className="mx-auto size-12 text-slate-300" />
              <h2 className="mt-4 text-xl font-black text-slate-900">
                No business types found
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Create a business type or change the filters.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full">
                <thead className="bg-slate-50 text-left">
                  <tr className="text-xs font-black uppercase tracking-wide text-slate-500">
                    <th className="px-6 py-4">Business type</th>
                    <th className="px-6 py-4">Schema type</th>
                    <th className="px-6 py-4">Businesses</th>
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {businessTypes.map((businessType) => (
                    <tr
                      key={businessType.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <span className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                            <Building2 className="size-5" />
                          </span>

                          <div>
                            <p className="font-black text-slate-900">
                              {businessType.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {businessType.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm font-semibold text-slate-600">
                        {businessType.schema_type}
                      </td>

                      <td className="px-6 py-5 text-sm font-bold text-slate-700">
                        {businessType.businesses_count ?? 0}
                      </td>

                      <td className="px-6 py-5 text-sm font-bold text-slate-700">
                        {businessType.sort_order}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${
                            businessType.is_active
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {businessType.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(businessType)}
                            className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100"
                            aria-label={`Edit ${businessType.name}`}
                          >
                            <Pencil className="size-4" />
                          </button>

                          <button
                            type="button"
                            disabled={actionId === businessType.id}
                            onClick={() => void toggleStatus(businessType)}
                            className={`grid size-10 place-items-center rounded-xl disabled:opacity-50 ${
                              businessType.is_active
                                ? "bg-amber-50 text-amber-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                            aria-label="Change status"
                          >
                            {actionId === businessType.id ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <Power className="size-4" />
                            )}
                          </button>

                          <button
                            type="button"
                            disabled={
                              actionId === businessType.id ||
                              (businessType.businesses_count ?? 0) > 0
                            }
                            onClick={() =>
                              void removeBusinessType(businessType)
                            }
                            className="grid size-10 place-items-center rounded-xl bg-rose-50 text-rose-700 disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label={`Delete ${businessType.name}`}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-100 lg:hidden">
              {businessTypes.map((businessType) => (
                <article key={businessType.id} className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                      <Building2 className="size-5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap justify-between gap-2">
                        <h2 className="font-black text-slate-900">
                          {businessType.name}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${
                            businessType.is_active
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {businessType.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        {businessType.slug}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-400">
                        Schema
                      </p>
                      <p className="mt-1 font-semibold text-slate-700">
                        {businessType.schema_type}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase text-slate-400">
                        Businesses
                      </p>
                      <p className="mt-1 font-semibold text-slate-700">
                        {businessType.businesses_count ?? 0}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(businessType)}
                      className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 text-sm font-bold text-blue-700"
                    >
                      <Pencil className="size-4" />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => void toggleStatus(businessType)}
                      className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 text-sm font-bold text-slate-700"
                    >
                      <Power className="size-4" />
                      {businessType.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {!loading && pagination.total > 0 ? (
          <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Page {pagination.current_page} of {pagination.last_page} ·{" "}
              {pagination.total} types
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={pagination.current_page <= 1}
                onClick={() =>
                  void loadBusinessTypes(pagination.current_page - 1)
                }
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold disabled:opacity-40"
              >
                <ChevronLeft className="size-4" />
                Previous
              </button>

              <button
                type="button"
                disabled={pagination.current_page >= pagination.last_page}
                onClick={() =>
                  void loadBusinessTypes(pagination.current_page + 1)
                }
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold disabled:opacity-40"
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        ) : null}
      </section>

      {modalOpen ? (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center">
            <form
              onSubmit={submitForm}
              className="my-6 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-7">
                <div>
                  <h2 className="text-xl font-black text-slate-950">
                    {editing ? "Edit business type" : "Add business type"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Configure registration and structured-data classification.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-600"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
                <label className="space-y-2">
                  <span className="text-sm font-bold text-slate-700">Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => updateName(event.target.value)}
                    placeholder="Hotels"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-slate-700">Slug</span>
                  <input
                    required
                    value={form.slug}
                    onChange={(event) =>
                      updateField("slug", makeSlug(event.target.value))
                    }
                    placeholder="hotels"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-slate-700">
                    Schema.org type
                  </span>
                  <input
                    required
                    value={form.schema_type}
                    onChange={(event) =>
                      updateField("schema_type", event.target.value)
                    }
                    placeholder="Hotel"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-slate-700">
                    Icon name
                  </span>
                  <input
                    value={form.icon}
                    onChange={(event) =>
                      updateField("icon", event.target.value)
                    }
                    placeholder="hotel"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-slate-700">
                    Sort order
                  </span>
                  <input
                    required
                    min={0}
                    type="number"
                    value={form.sort_order}
                    onChange={(event) =>
                      updateField("sort_order", Number(event.target.value))
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(event) =>
                      updateField("is_active", event.target.checked)
                    }
                    className="size-4 accent-blue-600"
                  />
                  <span className="text-sm font-bold text-slate-700">
                    Active and available
                  </span>
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-bold text-slate-700">
                    Description
                  </span>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(event) =>
                      updateField("description", event.target.value)
                    }
                    placeholder="Describe businesses included in this type."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4 sm:px-7">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-11 rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-black text-white disabled:opacity-60"
                >
                  {saving ? <Loader2 className="size-4 animate-spin" /> : null}
                  {editing ? "Save changes" : "Create type"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

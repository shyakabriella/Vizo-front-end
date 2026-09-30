"use client";

import {
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FolderPlus,
  LoaderCircle,
  Pencil,
  Plus,
  Search,
  Send,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { OfferingCategoryModal } from "@/components/business-workspace/offering-category-modal";
import { OfferingFormModal } from "@/components/business-workspace/offering-form-modal";
import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import {
  createOffering,
  createOfferingCategory,
  deleteOffering,
  deleteOfferingCategory,
  getOfferingCategories,
  getOfferingError,
  getOfferingFieldErrors,
  getOfferings,
  updateOffering,
  updateOfferingCategory,
  updateOfferingStatus,
} from "@/services/offering.service";
import type {
  Offering,
  OfferingCategory,
  OfferingCategoryForm,
  OfferingForm,
} from "@/types/offering";

function formatPrice(offering: Offering): string {
  const number = (value?: string | null) =>
    new Intl.NumberFormat("en-RW").format(Number(value ?? 0));

  if (offering.pricing_type === "free") {
    return "Free";
  }

  if (offering.pricing_type === "contact") {
    return "Contact for price";
  }

  if (offering.pricing_type === "from") {
    return `From ${number(offering.price_min)} ${offering.currency}`;
  }

  if (offering.pricing_type === "range") {
    return `${number(offering.price_min)}–${number(offering.price_max)} ${offering.currency}`;
  }

  return `${number(offering.price)} ${offering.currency}`;
}

export default function ServicesPage() {
  const { selectedBusiness } = useBusinessWorkspace();

  const [categories, setCategories] = useState<OfferingCategory[]>([]);
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [categoryModal, setCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<OfferingCategory | null>(null);

  const [offeringModal, setOfferingModal] = useState(false);
  const [editingOffering, setEditingOffering] = useState<Offering | null>(null);

  const loadData = useCallback(async () => {
    if (!selectedBusiness) {
      setCategories([]);
      setOfferings([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const [categoryResults, offeringResults] = await Promise.all([
        getOfferingCategories(selectedBusiness.public_id),
        getOfferings(selectedBusiness.public_id),
      ]);

      setCategories(categoryResults);
      setOfferings(offeringResults);
    } catch (requestError) {
      setError(getOfferingError(requestError, "Unable to load services."));
    } finally {
      setLoading(false);
    }
  }, [selectedBusiness]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const visibleOfferings = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return offerings.filter((offering) => {
      const matchesSearch =
        normalized === "" ||
        offering.name.toLowerCase().includes(normalized) ||
        offering.short_description?.toLowerCase().includes(normalized);

      const matchesCategory =
        categoryFilter === "" ||
        offering.category?.public_id === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [offerings, search, categoryFilter]);

  async function saveCategory(form: OfferingCategoryForm) {
    if (!selectedBusiness) return;

    try {
      setSaving(true);
      setError("");
      setFieldErrors({});

      const response = editingCategory
        ? await updateOfferingCategory(
            selectedBusiness.public_id,
            editingCategory.public_id,
            form,
          )
        : await createOfferingCategory(selectedBusiness.public_id, form);

      setMessage(response.message ?? "Category saved successfully.");
      setCategoryModal(false);
      setEditingCategory(null);
      await loadData();
    } catch (requestError) {
      setFieldErrors(getOfferingFieldErrors(requestError));
      setError(getOfferingError(requestError));
    } finally {
      setSaving(false);
    }
  }

  async function saveService(form: OfferingForm) {
    if (!selectedBusiness) return;

    try {
      setSaving(true);
      setError("");
      setFieldErrors({});

      const response = editingOffering
        ? await updateOffering(
            selectedBusiness.public_id,
            editingOffering.public_id,
            form,
          )
        : await createOffering(selectedBusiness.public_id, form);

      setMessage(response.message ?? "Service saved successfully.");
      setOfferingModal(false);
      setEditingOffering(null);
      await loadData();
    } catch (requestError) {
      setFieldErrors(getOfferingFieldErrors(requestError));
      setError(getOfferingError(requestError));
    } finally {
      setSaving(false);
    }
  }

  async function publish(offering: Offering) {
    if (!selectedBusiness) return;

    try {
      setError("");
      const response = await updateOfferingStatus(
        selectedBusiness.public_id,
        offering.public_id,
        offering.status === "published" ? "draft" : "published",
      );

      setMessage(response.message ?? "Service status updated.");
      await loadData();
    } catch (requestError) {
      setError(getOfferingError(requestError));
    }
  }

  async function removeService(offering: Offering) {
    if (!selectedBusiness || !window.confirm(`Delete "${offering.name}"?`)) {
      return;
    }

    try {
      const response = await deleteOffering(
        selectedBusiness.public_id,
        offering.public_id,
      );
      setMessage(response.message);
      await loadData();
    } catch (requestError) {
      setError(getOfferingError(requestError));
    }
  }

  async function removeCategory(category: OfferingCategory) {
    if (
      !selectedBusiness ||
      !window.confirm(
        `Delete category "${category.name}"? Services in it will become uncategorized.`,
      )
    ) {
      return;
    }

    try {
      const response = await deleteOfferingCategory(
        selectedBusiness.public_id,
        category.public_id,
      );
      setMessage(response.message);
      await loadData();
    } catch (requestError) {
      setError(getOfferingError(requestError));
    }
  }

  if (!selectedBusiness) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
        Create or select a business first.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Services and prices
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">
            {selectedBusiness.name} services
          </h1>
          <p className="mt-2 text-slate-500">
            Add clear services, durations and prices for customers and AI
            search.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setEditingCategory(null);
              setFieldErrors({});
              setCategoryModal(true);
            }}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black"
          >
            <FolderPlus size={17} />
            Add category
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingOffering(null);
              setFieldErrors({});
              setOfferingModal(true);
            }}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white"
          >
            <Plus size={17} />
            Add service
          </button>
        </div>
      </div>

      {message ? (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
          <CheckCircle2 size={18} />
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
          {error}
        </div>
      ) : null}

      <section className="mt-8">
        <h2 className="text-lg font-black text-slate-950">Categories</h2>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <div
              key={category.public_id}
              className="min-w-52 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="flex justify-between gap-3">
                <div>
                  <p className="font-black text-slate-900">{category.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {category.offerings_count} services
                  </p>
                </div>

                <span
                  className={`size-2 rounded-full ${
                    category.is_active ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                />
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCategory(category);
                    setFieldErrors({});
                    setCategoryModal(true);
                  }}
                  className="grid size-9 place-items-center rounded-lg bg-slate-100 text-slate-600"
                >
                  <Pencil size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => void removeCategory(category)}
                  className="grid size-9 place-items-center rounded-lg bg-red-50 text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}

          {categories.length === 0 ? (
            <button
              type="button"
              onClick={() => setCategoryModal(true)}
              className="min-w-64 rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-left text-sm font-bold text-blue-600"
            >
              <Plus className="mb-3" size={20} />
              Create your first category
            </button>
          ) : null}
        </div>
      </section>

      <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="grid gap-4 sm:grid-cols-[1fr_240px]">
          <label className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              value={search}
              placeholder="Search services..."
              onChange={(event) => setSearch(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 outline-none focus:border-blue-500"
            />
          </label>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 px-4"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.public_id} value={category.public_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="grid min-h-72 place-items-center">
            <LoaderCircle className="animate-spin text-blue-600" size={32} />
          </div>
        ) : visibleOfferings.length === 0 ? (
          <div className="py-16 text-center">
            <CircleDollarSign className="mx-auto text-blue-600" size={38} />
            <h2 className="mt-4 text-xl font-black">No services found</h2>
            <p className="mt-2 text-slate-500">
              Add the first service and its price.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {visibleOfferings.map((offering) => (
              <article
                key={offering.public_id}
                className="flex gap-4 rounded-2xl border border-slate-200 p-4"
              >
                {offering.image_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={offering.image_url}
                    alt={offering.name}
                    className="size-24 shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <div className="grid size-24 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <CircleDollarSign size={26} />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-black text-slate-950">
                      {offering.name}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-black uppercase ${
                        offering.status === "published"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {offering.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-black text-blue-600">
                    {formatPrice(offering)}
                  </p>

                  {offering.duration_minutes ? (
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <Clock3 size={13} />
                      {offering.duration_minutes} minutes
                    </p>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingOffering(offering);
                        setFieldErrors({});
                        setOfferingModal(true);
                      }}
                      className="grid size-9 place-items-center rounded-lg bg-slate-100"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => void publish(offering)}
                      className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-50 px-3 text-xs font-black text-blue-700"
                    >
                      <Send size={14} />
                      {offering.status === "published"
                        ? "Unpublish"
                        : "Publish"}
                    </button>

                    <button
                      type="button"
                      onClick={() => void removeService(offering)}
                      className="ml-auto grid size-9 place-items-center rounded-lg bg-red-50 text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {categoryModal ? (
        <OfferingCategoryModal
          key={editingCategory?.public_id ?? "new-category"}
          category={editingCategory}
          saving={saving}
          errors={fieldErrors}
          onClose={() => {
            setCategoryModal(false);
            setEditingCategory(null);
          }}
          onSave={saveCategory}
        />
      ) : null}

      {offeringModal ? (
        <OfferingFormModal
          key={editingOffering?.public_id ?? "new-offering"}
          offering={editingOffering}
          categories={categories}
          currency={selectedBusiness.currency}
          saving={saving}
          errors={fieldErrors}
          onClose={() => {
            setOfferingModal(false);
            setEditingOffering(null);
          }}
          onSave={saveService}
        />
      ) : null}
    </div>
  );
}

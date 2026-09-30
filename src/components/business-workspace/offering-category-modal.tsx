"use client";

import { LoaderCircle, Save, X } from "lucide-react";
import { type FormEvent, useState } from "react";

import type { OfferingCategory, OfferingCategoryForm } from "@/types/offering";

interface Props {
  category: OfferingCategory | null;
  saving: boolean;
  errors: Record<string, string>;
  onClose: () => void;
  onSave: (form: OfferingCategoryForm) => Promise<void>;
}

export function OfferingCategoryModal({
  category,
  saving,
  errors,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<OfferingCategoryForm>({
    name: category?.name ?? "",
    description: category?.description ?? "",
    sort_order: String(category?.sort_order ?? 0),
    is_active: category?.is_active ?? true,
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onSave(form);
  }

  return (
    <div className="fixed inset-0 z-[110] grid place-items-center overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
              Service category
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-950">
              {category ? "Edit category" : "Create category"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-xl bg-slate-100"
          >
            <X size={18} />
          </button>
        </header>

        <div className="space-y-5 p-6">
          <label className="block">
            <span className="text-sm font-bold text-slate-800">
              Category name
            </span>
            <input
              required
              value={form.name}
              placeholder="Hair services"
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            {errors.name ? (
              <span className="mt-1 block text-xs font-semibold text-red-600">
                {errors.name}
              </span>
            ) : null}
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-800">
              Description
            </span>
            <textarea
              rows={4}
              value={form.description}
              placeholder="Describe this group of services."
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="text-sm font-bold text-slate-800">
                Sort order
              </span>
              <input
                type="number"
                min="0"
                value={form.sort_order}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    sort_order: event.target.value,
                  }))
                }
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
              />
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    is_active: event.target.checked,
                  }))
                }
                className="size-4 accent-blue-600"
              />
              <span className="text-sm font-bold text-slate-700">
                Active category
              </span>
            </label>
          </div>
        </div>

        <footer className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 p-4">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl border border-slate-300 px-5 text-sm font-black"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white disabled:opacity-60"
          >
            {saving ? (
              <LoaderCircle className="animate-spin" size={17} />
            ) : (
              <Save size={17} />
            )}
            Save category
          </button>
        </footer>
      </form>
    </div>
  );
}

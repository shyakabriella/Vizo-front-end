"use client";

import { LoaderCircle, Save, X } from "lucide-react";
import { type FormEvent, useState } from "react";

import type {
  KnowledgeEntry,
  KnowledgeForm,
  KnowledgeType,
} from "@/types/knowledge";

interface Props {
  entry: KnowledgeEntry | null;
  saving: boolean;
  errors: Record<string, string>;
  onClose: () => void;
  onSave: (form: KnowledgeForm) => Promise<void>;
}

function makeForm(entry: KnowledgeEntry | null): KnowledgeForm {
  return {
    type: entry?.type ?? "faq",
    category: entry?.category ?? "",
    title: entry?.title ?? "",
    question: entry?.question ?? "",
    content: entry?.content ?? "",
    language: entry?.language ?? "en",
    source_url: entry?.source_url ?? "",
    is_featured: entry?.is_featured ?? false,
    sort_order: String(entry?.sort_order ?? 0),
    valid_from: entry?.valid_from ?? "",
    valid_until: entry?.valid_until ?? "",
  };
}

export function KnowledgeFormModal({
  entry,
  saving,
  errors,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<KnowledgeForm>(() => makeForm(entry));

  function update(field: keyof KnowledgeForm, value: string | boolean) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onSave(form);
  }

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center">
        <form
          onSubmit={submit}
          className="my-6 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                Business knowledge
              </p>
              <h2 className="mt-1 text-xl font-black text-slate-950">
                {entry ? "Edit knowledge entry" : "Add knowledge entry"}
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

          <div className="max-h-[72vh] space-y-5 overflow-y-auto p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <label>
                <span className="text-sm font-bold">Knowledge type</span>
                <select
                  value={form.type}
                  onChange={(event) =>
                    update("type", event.target.value as KnowledgeType)
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
                >
                  <option value="faq">Frequently asked question</option>
                  <option value="fact">Business fact</option>
                  <option value="policy">Policy</option>
                  <option value="instruction">Customer instruction</option>
                  <option value="announcement">Announcement</option>
                </select>
              </label>

              <label>
                <span className="text-sm font-bold">Category</span>
                <input
                  list="knowledge-categories"
                  value={form.category}
                  placeholder="Payment, parking, delivery..."
                  onChange={(event) => update("category", event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
                />
                <datalist id="knowledge-categories">
                  <option value="payment" />
                  <option value="parking" />
                  <option value="delivery" />
                  <option value="booking" />
                  <option value="accessibility" />
                  <option value="cancellation" />
                  <option value="facilities" />
                  <option value="general" />
                </datalist>
              </label>
            </div>

            {form.type === "faq" ? (
              <label className="block">
                <span className="text-sm font-bold">Question</span>
                <textarea
                  required
                  rows={3}
                  maxLength={2000}
                  value={form.question}
                  placeholder="Do you accept mobile money?"
                  onChange={(event) => update("question", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                />
                {errors.question ? (
                  <span className="mt-1 block text-xs text-red-600">
                    {errors.question}
                  </span>
                ) : null}
              </label>
            ) : (
              <label className="block">
                <span className="text-sm font-bold">Title</span>
                <input
                  required
                  maxLength={255}
                  value={form.title}
                  placeholder="Cancellation policy"
                  onChange={(event) => update("title", event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
                />
                {errors.title ? (
                  <span className="mt-1 block text-xs text-red-600">
                    {errors.title}
                  </span>
                ) : null}
              </label>
            )}

            <label className="block">
              <span className="text-sm font-bold">
                {form.type === "faq" ? "Answer" : "Content"}
              </span>
              <textarea
                required
                rows={7}
                maxLength={50000}
                value={form.content}
                placeholder="Provide clear and accurate information."
                onChange={(event) => update("content", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
              />
              {errors.content ? (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.content}
                </span>
              ) : null}
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label>
                <span className="text-sm font-bold">Language</span>
                <select
                  value={form.language}
                  onChange={(event) => update("language", event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
                >
                  <option value="en">English</option>
                  <option value="rw">Kinyarwanda</option>
                  <option value="fr">French</option>
                  <option value="sw">Swahili</option>
                </select>
              </label>

              <label>
                <span className="text-sm font-bold">Sort order</span>
                <input
                  type="number"
                  min="0"
                  value={form.sort_order}
                  onChange={(event) => update("sort_order", event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label>
                <span className="text-sm font-bold">Valid from</span>
                <input
                  type="date"
                  value={form.valid_from}
                  onChange={(event) => update("valid_from", event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
                />
              </label>

              <label>
                <span className="text-sm font-bold">Valid until</span>
                <input
                  type="date"
                  min={form.valid_from || undefined}
                  value={form.valid_until}
                  onChange={(event) =>
                    update("valid_until", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-bold">Source URL</span>
              <input
                type="url"
                value={form.source_url}
                placeholder="https://..."
                onChange={(event) => update("source_url", event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
              />
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(event) =>
                  update("is_featured", event.target.checked)
                }
                className="size-4 accent-blue-600"
              />
              <span>
                <span className="block text-sm font-black">
                  Featured information
                </span>
                <span className="text-xs text-slate-500">
                  Give this entry higher priority in public information.
                </span>
              </span>
            </label>
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
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-black text-white disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle className="animate-spin" size={17} />
              ) : (
                <Save size={17} />
              )}
              Save entry
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

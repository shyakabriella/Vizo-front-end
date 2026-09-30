"use client";

import {
  Archive,
  BookOpenText,
  CircleHelp,
  FileCheck2,
  Lightbulb,
  LoaderCircle,
  Megaphone,
  Pencil,
  Plus,
  Search,
  Send,
  Star,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { KnowledgeFormModal } from "@/components/business-workspace/knowledge-form-modal";
import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import {
  createKnowledgeEntry,
  deleteKnowledgeEntry,
  getKnowledgeEntries,
  getKnowledgeError,
  getKnowledgeFieldErrors,
  updateKnowledgeEntry,
  updateKnowledgeStatus,
} from "@/services/knowledge.service";
import type {
  KnowledgeEntry,
  KnowledgeForm,
  KnowledgeStatus,
  KnowledgeType,
} from "@/types/knowledge";

const typeLabels: Record<KnowledgeType, string> = {
  faq: "FAQ",
  fact: "Fact",
  policy: "Policy",
  instruction: "Instruction",
  announcement: "Announcement",
};

function TypeIcon({ type }: { type: KnowledgeType }) {
  if (type === "faq") return <CircleHelp size={19} />;
  if (type === "fact") return <Lightbulb size={19} />;
  if (type === "policy") return <FileCheck2 size={19} />;
  if (type === "announcement") return <Megaphone size={19} />;

  return <BookOpenText size={19} />;
}

export default function KnowledgePage() {
  const { selectedBusiness } = useBusinessWorkspace();

  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"all" | KnowledgeType>("all");
  const [status, setStatus] = useState<"all" | KnowledgeStatus>("all");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<KnowledgeEntry | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const loadEntries = useCallback(async () => {
    if (!selectedBusiness) {
      setEntries([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await getKnowledgeEntries(selectedBusiness.public_id, {
        search,
        type,
        status,
      });

      setEntries(result);
    } catch (requestError) {
      setError(
        getKnowledgeError(requestError, "Unable to load business knowledge."),
      );
    } finally {
      setLoading(false);
    }
  }, [selectedBusiness, search, type, status]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadEntries();
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [loadEntries]);

  function openCreate() {
    setEditing(null);
    setFieldErrors({});
    setModalOpen(true);
  }

  function openEdit(entry: KnowledgeEntry) {
    setEditing(entry);
    setFieldErrors({});
    setModalOpen(true);
  }

  async function saveEntry(form: KnowledgeForm) {
    if (!selectedBusiness) return;

    try {
      setSaving(true);
      setError("");
      setFieldErrors({});

      const response = editing
        ? await updateKnowledgeEntry(
            selectedBusiness.public_id,
            editing.public_id,
            form,
          )
        : await createKnowledgeEntry(selectedBusiness.public_id, form);

      setMessage(response.message ?? "Knowledge entry saved successfully.");
      setModalOpen(false);
      setEditing(null);
      await loadEntries();
    } catch (requestError) {
      setFieldErrors(getKnowledgeFieldErrors(requestError));
      setError(getKnowledgeError(requestError));
    } finally {
      setSaving(false);
    }
  }

  async function changeStatus(
    entry: KnowledgeEntry,
    nextStatus: KnowledgeStatus,
  ) {
    if (!selectedBusiness) return;

    try {
      setError("");

      const response = await updateKnowledgeStatus(
        selectedBusiness.public_id,
        entry.public_id,
        nextStatus,
      );

      setMessage(response.message ?? "Knowledge status updated successfully.");
      await loadEntries();
    } catch (requestError) {
      setError(getKnowledgeError(requestError));
    }
  }

  async function removeEntry(entry: KnowledgeEntry) {
    const label = entry.question || entry.title || "this entry";

    if (!selectedBusiness || !window.confirm(`Delete "${label}"?`)) {
      return;
    }

    try {
      const response = await deleteKnowledgeEntry(
        selectedBusiness.public_id,
        entry.public_id,
      );

      setMessage(response.message);
      await loadEntries();
    } catch (requestError) {
      setError(getKnowledgeError(requestError));
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
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Business knowledge
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">
            {selectedBusiness.name} knowledge
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Add accurate answers, policies, facts and instructions that
            customers, search engines and AI systems can understand.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white"
        >
          <Plus size={18} />
          Add knowledge
        </button>
      </div>

      {message ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-800">
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
          {error}
        </div>
      ) : null}

      <section className="rounded-3xl border border-slate-200 bg-white p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
          <label className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              value={search}
              placeholder="Search questions, policies and facts..."
              onChange={(event) => setSearch(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4"
            />
          </label>

          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value as "all" | KnowledgeType)
            }
            className="h-11 rounded-xl border border-slate-200 px-4"
          >
            <option value="all">All types</option>
            <option value="faq">FAQs</option>
            <option value="fact">Facts</option>
            <option value="policy">Policies</option>
            <option value="instruction">Instructions</option>
            <option value="announcement">Announcements</option>
          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as "all" | KnowledgeStatus)
            }
            className="h-11 rounded-xl border border-slate-200 px-4"
          >
            <option value="all">All statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </section>

      {loading ? (
        <div className="grid min-h-72 place-items-center rounded-3xl border border-slate-200 bg-white">
          <LoaderCircle className="animate-spin text-blue-600" size={34} />
        </div>
      ) : entries.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <BookOpenText className="mx-auto text-slate-300" size={52} />
          <h2 className="mt-4 text-xl font-black">
            No knowledge entries found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Add an FAQ, policy, fact or customer instruction.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {entries.map((entry) => (
            <article
              key={entry.public_id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                  <TypeIcon type={entry.type} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                      {typeLabels[entry.type]}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        entry.status === "published"
                          ? "bg-emerald-50 text-emerald-700"
                          : entry.status === "archived"
                            ? "bg-slate-200 text-slate-700"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {entry.status}
                    </span>

                    {entry.is_featured ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-3 py-1 text-xs font-black text-violet-700">
                        <Star size={12} />
                        Featured
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mt-4 text-lg font-black text-slate-950">
                    {entry.type === "faq" ? entry.question : entry.title}
                  </h2>

                  <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm leading-6 text-slate-600">
                    {entry.content}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {entry.category || "General"}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 uppercase">
                      {entry.language}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => openEdit(entry)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-50 px-4 text-sm font-black text-blue-700"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                {entry.status !== "published" ? (
                  <button
                    type="button"
                    onClick={() => void changeStatus(entry, "published")}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-50 px-4 text-sm font-black text-emerald-700"
                  >
                    <Send size={16} />
                    Publish
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => void changeStatus(entry, "draft")}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-amber-50 px-4 text-sm font-black text-amber-700"
                  >
                    <Archive size={16} />
                    Unpublish
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => void removeEntry(entry)}
                  className="grid size-10 place-items-center rounded-xl bg-red-50 text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {modalOpen ? (
        <KnowledgeFormModal
          entry={editing}
          saving={saving}
          errors={fieldErrors}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSave={saveEntry}
        />
      ) : null}
    </div>
  );
}

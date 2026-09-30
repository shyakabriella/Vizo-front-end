"use client";

import {
  CheckCircle2,
  ExternalLink,
  FileText,
  FileVideo,
  Image as ImageIcon,
  LoaderCircle,
  Pencil,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import {
  deleteMedia,
  getMedia,
  getMediaError,
  updateMedia,
  uploadMedia,
} from "@/services/media.service";
import type {
  MediaAsset,
  MediaFilterType,
  MediaUpdateForm,
} from "@/types/media";

const acceptedFiles =
  "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm,application/pdf";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;

  const kilobytes = bytes / 1024;

  if (kilobytes < 1024) {
    return `${kilobytes.toFixed(1)} KB`;
  }

  return `${(kilobytes / 1024).toFixed(1)} MB`;
}

function formatDate(value?: string | null): string {
  if (!value) return "Unknown date";

  return new Intl.DateTimeFormat("en-RW", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function FilePreview({ media }: { media: MediaAsset }) {
  if (media.type === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={media.url}
        alt={media.alt_text || media.name}
        className="size-full object-cover transition duration-500 group-hover:scale-105"
      />
    );
  }

  if (media.type === "video") {
    return (
      <video
        src={media.url}
        controls
        preload="metadata"
        className="size-full bg-slate-950 object-contain"
      />
    );
  }

  return (
    <div className="grid size-full place-items-center bg-red-50 text-red-600">
      <div className="text-center">
        <FileText className="mx-auto" size={46} />
        <p className="mt-2 text-sm font-black uppercase">
          {media.extension || "Document"}
        </p>
      </div>
    </div>
  );
}

function EditMediaModal({
  media,
  saving,
  onClose,
  onSave,
}: {
  media: MediaAsset;
  saving: boolean;
  onClose: () => void;
  onSave: (form: MediaUpdateForm) => Promise<void>;
}) {
  const [form, setForm] = useState<MediaUpdateForm>({
    name: media.name,
    alt_text: media.alt_text ?? "",
    caption: media.caption ?? "",
    is_active: media.is_active,
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onSave(form);
  }

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center">
        <form
          onSubmit={submit}
          className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                Media information
              </p>
              <h2 className="mt-1 text-xl font-black text-slate-950">
                Edit {media.name}
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
            <div className="h-52 overflow-hidden rounded-2xl bg-slate-100">
              <FilePreview media={media} />
            </div>

            <label className="block">
              <span className="text-sm font-bold">Media name</span>
              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            {media.type === "image" ? (
              <label className="block">
                <span className="text-sm font-bold">Alternative text</span>
                <input
                  maxLength={500}
                  value={form.alt_text}
                  placeholder="Describe the image for search engines and accessibility."
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      alt_text: event.target.value,
                    }))
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"
                />
              </label>
            ) : null}

            <label className="block">
              <span className="text-sm font-bold">Caption</span>
              <textarea
                rows={4}
                maxLength={5000}
                value={form.caption}
                placeholder="Optional information about this media."
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    caption: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
              />
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
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
              <span>
                <span className="block text-sm font-black">Active media</span>
                <span className="text-xs text-slate-500">
                  Allow this file to be used in published business content.
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
                <CheckCircle2 size={17} />
              )}
              Save changes
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default function MediaPage() {
  const { selectedBusiness } = useBusinessWorkspace();

  const [items, setItems] = useState<MediaAsset[]>([]);
  const [type, setType] = useState<MediaFilterType>("all");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [editing, setEditing] = useState<MediaAsset | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadMedia = useCallback(async () => {
    if (!selectedBusiness) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await getMedia(selectedBusiness.public_id, {
        search,
        type,
        is_active: activeFilter === "all" ? null : activeFilter === "active",
        per_page: 50,
      });

      setItems(result.items);
    } catch (requestError) {
      setError(
        getMediaError(requestError, "Unable to load the media library."),
      );
    } finally {
      setLoading(false);
    }
  }, [selectedBusiness, search, type, activeFilter]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadMedia();
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [loadMedia]);

  async function uploadFiles(files: File[]) {
    if (!selectedBusiness || files.length === 0) return;

    const allowedExtensions = [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "gif",
      "pdf",
      "mp4",
      "mov",
      "webm",
    ];

    const invalid = files.find((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

      return !allowedExtensions.includes(extension);
    });

    if (invalid) {
      setError(
        `"${invalid.name}" is not supported. Use images, PDF, MP4, MOV or WebM.`,
      );
      return;
    }

    try {
      setUploading(true);
      setError("");
      setMessage("");

      for (const file of files) {
        await uploadMedia(selectedBusiness.public_id, file);
      }

      setMessage(
        files.length === 1
          ? "Media uploaded successfully."
          : `${files.length} files uploaded successfully.`,
      );

      await loadMedia();
    } catch (requestError) {
      setError(getMediaError(requestError, "Unable to upload media."));
    } finally {
      setUploading(false);
    }
  }

  function chooseFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    void uploadFiles(files);
    event.target.value = "";
  }

  function dropFiles(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);

    void uploadFiles(Array.from(event.dataTransfer.files));
  }

  async function saveMedia(form: MediaUpdateForm) {
    if (!selectedBusiness || !editing) return;

    try {
      setSaving(true);
      setError("");

      const response = await updateMedia(
        selectedBusiness.public_id,
        editing.public_id,
        form,
      );

      setMessage(response.message ?? "Media updated successfully.");
      setEditing(null);
      await loadMedia();
    } catch (requestError) {
      setError(getMediaError(requestError, "Unable to update media."));
    } finally {
      setSaving(false);
    }
  }

  async function removeMedia(media: MediaAsset) {
    if (
      !selectedBusiness ||
      !window.confirm(`Permanently delete "${media.name}" and its stored file?`)
    ) {
      return;
    }

    try {
      setError("");

      const response = await deleteMedia(
        selectedBusiness.public_id,
        media.public_id,
      );

      setMessage(response.message);
      await loadMedia();
    } catch (requestError) {
      setError(getMediaError(requestError, "Unable to delete media."));
    }
  }

  if (!selectedBusiness) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600">
        Create or select a business before managing media.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
          Media management
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">
          {selectedBusiness.name} media library
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          Upload business images, videos, menus and documents for your profile,
          website and visibility content.
        </p>
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

      <div
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={dropFiles}
        className={`rounded-3xl border-2 border-dashed p-8 text-center transition ${
          dragging ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-white"
        }`}
      >
        {uploading ? (
          <LoaderCircle
            className="mx-auto animate-spin text-blue-600"
            size={38}
          />
        ) : (
          <Upload className="mx-auto text-blue-600" size={38} />
        )}

        <h2 className="mt-4 text-xl font-black text-slate-950">
          {uploading ? "Uploading your files..." : "Upload business media"}
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
          Drag files here or choose them from your device. Images, videos and
          PDF documents are supported.
        </p>

        <label
          className={`mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-black text-white ${
            uploading ? "pointer-events-none opacity-60" : "cursor-pointer"
          }`}
        >
          <Upload size={17} />
          Choose files
          <input
            type="file"
            multiple
            accept={acceptedFiles}
            disabled={uploading}
            onChange={chooseFiles}
            className="sr-only"
          />
        </label>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
          <label className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              value={search}
              placeholder="Search media..."
              onChange={(event) => setSearch(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4"
            />
          </label>

          <select
            value={type}
            onChange={(event) => setType(event.target.value as MediaFilterType)}
            className="h-11 rounded-xl border border-slate-200 px-4"
          >
            <option value="all">All file types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
          </select>

          <select
            value={activeFilter}
            onChange={(event) =>
              setActiveFilter(
                event.target.value as "all" | "active" | "inactive",
              )
            }
            className="h-11 rounded-xl border border-slate-200 px-4"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </section>

      {loading ? (
        <div className="grid min-h-72 place-items-center rounded-3xl border border-slate-200 bg-white">
          <LoaderCircle className="animate-spin text-blue-600" size={34} />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <ImageIcon className="mx-auto text-slate-300" size={52} />
          <h2 className="mt-4 text-xl font-black text-slate-950">
            No media found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Upload your first business image, video or document.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((media) => (
            <article
              key={media.public_id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <FilePreview media={media} />

                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-black ${
                    media.is_active
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-700 text-white"
                  }`}
                >
                  {media.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-blue-600">
                    {media.type === "image" ? (
                      <ImageIcon size={19} />
                    ) : media.type === "video" ? (
                      <FileVideo size={19} />
                    ) : (
                      <FileText size={19} />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-black text-slate-950">
                      {media.name}
                    </h2>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {media.original_name}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    {formatBytes(media.size)}
                  </span>

                  {media.width && media.height ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {media.width} × {media.height}
                    </span>
                  ) : null}

                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    {formatDate(media.created_at)}
                  </span>
                </div>

                <div className="mt-5 flex gap-2">
                  <a
                    href={media.url}
                    target="_blank"
                    rel="noreferrer"
                    className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-700"
                    title="Open file"
                  >
                    <ExternalLink size={17} />
                  </a>

                  <button
                    type="button"
                    onClick={() => setEditing(media)}
                    className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700"
                    title="Edit media"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => void removeMedia(media)}
                    className="grid size-10 place-items-center rounded-xl bg-red-50 text-red-600"
                    title="Delete media"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing ? (
        <EditMediaModal
          media={editing}
          saving={saving}
          onClose={() => setEditing(null)}
          onSave={saveMedia}
        />
      ) : null}
    </div>
  );
}

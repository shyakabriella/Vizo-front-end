"use client";

import {
  Check,
  CircleAlert,
  Copy,
  ExternalLink,
  FileCheck2,
  Globe2,
  LoaderCircle,
  Pause,
  Play,
  RefreshCw,
  Save,
  Settings2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import {
  activatePublication,
  getPublication,
  getPublicationError,
  pausePublication,
  regeneratePublication,
  updatePublication,
} from "@/services/publication.service";
import type {
  BusinessPublication,
  UpdatePublicationPayload,
} from "@/types/publication";

type ActionName = "save" | "activate" | "pause" | "regenerate" | null;
type CopyTarget = "profile" | "schema" | "llms" | "script" | null;

type PublicationForm = {
  profile_enabled: boolean;
  schema_enabled: boolean;
  llms_enabled: boolean;
  script_enabled: boolean;
  include_locations: boolean;
  include_opening_hours: boolean;
  include_offerings: boolean;
  include_knowledge: boolean;
  include_media: boolean;
  default_language: string;
  custom_domain: string;
};

const emptyForm: PublicationForm = {
  profile_enabled: true,
  schema_enabled: true,
  llms_enabled: true,
  script_enabled: true,
  include_locations: true,
  include_opening_hours: true,
  include_offerings: true,
  include_knowledge: true,
  include_media: true,
  default_language: "en",
  custom_domain: "",
};

function publicationToForm(publication: BusinessPublication): PublicationForm {
  return {
    profile_enabled: publication.profile_enabled,
    schema_enabled: publication.schema_enabled,
    llms_enabled: publication.llms_enabled,
    script_enabled: publication.script_enabled,
    include_locations: publication.include_locations,
    include_opening_hours: publication.include_opening_hours,
    include_offerings: publication.include_offerings,
    include_knowledge: publication.include_knowledge,
    include_media: publication.include_media,
    default_language: publication.default_language || "en",
    custom_domain: publication.custom_domain ?? "",
  };
}

function formatDate(value: string | null): string {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function Toggle({
  checked,
  title,
  description,
  disabled = false,
  onChange,
}: {
  checked: boolean;
  title: string;
  description: string;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      className={`flex min-w-0 items-start justify-between gap-4 rounded-2xl border p-4 transition ${
        checked ? "border-blue-200 bg-blue-50/60" : "border-slate-200 bg-white"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span className="min-w-0">
        <span className="block break-words font-black text-slate-900">
          {title}
        </span>

        <span className="mt-1 block text-sm leading-6 text-slate-500">
          {description}
        </span>
      </span>

      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />

      <span
        className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-slate-300"
        }`}
        aria-hidden="true"
      >
        <span
          className={`absolute top-1 size-5 rounded-full bg-white shadow-sm transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </span>
    </label>
  );
}

function EndpointCard({
  label,
  description,
  url,
  enabled,
  target,
  copied,
  onCopy,
}: {
  label: string;
  description: string;
  url: string;
  enabled: boolean;
  target: Exclude<CopyTarget, null>;
  copied: CopyTarget;
  onCopy: (value: string, target: Exclude<CopyTarget, null>) => Promise<void>;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-black text-slate-900">{label}</p>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-black ${
                enabled
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {enabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
        </div>

        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => void onCopy(url, target)}
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 sm:flex-none"
          >
            {copied === target ? <Check size={16} /> : <Copy size={16} />}
            {copied === target ? "Copied" : "Copy"}
          </button>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${label}`}
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
          >
            <ExternalLink size={17} />
          </a>
        </div>
      </div>

      <div className="mt-3 min-w-0 overflow-hidden rounded-xl bg-slate-950 px-4 py-3">
        <code className="block max-w-full whitespace-pre-wrap break-all text-xs leading-5 text-slate-200">
          {url}
        </code>
      </div>
    </div>
  );
}

export default function PublicationPage() {
  const { selectedBusiness, isLoading: businessLoading } =
    useBusinessWorkspace();

  const [publication, setPublication] = useState<BusinessPublication | null>(
    null,
  );
  const [form, setForm] = useState<PublicationForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<ActionName>(null);
  const [copied, setCopied] = useState<CopyTarget>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadPublication = useCallback(async () => {
    if (!selectedBusiness) {
      setPublication(null);
      setForm(emptyForm);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await getPublication(selectedBusiness.public_id);

      setPublication(result);
      setForm(publicationToForm(result));
    } catch (requestError) {
      setError(
        getPublicationError(
          requestError,
          "Publication settings could not be loaded.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }, [selectedBusiness]);

  useEffect(() => {
    void loadPublication();
  }, [loadPublication]);

  function updateField<K extends keyof PublicationForm>(
    field: K,
    value: PublicationForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveSettings() {
    if (!selectedBusiness) {
      return;
    }

    const payload: UpdatePublicationPayload = {
      profile_enabled: form.profile_enabled,
      schema_enabled: form.schema_enabled,
      llms_enabled: form.llms_enabled,
      script_enabled: form.script_enabled,
      include_locations: form.include_locations,
      include_opening_hours: form.include_opening_hours,
      include_offerings: form.include_offerings,
      include_knowledge: form.include_knowledge,
      include_media: form.include_media,
      default_language: form.default_language.trim() || "en",
      custom_domain: form.custom_domain.trim() || null,
    };

    try {
      setAction("save");
      setMessage("");
      setError("");

      const response = await updatePublication(
        selectedBusiness.public_id,
        payload,
      );

      setPublication(response.data.publication);
      setForm(publicationToForm(response.data.publication));
      setMessage(response.message || "Publication settings saved.");
    } catch (requestError) {
      setError(
        getPublicationError(
          requestError,
          "Publication settings could not be saved.",
        ),
      );
    } finally {
      setAction(null);
    }
  }

  async function runPublicationAction(
    nextAction: Exclude<ActionName, "save" | null>,
  ) {
    if (!selectedBusiness) {
      return;
    }

    if (
      nextAction === "pause" &&
      !window.confirm(
        "Pause this publication? Its public Vizo endpoints will stop working.",
      )
    ) {
      return;
    }

    try {
      setAction(nextAction);
      setMessage("");
      setError("");

      const response =
        nextAction === "activate"
          ? await activatePublication(selectedBusiness.public_id)
          : nextAction === "pause"
            ? await pausePublication(selectedBusiness.public_id)
            : await regeneratePublication(selectedBusiness.public_id);

      setPublication(response.data.publication);
      setForm(publicationToForm(response.data.publication));
      setMessage(response.message || "Publication updated successfully.");
    } catch (requestError) {
      setError(
        getPublicationError(
          requestError,
          "The publication action could not be completed.",
        ),
      );
    } finally {
      setAction(null);
    }
  }

  async function copyValue(value: string, target: Exclude<CopyTarget, null>) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(target);

      window.setTimeout(() => {
        setCopied((current) => (current === target ? null : current));
      }, 1800);
    } catch {
      setError("Your browser could not copy this URL.");
    }
  }

  if (businessLoading || loading) {
    return (
      <div className="grid min-h-[420px] place-items-center">
        <div className="text-center">
          <LoaderCircle
            className="mx-auto animate-spin text-blue-600"
            size={32}
          />
          <p className="mt-3 text-sm font-semibold text-slate-500">
            Loading publication settings...
          </p>
        </div>
      </div>
    );
  }

  if (!selectedBusiness) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-12">
        <Globe2 className="mx-auto text-slate-300" size={44} />

        <h1 className="mt-4 text-xl font-black text-slate-950">
          No business selected
        </h1>

        <p className="mt-2 text-slate-500">
          Create or select a business before managing publication.
        </p>
      </div>
    );
  }

  if (!publication) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 sm:p-8">
        <p className="font-black text-red-900">
          Publication could not be loaded
        </p>

        <p className="mt-2 text-sm text-red-700">
          {error || "Please try again."}
        </p>

        <button
          type="button"
          onClick={() => void loadPublication()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-black text-white"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }

  const isActive = publication.status === "active";
  const isBusy = action !== null;

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden pb-10">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Publication
          </p>

          <h1 className="mt-2 break-words text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Publish {selectedBusiness.name}
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
            Control which business information Vizo makes available to search
            engines, AI platforms and your connected website.
          </p>
        </div>

        <div
          className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-black ${
            isActive
              ? "bg-emerald-50 text-emerald-700"
              : publication.status === "paused"
                ? "bg-amber-50 text-amber-700"
                : "bg-slate-100 text-slate-600"
          }`}
        >
          {isActive ? <Check size={17} /> : <CircleAlert size={17} />}
          {publication.status}
        </div>
      </div>

      {message && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 sm:px-5 sm:py-4">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800 sm:px-5 sm:py-4">
          {error}
        </div>
      )}

      <section className="mt-6 min-w-0 rounded-2xl bg-slate-950 p-5 text-white sm:rounded-3xl sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10">
                <FileCheck2 size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-400">
                  Publication status
                </p>
                <p className="break-words text-xl font-black capitalize">
                  {publication.status}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
              {isActive
                ? "Your enabled business information is publicly available."
                : "Activate the publication when your business profile is ready."}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <button
              type="button"
              disabled={isBusy}
              onClick={() => void runPublicationAction("regenerate")}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 px-4 text-sm font-black text-white transition hover:bg-white/10 disabled:opacity-50"
            >
              {action === "regenerate" ? (
                <LoaderCircle className="animate-spin" size={17} />
              ) : (
                <RefreshCw size={17} />
              )}
              Regenerate
            </button>

            {isActive ? (
              <button
                type="button"
                disabled={isBusy}
                onClick={() => void runPublicationAction("pause")}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 text-sm font-black text-slate-950 transition hover:bg-amber-300 disabled:opacity-50"
              >
                {action === "pause" ? (
                  <LoaderCircle className="animate-spin" size={17} />
                ) : (
                  <Pause size={17} />
                )}
                Pause publication
              </button>
            ) : (
              <button
                type="button"
                disabled={isBusy}
                onClick={() => void runPublicationAction("activate")}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 text-sm font-black text-white transition hover:bg-blue-400 disabled:opacity-50"
              >
                {action === "activate" ? (
                  <LoaderCircle className="animate-spin" size={17} />
                ) : (
                  <Play size={17} />
                )}
                Activate publication
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.46fr)]">
        <div className="min-w-0 space-y-6">
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <Globe2 size={20} />
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-950">
                  Public formats
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Choose which machine-readable publication formats are active.
                </p>
              </div>
            </div>

            <div className="mt-5 grid min-w-0 gap-4 md:grid-cols-2">
              <Toggle
                checked={form.profile_enabled}
                title="Business profile"
                description="Publish the complete public business profile."
                disabled={isBusy}
                onChange={(value) => updateField("profile_enabled", value)}
              />

              <Toggle
                checked={form.schema_enabled}
                title="Schema.org data"
                description="Publish structured JSON-LD for search engines."
                disabled={isBusy}
                onChange={(value) => updateField("schema_enabled", value)}
              />

              <Toggle
                checked={form.llms_enabled}
                title="AI information"
                description="Publish llms.txt for AI discovery systems."
                disabled={isBusy}
                onChange={(value) => updateField("llms_enabled", value)}
              />

              <Toggle
                checked={form.script_enabled}
                title="Website Connect script"
                description="Allow the Vizo script to work on your website."
                disabled={isBusy}
                onChange={(value) => updateField("script_enabled", value)}
              />
            </div>
          </section>

          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
                <Settings2 size={20} />
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-950">
                  Included information
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Select information that should appear in generated files.
                </p>
              </div>
            </div>

            <div className="mt-5 grid min-w-0 gap-4 md:grid-cols-2">
              <Toggle
                checked={form.include_locations}
                title="Locations"
                description="Publish business addresses and contact details."
                disabled={isBusy}
                onChange={(value) => updateField("include_locations", value)}
              />

              <Toggle
                checked={form.include_opening_hours}
                title="Opening hours"
                description="Publish weekly and special opening hours."
                disabled={isBusy}
                onChange={(value) =>
                  updateField("include_opening_hours", value)
                }
              />

              <Toggle
                checked={form.include_offerings}
                title="Services and prices"
                description="Publish services, products and pricing."
                disabled={isBusy}
                onChange={(value) => updateField("include_offerings", value)}
              />

              <Toggle
                checked={form.include_knowledge}
                title="Knowledge entries"
                description="Publish verified questions and business answers."
                disabled={isBusy}
                onChange={(value) => updateField("include_knowledge", value)}
              />

              <Toggle
                checked={form.include_media}
                title="Media"
                description="Publish active business images and media."
                disabled={isBusy}
                onChange={(value) => updateField("include_media", value)}
              />
            </div>
          </section>

          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
            <h2 className="text-lg font-black text-slate-950">
              Publication preferences
            </h2>

            <div className="mt-5 grid min-w-0 gap-5 md:grid-cols-2">
              <label className="min-w-0">
                <span className="text-sm font-black text-slate-700">
                  Default language
                </span>

                <input
                  type="text"
                  value={form.default_language}
                  disabled={isBusy}
                  onChange={(event) =>
                    updateField("default_language", event.target.value)
                  }
                  placeholder="en"
                  maxLength={12}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                />

                <span className="mt-2 block text-xs leading-5 text-slate-500">
                  Examples: en, fr, rw or en-US.
                </span>
              </label>

              <label className="min-w-0">
                <span className="text-sm font-black text-slate-700">
                  Custom domain
                </span>

                <input
                  type="text"
                  value={form.custom_domain}
                  disabled={isBusy}
                  onChange={(event) =>
                    updateField("custom_domain", event.target.value)
                  }
                  placeholder="visibility.example.com"
                  className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                />

                <span className="mt-2 block text-xs leading-5 text-slate-500">
                  Custom domains require a plan that supports this feature.
                </span>
              </label>
            </div>

            <button
              type="button"
              disabled={isBusy}
              onClick={() => void saveSettings()}
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {action === "save" ? (
                <LoaderCircle className="animate-spin" size={17} />
              ) : (
                <Save size={17} />
              )}

              {action === "save" ? "Saving..." : "Save settings"}
            </button>
          </section>
        </div>

        <aside className="min-w-0 space-y-6">
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
            <h2 className="font-black text-slate-950">
              Publication information
            </h2>

            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-slate-500">Site ID</dt>
                <dd className="mt-1 break-all font-black text-slate-900">
                  {publication.site_id}
                </dd>
              </div>

              <div>
                <dt className="font-semibold text-slate-500">Published</dt>
                <dd className="mt-1 font-bold text-slate-900">
                  {formatDate(publication.published_at)}
                </dd>
              </div>

              <div>
                <dt className="font-semibold text-slate-500">Last generated</dt>
                <dd className="mt-1 font-bold text-slate-900">
                  {formatDate(publication.last_generated_at)}
                </dd>
              </div>

              <div>
                <dt className="font-semibold text-slate-500">
                  Website verification
                </dt>
                <dd className="mt-1 font-bold capitalize text-slate-900">
                  {publication.verification_status || "pending"}
                </dd>
              </div>
            </dl>
          </section>

          {!isActive && (
            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex gap-3">
                <CircleAlert
                  className="mt-0.5 shrink-0 text-amber-600"
                  size={20}
                />

                <div>
                  <p className="font-black text-amber-900">
                    Endpoints are not public
                  </p>
                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    Activate the publication before testing the public URLs.
                    Your business may also need to be published first.
                  </p>
                </div>
              </div>
            </section>
          )}
        </aside>
      </div>

      <section className="mt-6 min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:rounded-3xl sm:p-6">
        <h2 className="text-lg font-black text-slate-950">
          Public publication URLs
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          These endpoints are generated and maintained automatically by Vizo.
        </p>

        <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-2">
          <EndpointCard
            label="Business profile"
            description="Complete machine-readable business information."
            url={publication.urls.profile}
            enabled={form.profile_enabled}
            target="profile"
            copied={copied}
            onCopy={copyValue}
          />

          <EndpointCard
            label="Schema.org"
            description="Structured JSON-LD for search engines."
            url={publication.urls.schema}
            enabled={form.schema_enabled}
            target="schema"
            copied={copied}
            onCopy={copyValue}
          />

          <EndpointCard
            label="llms.txt"
            description="Business information prepared for AI systems."
            url={publication.urls.llms}
            enabled={form.llms_enabled}
            target="llms"
            copied={copied}
            onCopy={copyValue}
          />

          <EndpointCard
            label="Website Connect"
            description="Script used to connect the business website."
            url={publication.urls.script}
            enabled={form.script_enabled}
            target="script"
            copied={copied}
            onCopy={copyValue}
          />
        </div>
      </section>
    </div>
  );
}

"use client";

import {
  Check,
  CheckCircle2,
  CircleAlert,
  Code2,
  Copy,
  ExternalLink,
  FileJson,
  Globe2,
  Link2,
  LoaderCircle,
  RefreshCw,
  ServerCog,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import {
  getPublication,
  getPublicationError,
  makeConnectScriptTag,
  verifyWebsiteInstallation,
} from "@/services/publication.service";
import type {
  BusinessPublication,
  InstallationVerification,
} from "@/types/publication";

type CopyTarget = "script" | "profile" | "schema" | "llms" | "site" | null;

function verificationFromPublication(
  publication: BusinessPublication,
): InstallationVerification {
  return {
    status: publication.verification_status ?? "pending",
    website_reachable: publication.website_reachable ?? false,
    script_verified: publication.script_verified ?? false,
    llms_verified: publication.llms_verified ?? false,
    script_verified_at: publication.script_verified_at ?? null,
    llms_verified_at: publication.llms_verified_at ?? null,
    last_verified_at: publication.last_verified_at ?? null,
    results: publication.verification_results ?? null,
    error: publication.verification_error ?? null,
  };
}

function formatDate(value: string | null): string {
  if (!value) {
    return "Not checked yet";
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

function VerificationItem({
  label,
  description,
  verified,
}: {
  label: string;
  description: string;
  verified: boolean;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div
        className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl ${
          verified
            ? "bg-emerald-50 text-emerald-600"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {verified ? <Check size={18} /> : <CircleAlert size={18} />}
      </div>

      <div>
        <p className="font-bold text-slate-900">{label}</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function EndpointRow({
  label,
  description,
  url,
  copyTarget,
  copied,
  onCopy,
}: {
  label: string;
  description: string;
  url: string;
  copyTarget: Exclude<CopyTarget, null>;
  copied: CopyTarget;
  onCopy: (value: string, target: Exclude<CopyTarget, null>) => Promise<void>;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-bold text-slate-900">{label}</p>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>

        <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => void onCopy(url, copyTarget)}
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 sm:flex-none"
          >
            {copied === copyTarget ? <Check size={16} /> : <Copy size={16} />}
            {copied === copyTarget ? "Copied" : "Copy"}
          </button>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
            aria-label={`Open ${label}`}
          >
            <ExternalLink size={17} />
          </a>
        </div>
      </div>

      <div className="mt-3 min-w-0 overflow-hidden rounded-xl bg-slate-950 px-3 py-3 sm:px-4">
        <code className="block max-w-full whitespace-pre-wrap break-all text-xs leading-5 text-slate-200">
          {url}
        </code>
      </div>
    </div>
  );
}

export default function WebsiteConnectPage() {
  const { selectedBusiness, isLoading: businessLoading } =
    useBusinessWorkspace();

  const [publication, setPublication] = useState<BusinessPublication | null>(
    null,
  );
  const [verification, setVerification] =
    useState<InstallationVerification | null>(null);

  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [copied, setCopied] = useState<CopyTarget>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadPublication = useCallback(async () => {
    if (!selectedBusiness) {
      setPublication(null);
      setVerification(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await getPublication(selectedBusiness.public_id);

      setPublication(result);
      setVerification(verificationFromPublication(result));
    } catch (requestError) {
      setError(
        getPublicationError(
          requestError,
          "Unable to load Website Connect settings.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }, [selectedBusiness]);

  useEffect(() => {
    void loadPublication();
  }, [loadPublication]);

  const scriptTag = useMemo(() => {
    if (!publication) {
      return "";
    }

    return makeConnectScriptTag(publication);
  }, [publication]);

  async function copyValue(
    value: string,
    target: Exclude<CopyTarget, null>,
  ): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(target);

      window.setTimeout(() => {
        setCopied((current) => (current === target ? null : current));
      }, 1800);
    } catch {
      setError("Your browser could not copy the value automatically.");
    }
  }

  async function verifyInstallation(): Promise<void> {
    if (!selectedBusiness) {
      return;
    }

    try {
      setVerifying(true);
      setMessage("");
      setError("");

      const result = await verifyWebsiteInstallation(
        selectedBusiness.public_id,
      );

      setVerification(result);

      if (result.status === "verified") {
        setMessage("Website installation verified successfully.");
      } else if (result.status === "partial") {
        setMessage(
          "Website Connect was found, but the installation is only partially complete.",
        );
      } else {
        setMessage("Verification completed. Some installation checks failed.");
      }
    } catch (requestError) {
      setError(
        getPublicationError(
          requestError,
          "Website installation could not be verified.",
        ),
      );
    } finally {
      setVerifying(false);
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
            Loading Website Connect...
          </p>
        </div>
      </div>
    );
  }

  if (!selectedBusiness) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
        <Globe2 className="mx-auto text-slate-300" size={42} />
        <h1 className="mt-4 text-xl font-black text-slate-950">
          No business selected
        </h1>
        <p className="mt-2 text-slate-500">
          Create or select a business before setting up Website Connect.
        </p>
      </div>
    );
  }

  if (!publication) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
        <p className="font-bold text-red-800">
          Website Connect could not be loaded.
        </p>
        <p className="mt-2 text-sm text-red-700">
          {error || "Please try again."}
        </p>

        <button
          type="button"
          onClick={() => void loadPublication()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-bold text-white"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }

  const verified = verification?.status === "verified";
  const partial = verification?.status === "partial";

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden pb-8 sm:pb-12">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Website Connect
          </p>

          <h1 className="mt-2 break-words text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Connect {selectedBusiness.name}
          </h1>

          <p className="mt-2 max-w-3xl leading-7 text-slate-500">
            Install one Vizo script on your website so Vizo can publish
            structured business information and measure your connection.
          </p>
        </div>

        <div
          className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-black ${
            verified
              ? "bg-emerald-50 text-emerald-700"
              : partial
                ? "bg-amber-50 text-amber-700"
                : "bg-slate-100 text-slate-600"
          }`}
        >
          {verified ? <CheckCircle2 size={17} /> : <CircleAlert size={17} />}

          {verified
            ? "Connected"
            : partial
              ? "Partially connected"
              : "Not verified"}
        </div>
      </div>

      {message && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-800">
          {error}
        </div>
      )}

      {!publication.script_enabled && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <CircleAlert className="mt-0.5 shrink-0 text-amber-600" size={20} />

          <div>
            <p className="font-black text-amber-900">
              Website Connect is currently disabled
            </p>
            <p className="mt-1 text-sm leading-6 text-amber-800">
              The installation code is available, but the Connect script must
              also be enabled in your publication settings before it can work
              publicly.
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
          <div className="flex items-start gap-4">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <Code2 size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-950">
                Install the Vizo script
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Copy this code and add it to your website. Place it inside the
                HTML head section before the closing &lt;/head&gt; tag.
              </p>
            </div>
          </div>

          <div className="mt-5 min-w-0 overflow-hidden rounded-2xl bg-slate-950 p-4 sm:p-5">
            <pre className="max-w-full whitespace-pre-wrap break-all text-xs leading-6 text-slate-200 sm:text-sm sm:leading-7">
              <code>{scriptTag}</code>
            </pre>
          </div>

          <button
            type="button"
            onClick={() => void copyValue(scriptTag, "script")}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700 sm:w-auto sm:px-5"
          >
            {copied === "script" ? <Check size={17} /> : <Copy size={17} />}
            {copied === "script" ? "Copied" : "Copy installation code"}
          </button>

          <div className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <span className="grid size-8 place-items-center rounded-lg bg-white text-sm font-black text-blue-600 shadow-sm">
                1
              </span>
              <p className="mt-3 font-bold text-slate-900">Copy the code</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Use the button above to copy your unique Vizo script.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <span className="grid size-8 place-items-center rounded-lg bg-white text-sm font-black text-blue-600 shadow-sm">
                2
              </span>
              <p className="mt-3 font-bold text-slate-900">
                Add it to your website
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Paste the script into the head section of your website.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <span className="grid size-8 place-items-center rounded-lg bg-white text-sm font-black text-blue-600 shadow-sm">
                3
              </span>
              <p className="mt-3 font-bold text-slate-900">
                Verify installation
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Return here and let Vizo check your website automatically.
              </p>
            </div>
          </div>
        </section>

        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-700">
              <ServerCog size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Vizo Site ID
              </p>
              <p className="break-all font-black text-slate-950">
                {publication.site_id}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void copyValue(publication.site_id, "site")}
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            {copied === "site" ? <Check size={16} /> : <Copy size={16} />}
            {copied === "site" ? "Copied" : "Copy site ID"}
          </button>

          <div className="my-6 h-px bg-slate-200" />

          <p className="text-sm font-semibold text-slate-500">
            Last verification
          </p>
          <p className="mt-1 font-bold text-slate-900">
            {formatDate(verification?.last_verified_at ?? null)}
          </p>

          {verification?.error && (
            <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-700">
              {verification.error}
            </div>
          )}

          <button
            type="button"
            disabled={verifying}
            onClick={() => void verifyInstallation()}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {verifying ? (
              <LoaderCircle className="animate-spin" size={17} />
            ) : (
              <RefreshCw size={17} />
            )}

            {verifying ? "Checking website..." : "Verify installation"}
          </button>
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
            Installation status
          </p>

          <h2 className="mt-2 text-xl font-black text-slate-950">
            Connection checks
          </h2>
        </div>

        <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <VerificationItem
            label="Website reachable"
            description="Vizo can connect to your public website."
            verified={verification?.website_reachable ?? false}
          />

          <VerificationItem
            label="Connect script"
            description="The Vizo Connect script is installed on your website."
            verified={verification?.script_verified ?? false}
          />

          <VerificationItem
            label="llms.txt"
            description="Your AI-readable llms.txt installation is available."
            verified={verification?.llms_verified ?? false}
          />
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-violet-50 text-violet-600">
            <Link2 size={21} />
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-950">
              Public AI endpoints
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Vizo automatically exposes structured versions of your business
              information through these public URLs.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          <EndpointRow
            label="Business profile"
            description="Machine-readable public business profile."
            url={publication.urls.profile}
            copyTarget="profile"
            copied={copied}
            onCopy={copyValue}
          />

          <EndpointRow
            label="Schema.org data"
            description="Structured JSON-LD information for search engines and AI systems."
            url={publication.urls.schema}
            copyTarget="schema"
            copied={copied}
            onCopy={copyValue}
          />

          <EndpointRow
            label="llms.txt"
            description="AI-friendly business information for language models."
            url={publication.urls.llms}
            copyTarget="llms"
            copied={copied}
            onCopy={copyValue}
          />
        </div>
      </section>

      <section className="mt-6 rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10">
              <FileJson size={21} />
            </div>

            <div>
              <h2 className="text-lg font-black">
                One connection, structured everywhere
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-300">
                Website Connect connects your website with the business
                information managed inside Vizo, including services, locations,
                opening hours, media and published knowledge.
              </p>
            </div>
          </div>

          <div className="shrink-0 text-sm font-bold text-slate-300">
            Publication:{" "}
            <span className="text-white">{publication.status}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CircleAlert,
  FileCheck2,
  Globe2,
  LoaderCircle,
  MapPin,
  Plus,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import { useAuth } from "@/hooks/use-auth";
import type { Business } from "@/types/business";

function calculateCompleteness(business: Business): number {
  const values = [
    business.name,
    business.type?.name,
    business.description,
    business.email,
    business.phone,
    business.whatsapp,
    business.website,
    business.logo,
    business.cover_image,
  ];

  const completed = values.filter(
    (value) => typeof value === "string" && value.trim().length > 0,
  ).length;

  return Math.round((completed / values.length) * 100);
}

function StatusBadge({ status }: { status: Business["status"] }) {
  const classes = {
    published: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    draft: "bg-amber-50 text-amber-700 ring-amber-200",
    suspended: "bg-red-50 text-red-700 ring-red-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-black capitalize ring-1 ${classes[status]}`}
    >
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { businesses, selectedBusiness, isLoading, error, refreshBusinesses } =
    useBusinessWorkspace();

  if (isLoading) {
    return (
      <div className="grid min-h-[55vh] place-items-center">
        <div className="text-center text-slate-500">
          <LoaderCircle
            className="mx-auto animate-spin text-blue-600"
            size={34}
          />
          <p className="mt-3 text-sm">Preparing your business workspace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
        <CircleAlert className="mx-auto text-red-600" size={34} />
        <h1 className="mt-4 text-xl font-black text-red-950">
          We could not load your businesses
        </h1>
        <p className="mt-2 text-sm text-red-700">{error}</p>
        <button
          type="button"
          onClick={() => void refreshBusinesses()}
          className="mt-5 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!selectedBusiness) {
    return (
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
          Welcome to Vizo
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Hello, {user?.name.split(" ")[0]}
        </h1>

        <section className="mt-8 overflow-hidden rounded-3xl bg-[#10173d] p-7 text-white sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Sparkles className="text-blue-300" />

              <h2 className="mt-5 max-w-2xl text-2xl font-black sm:text-3xl">
                Create your first AI-ready business profile.
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-blue-100/70">
                Add your business information, locations, services, opening
                hours and website before publishing it to search engines and AI
                platforms.
              </p>
            </div>

            <Link
              href="/dashboard/businesses/create"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 font-black text-white transition hover:bg-blue-400"
            >
              <Plus size={18} />
              Create business
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const completeness = calculateCompleteness(selectedBusiness);

  const cards = [
    {
      title: "Profile completeness",
      value: `${completeness}%`,
      description:
        completeness >= 80
          ? "Your core business profile is almost complete."
          : "Complete missing business information.",
      icon: CheckCircle2,
      href: "/dashboard/business-profile",
    },
    {
      title: "Publication",
      value: selectedBusiness.status === "published" ? "Live" : "Not live",
      description:
        selectedBusiness.status === "published"
          ? "Your public business profile is published."
          : "Review and publish your business profile.",
      icon: FileCheck2,
      href: "/dashboard/publication",
    },
    {
      title: "Website",
      value: selectedBusiness.website ? "Connected" : "Missing",
      description: selectedBusiness.website
        ? selectedBusiness.website
        : "Add your business website and Connect script.",
      icon: Globe2,
      href: "/dashboard/website-connect",
    },
    {
      title: "Visibility audit",
      value: "Ready",
      description: "Measure profile quality and AI readiness.",
      icon: SearchCheck,
      href: "/dashboard/visibility-audit",
    },
  ];

  const quickActions = [
    {
      title: "Edit business profile",
      description: "Update contact information and description.",
      href: "/dashboard/business-profile",
      icon: Building2,
    },
    {
      title: "Manage locations",
      description: "Add branches, addresses and contact details.",
      href: "/dashboard/locations",
      icon: MapPin,
    },
    {
      title: "Connect website",
      description: "Install the Vizo script on your website.",
      href: "/dashboard/website-connect",
      icon: Globe2,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Business overview
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            {selectedBusiness.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <StatusBadge status={selectedBusiness.status} />

            {selectedBusiness.type?.name ? (
              <span className="text-sm font-semibold text-slate-500">
                {selectedBusiness.type.name}
              </span>
            ) : null}

            <span className="text-sm text-slate-400">
              {businesses.length}{" "}
              {businesses.length === 1 ? "business" : "businesses"} in your
              workspace
            </span>
          </div>
        </div>

        <Link
          href="/dashboard/businesses/create"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
        >
          <Plus size={17} />
          Add business
        </Link>
      </div>

      {!user?.email_verified_at ? (
        <div className="mt-7 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
          <Sparkles className="mt-0.5 shrink-0" size={20} />

          <div>
            <p className="font-black">Verify your email address</p>
            <p className="mt-1 text-sm text-amber-800">
              Verify your email before publishing business information.
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60"
            >
              <div className="flex items-start justify-between">
                <div className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={20} />
                </div>

                <ArrowRight
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                  size={18}
                />
              </div>

              <p className="mt-5 text-2xl font-black text-slate-950">
                {card.value}
              </p>

              <h2 className="mt-2 font-black text-slate-900">{card.title}</h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
                Profile progress
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Complete your business information
              </h2>
            </div>

            <span className="text-2xl font-black text-blue-600">
              {completeness}%
            </span>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-700"
              style={{
                width: `${completeness}%`,
              }}
            />
          </div>

          <p className="mt-5 leading-7 text-slate-500">
            Complete your business profile before publishing. Accurate
            information improves search visibility and helps AI platforms
            understand your business.
          </p>

          <Link
            href="/dashboard/business-profile"
            className="mt-6 inline-flex items-center gap-2 font-black text-blue-600"
          >
            Complete business profile
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="rounded-3xl bg-[#10173d] p-6 text-white sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-300">
            Business identity
          </p>

          <h2 className="mt-3 text-2xl font-black">{selectedBusiness.name}</h2>

          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-blue-100/55">Business ID</dt>
              <dd className="mt-1 font-bold">{selectedBusiness.public_id}</dd>
            </div>

            <div>
              <dt className="text-blue-100/55">Currency</dt>
              <dd className="mt-1 font-bold">{selectedBusiness.currency}</dd>
            </div>

            <div>
              <dt className="text-blue-100/55">Timezone</dt>
              <dd className="mt-1 font-bold">{selectedBusiness.timezone}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-black text-slate-950">Quick actions</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-lg"
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={19} />
                </div>

                <div>
                  <h3 className="font-black text-slate-900">{action.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

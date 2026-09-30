"use client";

import {
  ArrowRight,
  BadgeCheck,
  Braces,
  Check,
  CheckCircle2,
  Clipboard,
  Clock3,
  Code2,
  FileJson2,
  Link2,
  MapPinned,
  Network,
  PackageSearch,
  Search,
  ShieldCheck,
  Store,
  Tags,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const structuredItems = [
  {
    icon: Store,
    title: "Business identity",
    description:
      "Business name, description, business type, logo and contact information.",
  },
  {
    icon: MapPinned,
    title: "Locations",
    description:
      "Physical addresses, coordinates, service areas and location relationships.",
  },
  {
    icon: Clock3,
    title: "Opening hours",
    description:
      "Regular working hours, closed days and special operating schedules.",
  },
  {
    icon: Tags,
    title: "Services and prices",
    description:
      "Services, products, descriptions, currencies and available prices.",
  },
  {
    icon: Link2,
    title: "Website relationships",
    description:
      "Official website, social profiles and related business information.",
  },
  {
    icon: ShieldCheck,
    title: "Verified information",
    description:
      "Consistent information managed through the verified Vizo profile.",
  },
];

const benefits = [
  {
    icon: Search,
    title: "Better interpretation",
    description:
      "Search engines can interpret important business information without depending only on visible text.",
  },
  {
    icon: Network,
    title: "Clear relationships",
    description:
      "Platforms can understand how locations, services, prices and the main business are connected.",
  },
  {
    icon: PackageSearch,
    title: "Improved discovery",
    description:
      "Structured information creates a stronger foundation for search features and business discovery.",
  },
  {
    icon: CheckCircle2,
    title: "Consistent information",
    description:
      "Vizo publishes structured information from the same central business profile.",
  },
];

const schemaExample = `{
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "Aspecto Spa Saloon",
  "url": "https://aspectospasaloon.com",
  "telephone": "+250 7XX XXX XXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kigali",
    "addressCountry": "RW"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Monday",
      "opens": "08:00",
      "closes": "20:00"
    }
  ]
}`;

export function StructuredDataSection() {
  const [copied, setCopied] = useState(false);

  async function copyExample() {
    await navigator.clipboard.writeText(schemaExample);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <>
      <section
        id="structured-data"
        className="scroll-mt-20 overflow-hidden bg-white px-5 py-14 sm:px-8 lg:px-12 lg:py-18"
      >
        <div className="mx-auto max-w-[1350px]">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-black text-violet-700">
                <Braces className="size-4" />
                Structured data
              </p>

              <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.04em] text-[#10104b] sm:text-5xl">
                Make business information understandable to machines.
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-slate-600">
                A website may look clear to a customer while still being
                difficult for search engines and AI systems to interpret.
              </p>

              <p className="mt-4 max-w-xl leading-8 text-slate-600">
                Vizo creates Schema.org structured data that identifies your
                business, locations, hours, services and other important
                relationships.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Generated from your Vizo business profile",
                  "Published in the JSON-LD format",
                  "Based on Schema.org vocabulary",
                  "Updated when approved information changes",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>

                    <span className="text-sm font-bold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/register?intent=structured-data"
                className="group mt-8 inline-flex h-13 items-center justify-center gap-3 rounded-full bg-[#10104b] px-7 font-black text-white transition hover:bg-[#211e67]"
              >
                Add structured data
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="overflow-hidden rounded-[30px] bg-[#07152b] shadow-2xl shadow-slate-900/15">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-red-400" />
                  <span className="size-3 rounded-full bg-amber-400" />
                  <span className="size-3 rounded-full bg-emerald-400" />
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-white/45">
                  <FileJson2 className="size-4" />
                  application/ld+json
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/20 p-5">
                  <pre className="min-w-[550px] text-xs leading-6 text-blue-100 sm:text-sm">
                    <code>{schemaExample}</code>
                  </pre>
                </div>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-white/50">
                    Example structured information generated for a business.
                  </p>

                  <button
                    type="button"
                    onClick={copyExample}
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-[#07152b] transition hover:bg-blue-50"
                  >
                    {copied ? (
                      <CheckCircle2 className="size-4 text-emerald-600" />
                    ) : (
                      <Clipboard className="size-4" />
                    )}

                    {copied ? "Copied" : "Copy example"}
                  </button>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <BadgeCheck className="mt-0.5 size-5 shrink-0 text-emerald-300" />

                  <div>
                    <p className="text-sm font-black text-white">
                      Machine-readable business information
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/50">
                      This code is read by discovery platforms and does not
                      change the visible design of the website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-slate-200 pt-14">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-600">
                Information Vizo structures
              </p>

              <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-4xl">
                More than a business name and address
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Vizo connects individual business facts so platforms can
                understand the complete organization.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {structuredItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="group rounded-3xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
                  >
                    <span className="grid size-11 place-items-center rounded-2xl bg-violet-50 text-violet-700 transition group-hover:bg-violet-600 group-hover:text-white">
                      <Icon className="size-5" />
                    </span>

                    <h4 className="mt-5 font-black text-[#10104b]">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-600">
              Why it matters
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Help platforms interpret your business correctly.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Structured data does not guarantee a specific search ranking, but
              it removes ambiguity and gives discovery systems clearer business
              information.
            </p>

            <div className="mt-7 rounded-3xl border border-violet-100 bg-violet-50 p-6">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-violet-600 text-white">
                  <Code2 className="size-5" />
                </span>

                <div>
                  <h3 className="font-black text-[#10104b]">
                    No visible design changes
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    JSON-LD is placed inside the website source. Customers
                    continue seeing the existing website design.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="grid size-11 place-items-center rounded-2xl bg-violet-50 text-violet-700">
                    <Icon className="size-5" />
                  </span>

                  <h3 className="mt-5 text-lg font-black text-[#10104b]">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

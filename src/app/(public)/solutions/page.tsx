"use client";

import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  CheckCircle2,
  Clipboard,
  Code2,
  FileCode2,
  Gauge,
  Globe2,
  Link2,
  MapPinned,
  Network,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Webhook,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const solutions = [
  {
    id: "ai-visibility",
    icon: Bot,
    title: "AI visibility",
    description:
      "Prepare accurate information that helps AI assistants understand what your business does, where it operates and what it offers.",
    benefits: [
      "AI-readable business information",
      "Clear services and offerings",
      "Consistent location information",
    ],
  },
  {
    id: "business-profile",
    icon: Store,
    title: "Business profile",
    description:
      "Manage important information about your business from one central profile instead of updating disconnected platforms manually.",
    benefits: [
      "Business identity and contacts",
      "Locations and opening hours",
      "Services, prices and descriptions",
    ],
  },
  {
    id: "structured-data",
    icon: FileCode2,
    title: "Structured data",
    description:
      "Publish machine-readable information that allows search engines and other discovery platforms to interpret your website.",
    benefits: [
      "Schema.org business data",
      "Service and location relationships",
      "Machine-readable website content",
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Visibility analytics",
    description:
      "Monitor business information, technical installation and content quality through understandable visibility measurements.",
    benefits: [
      "Visibility score",
      "Profile completeness",
      "Prioritized recommendations",
    ],
  },
];

const connectionFeatures = [
  {
    icon: Zap,
    title: "Lightweight",
    description:
      "Designed to connect without replacing or slowing down your existing website.",
  },
  {
    icon: RefreshCw,
    title: "Automatically updated",
    description:
      "Approved business information can update when you change it inside Vizo.",
  },
  {
    icon: ShieldCheck,
    title: "Controlled",
    description:
      "Only information belonging to the connected business profile is published.",
  },
  {
    icon: Network,
    title: "Platform ready",
    description:
      "Information is prepared for websites, search engines and AI discovery.",
  },
];

const publishedInformation = [
  {
    icon: Store,
    label: "Business identity",
    value: "Name, description and business type",
  },
  {
    icon: MapPinned,
    label: "Locations",
    value: "Address, coordinates and service areas",
  },
  {
    icon: Globe2,
    label: "Opening hours",
    value: "Regular, special and holiday hours",
  },
  {
    icon: Search,
    label: "Services",
    value: "Offerings, descriptions and prices",
  },
];

const installationSteps = [
  {
    number: "01",
    title: "Create your business profile",
    description:
      "Add and verify the essential information customers need about your business.",
  },
  {
    number: "02",
    title: "Receive your Site ID",
    description:
      "Vizo creates a unique identifier that connects the correct business to its website.",
  },
  {
    number: "03",
    title: "Install one script",
    description:
      "Add the Website Connect script before the closing body tag on your website.",
  },
  {
    number: "04",
    title: "Verify the connection",
    description:
      "Vizo confirms the installation and begins monitoring your website connection.",
  },
];

export default function SolutionsPage() {
  const [copied, setCopied] = useState(false);

  const connectScript =
    '<script src="https://www.vizo.asyncafrica.com/connect.js?site_id=YOUR_SITE_ID"></script>';

  async function copyScript() {
    await navigator.clipboard.writeText(connectScript);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-[#07152b] px-5 pb-16 pt-36 text-white sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
        <div className="absolute -left-32 top-24 size-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1350px] items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div className="max-w-3xl animate-[solutionEnter_700ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles className="size-4 text-blue-300" />
              Vizo solutions
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              Build a stronger visibility foundation for your business.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Organize business information, connect your website and prepare
              your business for search engines, maps and AI discovery.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#website-connect"
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#07152b] transition hover:bg-blue-50"
              >
                Explore Website Connect
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </a>

              <Link
                href="/audit"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 font-bold backdrop-blur transition hover:bg-white/20"
              >
                Check visibility
              </Link>
            </div>
          </div>

          <div className="hidden animate-[solutionEnter_700ms_140ms_ease-out_both] grid-cols-2 gap-3 sm:grid">
            {solutions.map((solution) => {
              const Icon = solution.icon;

              return (
                <a
                  key={solution.id}
                  href={`#${solution.id}`}
                  className="group rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
                >
                  <span className="grid size-10 place-items-center rounded-2xl bg-blue-500/20 text-blue-200">
                    <Icon className="size-5" />
                  </span>

                  <p className="mt-4 font-black">{solution.title}</p>

                  <ArrowRight className="mt-4 size-4 text-white/40 transition group-hover:translate-x-1 group-hover:text-white" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-[1350px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Visibility tools
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Everything starts with accurate information
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Vizo helps your business create, publish and maintain the
              information used by modern discovery platforms.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;

              return (
                <article
                  key={solution.id}
                  id={solution.id}
                  style={{ animationDelay: `${index * 80}ms` }}
                  className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 opacity-0 shadow-sm animate-[solutionCard_600ms_ease-out_forwards] transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                      <Icon className="size-6" />
                    </span>

                    <span className="text-5xl font-black text-slate-100">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-black tracking-[-0.03em] text-[#10104b]">
                    {solution.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                    {solution.description}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {solution.benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                        <span className="text-xs font-bold leading-5 text-slate-700">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="website-connect"
        className="scroll-mt-20 bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18"
      >
        <div className="mx-auto max-w-[1350px]">
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-700">
                <Webhook className="size-4" />
                Website Connect
              </p>

              <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
                Connect Vizo without replacing your website.
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-slate-600">
                Website Connect is a lightweight script that connects your
                existing website to the verified business information managed
                inside Vizo.
              </p>

              <p className="mt-4 max-w-xl leading-8 text-slate-600">
                Your website keeps its current design. Vizo adds the technical
                visibility layer needed by search engines and AI systems.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Works with an existing website",
                  "Requires only one script",
                  "No redesign or platform migration",
                  "Managed through your Vizo dashboard",
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
            </div>

            <div className="overflow-hidden rounded-[30px] bg-[#07152b] shadow-2xl shadow-slate-900/15">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-red-400" />
                  <span className="size-3 rounded-full bg-amber-400" />
                  <span className="size-3 rounded-full bg-emerald-400" />
                </div>

                <span className="text-xs font-bold text-white/45">
                  Website installation
                </span>
              </div>

              <div className="p-5 sm:p-8">
                <div className="flex items-center gap-3 text-blue-300">
                  <Code2 className="size-5" />
                  <span className="text-sm font-black">
                    Add before &lt;/body&gt;
                  </span>
                </div>

                <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/25 p-5">
                  <code className="whitespace-nowrap text-sm leading-7 text-blue-100">
                    {connectScript}
                  </code>
                </div>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-white/55">
                    Replace YOUR_SITE_ID with your Vizo Site ID.
                  </p>

                  <button
                    type="button"
                    onClick={copyScript}
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-[#07152b] transition hover:bg-blue-50"
                  >
                    {copied ? (
                      <CheckCircle2 className="size-4 text-emerald-600" />
                    ) : (
                      <Clipboard className="size-4" />
                    )}

                    {copied ? "Copied" : "Copy script"}
                  </button>
                </div>

                <div className="mt-7 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-300" />

                    <div>
                      <p className="text-sm font-black text-white">
                        Connected websites remain under your control
                      </p>
                      <p className="mt-1 text-xs leading-5 text-white/55">
                        Removing the script disconnects Website Connect without
                        removing or changing the website itself.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {connectionFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-slate-200 bg-white p-5"
                >
                  <span className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="size-5" />
                  </span>

                  <h3 className="mt-5 font-black text-[#10104b]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-2">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-600">
                  Connected profile
                </p>
                <h3 className="mt-2 text-2xl font-black text-[#10104b]">
                  Aspecto Spa
                </h3>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                Connected
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {publishedInformation.map((information) => {
                const Icon = information.icon;

                return (
                  <div
                    key={information.label}
                    className="grid grid-cols-[42px_1fr] gap-3 rounded-2xl bg-slate-50 p-4"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-white text-blue-700 shadow-sm">
                      <Icon className="size-5" />
                    </span>

                    <div>
                      <p className="text-sm font-black text-[#10104b]">
                        {information.label}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {information.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Published information
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Help discovery platforms understand the complete business.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Website Connect creates a relationship between your website and
              the verified information stored in your Vizo business profile.
            </p>

            <div className="mt-7 rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white">
                  <Gauge className="size-5" />
                </span>

                <div>
                  <h3 className="font-black text-[#10104b]">
                    Connection monitoring
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Vizo can check whether the installation remains available
                    and report connection problems through your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-[1350px]">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Installation process
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Connect the website in four steps
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {installationSteps.map((step) => (
              <article
                key={step.number}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6"
              >
                <span className="absolute -right-3 -top-6 text-8xl font-black text-slate-50">
                  {step.number}
                </span>

                <span className="relative grid size-11 place-items-center rounded-2xl bg-[#10104b] text-sm font-black text-white">
                  {step.number}
                </span>

                <h3 className="relative mt-6 text-lg font-black text-[#10104b]">
                  {step.title}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto flex max-w-[1250px] flex-col items-center justify-between gap-7 rounded-[32px] bg-[#10104b] p-7 text-white sm:p-10 lg:flex-row lg:p-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-300">
              <Link2 className="size-5" />
              <span className="text-sm font-black">
                Connect your existing website
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Give your website a stronger visibility layer.
            </h2>

            <p className="mt-3 leading-7 text-white/65">
              Create your business profile, receive a Site ID and connect your
              website using one script.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/register?intent=website-connect"
              className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#10104b] transition hover:bg-blue-50"
            >
              Get Website Connect
              <ArrowRight className="size-5 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 px-7 font-bold transition hover:bg-white/10"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes solutionEnter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes solutionCard {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

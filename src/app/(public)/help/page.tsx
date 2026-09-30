"use client";

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  Code2,
  KeyRound,
  LifeBuoy,
  Mail,
  MessageCircle,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Guide = {
  title: string;
  description: string;
  href: string;
  category: string;
};

const categories = [
  {
    icon: UserRound,
    title: "Account and access",
    description: "Registration, sign-in, passwords and account verification.",
    href: "#account",
  },
  {
    icon: Building2,
    title: "Business profile",
    description: "Business details, locations, opening hours and services.",
    href: "#business-profile",
  },
  {
    icon: Code2,
    title: "Website Connect",
    description: "Installation, Site IDs, verification and connection issues.",
    href: "#website-connect",
  },
  {
    icon: Bot,
    title: "AI visibility",
    description: "AI readiness, structured information and recommendations.",
    href: "#ai-visibility",
  },
  {
    icon: BarChart3,
    title: "Audits and analytics",
    description: "Visibility scores, measurements and improvement tasks.",
    href: "#analytics",
  },
  {
    icon: CircleDollarSign,
    title: "Plans and billing",
    description: "Pricing plans, upgrades and additional services.",
    href: "#billing",
  },
];

const guides: Guide[] = [
  {
    title: "Create a Vizo account",
    description:
      "Register your account and complete the required user information.",
    href: "/register",
    category: "Account and access",
  },
  {
    title: "Sign in to your account",
    description:
      "Access the Vizo dashboard using your registered email and password.",
    href: "/login",
    category: "Account and access",
  },
  {
    title: "Reset a forgotten password",
    description:
      "Request a secure password-reset link using your account email.",
    href: "/forgot-password",
    category: "Account and access",
  },
  {
    title: "Verify your email address",
    description:
      "Understand why email verification is required for your account.",
    href: "/verify-email",
    category: "Account and access",
  },
  {
    title: "Create a business profile",
    description:
      "Add your business identity, business type, description and contacts.",
    href: "/how-it-works#process",
    category: "Business profile",
  },
  {
    title: "Add business locations",
    description: "Organize addresses, coordinates, branches and service areas.",
    href: "/how-it-works#process",
    category: "Business profile",
  },
  {
    title: "Add opening hours",
    description:
      "Publish regular schedules, closed days and special working hours.",
    href: "/how-it-works#process",
    category: "Business profile",
  },
  {
    title: "Add services and prices",
    description:
      "Create categories and describe the products or services you offer.",
    href: "/how-it-works#process",
    category: "Business profile",
  },
  {
    title: "Understand Website Connect",
    description:
      "Learn how the connection works without replacing your website.",
    href: "/solutions#website-connect",
    category: "Website Connect",
  },
  {
    title: "Install the connection script",
    description:
      "Add the Vizo script before the closing body tag on your website.",
    href: "/solutions#website-connect",
    category: "Website Connect",
  },
  {
    title: "Find your Site ID",
    description:
      "Learn where the unique website connection identifier is used.",
    href: "/solutions#website-connect",
    category: "Website Connect",
  },
  {
    title: "Fix a disconnected website",
    description:
      "Review common reasons why Website Connect cannot be detected.",
    href: "#website-troubleshooting",
    category: "Website Connect",
  },
  {
    title: "Understand AI visibility",
    description:
      "See which business information helps AI systems understand a business.",
    href: "/solutions#ai-visibility",
    category: "AI visibility",
  },
  {
    title: "Improve AI readiness",
    description:
      "Review services, locations, descriptions and structured information.",
    href: "/audit",
    category: "AI visibility",
  },
  {
    title: "Understand structured data",
    description:
      "Learn how Schema.org and JSON-LD describe business information.",
    href: "/solutions#structured-data",
    category: "AI visibility",
  },
  {
    title: "Run a business visibility audit",
    description: "Check profile completeness, website status and AI readiness.",
    href: "/audit",
    category: "Audits and analytics",
  },
  {
    title: "Understand the visibility score",
    description:
      "Learn how individual visibility measurements contribute to the score.",
    href: "/solutions#analytics",
    category: "Audits and analytics",
  },
  {
    title: "Use improvement recommendations",
    description:
      "Prioritize the tasks that can strengthen your visibility foundation.",
    href: "/solutions#analytics",
    category: "Audits and analytics",
  },
  {
    title: "Compare Vizo plans",
    description:
      "Review available plans and choose one for your business needs.",
    href: "/pricing",
    category: "Plans and billing",
  },
  {
    title: "Request a custom solution",
    description:
      "Contact Vizo about websites, advertising or multi-location support.",
    href: "/contact",
    category: "Plans and billing",
  },
];

const frequentlyAskedQuestions = [
  {
    question: "Does Vizo replace my existing website?",
    answer:
      "No. Website Connect adds a visibility layer to your existing website. Your current design, content-management system and hosting remain in place.",
  },
  {
    question: "Does Vizo guarantee a Google ranking?",
    answer:
      "No. Vizo improves the quality, consistency and accessibility of business information, but search engines and AI platforms control their own ranking and recommendation decisions.",
  },
  {
    question: "Can Vizo create a website for my business?",
    answer:
      "Yes. Website development can be provided as an additional service when a business does not have a suitable website.",
  },
  {
    question: "Can one account manage multiple locations?",
    answer:
      "The Vizo business structure is designed to support business locations. Exact limits can depend on the selected plan.",
  },
  {
    question: "Can Vizo manage my Google Business Profile?",
    answer:
      "Vizo can help improve and organize the information used for Google Business Profile and local visibility. Access to the business profile may be required.",
  },
  {
    question: "Is Vizo a booking or payment system?",
    answer:
      "No. Vizo is a business-visibility platform. It can work alongside booking, payment, POS and business-management systems.",
  },
];

const troubleshootingSteps = [
  {
    number: "01",
    title: "Confirm the correct Site ID",
    description:
      "Check that the script contains the Site ID assigned to the correct business.",
  },
  {
    number: "02",
    title: "Check script placement",
    description:
      "The script should appear before the closing body tag on the published website.",
  },
  {
    number: "03",
    title: "Clear website caches",
    description:
      "Clear website, optimization and CDN caches after installing the script.",
  },
  {
    number: "04",
    title: "Verify the public website",
    description:
      "Confirm that visitors can open the website without authentication or maintenance mode.",
  },
];

export default function HelpPage() {
  const [query, setQuery] = useState("");

  const filteredGuides = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return guides.slice(0, 8);
    }

    return guides.filter((guide) =>
      [guide.title, guide.description, guide.category]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-[#07152b] px-5 pb-16 pt-36 text-white sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
        <div className="absolute -left-32 top-28 size-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-36 bottom-0 size-[440px] rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center animate-[helpEnter_700ms_ease-out_both]">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black backdrop-blur">
            <LifeBuoy className="size-4 text-blue-300" />
            Vizo Help Centre
          </p>

          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
            How can we help you?
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            Find guidance about your account, business profile, Website Connect,
            AI visibility, audits and pricing.
          </p>

          <div className="relative mx-auto mt-8 max-w-2xl">
            <Search className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the Help Centre..."
              aria-label="Search Help Centre"
              className="h-15 w-full rounded-2xl border border-white/15 bg-white pl-14 pr-5 text-base text-slate-900 shadow-2xl outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-400/30"
            />
          </div>
        </div>
      </section>

      {query.trim() ? (
        <section className="bg-[#f7f8fc] px-5 py-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1150px]">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.15em] text-blue-600">
                  Search results
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#10104b]">
                  {filteredGuides.length} result
                  {filteredGuides.length === 1 ? "" : "s"} for “{query}”
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-sm font-black text-blue-700"
              >
                Clear search
              </button>
            </div>

            {filteredGuides.length ? (
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {filteredGuides.map((guide) => (
                  <GuideCard key={guide.title} guide={guide} />
                ))}
              </div>
            ) : (
              <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-8 text-center">
                <CircleHelp className="mx-auto size-10 text-slate-300" />
                <h3 className="mt-4 text-lg font-black text-[#10104b]">
                  No guide matched your search
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Try a shorter phrase or contact the Vizo team.
                </p>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 font-black text-blue-700"
                >
                  Contact support
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      ) : null}

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-[1350px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Browse help topics
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Choose the area you need help with
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => {
              const Icon = category.icon;

              return (
                <a
                  key={category.title}
                  href={category.href}
                  style={{ animationDelay: `${index * 70}ms` }}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 opacity-0 shadow-sm animate-[helpCard_600ms_ease-out_forwards] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="size-5" />
                    </span>

                    <ChevronRight className="size-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-[#10104b]">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {category.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <HelpCategory
        id="account"
        title="Account and access"
        description="Create and securely access your Vizo account."
        icon={KeyRound}
        guides={guides.filter(
          (guide) => guide.category === "Account and access",
        )}
      />

      <HelpCategory
        id="business-profile"
        title="Business profile"
        description="Manage the information that describes your business."
        icon={Building2}
        guides={guides.filter((guide) => guide.category === "Business profile")}
        alternate
      />

      <HelpCategory
        id="website-connect"
        title="Website Connect"
        description="Connect Vizo to your existing business website."
        icon={Code2}
        guides={guides.filter((guide) => guide.category === "Website Connect")}
      />

      <section
        id="website-troubleshooting"
        className="scroll-mt-24 bg-[#07152b] px-5 py-14 text-white sm:px-8 lg:px-12 lg:py-18"
      >
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-blue-300">
                <Wrench className="size-6" />
              </span>

              <p className="mt-6 text-sm font-black uppercase tracking-[0.16em] text-blue-300">
                Connection troubleshooting
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                Website Connect is not detected?
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-white/60">
                Complete these checks before contacting technical support.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {troubleshootingSteps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <span className="grid size-10 place-items-center rounded-2xl bg-blue-500 text-sm font-black">
                    {step.number}
                  </span>

                  <h3 className="mt-5 font-black">{step.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HelpCategory
        id="ai-visibility"
        title="AI visibility"
        description="Prepare your business information for AI discovery."
        icon={Bot}
        guides={guides.filter((guide) => guide.category === "AI visibility")}
      />

      <HelpCategory
        id="analytics"
        title="Audits and analytics"
        description="Understand visibility measurements and recommendations."
        icon={BarChart3}
        guides={guides.filter(
          (guide) => guide.category === "Audits and analytics",
        )}
        alternate
      />

      <HelpCategory
        id="billing"
        title="Plans and billing"
        description="Choose a plan and request additional services."
        icon={CircleDollarSign}
        guides={guides.filter(
          (guide) => guide.category === "Plans and billing",
        )}
      />

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-100 text-blue-700">
              <CircleHelp className="size-6" />
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {frequentlyAskedQuestions.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-lg"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-black text-[#10104b]">
                  {item.question}

                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-lg transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1250px] gap-5 lg:grid-cols-2">
          <div className="rounded-[30px] bg-[#10104b] p-7 text-white sm:p-9">
            <MessageCircle className="size-7 text-blue-300" />

            <h2 className="mt-5 text-2xl font-black tracking-[-0.03em]">
              Still need help?
            </h2>

            <p className="mt-3 leading-7 text-white/60">
              Send the Vizo team a message with your account email, business
              name and a clear description of the problem.
            </p>

            <Link
              href="/contact"
              className="group mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-black text-[#10104b]"
            >
              Contact support
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-7 sm:p-9">
            <Mail className="size-7 text-blue-600" />

            <h2 className="mt-5 text-2xl font-black tracking-[-0.03em] text-[#10104b]">
              Email technical support
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              For a technical problem, include the affected website address,
              screenshots and the steps that caused the issue.
            </p>

            <a
              href="mailto:shyakas83@gmail.com?subject=Vizo%20technical%20support"
              className="group mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 font-black text-white"
            >
              Send support email
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes helpEnter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes helpCard {
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

function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={guide.href}
      className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-lg"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
        <BookOpen className="size-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs font-black uppercase tracking-[0.12em] text-blue-600">
          {guide.category}
        </span>

        <span className="mt-1 block font-black text-[#10104b]">
          {guide.title}
        </span>

        <span className="mt-2 block text-sm leading-6 text-slate-600">
          {guide.description}
        </span>
      </span>

      <ChevronRight className="mt-2 size-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
    </Link>
  );
}

function HelpCategory({
  id,
  title,
  description,
  icon: Icon,
  guides: categoryGuides,
  alternate = false,
}: {
  id: string;
  title: string;
  description: string;
  icon: typeof Settings;
  guides: Guide[];
  alternate?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-5 py-14 sm:px-8 lg:px-12 lg:py-18 ${
        alternate ? "bg-[#f7f8fc]" : "bg-white"
      }`}
    >
      <div className="mx-auto grid max-w-[1250px] gap-8 lg:grid-cols-[0.45fr_1.55fr]">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-blue-100 text-blue-700">
            <Icon className="size-6" />
          </span>

          <h2 className="mt-5 text-2xl font-black tracking-[-0.03em] text-[#10104b]">
            {title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {categoryGuides.map((guide) => (
            <GuideCard key={guide.title} guide={guide} />
          ))}
        </div>
      </div>
    </section>
  );
}

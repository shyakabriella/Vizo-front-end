import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Check,
  CheckCircle2,
  CircleAlert,
  Code2,
  FileCheck2,
  Gauge,
  Globe2,
  Lightbulb,
  Link2,
  ListChecks,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const auditChecks = [
  {
    icon: FileCheck2,
    title: "Profile completeness",
    description:
      "Checks whether customers and discovery platforms can find your essential business information.",
    score: 82,
    color: "bg-emerald-500",
  },
  {
    icon: Globe2,
    title: "Website reachability",
    description:
      "Confirms that your website is accessible, secure and easy for discovery systems to visit.",
    score: 94,
    color: "bg-emerald-500",
  },
  {
    icon: Code2,
    title: "Structured data",
    description:
      "Reviews whether your website contains valid business information in machine-readable formats.",
    score: 48,
    color: "bg-amber-500",
  },
  {
    icon: Link2,
    title: "Installation status",
    description:
      "Checks whether Website Connect and other required visibility tools are correctly installed.",
    score: 65,
    color: "bg-blue-500",
  },
  {
    icon: ListChecks,
    title: "Content quality",
    description:
      "Examines the clarity, consistency and usefulness of your business descriptions and services.",
    score: 73,
    color: "bg-blue-500",
  },
  {
    icon: Bot,
    title: "AI readiness",
    description:
      "Measures whether AI systems can understand your business, location, services and credibility.",
    score: 56,
    color: "bg-amber-500",
  },
];

const recommendations = [
  {
    icon: CircleAlert,
    title: "Add structured business data",
    description:
      "Your website needs machine-readable information about the business, services and location.",
    priority: "High priority",
    style: "bg-red-50 text-red-700",
  },
  {
    icon: Lightbulb,
    title: "Improve service descriptions",
    description:
      "Provide clearer information about services, pricing, availability and customer benefits.",
    priority: "Recommended",
    style: "bg-amber-50 text-amber-700",
  },
  {
    icon: ShieldCheck,
    title: "Verify business information",
    description:
      "Confirm that the same name, telephone number, location and hours appear across platforms.",
    priority: "Important",
    style: "bg-blue-50 text-blue-700",
  },
];

const auditSteps = [
  {
    number: "01",
    title: "Enter your website",
    description:
      "Provide your website address and basic information about your business.",
  },
  {
    number: "02",
    title: "Vizo checks visibility signals",
    description:
      "We inspect technical setup, business content, structured information and AI readiness.",
  },
  {
    number: "03",
    title: "Receive your visibility score",
    description:
      "Your results are organized into clear categories so you can understand your current position.",
  },
  {
    number: "04",
    title: "Improve weak areas",
    description:
      "Follow prioritized recommendations or use Vizo to implement the required improvements.",
  },
];

function ScoreRing({ score }: { score: number }) {
  const degrees = score * 3.6;

  return (
    <div
      className="relative grid size-44 place-items-center rounded-full"
      style={{
        background: `conic-gradient(#2563eb ${degrees}deg, #dbeafe ${degrees}deg)`,
      }}
    >
      <div className="grid size-36 place-items-center rounded-full bg-white shadow-inner">
        <div className="text-center">
          <p className="text-5xl font-black tracking-[-0.06em] text-[#10104b]">
            {score}
          </p>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            Out of 100
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuditPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-[#07152b] px-5 pb-16 pt-36 text-white sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
        <div className="absolute -left-32 top-28 size-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-40 bottom-0 size-[460px] rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div className="max-w-3xl animate-[auditEnter_700ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles className="size-4 text-blue-300" />
              Business Visibility Audit
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              Discover what is limiting your business visibility.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Measure how well your website and business information are
              prepared for search engines, local discovery and AI platforms.
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              {[
                "Clear visibility score",
                "Actionable recommendations",
                "No technical experience needed",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-[auditEnter_700ms_140ms_ease-out_both] rounded-[28px] border border-white/15 bg-white p-6 text-slate-900 shadow-2xl sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-blue-100 text-blue-700">
                <Gauge className="size-5" />
              </span>

              <div>
                <h2 className="font-black text-[#10104b]">
                  Start your visibility audit
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Enter your website to begin.
                </p>
              </div>
            </div>

            <form action="/register" method="get" className="mt-6 space-y-4">
              <input type="hidden" name="intent" value="business-audit" />

              <div>
                <label
                  htmlFor="business-name"
                  className="text-sm font-bold text-slate-700"
                >
                  Business name
                </label>

                <input
                  id="business-name"
                  name="business"
                  type="text"
                  required
                  placeholder="Example: Aspecto Spa"
                  className="mt-2 h-13 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="text-sm font-bold text-slate-700"
                >
                  Website address
                </label>

                <div className="relative mt-2">
                  <Globe2 className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="website"
                    name="website"
                    type="url"
                    required
                    placeholder="https://yourbusiness.com"
                    className="h-13 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 font-black text-white transition hover:bg-blue-700"
              >
                Start my audit
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </button>

              <p className="text-center text-xs leading-5 text-slate-400">
                Create your Vizo account to receive and manage your audit.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-[1350px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              What Vizo measures
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Six important visibility signals
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              The audit separates technical and business information into simple
              categories that are easy to understand.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {auditChecks.map((check, index) => {
              const Icon = check.icon;

              return (
                <article
                  key={check.title}
                  style={{ animationDelay: `${index * 70}ms` }}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 opacity-0 shadow-sm animate-[auditCard_600ms_ease-out_forwards] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="size-5" />
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600">
                      Example: {check.score}%
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-black text-[#10104b]">
                    {check.title}
                  </h3>

                  <p className="mt-2 min-h-18 text-sm leading-6 text-slate-600">
                    {check.description}
                  </p>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${check.color}`}
                      style={{ width: `${check.score}%` }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="flex justify-center">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5">
              <p className="text-center text-sm font-black uppercase tracking-[0.15em] text-blue-600">
                Example score
              </p>

              <div className="mt-7">
                <ScoreRing score={69} />
              </div>

              <div className="mt-6 rounded-2xl bg-amber-50 px-5 py-4 text-center">
                <p className="font-black text-amber-800">Needs improvement</p>
                <p className="mt-1 text-xs leading-5 text-amber-700">
                  Strong foundation, but important visibility signals are
                  missing.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Clear recommendations
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Know exactly what to improve next.
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-slate-600">
              A score alone is not enough. Vizo explains what is missing, why it
              matters and which improvements should be completed first.
            </p>

            <div className="mt-8 space-y-3">
              {recommendations.map((recommendation) => {
                const Icon = recommendation.icon;

                return (
                  <article
                    key={recommendation.title}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-[48px_1fr_auto] sm:items-center"
                  >
                    <span
                      className={`grid size-12 place-items-center rounded-2xl ${recommendation.style}`}
                    >
                      <Icon className="size-5" />
                    </span>

                    <div>
                      <h3 className="font-black text-[#10104b]">
                        {recommendation.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {recommendation.description}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1.5 text-xs font-black ${recommendation.style}`}
                    >
                      {recommendation.priority}
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-[1350px]">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Audit process
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              From your website to an improvement plan
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {auditSteps.map((step, index) => (
              <article
                key={step.number}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6"
              >
                <span className="absolute -right-2 -top-5 text-8xl font-black text-slate-50">
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

                {index < auditSteps.length - 1 ? (
                  <ArrowRight className="relative mt-5 size-5 text-blue-500 lg:hidden" />
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20">
        <div className="mx-auto flex max-w-[1250px] flex-col items-center justify-between gap-7 rounded-[32px] bg-[#10104b] p-7 text-white sm:p-10 lg:flex-row lg:p-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-300">
              <BadgeCheck className="size-5" />
              <span className="text-sm font-black">
                Understand your current visibility
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Find the visibility gaps holding your business back.
            </h2>

            <p className="mt-3 leading-7 text-white/65">
              Start with an audit, receive clear recommendations and improve
              your visibility one step at a time.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#top"
              className="hidden"
              aria-hidden="true"
              tabIndex={-1}
            />

            <Link
              href="/register?intent=business-audit"
              className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#10104b] transition hover:bg-blue-50"
            >
              Start my audit
              <ArrowRight className="size-5 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 px-7 font-bold transition hover:bg-white/10"
            >
              How Vizo works
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes auditEnter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes auditCard {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
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

import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  FileText,
  HelpCircle,
  MapPinned,
  MessageSquareText,
  Network,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Store,
  Tags,
} from "lucide-react";
import Link from "next/link";

const informationTypes = [
  {
    icon: Store,
    title: "Business identity",
    description:
      "A clear business name, category, description and contact information.",
  },
  {
    icon: MapPinned,
    title: "Locations and hours",
    description:
      "Accurate addresses, operating hours, service areas and availability.",
  },
  {
    icon: Tags,
    title: "Services and prices",
    description:
      "Detailed offerings, prices, features and important customer information.",
  },
  {
    icon: ShieldCheck,
    title: "Trust information",
    description:
      "Verified details, consistent information and clear ownership signals.",
  },
];

const preparationSteps = [
  {
    number: "01",
    icon: FileText,
    title: "Collect",
    description:
      "Vizo gathers the information that clearly describes your business.",
  },
  {
    number: "02",
    icon: Network,
    title: "Structure",
    description:
      "Information is organized into relationships machines can understand.",
  },
  {
    number: "03",
    icon: SearchCheck,
    title: "Publish",
    description:
      "The information is made available through AI-ready website formats.",
  },
  {
    number: "04",
    icon: BrainCircuit,
    title: "Monitor",
    description:
      "Vizo checks completeness and identifies visibility improvements.",
  },
];

const readinessChecks = [
  "The business purpose is clearly explained",
  "Locations and opening hours are accurate",
  "Services contain useful descriptions",
  "Important information is consistent",
  "The website contains structured data",
  "AI systems can identify business relationships",
];

export function AiVisibilitySection() {
  return (
    <section
      id="ai-visibility"
      className="scroll-mt-20 overflow-hidden bg-[#07152b] px-5 py-14 text-white sm:px-8 lg:px-12 lg:py-18"
    >
      <div className="mx-auto max-w-[1350px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-blue-200">
              <Bot className="size-4" />
              AI visibility
            </p>

            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
              Help AI systems understand and recommend your business.
            </h2>

            <p className="mt-5 max-w-2xl leading-8 text-white/65">
              AI assistants cannot confidently recommend a business when its
              information is incomplete, inconsistent or difficult for
              machines to understand.
            </p>

            <p className="mt-4 max-w-2xl leading-8 text-white/65">
              Vizo creates a clear information foundation that explains who
              your business is, what it offers, where it operates and how
              customers can reach it.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register?intent=ai-visibility"
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#07152b] transition hover:bg-blue-50"
              >
                Improve AI visibility
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/audit"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 font-bold transition hover:bg-white/15"
              >
                Check AI readiness
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-blue-500/15 blur-3xl" />

            <div className="relative rounded-[30px] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-blue-500 text-white">
                    <Sparkles className="size-5" />
                  </span>

                  <div>
                    <p className="text-xs font-bold text-white/45">
                      AI business discovery
                    </p>
                    <p className="font-black">Customer question</p>
                  </div>
                </div>

                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>

              <div className="mt-5 flex justify-end">
                <div className="max-w-[88%] rounded-2xl rounded-br-md bg-white px-4 py-3 text-sm leading-6 text-[#10104b]">
                  Find a professional spa in Kigali offering deep tissue
                  massage today.
                </div>
              </div>

              <div className="mt-4 rounded-2xl rounded-bl-md border border-blue-300/20 bg-blue-500/15 p-4">
                <div className="flex items-center gap-2 text-xs font-black text-blue-200">
                  <Bot className="size-4" />
                  AI response using verified information
                </div>

                <p className="mt-3 font-black">Aspecto Spa Saloon</p>

                <p className="mt-2 text-sm leading-6 text-white/65">
                  A professional wellness business in Kigali offering deep
                  tissue massage and beauty services. It is currently open and
                  accepts customer enquiries.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-xs text-white/40">Location</p>
                    <p className="mt-1 text-sm font-bold">Kigali</p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-xs text-white/40">Status</p>
                    <p className="mt-1 text-sm font-bold text-emerald-300">
                      Open today
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                <BadgeCheck className="size-4 text-emerald-300" />
                Business information prepared by Vizo
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-14">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-300">
              What AI needs
            </p>

            <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Clear information creates confident recommendations.
            </h3>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {informationTypes.map((information) => {
              const Icon = information.icon;

              return (
                <article
                  key={information.title}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <span className="grid size-11 place-items-center rounded-2xl bg-blue-500/20 text-blue-200 transition group-hover:bg-blue-500 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>

                  <h4 className="mt-5 font-black">{information.title}</h4>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {information.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AiVisibilityDetails() {
  return (
    <>
      <section className="bg-white px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
                How Vizo prepares information
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
                From business facts to AI-ready knowledge.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-600">
                Vizo does not simply add keywords. It organizes meaningful
                business information and publishes it in formats modern
                discovery systems can interpret.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {preparationSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.number}
                    className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <span className="absolute -right-3 -top-7 text-8xl font-black text-slate-50">
                      {step.number}
                    </span>

                    <span className="relative grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                      <Icon className="size-5" />
                    </span>

                    <h3 className="relative mt-5 text-lg font-black text-[#10104b]">
                      {step.title}
                    </h3>

                    <p className="relative mt-2 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-2">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#10104b] text-white">
                <BrainCircuit className="size-5" />
              </span>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
                  AI readiness
                </p>
                <h3 className="mt-1 text-xl font-black text-[#10104b]">
                  Business information check
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {readinessChecks.map((check, index) => (
                <div
                  key={check}
                  className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"
                >
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full ${
                      index < 4
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {index < 4 ? (
                      <Check className="size-3.5" strokeWidth={3} />
                    ) : (
                      <HelpCircle className="size-3.5" />
                    )}
                  </span>

                  <span className="text-sm font-semibold text-slate-700">
                    {check}
                  </span>

                  <span
                    className={`ml-auto text-xs font-black ${
                      index < 4 ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {index < 4 ? "Ready" : "Improve"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              AI readiness audit
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Find what prevents AI from understanding your business.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Vizo reviews important business information and technical
              visibility signals. You receive a clear score and prioritized
              recommendations instead of a confusing technical report.
            </p>

            <div className="mt-7 rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white">
                  <MessageSquareText className="size-5" />
                </span>

                <div>
                  <h3 className="font-black text-[#10104b]">
                    Better information, not guaranteed rankings
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Vizo improves the quality and accessibility of your
                    business information. Individual AI platforms decide which
                    businesses they mention in their responses.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/audit"
              className="group mt-7 inline-flex h-13 items-center justify-center gap-3 rounded-full bg-[#10104b] px-7 font-black text-white transition hover:bg-[#211e67]"
            >
              Check my AI readiness
              <ArrowRight className="size-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

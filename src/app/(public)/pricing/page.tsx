import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Check,
  CircleHelp,
  Code2,
  Globe2,
  MapPinned,
  Megaphone,
  Search,
  Share2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { PricingSection } from "@/components/public/pricing-section";

const includedServices = [
  {
    icon: Search,
    title: "Search visibility",
    description:
      "Improve how customers discover your business through search engines.",
  },
  {
    icon: Bot,
    title: "AI visibility",
    description:
      "Prepare your business information for AI assistants and AI search.",
  },
  {
    icon: Globe2,
    title: "Website support",
    description:
      "Connect your current website or receive help creating a new website.",
  },
  {
    icon: MapPinned,
    title: "Google Business Profile",
    description:
      "Improve your Google business information and local Maps visibility.",
  },
  {
    icon: Megaphone,
    title: "Digital advertising",
    description:
      "Reach more potential customers through managed online advertising.",
  },
  {
    icon: Share2,
    title: "Social media visibility",
    description:
      "Present your business consistently across important social platforms.",
  },
];

const planGuidance = [
  {
    label: "Starting online",
    title: "Choose Starter",
    description:
      "For a small business that needs a professional profile and a foundation for online visibility.",
  },
  {
    label: "Growing business",
    title: "Choose Growth",
    description:
      "For a business that wants stronger search, AI, social media and local visibility.",
    featured: true,
  },
  {
    label: "Advanced requirements",
    title: "Choose Custom",
    description:
      "For businesses needing a website, advertising management, integrations or multiple locations.",
  },
];

const frequentlyAskedQuestions = [
  {
    question: "Can I start with the Starter plan?",
    answer:
      "Yes. The Starter plan costs $10 and gives your business a foundation for online and AI visibility. You can upgrade when your business needs more services.",
  },
  {
    question: "Is advertising included in every plan?",
    answer:
      "Advertising setup and management depend on the selected plan. The money paid directly to advertising platforms is normally separate from the Vizo service fee.",
  },
  {
    question: "Can Vizo create a website for my business?",
    answer:
      "Yes. Website design and development can be added to your plan. Vizo can also connect to an existing website without replacing it.",
  },
  {
    question: "Can you improve my Google Business Profile?",
    answer:
      "Yes. Vizo can help organize your business information, location, opening hours, services and other details used by Google Business Profile and Google Maps.",
  },
  {
    question: "Do I need technical experience?",
    answer:
      "No. Vizo is designed for business owners. We guide you through setup and provide technical support when a website connection is required.",
  },
  {
    question: "Can I cancel or change my plan?",
    answer:
      "Yes. You can request a plan change when your business requirements change. Any active advertising or custom development work will be handled according to its agreement.",
  },
];

export default function PricingPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-[#07152b] px-5 pb-16 pt-36 text-white sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
        <div className="absolute -left-28 top-24 size-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-28 bottom-0 size-96 rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-[1fr_0.75fr]">
          <div className="max-w-3xl animate-[pricingEnter_700ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles className="size-4 text-blue-300" />
              Simple and flexible pricing
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              Invest in making your business easier to find.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Start with the visibility services your business needs today and
              add more support as it grows.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#plans"
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#07152b] transition hover:bg-blue-50"
              >
                View plans
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </a>

              <Link
                href="/contact"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 font-bold backdrop-blur transition hover:bg-white/20"
              >
                Discuss your needs
              </Link>
            </div>
          </div>

          <div className="animate-[pricingEnter_700ms_150ms_ease-out_both] rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-300">
              Every Vizo plan focuses on
            </p>

            <div className="mt-6 space-y-4">
              {[
                "Accurate business information",
                "Better search and AI visibility",
                "Clear visibility recommendations",
                "Support from the Vizo team",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                    <Check className="size-4" strokeWidth={3} />
                  </span>

                  <span className="text-sm font-semibold text-white/85">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div id="plans" className="scroll-mt-20">
        <PricingSection />
      </div>

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1350px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Available services
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              More than a business profile
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Your plan can combine visibility technology with practical digital
              services for your business.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {includedServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  style={{ animationDelay: `${index * 80}ms` }}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 opacity-0 shadow-sm animate-[pricingCard_600ms_ease-out_forwards] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>

                  <h3 className="mt-5 text-lg font-black text-[#10104b]">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
                Choose confidently
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
                Which plan fits your business?
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Start with your current business goals. You do not need to buy
                every service immediately.
              </p>
            </div>

            <div className="space-y-4">
              {planGuidance.map((plan, index) => (
                <article
                  key={plan.title}
                  className={`grid gap-4 rounded-3xl border p-6 sm:grid-cols-[55px_1fr] ${
                    plan.featured
                      ? "border-blue-200 bg-blue-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <span
                    className={`grid size-12 place-items-center rounded-2xl font-black ${
                      plan.featured
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-[#10104b]"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-600">
                      {plan.label}
                    </p>

                    <h3 className="mt-1 text-xl font-black text-[#10104b]">
                      {plan.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {plan.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-100 text-blue-700">
              <CircleHelp className="size-6" />
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Pricing questions
            </h2>

            <p className="mt-4 text-slate-600">
              Important information before choosing your plan.
            </p>
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

                <p className="mt-4 max-w-3xl border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto flex max-w-[1250px] flex-col items-center justify-between gap-7 rounded-[32px] bg-[#10104b] p-7 text-white sm:p-10 lg:flex-row lg:p-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-300">
              <BadgeCheck className="size-5" />
              <span className="text-sm font-black">Ready to start?</span>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Make your business easier to discover.
            </h2>

            <p className="mt-3 leading-7 text-white/65">
              Create your business profile or speak with us about a custom
              visibility plan.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-7 font-black text-[#10104b] transition hover:bg-blue-50"
            >
              Get started
              <ArrowRight className="size-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 px-7 font-bold transition hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pricingEnter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pricingCard {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}

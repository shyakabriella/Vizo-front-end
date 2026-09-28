"use client";

import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  CheckCircle2,
  Clipboard,
  Code2,
  FileSearch,
  Globe2,
  MapPinned,
  Megaphone,
  Network,
  Search,
  Share2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const steps = [
  {
    number: "01",
    icon: FileSearch,
    title: "We understand your business",
    description:
      "Vizo collects the important information customers and discovery platforms need to understand your business.",
    items: [
      "Business identity and locations",
      "Opening hours and contact details",
      "Services, products and prices",
      "Images and business information",
    ],
  },
  {
    number: "02",
    icon: Network,
    title: "We organize your information",
    description:
      "Your information is transformed into a clear business profile that search engines and AI systems can read.",
    items: [
      "Consistent business information",
      "Schema.org structured data",
      "AI-readable business content",
      "Location and service relationships",
    ],
  },
  {
    number: "03",
    icon: Globe2,
    title: "We connect your website",
    description:
      "A lightweight script connects Vizo to your existing website without replacing its design or content.",
    items: [
      "Simple one-line installation",
      "Works with your existing website",
      "Automatic information updates",
      "No website redesign required",
    ],
  },
  {
    number: "04",
    icon: BarChart3,
    title: "We measure your visibility",
    description:
      "Vizo checks your visibility and shows where your business information needs improvement.",
    items: [
      "Visibility score",
      "Website and schema checks",
      "Profile completeness",
      "Clear improvement recommendations",
    ],
  },
];

const channels = [
  {
    icon: Search,
    title: "SEO",
    description: "Improve discovery through traditional search engines.",
  },
  {
    icon: Bot,
    title: "AI visibility",
    description: "Help AI assistants understand and recommend your business.",
  },
  {
    icon: MapPinned,
    title: "Local discovery",
    description: "Strengthen Google Maps and local business information.",
  },
  {
    icon: Megaphone,
    title: "Advertising",
    description: "Use consistent information in digital advertising campaigns.",
  },
  {
    icon: Share2,
    title: "Social media",
    description: "Present your business clearly across social platforms.",
  },
];

const outcomes = [
  "Customers find accurate business information",
  "AI systems understand what your business offers",
  "Your website communicates with discovery platforms",
  "Business information remains consistent",
  "You receive measurable visibility insights",
];

function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const style = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={elementRef}
      style={style}
      className={`transition duration-700 ease-out [transition-delay:var(--reveal-delay)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function HowItWorksPage() {
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
      <section className="relative flex min-h-[72svh] items-center overflow-hidden bg-[#07152b] pt-24 text-white">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="size-full object-cover"
          >
            <source src="/vizo-how-it-works.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[#061225]/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061225]/95 via-[#061225]/75 to-[#061225]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061225]/80 via-transparent to-[#061225]/25" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1450px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-12">
          <div className="max-w-3xl animate-[vizoHeroIn_800ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-md">
              <Sparkles className="size-4 text-blue-300" />
              How Vizo works
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              One place to improve how your business is discovered.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Vizo organizes your business information, connects your website,
              prepares it for search and AI, and shows you what to improve.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-bold text-[#07152b] transition hover:bg-blue-50"
              >
                Start improving visibility
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </Link>

              <a
                href="#process"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore the process
              </a>
            </div>
          </div>

          <div className="hidden justify-end lg:flex">
            <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-[#07152b]/55 p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-sm font-bold text-blue-200">
                Visibility journey
              </p>

              <div className="mt-5 space-y-3">
                {[
                  "Business information",
                  "Structured profile",
                  "Website connection",
                  "Visibility insights",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-500 text-xs font-black">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-white/90">
                      {item}
                    </span>
                    <CheckCircle2 className="ml-auto size-4 text-emerald-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1450px] grid-cols-2 gap-px bg-slate-200 sm:grid-cols-3 lg:grid-cols-5">
          {channels.map((channel) => {
            const Icon = channel.icon;

            return (
              <div
                key={channel.title}
                className="group bg-white px-5 py-6 transition hover:bg-blue-50"
              >
                <Icon className="size-5 text-blue-600 transition group-hover:scale-110" />
                <p className="mt-3 font-black text-[#10104b]">
                  {channel.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {channel.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="process"
        className="scroll-mt-24 bg-[#f7f8fc] px-5 py-16 sm:px-8 lg:px-12 lg:py-20"
      >
        <div className="mx-auto max-w-[1350px]">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
              The Vizo process
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              From business information to measurable visibility
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
              Each step prepares your business to be understood accurately by
              customers, search engines, maps and AI platforms.
            </p>
          </Reveal>

          <div className="relative mt-14">
            <div className="absolute bottom-10 left-[39px] top-10 hidden w-px bg-blue-200 lg:block" />

            <div className="space-y-5">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <Reveal key={step.number} delay={index * 90}>
                    <article className="group relative grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl lg:grid-cols-[80px_0.85fr_1.15fr]">
                      <div className="relative z-10 flex items-center justify-between bg-[#10104b] p-5 text-white lg:flex-col lg:justify-center">
                        <span className="text-sm font-black text-blue-300">
                          {step.number}
                        </span>

                        <span className="grid size-11 place-items-center rounded-2xl bg-white/10">
                          <Icon className="size-5" />
                        </span>
                      </div>

                      <div className="border-b border-slate-100 p-6 lg:border-b-0 lg:border-r lg:p-8">
                        <h3 className="text-xl font-black tracking-[-0.02em] text-[#10104b] sm:text-2xl">
                          {step.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {step.description}
                        </p>
                      </div>

                      <div className="grid gap-3 p-6 sm:grid-cols-2 lg:p-8">
                        {step.items.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3.5"
                          >
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                              <Check className="size-3" strokeWidth={3} />
                            </span>

                            <span className="text-sm font-semibold leading-5 text-slate-700">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
              Website Connect
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Connect Vizo without rebuilding your website.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Add one lightweight script to your existing website. Vizo can then
              publish and maintain the structured business information modern
              discovery platforms need.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Keeps your current website and design",
                "Works across modern websites",
                "Updates when business information changes",
                "Designed to load without slowing the website",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
                  <span className="text-sm font-semibold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl bg-[#07152b] shadow-2xl shadow-slate-900/15">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-red-400" />
                  <span className="size-3 rounded-full bg-amber-400" />
                  <span className="size-3 rounded-full bg-emerald-400" />
                </div>

                <p className="text-xs font-bold text-white/50">
                  Website installation
                </p>
              </div>

              <div className="p-5 sm:p-8">
                <div className="flex items-center gap-3 text-blue-300">
                  <Code2 className="size-5" />
                  <span className="text-sm font-bold">Connect script</span>
                </div>

                <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/25 p-5">
                  <code className="whitespace-nowrap text-sm leading-7 text-blue-100">
                    {connectScript}
                  </code>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-white/55">
                    Paste before the closing body tag.
                  </p>

                  <button
                    type="button"
                    onClick={copyScript}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-[#07152b] transition hover:bg-blue-50"
                  >
                    {copied ? (
                      <CheckCircle2 className="size-4 text-emerald-600" />
                    ) : (
                      <Clipboard className="size-4" />
                    )}
                    {copied ? "Copied" : "Copy script"}
                  </button>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[
                    ["01", "Copy script"],
                    ["02", "Add to website"],
                    ["03", "Verify connection"],
                  ].map(([number, label]) => (
                    <div
                      key={number}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-xs font-black text-blue-300">
                        {number}
                      </p>
                      <p className="mt-2 text-sm font-bold text-white">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1350px] overflow-hidden rounded-[32px] bg-[#10104b] text-white lg:grid-cols-2">
          <Reveal className="p-7 sm:p-10 lg:p-14">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
              The result
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              A clearer and more discoverable business.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-white/65">
              Vizo gives your business a reliable visibility foundation before
              you invest more time and money in marketing.
            </p>

            <Link
              href="/register"
              className="group mt-8 inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#10104b] transition hover:bg-blue-50"
            >
              Create your business profile
              <ArrowRight className="size-5 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {outcomes.map((outcome, index) => (
              <Reveal
                key={outcome}
                delay={index * 70}
                className={`bg-white/5 p-6 sm:p-8 ${
                  index === outcomes.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <span className="grid size-10 place-items-center rounded-2xl bg-blue-500/20 text-blue-300">
                  <CheckCircle2 className="size-5" />
                </span>

                <p className="mt-4 font-bold leading-6 text-white/90">
                  {outcome}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes vizoHeroIn {
          from {
            opacity: 0;
            transform: translateY(24px);
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
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

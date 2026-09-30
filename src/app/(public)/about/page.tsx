import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  Code2,
  Globe2,
  HeartHandshake,
  Lightbulb,
  MapPinned,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: ShieldCheck,
    title: "Accurate information",
    description:
      "Business visibility begins with information that customers and platforms can trust.",
  },
  {
    icon: Lightbulb,
    title: "Simple technology",
    description:
      "Business owners should not need technical expertise to improve their digital visibility.",
  },
  {
    icon: HeartHandshake,
    title: "Practical support",
    description:
      "Technology should be combined with real guidance that helps businesses take action.",
  },
  {
    icon: BarChart3,
    title: "Measurable improvement",
    description:
      "Businesses should understand what is improving and what still needs attention.",
  },
];

const platformCapabilities = [
  {
    icon: Store,
    title: "Business profiles",
    description:
      "One place for locations, hours, contacts, services, products and prices.",
  },
  {
    icon: Code2,
    title: "Website Connect",
    description:
      "A lightweight connection between Vizo and an existing business website.",
  },
  {
    icon: Search,
    title: "SEO and local discovery",
    description:
      "Clear information for search engines, Maps and location-based discovery.",
  },
  {
    icon: Bot,
    title: "AI visibility",
    description:
      "Structured business knowledge for AI assistants and generative search.",
  },
];

const journey = [
  {
    year: "The problem",
    title: "Businesses were online but still difficult to discover",
    description:
      "Websites contained useful information, but it was often incomplete, inconsistent or difficult for search and AI platforms to understand.",
  },
  {
    year: "The idea",
    title: "Create one reliable visibility foundation",
    description:
      "Vizo was designed to help businesses organize their information once and prepare it for different discovery channels.",
  },
  {
    year: "The pilot",
    title: "Test with a real local business",
    description:
      "Aspecto Spa became an example for organizing services, prices, location information, opening hours and AI-ready business content.",
  },
  {
    year: "The direction",
    title: "Support different business types",
    description:
      "The platform expanded to hotels, restaurants, salons, retail stores, clinics and professional services.",
  },
];

const businessTypes = [
  "Hotels and accommodation",
  "Restaurants and cafés",
  "Salons and spas",
  "Retail businesses",
  "Clinics and wellness businesses",
  "Professional services",
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative flex min-h-[72svh] items-center overflow-hidden bg-[#07152b] pt-24 text-white">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
        >
          <source src="/vizo-how-it-works.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#061225]/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061225]/95 via-[#061225]/80 to-[#061225]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061225]/80 via-transparent to-[#061225]/20" />

        <div className="relative z-10 mx-auto w-full max-w-[1350px] px-5 py-16 sm:px-8 lg:px-12">
          <div className="max-w-4xl animate-[aboutEnter_700ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black backdrop-blur-md">
              <Sparkles className="size-4 text-blue-300" />
              About Vizo
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              Helping businesses become easier to discover and understand.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
              Vizo helps businesses organize their information, connect their
              websites and improve visibility across search engines, maps,
              social platforms and AI discovery.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#07152b] transition hover:bg-blue-50"
              >
                Start with Vizo
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 font-bold backdrop-blur transition hover:bg-white/20"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Why Vizo exists
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Having a website does not automatically make a business visible.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Information is incomplete",
                description:
                  "Important services, prices, locations or opening hours are missing.",
              },
              {
                title: "Platforms show different information",
                description:
                  "Customers find conflicting business details across websites, Maps and social media.",
              },
              {
                title: "Websites lack structure",
                description:
                  "The website may look good while machines struggle to understand its content.",
              },
              {
                title: "Improvement is difficult to measure",
                description:
                  "Businesses often do not know which visibility problems should be fixed first.",
              },
            ].map((problem) => (
              <article
                key={problem.title}
                className="rounded-3xl border border-slate-200 bg-[#f7f8fc] p-6"
              >
                <CheckCircle2 className="size-5 text-blue-600" />

                <h3 className="mt-4 font-black text-[#10104b]">
                  {problem.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {problem.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] overflow-hidden rounded-[34px] bg-[#10104b] text-white lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <span className="grid size-12 place-items-center rounded-2xl bg-blue-500/20 text-blue-300">
              <Target className="size-6" />
            </span>

            <p className="mt-6 text-sm font-black uppercase tracking-[0.16em] text-blue-300">
              Our mission
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              Make modern business visibility accessible.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-white/65">
              Our mission is to give businesses a practical way to manage
              accurate information and prepare it for the technologies customers
              use to discover products and services.
            </p>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {platformCapabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <article
                  key={capability.title}
                  className="bg-white/5 p-6 sm:p-8"
                >
                  <span className="grid size-11 place-items-center rounded-2xl bg-white/10 text-blue-300">
                    <Icon className="size-5" />
                  </span>

                  <h3 className="mt-5 font-black">{capability.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {capability.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-[1350px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Our principles
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Technology built around real business needs
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  style={{ animationDelay: `${index * 80}ms` }}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 opacity-0 shadow-sm animate-[aboutCard_600ms_ease-out_forwards] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>

                  <h3 className="mt-5 text-lg font-black text-[#10104b]">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-[1250px]">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
                Our journey
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
                Built from a practical visibility problem.
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Vizo began with a simple question: how can a local business make
                its information understandable across modern discovery platforms
                without rebuilding everything?
              </p>
            </div>

            <div className="space-y-4">
              {journey.map((item, index) => (
                <article
                  key={item.year}
                  className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 sm:grid-cols-[55px_1fr]"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#10104b] text-sm font-black text-white">
                    {index + 1}
                  </span>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-600">
                      {item.year}
                    </p>

                    <h3 className="mt-1 text-lg font-black text-[#10104b]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-2">
          <div className="rounded-[32px] bg-[#07152b] p-7 text-white sm:p-10">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-blue-500">
                <Building2 className="size-6" />
              </span>

              <div>
                <p className="text-xs font-bold text-white/45">
                  Developed by AsyncAfrica
                </p>
                <h3 className="text-xl font-black">Technology from Rwanda</h3>
              </div>
            </div>

            <p className="mt-6 leading-8 text-white/65">
              Vizo is being developed as an AsyncAfrica product, starting with
              the visibility needs of African businesses while building for a
              wider global market.
            </p>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <MapPinned className="size-5 shrink-0 text-blue-300" />
              <span className="text-sm font-bold text-white/80">
                Kigali, Rwanda
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Businesses we support
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              One visibility foundation for different industries.
            </h2>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {businessTypes.map((businessType) => (
                <div
                  key={businessType}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
                  <span className="text-sm font-black text-slate-700">
                    {businessType}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/solutions"
              className="group mt-7 inline-flex items-center gap-2 font-black text-blue-700"
            >
              Explore Vizo solutions
              <ArrowRight className="size-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20">
        <div className="mx-auto flex max-w-[1250px] flex-col items-center justify-between gap-7 rounded-[32px] bg-[#10104b] p-7 text-white sm:p-10 lg:flex-row lg:p-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-300">
              <Users className="size-5" />
              <span className="text-sm font-black">
                Build better business visibility
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Let customers and platforms understand your business.
            </h2>

            <p className="mt-3 leading-7 text-white/65">
              Create your profile, connect your website and start measuring
              visibility.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#10104b] transition hover:bg-blue-50"
            >
              Get started
              <ArrowRight className="size-5 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 px-7 font-bold transition hover:bg-white/10"
            >
              Contact Vizo
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes aboutEnter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes aboutCard {
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

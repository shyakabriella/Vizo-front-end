import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Check,
  CheckCircle2,
  Clock3,
  Flower2,
  Globe2,
  ImageIcon,
  MapPinned,
  Megaphone,
  Scissors,
  Search,
  Share2,
  Sparkles,
  Store,
  Tags,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const businessInformation = [
  {
    icon: Store,
    title: "Business profile",
    description:
      "Salon or spa name, description, contacts, location and business type.",
  },
  {
    icon: Scissors,
    title: "Services",
    description:
      "Hair styling, makeup, massage, skincare, manicure and other services.",
  },
  {
    icon: Tags,
    title: "Prices and duration",
    description:
      "Service prices, expected duration and important preparation details.",
  },
  {
    icon: Clock3,
    title: "Opening hours",
    description:
      "Working hours, closed days, special schedules and booking availability.",
  },
  {
    icon: MapPinned,
    title: "Location",
    description:
      "Accurate address, service areas, directions and available home services.",
  },
  {
    icon: ImageIcon,
    title: "Business images",
    description:
      "Photos of services, staff, facilities and completed beauty work.",
  },
];

const solutions = [
  {
    icon: Search,
    title: "Salon and spa SEO",
    description:
      "Improve service and location pages for traditional search engines.",
  },
  {
    icon: Bot,
    title: "AI and GEO visibility",
    description:
      "Prepare services, prices and locations for AI-powered discovery.",
  },
  {
    icon: MapPinned,
    title: "Google Maps",
    description:
      "Improve local information used by Google Business Profile and Maps.",
  },
  {
    icon: Globe2,
    title: "Website Connect",
    description: "Connect structured salon information to an existing website.",
  },
  {
    icon: Megaphone,
    title: "Digital advertising",
    description:
      "Promote beauty services, packages, special offers and new locations.",
  },
  {
    icon: Share2,
    title: "Social media",
    description:
      "Present services and visual work consistently across social platforms.",
  },
];

const discoveryQuestions = [
  "Find a professional salon near me that is open today.",
  "Where can I get bridal makeup in Kigali?",
  "Find a spa offering deep tissue massage.",
  "Which salon offers manicure and pedicure services?",
];

const steps = [
  {
    number: "01",
    title: "Create the business profile",
    description:
      "Add the salon or spa identity, location, contacts and description.",
  },
  {
    number: "02",
    title: "Add services and prices",
    description:
      "Organize service categories, descriptions, prices and duration.",
  },
  {
    number: "03",
    title: "Connect the website",
    description:
      "Install Website Connect without replacing the current website.",
  },
  {
    number: "04",
    title: "Monitor visibility",
    description: "Measure completeness, structured data and AI readiness.",
  },
];

export default function SalonsSolutionPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative flex min-h-[76svh] items-center overflow-hidden bg-[#07152b] pt-24 text-white">
        <Image
          src="/salon-hero.png"
          alt="Professional hair salon and spa services"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#061225]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061225]/95 via-[#061225]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061225]/75 via-transparent to-[#061225]/20" />

        <div className="relative z-10 mx-auto w-full max-w-[1350px] px-5 py-16 sm:px-8 lg:px-12">
          <div className="max-w-3xl animate-[salonEnter_700ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm font-black backdrop-blur-md">
              <Scissors className="size-4 text-pink-300" />
              Vizo for salons and spas
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              Help customers discover your beauty and wellness services.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Organize services, prices, opening hours and locations for search
              engines, maps, social media and AI discovery.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register?business_type=salon-spa"
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#07152b] transition hover:bg-pink-50"
              >
                Add your business
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/audit?business_type=salon-spa"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 font-bold backdrop-blur transition hover:bg-white/20"
              >
                Audit salon visibility
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              {[
                "Keep your current website",
                "Publish services and prices",
                "Improve local visibility",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1350px] grid-cols-2 gap-px bg-slate-200 sm:grid-cols-3 lg:grid-cols-6">
          {[
            "Hair styling",
            "Makeup",
            "Massage",
            "Skincare",
            "Manicure",
            "Pedicure",
          ].map((service) => (
            <div
              key={service}
              className="group bg-white p-5 text-center transition hover:bg-pink-50"
            >
              <Flower2 className="mx-auto size-5 text-pink-600 transition group-hover:scale-110" />
              <p className="mt-2 text-sm font-black text-[#10104b]">
                {service}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[500px] overflow-hidden rounded-[32px] bg-[#07152b] shadow-2xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/salon-hero.png"
              className="absolute inset-0 size-full object-cover"
            >
              <source src="/vizo-salon.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-[#07152b]/90 via-[#07152b]/10 to-transparent" />

            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-[#07152b]/70 p-5 text-white backdrop-blur-md">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-pink-300">
                Present your services visually
              </p>

              <h3 className="mt-2 text-xl font-black">
                Help customers understand the experience.
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/65">
                Combine accurate service information with professional images
                and video content.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-pink-600">
              Complete business information
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Make every service clear and easy to discover.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Customers need more than a business name. They want services,
              prices, opening hours, location and information about the
              experience they can expect.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {businessInformation.map((information) => {
                const Icon = information.icon;

                return (
                  <article
                    key={information.title}
                    className="group rounded-3xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-xl"
                  >
                    <span className="grid size-11 place-items-center rounded-2xl bg-pink-50 text-pink-700 transition group-hover:bg-pink-600 group-hover:text-white">
                      <Icon className="size-5" />
                    </span>

                    <h3 className="mt-4 font-black text-[#10104b]">
                      {information.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {information.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-[1350px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-pink-600">
              Visibility solutions
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Reach customers through more digital channels.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;

              return (
                <article
                  key={solution.title}
                  style={{ animationDelay: `${index * 70}ms` }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 opacity-0 animate-[salonCard_600ms_ease-out_forwards]"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-pink-50 text-pink-700">
                    <Icon className="size-5" />
                  </span>

                  <h3 className="mt-5 text-lg font-black text-[#10104b]">
                    {solution.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {solution.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-2">
          <div className="rounded-[30px] bg-[#07152b] p-6 text-white shadow-2xl sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-pink-500">
                <Bot className="size-5" />
              </span>

              <div>
                <p className="text-xs font-bold text-white/45">
                  Customer discovery
                </p>
                <h3 className="font-black">Questions customers may ask AI</h3>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {discoveryQuestions.map((question, index) => (
                <div
                  key={question}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-pink-500/20 text-xs font-black text-pink-200">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-6 text-white/75">{question}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-pink-600">
              AI and local discovery
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Prepare for detailed customer searches.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Customers search using service type, price, location, availability
              and desired experience. Clear information helps discovery
              platforms find relevant matches.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Clear service names and descriptions",
                "Accurate prices and expected duration",
                "Location and home-service options",
                "Opening hours and availability",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="size-5 text-emerald-500" strokeWidth={3} />
                  <span className="text-sm font-bold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-3xl border border-pink-100 bg-pink-50 p-6">
              <div className="flex items-start gap-4">
                <BadgeCheck className="mt-0.5 size-6 shrink-0 text-pink-600" />

                <div>
                  <h3 className="font-black text-[#10104b]">
                    Your booking system remains unchanged
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Vizo improves business visibility. It does not replace your
                    appointment, payment or salon-management system.
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
            <p className="text-sm font-black uppercase tracking-[0.16em] text-pink-600">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              From service information to better visibility
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.number}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6"
              >
                <span className="absolute -right-3 -top-7 text-8xl font-black text-slate-50">
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

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto flex max-w-[1250px] flex-col items-center justify-between gap-7 rounded-[32px] bg-[#10104b] p-7 text-white sm:p-10 lg:flex-row lg:p-12">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-black text-pink-300">
              <Sparkles className="size-4" />
              Better salon and spa visibility
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Make your services easier to discover.
            </h2>

            <p className="mt-3 leading-7 text-white/65">
              Create your profile, publish services and connect your existing
              website.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/register?business_type=salon-spa"
              className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#10104b] transition hover:bg-pink-50"
            >
              Get started
              <ArrowRight className="size-5 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact?subject=salon-spa-visibility"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 px-7 font-bold transition hover:bg-white/10"
            >
              Talk to Vizo
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes salonEnter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes salonCard {
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

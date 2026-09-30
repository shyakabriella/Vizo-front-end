import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Check,
  CheckCircle2,
  Clock3,
  Coffee,
  Globe2,
  MapPinned,
  Megaphone,
  QrCode,
  Search,
  Share2,
  Sparkles,
  Store,
  Tags,
  UtensilsCrossed,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const restaurantInformation = [
  {
    icon: Store,
    title: "Restaurant profile",
    description:
      "Restaurant name, description, cuisine, contact details and official website.",
  },
  {
    icon: UtensilsCrossed,
    title: "Menus and dishes",
    description:
      "Organize menu categories, meals, descriptions, ingredients and prices.",
  },
  {
    icon: Clock3,
    title: "Opening hours",
    description:
      "Publish normal hours, closing days and special operating schedules.",
  },
  {
    icon: MapPinned,
    title: "Location and delivery",
    description:
      "Show the address, service areas, dining options and delivery information.",
  },
  {
    icon: Coffee,
    title: "Dining experiences",
    description:
      "Describe breakfast, lunch, dinner, takeaway, events and special offers.",
  },
  {
    icon: Tags,
    title: "Dietary information",
    description:
      "Communicate vegetarian, vegan, halal, gluten-free and allergy information.",
  },
];

const visibilityServices = [
  {
    icon: Search,
    title: "Restaurant SEO",
    description:
      "Improve menu, cuisine and location pages for search-engine discovery.",
  },
  {
    icon: Bot,
    title: "AI and GEO visibility",
    description:
      "Prepare restaurant information for AI assistants and generative search.",
  },
  {
    icon: MapPinned,
    title: "Google Maps",
    description:
      "Improve information used by Google Business Profile and local search.",
  },
  {
    icon: Globe2,
    title: "Website Connect",
    description:
      "Add structured restaurant data to the existing website with one script.",
  },
  {
    icon: Megaphone,
    title: "Digital advertising",
    description:
      "Promote meals, special offers, events and restaurant experiences.",
  },
  {
    icon: Share2,
    title: "Social media",
    description:
      "Present food, menus and experiences consistently across social channels.",
  },
];

const discoveryQuestions = [
  "Find a restaurant in Kigali serving local food.",
  "Which restaurant is open for dinner tonight?",
  "Where can I find vegetarian food near me?",
  "Find a restaurant offering delivery and takeaway.",
];

const steps = [
  {
    number: "01",
    title: "Create the restaurant profile",
    description:
      "Add your identity, cuisine, location, contacts and operating information.",
  },
  {
    number: "02",
    title: "Add menus and services",
    description: "Organize dishes, menu categories, prices and dining options.",
  },
  {
    number: "03",
    title: "Connect the website",
    description:
      "Install Website Connect without replacing the restaurant website.",
  },
  {
    number: "04",
    title: "Publish and improve",
    description:
      "Publish structured information and follow visibility recommendations.",
  },
];

export default function RestaurantsSolutionPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative flex min-h-[76svh] items-center overflow-hidden bg-[#07152b] pt-24 text-white">
        <Image
          src="/restaurant-hero.png"
          alt="Guests enjoying dinner in a modern restaurant"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#061225]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061225]/95 via-[#061225]/72 to-[#061225]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061225]/75 via-transparent to-[#061225]/20" />

        <div className="relative z-10 mx-auto w-full max-w-[1350px] px-5 py-16 sm:px-8 lg:px-12">
          <div className="max-w-3xl animate-[restaurantEnter_700ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm font-black backdrop-blur-md">
              <UtensilsCrossed className="size-4 text-amber-300" />
              Vizo for restaurants
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              Help more customers discover your restaurant.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Organize menus, opening hours, cuisine and location information
              for search engines, maps, social media and AI discovery.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register?business_type=restaurant"
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#07152b] transition hover:bg-amber-50"
              >
                Add your restaurant
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/audit?business_type=restaurant"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 font-bold backdrop-blur transition hover:bg-white/20"
              >
                Audit restaurant visibility
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              {[
                "Keep your current website",
                "Publish menu information",
                "Improve local discovery",
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
            [UtensilsCrossed, "Menus"],
            [Clock3, "Hours"],
            [MapPinned, "Location"],
            [QrCode, "Structured data"],
            [Bot, "AI discovery"],
            [Share2, "Social media"],
          ].map(([Icon, label]) => {
            const ItemIcon = Icon as typeof UtensilsCrossed;

            return (
              <div
                key={label as string}
                className="group bg-white p-5 text-center transition hover:bg-amber-50"
              >
                <ItemIcon className="mx-auto size-5 text-amber-600 transition group-hover:scale-110" />

                <p className="mt-2 text-sm font-black text-[#10104b]">
                  {label as string}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-600">
              Complete restaurant information
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Show customers more than a restaurant name.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Customers want to know what food you serve, when you are open,
              where you are located and which dining options are available.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {restaurantInformation.map((information) => {
                const Icon = information.icon;

                return (
                  <article
                    key={information.title}
                    className="group rounded-3xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl"
                  >
                    <span className="grid size-11 place-items-center rounded-2xl bg-amber-50 text-amber-700 transition group-hover:bg-amber-500 group-hover:text-white">
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

          <div className="relative min-h-[520px] overflow-hidden rounded-[32px] shadow-2xl shadow-slate-900/10">
            <Image
              src="/restaurant-food.png"
              alt="Restaurant table with several meals"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#07152b]/85 via-transparent to-transparent" />

            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-[#07152b]/75 p-5 text-white backdrop-blur-md">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-amber-300">
                Menu visibility
              </p>

              <h3 className="mt-2 text-xl font-black">
                Make every dish easier to understand.
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/65">
                Publish descriptions, categories, dietary information and prices
                from one managed profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-[1350px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-600">
              Restaurant visibility services
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Reach customers across more discovery channels.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibilityServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  style={{ animationDelay: `${index * 70}ms` }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 opacity-0 animate-[restaurantCard_600ms_ease-out_forwards]"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-amber-50 text-amber-700">
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

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-2">
          <div className="rounded-[30px] bg-[#07152b] p-6 text-white shadow-2xl sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-amber-500">
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
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-amber-500/20 text-xs font-black text-amber-200">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-6 text-white/75">{question}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-600">
              AI restaurant discovery
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Prepare for natural customer searches.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Customers increasingly search using detailed questions about
              cuisine, opening hours, dietary needs, location and delivery.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Clear cuisine and menu categories",
                "Accurate opening hours",
                "Location and service-area information",
                "Dining, takeaway and delivery options",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="size-5 text-emerald-500" strokeWidth={3} />
                  <span className="text-sm font-bold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-3xl border border-amber-100 bg-amber-50 p-6">
              <div className="flex items-start gap-4">
                <BadgeCheck className="mt-0.5 size-6 shrink-0 text-amber-600" />

                <div>
                  <h3 className="font-black text-[#10104b]">
                    Your ordering system remains unchanged
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Vizo improves visibility and business information. It does
                    not replace your POS, ordering or reservation system.
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
            <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-600">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              From your menu to better discovery
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
            <p className="inline-flex items-center gap-2 text-sm font-black text-amber-300">
              <Sparkles className="size-4" />
              Better restaurant visibility
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Make your restaurant easier to discover.
            </h2>

            <p className="mt-3 leading-7 text-white/65">
              Create your restaurant profile, publish menu information and
              connect your existing website.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/register?business_type=restaurant"
              className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#10104b] transition hover:bg-amber-50"
            >
              Get started
              <ArrowRight className="size-5 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact?subject=restaurant-visibility"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 px-7 font-bold transition hover:bg-white/10"
            >
              Talk to Vizo
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes restaurantEnter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes restaurantCard {
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

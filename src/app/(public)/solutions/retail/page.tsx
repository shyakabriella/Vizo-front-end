import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Boxes,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Globe2,
  MapPinned,
  Megaphone,
  PackageSearch,
  Search,
  Share2,
  ShoppingBag,
  Sparkles,
  Store,
  Tags,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const businessInformation = [
  {
    icon: Store,
    title: "Store profile",
    description:
      "Business name, store description, contacts, website and retail category.",
  },
  {
    icon: PackageSearch,
    title: "Products",
    description:
      "Product names, categories, descriptions, features and availability.",
  },
  {
    icon: Tags,
    title: "Prices and offers",
    description:
      "Product prices, currencies, discounts and promotional information.",
  },
  {
    icon: MapPinned,
    title: "Store locations",
    description:
      "Physical locations, service areas, directions and branch information.",
  },
  {
    icon: Clock3,
    title: "Opening hours",
    description:
      "Regular working hours, closed days and special holiday schedules.",
  },
  {
    icon: Truck,
    title: "Delivery options",
    description:
      "Pickup, local delivery, delivery areas and customer fulfilment options.",
  },
];

const visibilityServices = [
  {
    icon: Search,
    title: "Retail SEO",
    description:
      "Improve store, product and category pages for search-engine discovery.",
  },
  {
    icon: Bot,
    title: "AI and GEO visibility",
    description:
      "Prepare store and product information for AI-powered search experiences.",
  },
  {
    icon: MapPinned,
    title: "Local visibility",
    description:
      "Improve information used by Google Business Profile and Maps.",
  },
  {
    icon: Globe2,
    title: "Website Connect",
    description:
      "Connect structured business and product information to your website.",
  },
  {
    icon: Megaphone,
    title: "Digital advertising",
    description:
      "Promote product categories, offers, locations and seasonal campaigns.",
  },
  {
    icon: Share2,
    title: "Social media",
    description:
      "Present products and promotions consistently across social platforms.",
  },
];

const discoveryQuestions = [
  "Where can I buy a business laptop in Kigali?",
  "Find an electronics store near me that is open today.",
  "Which shop offers local delivery?",
  "Find a store selling affordable computer accessories.",
];

const steps = [
  {
    number: "01",
    title: "Create the store profile",
    description:
      "Add business information, contacts, locations and opening hours.",
  },
  {
    number: "02",
    title: "Organize products",
    description:
      "Add product categories, descriptions, prices and availability.",
  },
  {
    number: "03",
    title: "Connect the website",
    description: "Install Website Connect without replacing the online store.",
  },
  {
    number: "04",
    title: "Improve visibility",
    description:
      "Follow recommendations for search, AI, Maps and content quality.",
  },
];

export default function RetailSolutionPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative flex min-h-[76svh] items-center overflow-hidden bg-[#07152b] pt-24 text-white">
        <Image
          src="/retail-hero.png"
          alt="Customers shopping inside a modern retail store"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#061225]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061225]/95 via-[#061225]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061225]/65 via-transparent to-[#061225]/15" />

        <div className="relative z-10 mx-auto w-full max-w-[1350px] px-5 py-16 sm:px-8 lg:px-12">
          <div className="max-w-3xl animate-[retailEnter_700ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm font-black backdrop-blur-md">
              <ShoppingBag className="size-4 text-cyan-300" />
              Vizo for retail businesses
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              Make your store and products easier to discover.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Organize products, prices, store locations and opening hours for
              search engines, Maps, advertising and AI discovery.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register?business_type=retail"
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#07152b] transition hover:bg-cyan-50"
              >
                Add your retail business
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/audit?business_type=retail"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 font-bold backdrop-blur transition hover:bg-white/20"
              >
                Audit store visibility
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              {[
                "Keep your current store system",
                "Publish product information",
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
            [PackageSearch, "Products"],
            [Tags, "Prices"],
            [Boxes, "Categories"],
            [MapPinned, "Locations"],
            [Truck, "Delivery"],
            [CreditCard, "Store details"],
          ].map(([Icon, label]) => {
            const ItemIcon = Icon as typeof PackageSearch;

            return (
              <div
                key={label as string}
                className="group bg-white p-5 text-center transition hover:bg-cyan-50"
              >
                <ItemIcon className="mx-auto size-5 text-cyan-700 transition group-hover:scale-110" />
                <p className="mt-2 text-sm font-black text-[#10104b]">
                  {label as string}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-[1350px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-700">
              Complete retail information
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Help customers understand what your store sells.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Build a clear store profile containing the products, prices,
              locations and fulfilment options customers need.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessInformation.map((information, index) => {
              const Icon = information.icon;

              return (
                <article
                  key={information.title}
                  style={{ animationDelay: `${index * 70}ms` }}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 opacity-0 shadow-sm animate-[retailCard_600ms_ease-out_forwards] transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-cyan-50 text-cyan-700 transition group-hover:bg-cyan-700 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>

                  <h3 className="mt-5 text-lg font-black text-[#10104b]">
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
      </section>

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-700">
              Retail visibility services
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Reach shoppers through more channels.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Vizo combines accurate store information with SEO, AI visibility,
              Maps, advertising and social-media support.
            </p>

            <div className="mt-7 rounded-3xl border border-cyan-100 bg-cyan-50 p-6">
              <div className="flex items-start gap-4">
                <BadgeCheck className="mt-0.5 size-6 shrink-0 text-cyan-700" />

                <div>
                  <h3 className="font-black text-[#10104b]">
                    Your retail system remains in place
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Vizo does not replace your POS, inventory, payment or
                    e-commerce system. It improves how the business and its
                    products are presented for discovery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {visibilityServices.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6"
                >
                  <span className="grid size-11 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
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
              <span className="grid size-11 place-items-center rounded-2xl bg-cyan-600">
                <Bot className="size-5" />
              </span>

              <div>
                <p className="text-xs font-bold text-white/45">
                  Shopper discovery
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
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-cyan-500/20 text-xs font-black text-cyan-200">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-6 text-white/75">{question}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-700">
              AI product discovery
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Prepare your store for detailed product searches.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Clear product, price, location and delivery information helps
              discovery platforms understand when your store matches a
              customer’s request.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Clear product names and categories",
                "Useful specifications and descriptions",
                "Accurate store locations and hours",
                "Pickup and delivery information",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="size-5 text-emerald-500" strokeWidth={3} />
                  <span className="text-sm font-bold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fc] px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto max-w-[1350px]">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-700">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              From product information to better discovery
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
            <p className="inline-flex items-center gap-2 text-sm font-black text-cyan-300">
              <Sparkles className="size-4" />
              Better retail visibility
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Make your store easier to find.
            </h2>

            <p className="mt-3 leading-7 text-white/65">
              Create your store profile, organize product information and
              connect your existing website.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/register?business_type=retail"
              className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#10104b] transition hover:bg-cyan-50"
            >
              Get started
              <ArrowRight className="size-5 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact?subject=retail-visibility"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 px-7 font-bold transition hover:bg-white/10"
            >
              Talk to Vizo
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes retailEnter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes retailCard {
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

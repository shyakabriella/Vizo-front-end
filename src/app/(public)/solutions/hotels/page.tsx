import {
  ArrowRight,
  BadgeCheck,
  Bath,
  BedDouble,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  Coffee,
  Compass,
  Globe2,
  Hotel,
  ImageIcon,
  MapPinned,
  Megaphone,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import Link from "next/link";

const hotelInformation = [
  {
    icon: Building2,
    title: "Property information",
    description:
      "Hotel name, description, category, contact information and official website.",
  },
  {
    icon: BedDouble,
    title: "Rooms and accommodation",
    description:
      "Room types, occupancy, bed options, room features and accommodation descriptions.",
  },
  {
    icon: Wifi,
    title: "Amenities",
    description:
      "Wi-Fi, parking, restaurant, breakfast, airport transfer and other available facilities.",
  },
  {
    icon: MapPinned,
    title: "Location",
    description:
      "Address, coordinates, neighbourhood, nearby attractions and transport information.",
  },
  {
    icon: Clock3,
    title: "Guest information",
    description:
      "Check-in times, check-out times, reception hours and important hotel policies.",
  },
  {
    icon: ImageIcon,
    title: "Visual content",
    description:
      "Hotel, room, restaurant, facility and location images organized in one profile.",
  },
];

const hotelSolutions = [
  {
    icon: Search,
    title: "Hotel SEO",
    description:
      "Improve hotel pages, room information and location content for traditional search engines.",
  },
  {
    icon: Bot,
    title: "AI and GEO visibility",
    description:
      "Prepare hotel information for AI assistants and generative search experiences.",
  },
  {
    icon: MapPinned,
    title: "Google Maps visibility",
    description:
      "Improve important information used by Google Business Profile and local discovery.",
  },
  {
    icon: Globe2,
    title: "Website Connect",
    description:
      "Connect structured hotel information to the existing hotel website using one script.",
  },
  {
    icon: Megaphone,
    title: "Digital advertising",
    description:
      "Support targeted campaigns using consistent hotel, location and accommodation information.",
  },
  {
    icon: Share2,
    title: "Social media visibility",
    description:
      "Present rooms, experiences and hotel services clearly across social platforms.",
  },
];

const guestQuestions = [
  "Which hotels in Kigali offer airport transfer?",
  "Find a hotel near Kigali Convention Centre.",
  "Which hotel offers breakfast and free Wi-Fi?",
  "Find family-friendly accommodation in Kigali.",
];

const hotelSteps = [
  {
    number: "01",
    title: "Create the hotel profile",
    description:
      "Add the official hotel identity, contacts, location and property description.",
  },
  {
    number: "02",
    title: "Add rooms and amenities",
    description:
      "Organize accommodation types, facilities, guest information and hotel services.",
  },
  {
    number: "03",
    title: "Connect the hotel website",
    description:
      "Install Website Connect without replacing the existing website or booking system.",
  },
  {
    number: "04",
    title: "Improve discovery",
    description:
      "Follow visibility recommendations for search, AI, maps and hotel content.",
  },
  {
    number: "05",
    title: "Monitor visibility",
    description:
      "Review profile completeness, website status, structured data and AI readiness.",
  },
];

const hotelBenefits = [
  "Accurate hotel information across digital channels",
  "Clear room and amenity descriptions",
  "Stronger local and destination visibility",
  "AI-readable hotel information",
  "A better foundation for direct website discovery",
  "Measurable visibility improvements",
];

export default function HotelsSolutionPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-[#07152b] px-5 pb-16 pt-36 text-white sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
        <div className="absolute -left-32 top-24 size-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 size-[430px] rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div className="max-w-3xl animate-[hotelEnter_700ms_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-blue-200 backdrop-blur">
              <Hotel className="size-4" />
              Vizo for hotels
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              Help more guests discover your hotel.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Organize hotel information, connect your website and improve how
              guests, search engines, maps and AI platforms understand your
              property.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register?business_type=hotel"
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#07152b] transition hover:bg-blue-50"
              >
                Add your hotel
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/audit?business_type=hotel"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 font-bold backdrop-blur transition hover:bg-white/20"
              >
                Audit hotel visibility
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
              {[
                "Keep your existing website",
                "Works with your booking system",
                "No technical experience needed",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-[hotelEnter_700ms_140ms_ease-out_both] rounded-[30px] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-blue-500 text-white">
                  <Bot className="size-5" />
                </span>

                <div>
                  <p className="text-xs font-bold text-white/45">
                    AI travel discovery
                  </p>
                  <p className="font-black">Hotel recommendation</p>
                </div>
              </div>

              <span className="size-2.5 rounded-full bg-emerald-400" />
            </div>

            <div className="mt-5 flex justify-end">
              <div className="max-w-[88%] rounded-2xl rounded-br-md bg-white px-4 py-3 text-sm leading-6 text-[#10104b]">
                Find a comfortable hotel in Kigali with breakfast, Wi-Fi and
                airport transfer.
              </div>
            </div>

            <div className="mt-4 rounded-2xl rounded-bl-md border border-blue-300/20 bg-blue-500/15 p-4">
              <p className="text-xs font-black text-blue-200">
                Matching hotel information
              </p>

              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-black">Velvet Suites</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-white/55">
                    <MapPinned className="size-4" />
                    Kigali, Rwanda
                  </p>
                </div>

                <div className="flex items-center gap-1 text-amber-300">
                  <Star className="size-4 fill-current" />
                  <span className="text-sm font-black text-white">4.5</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  [Wifi, "Free Wi-Fi"],
                  [Coffee, "Breakfast"],
                  [Compass, "Transfer"],
                ].map(([Icon, label]) => {
                  const FeatureIcon = Icon as typeof Wifi;

                  return (
                    <div
                      key={label as string}
                      className="rounded-xl bg-white/10 p-3 text-center"
                    >
                      <FeatureIcon className="mx-auto size-4 text-blue-200" />
                      <p className="mt-2 text-[11px] font-bold">
                        {label as string}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
              <BadgeCheck className="size-4 text-emerald-300" />
              Information prepared through the Vizo hotel profile
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1350px] grid-cols-2 gap-px bg-slate-200 sm:grid-cols-3 lg:grid-cols-6">
          {[
            [BedDouble, "Rooms"],
            [Wifi, "Wi-Fi"],
            [Coffee, "Breakfast"],
            [UtensilsCrossed, "Dining"],
            [Bath, "Facilities"],
            [MapPinned, "Location"],
          ].map(([Icon, label]) => {
            const ItemIcon = Icon as typeof BedDouble;

            return (
              <div
                key={label as string}
                className="group bg-white p-5 text-center transition hover:bg-blue-50"
              >
                <ItemIcon className="mx-auto size-5 text-blue-600 transition group-hover:scale-110" />
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
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              Complete hotel information
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Give guests the information they need to choose.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Vizo organizes important hotel information into one clear profile
              that can support your website and discovery channels.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hotelInformation.map((information, index) => {
              const Icon = information.icon;

              return (
                <article
                  key={information.title}
                  style={{ animationDelay: `${index * 70}ms` }}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 opacity-0 shadow-sm animate-[hotelCard_600ms_ease-out_forwards] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
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
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
                Hotel visibility solutions
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
                Reach guests through more discovery channels.
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-slate-600">
                Vizo combines structured business information with digital
                visibility services designed around your hotel.
              </p>

              <div className="mt-7 rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white">
                    <ShieldCheck className="size-5" />
                  </span>

                  <div>
                    <h3 className="font-black text-[#10104b]">
                      Your booking system remains in place
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Vizo improves business visibility. It does not replace
                      your booking engine, property-management system or hotel
                      operations software.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {hotelSolutions.map((solution) => {
                const Icon = solution.icon;

                return (
                  <article
                    key={solution.title}
                    className="rounded-3xl border border-slate-200 bg-white p-6"
                  >
                    <span className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-700">
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
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-2">
          <div className="rounded-[30px] bg-[#07152b] p-6 text-white shadow-2xl sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-blue-500">
                <Bot className="size-5" />
              </span>

              <div>
                <p className="text-xs font-bold text-white/45">
                  Guest discovery
                </p>
                <h3 className="font-black">Common travel questions</h3>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {guestQuestions.map((question, index) => (
                <div
                  key={question}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-500/20 text-xs font-black text-blue-200">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-6 text-white/75">{question}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              AI and travel discovery
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              Prepare your hotel for natural guest searches.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Travellers increasingly ask detailed questions instead of
              searching only for a hotel name. Clear room, amenity and location
              information helps discovery platforms match the hotel with
              relevant guest needs.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Hotel and accommodation type",
                "Facilities and guest services",
                "Location and nearby destinations",
                "Policies and operating information",
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
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#10104b] sm:text-5xl">
              From hotel information to better visibility
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {hotelSteps.map((step) => (
              <article
                key={step.number}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5"
              >
                <span className="absolute -right-2 -top-5 text-7xl font-black text-slate-50">
                  {step.number}
                </span>

                <span className="relative grid size-10 place-items-center rounded-2xl bg-[#10104b] text-xs font-black text-white">
                  {step.number}
                </span>

                <h3 className="relative mt-5 font-black text-[#10104b]">
                  {step.title}
                </h3>

                <p className="relative mt-2 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mx-auto grid max-w-[1250px] overflow-hidden rounded-[32px] bg-[#10104b] text-white lg:grid-cols-[1fr_0.9fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="inline-flex items-center gap-2 text-sm font-black text-blue-300">
              <Sparkles className="size-4" />
              Better hotel visibility
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Make your hotel easier to discover and understand.
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-white/65">
              Build a reliable hotel profile, connect your website and monitor
              the information that supports digital discovery.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register?business_type=hotel"
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-[#10104b] transition hover:bg-blue-50"
              >
                Get started
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact?subject=hotel-visibility"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 px-7 font-bold transition hover:bg-white/10"
              >
                Talk to Vizo
              </Link>
            </div>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {hotelBenefits.map((benefit) => (
              <div key={benefit} className="bg-white/5 p-6">
                <CheckCircle2 className="size-5 text-emerald-300" />
                <p className="mt-4 text-sm font-bold leading-6 text-white/80">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes hotelEnter {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hotelCard {
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

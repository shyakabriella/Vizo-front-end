"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Scissors,
  ShoppingBag,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type BusinessType = {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  href: string;
  size: string;
};

const businessTypes: BusinessType[] = [
  {
    title: "Retail and supermarkets",
    description:
      "Make products, locations, opening hours and contact details easier to discover.",
    image: "/business-types/retail.jpg",
    icon: ShoppingBag,
    href: "/solutions/retail",
    size: "md:col-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Hotels and accommodation",
    description:
      "Publish rooms, amenities, locations and guest information for modern discovery platforms.",
    image: "/business-types/hospitality.jpg",
    icon: Building2,
    href: "/solutions/hotels",
    size: "lg:col-span-2",
  },
  {
    title: "Salons and beauty",
    description:
      "Show your treatments, prices, booking information and business hours.",
    image: "/business-types/beauty.jpg",
    icon: Scissors,
    href: "/solutions/salons",
    size: "lg:col-span-2",
  },
  {
    title: "Food and delivery",
    description:
      "Help customers find your menu, delivery areas, operating hours and ordering options.",
    image: "/business-types/delivery.jpg",
    icon: Truck,
    href: "/solutions/food-delivery",
    size: "lg:col-span-2",
  },
  {
    title: "Professional services",
    description:
      "Present expertise, services, service areas and trusted business information.",
    image: "/business-types/professional.jpg",
    icon: BriefcaseBusiness,
    href: "/solutions/professional-services",
    size: "lg:col-span-2",
  },
  {
    title: "Local businesses",
    description:
      "Give nearby customers accurate information about what you sell and where to find you.",
    image: "/business-types/local-business.jpg",
    icon: Store,
    href: "/solutions/local-businesses",
    size: "md:col-span-2 lg:col-span-4",
  },
];

export function BusinessTypes() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div
            className={`transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
              Built for different businesses
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
              Who can use Vizo?
            </h2>
          </div>

          <p
            className={`max-w-2xl text-base leading-8 text-slate-600 transition-all delay-150 duration-700 sm:text-lg ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Vizo is designed for businesses that want customers to find accurate
            information wherever they search, ask or discover.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-[280px] grid-cols-1 gap-4 md:grid-cols-2 lg:auto-rows-[250px] lg:grid-cols-6">
          {businessTypes.map((business, index) => {
            const Icon = business.icon;

            return (
              <article
                key={business.title}
                className={`group relative min-h-[280px] overflow-hidden rounded-3xl bg-slate-950 shadow-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/15 ${business.size} ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: visible ? `${180 + index * 100}ms` : "0ms",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={business.image}
                  alt={business.title}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <span className="grid size-10 place-items-center rounded-xl bg-teal-400 text-slate-950 shadow-lg">
                        <Icon className="size-5" />
                      </span>

                      <h3 className="mt-4 text-xl font-black tracking-[-0.02em] text-white sm:text-2xl">
                        {business.title}
                      </h3>

                      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-200">
                        {business.description}
                      </p>
                    </div>

                    <Link
                      href={business.href}
                      aria-label={`Learn about Vizo for ${business.title}`}
                      className="grid size-11 shrink-0 translate-y-3 place-items-center rounded-full border border-white/30 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:bg-teal-400 group-hover:text-slate-950 group-hover:opacity-100"
                    >
                      <ArrowUpRight className="size-5" />
                    </Link>
                  </div>
                </div>

                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-teal-400 transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>

        <div
          className={`mt-8 flex flex-col gap-4 rounded-3xl bg-slate-100 px-6 py-6 transition-all delay-700 duration-700 sm:flex-row sm:items-center sm:justify-between sm:px-8 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div>
            <p className="font-black text-slate-950">
              Do not see your business type?
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Vizo can support any business with locations, services, products
              or customers.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-bold text-white transition hover:bg-teal-500 hover:text-slate-950"
          >
            Talk to Vizo
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

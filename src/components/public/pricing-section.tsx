"use client";

import {
  ArrowRight,
  Check,
  Code2,
  MapPin,
  Megaphone,
  Share2,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const plans = [
  {
    name: "Starter",
    description: "For a business building its first trusted online presence.",
    monthlyPrice: 10,
    features: [
      "One business profile",
      "One location",
      "Services and opening hours",
      "Basic visibility audit",
      "Google Business Profile checklist",
      "Basic Google Maps guidance",
    ],
    button: "Choose Starter",
    href: "/register",
    featured: false,
  },
  {
    name: "Visibility",
    description: "For businesses that want to improve search and AI discovery.",
    monthlyPrice: 29,
    features: [
      "Everything in Starter",
      "Up to three locations",
      "Google Business Profile setup",
      "Google Maps optimization",
      "Vizo Website Connect",
      "SEO and GEO recommendations",
      "Schema.org and AI-ready data",
      "Google and social ads setup",
      "Monthly visibility reports",
    ],
    button: "Choose Visibility",
    href: "/register?plan=visibility",
    featured: true,
  },
  {
    name: "Growth",
    description: "For businesses that need complete digital-growth support.",
    monthlyPrice: 79,
    features: [
      "Everything in Visibility",
      "Up to ten locations",
      "Website or landing-page support",
      "Advanced SEO and GEO",
      "Social-media strategy",
      "Google and social ads management",
      "Advertising performance reports",
      "Advanced analytics",
      "Priority support",
    ],
    button: "Choose Growth",
    href: "/register?plan=growth",
    featured: false,
  },
];

const additionalServices = [
  {
    title: "Website development",
    description: "Business websites and landing pages",
    icon: Code2,
  },
  {
    title: "Google presence",
    description: "Business Profile and Maps management",
    icon: MapPin,
  },
  {
    title: "Digital advertising",
    description: "Google, Facebook and Instagram ad campaigns",
    icon: Megaphone,
  },
  {
    title: "Social media",
    description: "Content planning and profile management",
    icon: Share2,
  },
];

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [yearly, setYearly] = useState(false);

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
      { threshold: 0.1 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  function priceFor(monthlyPrice: number) {
    if (monthlyPrice === 0) {
      return "$0";
    }

    if (yearly) {
      return `$${Math.round(monthlyPrice * 0.8)}`;
    }

    return `$${monthlyPrice}`;
  }

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="overflow-hidden bg-white px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-12 lg:pb-24 lg:pt-12"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
              Simple pricing
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
              Choose the visibility support your business needs.
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Start with a business profile, then add website, Google, AI,
              advertising and social-media services as your business grows.
            </p>
          </div>

          <div
            className={`inline-flex w-fit shrink-0 rounded-full bg-slate-100 p-1 transition-all delay-150 duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                !yearly ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                yearly ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
              }`}
            >
              Yearly · Save 20%
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-5 transition-all duration-700 sm:p-6 ${
                plan.featured
                  ? "border-teal-400 bg-[#07152b] text-white shadow-xl"
                  : "border-slate-200 bg-white text-slate-950 shadow-sm"
              } ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? `${200 + index * 100}ms` : "0ms",
              }}
            >
              {plan.featured ? (
                <span className="absolute right-5 top-5 rounded-full bg-teal-400 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-slate-950">
                  Recommended
                </span>
              ) : null}

              <span
                className={`grid size-10 place-items-center rounded-xl ${
                  plan.featured
                    ? "bg-teal-400 text-slate-950"
                    : "bg-slate-100 text-slate-950"
                }`}
              >
                <Store className="size-5" />
              </span>

              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black">{plan.name}</h3>

                  <p
                    className={`mt-1 text-sm leading-6 ${
                      plan.featured ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-end gap-2">
                <span className="text-4xl font-black tracking-[-0.05em]">
                  {priceFor(plan.monthlyPrice)}
                </span>

                <span
                  className={`mb-1 text-xs ${
                    plan.featured ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  per month
                </span>
              </div>

              <div
                className={`my-5 h-px ${
                  plan.featured ? "bg-white/15" : "bg-slate-200"
                }`}
              />

              <ul className="grid flex-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-2 text-xs leading-5 ${
                      plan.featured ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${
                        plan.featured
                          ? "bg-teal-400 text-slate-950"
                          : "bg-teal-100 text-teal-800"
                      }`}
                    >
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>

                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`group mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-black transition ${
                  plan.featured
                    ? "bg-teal-400 text-slate-950 hover:bg-teal-300"
                    : "bg-slate-950 text-white hover:bg-teal-500 hover:text-slate-950"
                }`}
              >
                {plan.button}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>

        <div
          className={`mt-6 rounded-3xl bg-slate-100 p-5 transition-all delay-500 duration-700 sm:p-6 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((service) => {
              const Icon = service.icon;

              return (
                <div key={service.title} className="flex gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-teal-700 shadow-sm">
                    <Icon className="size-5" />
                  </span>

                  <div>
                    <p className="text-sm font-black text-slate-950">
                      {service.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              Custom services are quoted based on your business requirements.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-black text-teal-800"
            >
              Request custom pricing
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

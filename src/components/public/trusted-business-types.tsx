"use client";

import {
  BriefcaseBusiness,
  Hotel,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const businessTypes = [
  {
    name: "Hotels",
    description: "Properties, rooms and guest services",
    icon: Hotel,
  },
  {
    name: "Restaurants",
    description: "Menus, locations and opening hours",
    icon: UtensilsCrossed,
  },
  {
    name: "Salons and spas",
    description: "Beauty, wellness and personal care",
    icon: Sparkles,
  },
  {
    name: "Retail shops",
    description: "Products, stores and availability",
    icon: ShoppingBag,
  },
  {
    name: "Clinics",
    description: "Health services and clinic information",
    icon: Stethoscope,
  },
  {
    name: "Professional services",
    description: "Experts, agencies and consultants",
    icon: BriefcaseBusiness,
  },
];

export function TrustedBusinessTypes() {
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
        threshold: 0.2,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-b border-slate-200 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#35327b]">
            Built for every business
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] text-[#10103f] sm:text-4xl">
            Trusted by growing business types
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Vizo helps different businesses publish clear and accurate
            information for customers, search engines and AI platforms.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businessTypes.map((business, index) => {
            const Icon = business.icon;

            return (
              <article
                key={business.name}
                style={{
                  transitionDelay: visible ? `${index * 90}ms` : "0ms",
                }}
                className={`business-type-card group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-700 ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="card-shine absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-start gap-4">
                  <span className="business-icon grid size-12 shrink-0 place-items-center rounded-xl bg-[#f0f0fa] text-[#29266d] transition-all duration-300 group-hover:bg-[#10103f] group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>

                  <div>
                    <h3 className="text-base font-bold text-[#10103f]">
                      {business.name}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-slate-500">
                      {business.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p
          className={`mt-10 text-center text-sm text-slate-500 transition-all delay-700 duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          Your business type is not listed? Vizo can still work for you.
        </p>
      </div>

      <style jsx>{`
        .business-type-card:hover {
          border-color: #c5c7d8;
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(15, 23, 42, 0.09);
        }

        .card-shine {
          background: linear-gradient(
            120deg,
            transparent 20%,
            rgba(239, 240, 250, 0.8) 50%,
            transparent 80%
          );
          transform: translateX(-100%);
        }

        .business-type-card:hover .card-shine {
          animation: cardShine 800ms ease;
        }

        .business-type-card:hover .business-icon {
          transform: rotate(-4deg) scale(1.06);
        }

        @keyframes cardShine {
          from {
            transform: translateX(-100%);
          }

          to {
            transform: translateX(100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .business-type-card,
          .business-icon,
          .card-shine {
            transition: none;
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

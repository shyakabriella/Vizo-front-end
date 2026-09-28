"use client";

import {
  BarChart3,
  Clock,
  FileText,
  Search,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type VisibilityProblem = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const problems: VisibilityProblem[] = [
  {
    number: "01",
    title: "Scattered information",
    description:
      "Your website, maps, business profiles and social pages may show different information.",
    icon: Search,
  },
  {
    number: "02",
    title: "Outdated business details",
    description:
      "Incorrect opening hours, contact details and locations can make customers lose trust.",
    icon: Clock,
  },
  {
    number: "03",
    title: "Unclear website content",
    description:
      "Search engines and AI assistants may not clearly understand your services and prices.",
    icon: FileText,
  },
  {
    number: "04",
    title: "No visibility measurement",
    description:
      "Without useful reports, it is difficult to know where customers discover your business.",
    icon: BarChart3,
  },
];

export function VisibilityGap() {
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
        threshold: 0.15,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-white px-5 pb-8 pt-20 sm:px-8 sm:pb-10 sm:pt-24 lg:px-12 lg:pb-12 lg:pt-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div
            className={`max-w-xl transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
              The visibility gap
            </p>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
              Your business may be online, but still difficult to discover.
            </h2>
          </div>

          <div
            className={`max-w-2xl transition-all delay-150 duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-base leading-8 text-slate-600 sm:text-lg">
              Customers now search through Google, maps, social media, voice
              assistants and AI tools. When your information is incomplete or
              inconsistent, these platforms may recommend another business.
            </p>

            <div className="mt-7 h-px bg-slate-200" />

            <p className="mt-5 text-lg font-bold text-slate-950">
              Being online is not the same as being discoverable.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {problems.map((problem, index) => {
            const Icon = problem.icon;

            return (
              <article
                key={problem.number}
                className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all duration-700 hover:-translate-y-2 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-slate-900/10 sm:p-7 ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: visible ? `${200 + index * 120}ms` : "0ms",
                }}
              >
                <div className="absolute right-5 top-4 text-5xl font-black text-slate-200/70 transition-colors group-hover:text-teal-100">
                  {problem.number}
                </div>

                <div className="relative">
                  <span className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-white transition-all duration-300 group-hover:rotate-3 group-hover:bg-teal-500 group-hover:text-slate-950">
                    <Icon className="size-5" />
                  </span>

                  <h3 className="mt-8 text-xl font-black tracking-[-0.02em] text-slate-950">
                    {problem.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {problem.description}
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-teal-400 transition-transform duration-300 group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>

        <div
          className={`mt-12 flex flex-col gap-4 rounded-3xl bg-[#07152b] px-6 py-7 text-white transition-all delay-700 duration-700 sm:flex-row sm:items-center sm:justify-between sm:px-8 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div>
            <p className="text-sm font-bold text-teal-300">
              The result of poor visibility
            </p>

            <p className="mt-1 text-lg font-bold">
              Customers search, but they find another business first.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-300">
            <span className="size-2.5 animate-pulse rounded-full bg-teal-400" />
            Vizo helps close this gap
          </div>
        </div>
      </div>
    </section>
  );
}

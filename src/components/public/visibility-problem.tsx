"use client";

import {
  BrainCircuit,
  Braces,
  Clock3,
  GitCompareArrows,
  Tags,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const problems = [
  {
    title: "AI cannot understand your business",
    description:
      "Your information may not be written in a format that AI platforms can understand.",
    icon: BrainCircuit,
  },
  {
    title: "Incorrect opening hours",
    description:
      "Outdated hours can send customers to your business when it is closed.",
    icon: Clock3,
  },
  {
    title: "Missing services and prices",
    description:
      "Customers cannot compare your business when important details are missing.",
    icon: Tags,
  },
  {
    title: "Different information everywhere",
    description:
      "Your website, social media and business listings may show conflicting details.",
    icon: GitCompareArrows,
  },
  {
    title: "No structured website data",
    description:
      "Search engines and AI assistants may not understand what your website contains.",
    icon: Braces,
  },
];

export function VisibilityProblem() {
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
      className="overflow-hidden bg-[#f7f8fb] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#35327b]">
            The visibility problem
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#10103f] sm:text-4xl">
            Your business exists, but AI may not see it
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Incomplete or inconsistent information makes it difficult for search
            engines, AI assistants and customers to trust your business.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon;

            const cardWidth =
              index < 3
                ? "lg:col-span-2"
                : index === 3
                  ? "lg:col-span-3"
                  : "lg:col-span-3";

            return (
              <article
                key={problem.title}
                style={{
                  transitionDelay: visible ? `${index * 90}ms` : "0ms",
                }}
                className={`problem-card group relative min-h-[190px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-700 ${cardWidth} ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <span className="absolute right-4 top-3 text-4xl font-bold text-slate-100 transition-colors group-hover:text-[#eeeeF8]">
                  0{index + 1}
                </span>

                <span className="problem-icon relative grid size-11 place-items-center rounded-xl bg-[#efeff8] text-[#29266d] transition-all duration-300">
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>

                <div className="relative mt-5">
                  <h3 className="max-w-[260px] text-base font-bold leading-6 text-[#10103f]">
                    {problem.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {problem.description}
                  </p>
                </div>

                <span className="problem-line absolute bottom-0 left-0 h-1 w-0 bg-[#35327b] transition-all duration-500 group-hover:w-full" />
              </article>
            );
          })}
        </div>

        <div
          className={`mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center transition-all delay-500 duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-sm leading-6 text-slate-600">
            If AI cannot understand your business, it may recommend a competitor
            with clearer and more reliable information.
          </p>
        </div>
      </div>

      <style jsx>{`
        .problem-card:hover {
          border-color: #c5c7da;
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
        }

        .problem-card:hover .problem-icon {
          color: white;
          background: #10103f;
          transform: rotate(-5deg) scale(1.08);
        }

        @media (prefers-reduced-motion: reduce) {
          .problem-card,
          .problem-icon,
          .problem-line {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

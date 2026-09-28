"use client";

import {
  ArrowUpRight,
  Bot,
  Globe2,
  Megaphone,
  Search,
  Share2,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Solution = {
  number: string;
  title: string;
  label: string;
  description: string;
  points: string[];
  icon: LucideIcon;
  className: string;
  accent: string;
};

const solutions: Solution[] = [
  {
    number: "01",
    title: "Search Engine Optimization",
    label: "SEO",
    description:
      "Improve how your website appears when customers search for businesses, services and products.",
    points: [
      "Website content review",
      "Local search optimization",
      "Technical SEO guidance",
    ],
    icon: Search,
    className: "lg:col-span-5",
    accent: "bg-blue-500",
  },
  {
    number: "02",
    title: "Generative Engine Optimization",
    label: "GEO",
    description:
      "Prepare your business information for AI-powered search and answer engines.",
    points: [
      "AI-readable business content",
      "Clear answers to customer questions",
      "Trusted information sources",
    ],
    icon: Globe2,
    className: "lg:col-span-7",
    accent: "bg-violet-500",
  },
  {
    number: "03",
    title: "AI Business Visibility",
    label: "AI visibility",
    description:
      "Help AI assistants understand what your business offers, where it operates and how customers can reach it.",
    points: [
      "Structured business information",
      "Services, prices and locations",
      "Website and business verification",
    ],
    icon: Bot,
    className: "lg:col-span-7",
    accent: "bg-teal-400",
  },
  {
    number: "04",
    title: "Digital Advertising",
    label: "Ads",
    description:
      "Reach people who are actively searching for the services and products your business provides.",
    points: [
      "Campaign planning",
      "Audience targeting",
      "Performance monitoring",
    ],
    icon: Megaphone,
    className: "lg:col-span-5",
    accent: "bg-amber-400",
  },
  {
    number: "05",
    title: "Social Media Visibility",
    label: "Social media",
    description:
      "Keep your business information and message consistent across the social platforms your customers use.",
    points: [
      "Profile consistency",
      "Content direction",
      "Audience engagement insights",
    ],
    icon: Share2,
    className: "lg:col-span-12",
    accent: "bg-rose-400",
  },
];

export function VizoSolutions() {
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
        threshold: 0.1,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative isolate overflow-hidden bg-[#07152b] px-5 py-10 text-white sm:px-8 sm:py-12 lg:px-12 lg:py-14"
    >
      <div className="absolute inset-0 -z-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="size-full object-cover opacity-20"
        >
          <source src="/viz-clean-background.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 -z-10 bg-[#07152b]\/70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07152b]\/90 via-[#07152b]\/55 to-[#07152b]\/75" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="grid gap-8 border-b border-white/15 pb-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div
            className={`transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-300">
              Vizo solutions
            </p>

            <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-[42px]">
              More ways for customers to discover your business.
            </h2>
          </div>

          <p
            className={`max-w-2xl text-base leading-8 text-slate-300 transition-all delay-150 duration-700 sm:text-lg ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Visibility does not come from one channel. Vizo combines search, AI
            discovery, advertising and social platforms into one connected
            growth strategy.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;

            return (
              <article
                key={solution.number}
                className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-[#0d203d]/95 p-4 transition-all duration-700 hover:-translate-y-1 hover:border-white/30 hover:bg-[#132b4d] sm:p-5 ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: visible ? `${200 + index * 100}ms` : "0ms",
                }}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${solution.accent}`}
                />

                <div className="flex items-start justify-between gap-5">
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-2xl text-slate-950 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105 ${solution.accent}`}
                  >
                    <Icon className="size-5" />
                  </span>

                  <span className="text-4xl font-black text-white/10">
                    {solution.number}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-300">
                    {solution.label}
                  </p>

                  <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                    {solution.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                    {solution.description}
                  </p>

                  <ul className="hidden">
                    {solution.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm font-semibold text-slate-200"
                      >
                        <span
                          className={`size-1.5 shrink-0 rounded-full ${solution.accent}`}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className={`mt-6 flex flex-col gap-5 rounded-3xl border border-white/15 bg-[#0d203d]/95 p-6 transition-all delay-700 duration-700 sm:flex-row sm:items-center sm:justify-between sm:p-5 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div>
            <p className="text-xl font-black">
              Not sure which solution your business needs?
            </p>

            <p className="mt-2 text-sm text-slate-300">
              Start with a visibility audit and find the areas that need
              attention first.
            </p>
          </div>

          <Link
            href="/audit"
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-teal-400 px-7 text-sm font-black text-slate-950 transition hover:bg-teal-300"
          >
            Audit your business
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

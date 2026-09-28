"use client";

import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  FileText,
  Globe2,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type AuditMetric = {
  label: string;
  description: string;
  score: number;
  icon: LucideIcon;
  color: string;
};

const auditMetrics: AuditMetric[] = [
  {
    label: "Business profile",
    description: "Locations, contact details and opening hours",
    score: 94,
    icon: SearchCheck,
    color: "bg-teal-500",
  },
  {
    label: "Website reachability",
    description: "Website access, security and page availability",
    score: 88,
    icon: Globe2,
    color: "bg-blue-500",
  },
  {
    label: "Structured data",
    description: "Business information understood by search platforms",
    score: 72,
    icon: Code2,
    color: "bg-violet-500",
  },
  {
    label: "Content quality",
    description: "Clear services, products and customer information",
    score: 81,
    icon: FileText,
    color: "bg-amber-500",
  },
  {
    label: "AI readiness",
    description: "Information available to AI discovery platforms",
    score: 68,
    icon: Bot,
    color: "bg-rose-500",
  },
];

export function VisibilityAudit() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setVisible(true);
        observer.disconnect();

        const targetScore = 81;
        const duration = 1200;
        const startTime = performance.now();

        function updateScore(currentTime: number) {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setScore(Math.round(targetScore * easedProgress));

          if (progress < 1) {
            window.requestAnimationFrame(updateScore);
          }
        }

        window.requestAnimationFrame(updateScore);
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
      id="audit"
      className="overflow-hidden bg-[#f3f6f8] px-5 pb-6 pt-16 sm:px-8 sm:pb-8 sm:pt-20 lg:px-12 lg:pb-10 lg:pt-24"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div
            className={`transition-all duration-700 ${
              visible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
              Business visibility audit
            </p>

            <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
              Know what is helping or limiting your visibility.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Vizo checks the information and technical signals that search
              engines, customers and AI platforms use when discovering your
              business.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Find missing or incorrect information",
                "Identify website and structured-data problems",
                "Receive clear recommendations in order of priority",
              ].map((item, index) => (
                <div
                  key={item}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  }`}
                  style={{
                    transitionDelay: visible ? `${250 + index * 100}ms` : "0ms",
                  }}
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-teal-100 text-teal-700">
                    <CheckCircle2 className="size-4" />
                  </span>

                  <p className="text-sm font-bold text-slate-800">{item}</p>
                </div>
              ))}
            </div>

            <Link
              href="/audit"
              className="group mt-9 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-slate-950 px-7 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-teal-500 hover:text-slate-950"
            >
              Audit your business
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div
            className={`transition-all delay-200 duration-700 ${
              visible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
              <div className="flex flex-col gap-6 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
                    Example audit
                  </p>

                  <h3 className="mt-2 text-xl font-black text-slate-950 sm:text-2xl">
                    Aspecto Spa Saloon
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">Kigali, Rwanda</p>
                </div>

                <div className="flex items-center gap-4">
                  <ScoreCircle score={score} />

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Overall score
                    </p>

                    <p className="mt-1 text-lg font-black text-slate-950">
                      Good visibility
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-7">
                {auditMetrics.map((metric, index) => {
                  const Icon = metric.icon;

                  return (
                    <div
                      key={metric.label}
                      className={`transition-all duration-500 ${
                        visible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-5 opacity-0"
                      }`}
                      style={{
                        transitionDelay: visible
                          ? `${350 + index * 100}ms`
                          : "0ms",
                      }}
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-700">
                          <Icon className="size-4" />
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-4">
                            <p className="truncate text-sm font-black text-slate-900">
                              {metric.label}
                            </p>

                            <p className="text-sm font-black text-slate-950">
                              {metric.score}%
                            </p>
                          </div>

                          <p className="mt-0.5 truncate text-xs text-slate-500">
                            {metric.description}
                          </p>
                        </div>
                      </div>

                      <div className="ml-12 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${metric.color}`}
                          style={{
                            width: visible ? `${metric.score}%` : "0%",
                            transitionDelay: visible
                              ? `${450 + index * 100}ms`
                              : "0ms",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-950">
                      3 improvements recommended
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Structured data and AI readiness need attention first.
                    </p>
                  </div>

                  <span className="inline-flex w-fit items-center rounded-full bg-amber-100 px-3 py-1.5 text-xs font-black text-amber-800">
                    Action required
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreCircle({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative size-24 shrink-0">
      <svg viewBox="0 0 100 100" className="-rotate-90" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="8"
        />

        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#14b8a6"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-300"
        />
      </svg>

      <span className="absolute inset-0 grid place-items-center text-xl font-black text-slate-950">
        {score}
      </span>
    </div>
  );
}

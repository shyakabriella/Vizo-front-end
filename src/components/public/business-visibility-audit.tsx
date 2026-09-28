"use client";

import {
  Bot,
  CheckCircle2,
  CircleAlert,
  FileCheck2,
  Globe2,
  ListChecks,
  PlugZap,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const auditItems = [
  {
    name: "Profile completeness",
    description: "Business identity, contact details and locations",
    score: 92,
    icon: ListChecks,
  },
  {
    name: "Website reachability",
    description: "Website availability and response status",
    score: 100,
    icon: Globe2,
  },
  {
    name: "Structured data",
    description: "Schema.org data found on the website",
    score: 76,
    icon: FileCheck2,
  },
  {
    name: "Installation status",
    description: "Vizo Connect script installed and active",
    score: 100,
    icon: PlugZap,
  },
  {
    name: "Content quality",
    description: "Useful and consistent business information",
    score: 68,
    icon: Sparkles,
  },
  {
    name: "AI readiness",
    description: "Business information prepared for AI discovery",
    score: 82,
    icon: Bot,
  },
];

function getScoreStyle(score: number) {
  if (score >= 90) {
    return {
      label: "Excellent",
      text: "text-emerald-700",
      background: "bg-emerald-500",
      badge: "bg-emerald-50",
    };
  }

  if (score >= 75) {
    return {
      label: "Good",
      text: "text-blue-700",
      background: "bg-blue-500",
      badge: "bg-blue-50",
    };
  }

  return {
    label: "Needs work",
    text: "text-amber-700",
    background: "bg-amber-500",
    badge: "bg-amber-50",
  };
}

export function BusinessVisibilityAudit() {
  const sectionRef = useRef<HTMLElement>(null);

  const [visible, setVisible] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  const overallScore = 86;

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

  useEffect(() => {
    if (!visible) {
      return;
    }

    let currentScore = 0;

    const timer = window.setInterval(() => {
      currentScore += 2;

      if (currentScore >= overallScore) {
        setDisplayScore(overallScore);
        window.clearInterval(timer);
        return;
      }

      setDisplayScore(currentScore);
    }, 18);

    return () => window.clearInterval(timer);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      id="visibility-audit"
      className="overflow-hidden border-b border-slate-200 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#35327b]">
            Business visibility audit
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#10103f] sm:text-4xl">
            Know how visible your business really is
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Vizo checks your business profile, website and published information
            to identify what is working and what needs improvement.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[340px_1fr] lg:gap-8">
          <div
            className={`transition-all duration-1000 ${
              visible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="score-card rounded-3xl bg-[#10103f] p-6 text-white shadow-[0_24px_60px_rgba(16,16,63,0.2)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                    Example audit
                  </p>

                  <p className="mt-1 font-semibold">Aspecto Spa Saloon</p>
                </div>

                <span className="grid size-10 place-items-center rounded-xl bg-white/10">
                  <ScanSearch className="size-5" />
                </span>
              </div>

              <div className="my-8 flex justify-center">
                <div
                  className="score-ring relative grid size-48 place-items-center rounded-full"
                  style={{
                    background: `conic-gradient(
                      #34d399 ${visible ? overallScore * 3.6 : 0}deg,
                      rgba(255, 255, 255, 0.12) 0deg
                    )`,
                  }}
                >
                  <div className="grid size-36 place-items-center rounded-full bg-[#10103f] text-center">
                    <div>
                      <p className="text-5xl font-bold tracking-[-0.05em]">
                        {displayScore}
                      </p>

                      <p className="mt-1 text-xs text-white/50">out of 100</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-emerald-400 text-[#10103f]">
                    <CheckCircle2 className="size-5" />
                  </span>

                  <div>
                    <p className="text-sm font-bold">Good visibility</p>

                    <p className="mt-0.5 text-xs leading-5 text-white/55">
                      Your business is discoverable, but some areas can still be
                      improved.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5 text-xs">
                <span className="text-white/45">Last checked</span>
                <span className="font-semibold text-white/80">Just now</span>
              </div>
            </div>
          </div>

          <div
            className={`rounded-3xl border border-slate-200 bg-[#f8f9fc] p-4 transition-all delay-200 duration-1000 sm:p-6 ${
              visible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#10103f]">
                  Audit breakdown
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Six areas that affect business visibility
                </p>
              </div>

              <span className="flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                <span className="size-2 rounded-full bg-emerald-500" />
                Audit completed
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {auditItems.map((item, index) => {
                const Icon = item.icon;
                const scoreStyle = getScoreStyle(item.score);

                return (
                  <article
                    key={item.name}
                    style={{
                      transitionDelay: visible
                        ? `${index * 90 + 300}ms`
                        : "0ms",
                    }}
                    className={`audit-item rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-700 ${
                      visible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="audit-icon grid size-10 shrink-0 place-items-center rounded-xl bg-[#efeff8] text-[#29266d] transition-all duration-300">
                        <Icon className="size-4.5" strokeWidth={1.8} />
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${scoreStyle.badge} ${scoreStyle.text}`}
                      >
                        {item.score}%
                      </span>
                    </div>

                    <h4 className="mt-4 text-sm font-bold text-[#10103f]">
                      {item.name}
                    </h4>

                    <p className="mt-1 min-h-10 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        style={{
                          width: visible ? `${item.score}%` : "0%",
                          transitionDelay: `${index * 90 + 600}ms`,
                        }}
                        className={`h-full rounded-full transition-all duration-1000 ${scoreStyle.background}`}
                      />
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`text-[11px] font-medium ${scoreStyle.text}`}
                      >
                        {scoreStyle.label}
                      </span>

                      {item.score >= 75 ? (
                        <CheckCircle2 className="size-3.5 text-emerald-500" />
                      ) : (
                        <CircleAlert className="size-3.5 text-amber-500" />
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .score-ring {
          transition: background 1.3s ease;
        }

        .score-card {
          animation: scoreFloat 5s ease-in-out infinite;
        }

        .audit-item:hover {
          border-color: #c6c8dc;
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.07);
        }

        .audit-item:hover .audit-icon {
          color: white;
          background: #10103f;
          transform: rotate(-4deg) scale(1.05);
        }

        @keyframes scoreFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .score-card,
          .audit-item,
          .audit-icon {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

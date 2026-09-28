"use client";

import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Globe2,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    name: "Deep Tissue Massage",
    price: "25,000 RWF",
  },
  {
    name: "Facial Treatment",
    price: "20,000 RWF",
  },
  {
    name: "Manicure and Pedicure",
    price: "15,000 RWF",
  },
];

export function RealBusinessExample() {
  const sectionRef = useRef<HTMLElement>(null);

  const [visible, setVisible] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  const visibilityScore = 86;

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

    let score = 0;

    const timer = window.setInterval(() => {
      score += 2;

      if (score >= visibilityScore) {
        setDisplayScore(visibilityScore);
        window.clearInterval(timer);
        return;
      }

      setDisplayScore(score);
    }, 20);

    return () => window.clearInterval(timer);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      id="business-example"
      className="overflow-hidden bg-[#f7f8fb] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#35327b]">
            Real business example
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#10103f] sm:text-4xl">
            See how Vizo works for Aspecto Spa
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Aspecto Spa is our pilot example showing how one business can
            organize its information and become easier for customers and AI
            platforms to discover.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:gap-8">
          <div
            className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-1000 ${
              visible
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0"
            }`}
          >
            <div className="relative overflow-hidden bg-[#10103f] p-6 text-white sm:p-8">
              <div className="business-pattern absolute inset-0 opacity-15" />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="logo-pulse grid size-14 shrink-0 place-items-center rounded-2xl bg-white text-xl font-bold text-[#10103f]">
                    AS
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold">Aspecto Spa Saloon</h3>

                      <CheckCircle2 className="size-5 text-emerald-400" />
                    </div>

                    <p className="mt-1 text-sm text-white/60">
                      Beauty, massage and wellness
                    </p>
                  </div>
                </div>

                <span className="flex w-fit items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                  <span className="status-dot size-2 rounded-full bg-emerald-400" />
                  Open today
                </span>
              </div>

              <div className="relative mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-white/10 p-4">
                  <MapPin className="size-4 text-white/60" />

                  <p className="mt-3 text-xs text-white/45">Location</p>

                  <p className="mt-1 text-sm font-semibold">Kigali, Rwanda</p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <Clock3 className="size-4 text-white/60" />

                  <p className="mt-3 text-xs text-white/45">Today</p>

                  <p className="mt-1 text-sm font-semibold">
                    Open until 8:00 PM
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <Globe2 className="size-4 text-white/60" />

                  <p className="mt-3 text-xs text-white/45">Website</p>

                  <p className="mt-1 truncate text-sm font-semibold">
                    aspectospasaloon.com
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Example offerings
                  </p>

                  <h4 className="mt-1 text-lg font-bold text-[#10103f]">
                    Services and prices
                  </h4>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  Pilot data
                </span>
              </div>

              <div className="mt-5 space-y-2">
                {services.map((service, index) => (
                  <div
                    key={service.name}
                    style={{
                      transitionDelay: visible
                        ? `${index * 100 + 500}ms`
                        : "0ms",
                    }}
                    className={`service-row flex items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3.5 transition-all duration-700 ${
                      visible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#efeff8] text-[#29266d]">
                        <Sparkles className="size-4" />
                      </span>

                      <p className="text-sm font-semibold text-slate-700">
                        {service.name}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm font-bold text-[#10103f]">
                      {service.price}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="https://aspectospasaloon.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#10103f] px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#29266d]"
                >
                  Visit website
                  <ExternalLink className="size-4" />
                </Link>

                <Link
                  href="/register"
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400"
                >
                  Create your profile
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          <div
            className={`space-y-5 transition-all delay-200 duration-1000 ${
              visible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
                <div className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-slate-300" />
                  <span className="size-2 rounded-full bg-slate-300" />
                  <span className="size-2 rounded-full bg-slate-300" />
                </div>

                <div className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-400">
                  <Search className="size-3.5" />
                  AI business search
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="search-question ml-auto max-w-[90%] rounded-2xl rounded-br-sm bg-[#10103f] px-4 py-3 text-sm leading-6 text-white">
                  Find a spa in Kigali offering deep tissue massage.
                </div>

                <div className="search-answer mt-4">
                  <div className="flex items-center gap-2">
                    <span className="bot-icon grid size-8 place-items-center rounded-full bg-[#efeff8] text-[#29266d]">
                      <Bot className="size-4" />
                    </span>

                    <p className="text-xs font-semibold text-slate-600">
                      AI Assistant
                    </p>

                    <span className="status-dot size-2 rounded-full bg-emerald-500" />
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Aspecto Spa Saloon matches your request. It offers deep
                    tissue massage and is currently open in Kigali.
                  </p>

                  <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-[#10103f]">
                          Aspecto Spa Saloon
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin className="size-3.5" />
                          Kigali, Rwanda
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        Open
                      </span>
                    </div>

                    <div className="mt-4 rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">Matching service</p>

                      <div className="mt-1 flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-700">
                          Deep Tissue Massage
                        </p>

                        <p className="text-sm font-bold text-[#10103f]">
                          25,000 RWF
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="score-box rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.07)] sm:p-6">
              <div className="flex items-center gap-5">
                <div
                  className="score-ring relative grid size-24 shrink-0 place-items-center rounded-full"
                  style={{
                    background: `conic-gradient(
                      #34d399 ${visible ? visibilityScore * 3.6 : 0}deg,
                      #e2e8f0 0deg
                    )`,
                  }}
                >
                  <div className="grid size-[74px] place-items-center rounded-full bg-white">
                    <span className="text-2xl font-bold text-[#10103f]">
                      {displayScore}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Visibility score
                  </p>

                  <p className="mt-1 text-lg font-bold text-[#10103f]">
                    Good visibility
                  </p>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Aspecto Spa is visible, with opportunities to improve
                    content quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-slate-400">
          Opening hours, services and prices shown here are example pilot data
          and can be connected to the live Vizo business profile.
        </p>
      </div>

      <style jsx>{`
        .business-pattern {
          background-image:
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: linear-gradient(to left, black, transparent 75%);
        }

        .logo-pulse {
          animation: logoFloat 3.5s ease-in-out infinite;
        }

        .status-dot {
          animation: statusPulse 1.4s ease-in-out infinite;
        }

        .bot-icon {
          animation: botPulse 2.2s ease-in-out infinite;
        }

        .search-question {
          animation: messageIn 500ms 700ms ease both;
        }

        .search-answer {
          animation: messageIn 500ms 1s ease both;
        }

        .score-box {
          animation: scoreFloat 4s ease-in-out infinite;
        }

        .score-ring {
          transition: background 1.3s ease;
        }

        .service-row:hover {
          border-color: #c6c8dc;
          transform: translateX(4px);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
        }

        @keyframes logoFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }

          50% {
            transform: translateY(-4px) rotate(-3deg);
          }
        }

        @keyframes statusPulse {
          0%,
          100% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.35);
          }

          50% {
            opacity: 0.6;
            box-shadow: 0 0 0 5px rgba(52, 211, 153, 0);
          }
        }

        @keyframes botPulse {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.08);
          }
        }

        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scoreFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .logo-pulse,
          .status-dot,
          .bot-icon,
          .search-question,
          .search-answer,
          .score-box,
          .service-row {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

"use client";

import { ArrowRight, Check, Code2, FileCheck2, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Build your business source",
    description:
      "Add your locations, contact details, opening hours, services, products and other important business information.",
    icon: Store,
  },
  {
    number: "02",
    title: "Connect your website",
    description:
      "Install the Vizo Connect script without rebuilding or replacing your current business website.",
    icon: Code2,
  },
  {
    number: "03",
    title: "Publish, measure and improve",
    description:
      "Vizo publishes structured information, monitors visibility and shows you what should be improved.",
    icon: FileCheck2,
  },
];

export function HowVizoWorks() {
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
      className="overflow-hidden bg-[#f5f7fa] px-5 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-12 lg:px-12 lg:pb-28 lg:pt-14"
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div
          className={`transition-all duration-700 ${
            visible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
            How Vizo works
          </p>

          <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
            Turn your business information into visibility.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
            Vizo gives your business one reliable source of information, then
            helps digital platforms use that information correctly.
          </p>

          <div className="mt-7 space-y-1">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className={`group flex gap-4 rounded-2xl border border-transparent p-3 transition-all duration-500 hover:border-slate-200 hover:bg-white hover:shadow-lg hover:shadow-slate-900/5 ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{
                    transitionDelay: visible ? `${150 + index * 120}ms` : "0ms",
                  }}
                >
                  <div className="relative shrink-0">
                    <span className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-white transition-colors group-hover:bg-teal-400 group-hover:text-slate-950">
                      <Icon className="size-5" />
                    </span>

                    {index < steps.length - 1 ? (
                      <span className="absolute left-1/2 top-14 h-8 w-px -translate-x-1/2 bg-slate-300" />
                    ) : null}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-teal-700">
                        STEP {step.number}
                      </span>
                    </div>

                    <h3 className="mt-1 text-lg font-black text-slate-950">
                      {step.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="/how-it-works"
            className="group mt-6 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-slate-950 px-7 text-sm font-bold text-white transition hover:bg-teal-500 hover:text-slate-950"
          >
            Explore the complete process
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div
          className={`relative transition-all delay-200 duration-700 ${
            visible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <div className="relative min-h-[460px] overflow-hidden rounded-[32px] bg-slate-900 shadow-2xl shadow-slate-900/15 sm:min-h-[560px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/vizo-process.png"
              alt="Business owner managing business visibility with Vizo"
              className="absolute inset-0 size-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

            <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/20 bg-slate-950/75 p-5 text-white shadow-xl backdrop-blur-xl sm:inset-x-7 sm:bottom-7 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-teal-400 text-slate-950">
                  <Check className="size-5" strokeWidth={3} />
                </span>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-300">
                    Business connection
                  </p>

                  <p className="mt-1 text-lg font-black">
                    Website successfully connected
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                <StatusItem label="Profile" value="Complete" />
                <StatusItem label="Website" value="Connected" />
                <StatusItem label="Publishing" value="Active" />
              </div>
            </div>
          </div>

          <div className="absolute -left-5 top-8 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl lg:block">
            <p className="text-xs font-semibold text-slate-500">
              Information quality
            </p>

            <div className="mt-2 flex items-end gap-2">
              <p className="text-3xl font-black text-slate-950">94%</p>
              <span className="mb-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
                Excellent
              </span>
            </div>
          </div>

          <div className="absolute -right-4 top-32 hidden rounded-2xl border border-white/30 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md sm:block">
            <div className="flex items-center gap-3">
              <span className="relative flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-teal-500" />
              </span>

              <div>
                <p className="text-xs text-slate-500">Vizo status</p>
                <p className="text-sm font-black text-slate-950">
                  Publishing updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/10 p-3">
      <p className="text-[10px] uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-bold text-white sm:text-sm">
        {value}
      </p>
    </div>
  );
}

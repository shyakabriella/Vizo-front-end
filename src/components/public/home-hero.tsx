"use client";

import {
  ArrowRight,
  BarChart3,
  Bot,
  Globe2,
  Megaphone,
  PlayCircle,
  Search,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const visibilityServices = [
  { label: "AI visibility", icon: Bot },
  { label: "SEO", icon: Search },
  { label: "GEO", icon: Globe2 },
  { label: "Digital ads", icon: Megaphone },
  { label: "Social media", icon: Share2 },
  { label: "Analytics", icon: BarChart3 },
];

export function HomeHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setVisible(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative flex min-h-[620px] items-center overflow-hidden bg-[#050816] pt-24 lg:min-h-[680px]">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="size-full object-cover"
        >
          <source src="/viz-clean-background.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#050816]/25" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/90 via-[#050816]/55 to-[#050816]/15" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/65 via-transparent to-[#050816]/25" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p
            className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <Bot className="size-4 text-teal-300" />
            One platform for complete business visibility
          </p>

          <h1
            className={`mt-6 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-0.045em] text-white transition-all delay-150 duration-700 sm:text-5xl lg:text-6xl ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Connect your business with AI and more customers.
          </h1>

          <p
            className={`mt-5 max-w-2xl text-base leading-7 text-slate-100 transition-all delay-300 duration-700 sm:text-lg ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Vizo connects your website and business information with AI
            assistants, search engines and digital platforms. We combine SEO,
            GEO, social media and advertising to improve your visibility
            everywhere customers search.
          </p>

          <div className="mt-6 flex max-w-3xl flex-wrap gap-2">
            {visibilityServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <span
                  key={service.label}
                  className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#07152b]/65 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all duration-500 ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  }`}
                  style={{
                    transitionDelay: visible ? `${400 + index * 80}ms` : "0ms",
                  }}
                >
                  <Icon className="size-3.5 text-teal-300" />
                  {service.label}
                </span>
              );
            })}
          </div>

          <div
            className={`mt-8 flex flex-col gap-3 transition-all delay-700 duration-700 sm:flex-row ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Link
              href="/register"
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-teal-400 px-7 text-sm font-bold text-[#06121d] transition hover:-translate-y-0.5 hover:bg-teal-300 hover:shadow-xl hover:shadow-teal-400/20"
            >
              Boost your visibility
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-white/30 bg-[#07152b]/55 px-7 text-sm font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              <PlayCircle className="size-5" />
              See how Vizo works
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-10 h-1 w-full overflow-hidden bg-white/10">
        <div className="h-full w-1/3 animate-[hero-progress_8s_linear_infinite] bg-teal-400" />
      </div>

      <style jsx>{`
        @keyframes hero-progress {
          0% {
            transform: translateX(-100%);
          }

          100% {
            transform: translateX(400%);
          }
        }
      `}</style>
    </section>
  );
}

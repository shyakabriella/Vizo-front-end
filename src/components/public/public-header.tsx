"use client";

import { BarChart3, Bot, Braces, ChevronDown, Menu, X } from "lucide-react";
import { VizoLogo } from "@/components/public/vizo-logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const solutionLinks = [
  {
    title: "AI visibility",
    description: "Help AI platforms understand and recommend your business.",
    href: "/solutions#ai-visibility",
    icon: Bot,
  },
  {
    title: "Website Connect",
    description: "Publish structured business information from one script.",
    href: "/solutions#website-connect",
    icon: Braces,
  },
  {
    title: "Audit and analytics",
    description: "Find visibility problems and monitor your progress.",
    href: "/solutions#audit",
    icon: BarChart3,
  },
];

const navigationLinks = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export function PublicHeader() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  function closeMenus() {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }

  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenus();
      }
    }

    window.addEventListener("keydown", closeWithEscape);

    return () => {
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  return (
    <>
      <header className="header-enter absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            onClick={closeMenus}
            className="group flex items-center gap-3"
            aria-label="Vizo home"
          >
            <span className="grid size-11 place-items-center rounded-2xl bg-[#11113f] text-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:-rotate-3 group-hover:shadow-lg">
              <VizoLogo size={44} className="size-11" />
            </span>

            <span className="text-2xl font-bold tracking-[-0.04em] text-[#11113f] transition group-hover:tracking-[-0.02em]">
              Vizo
            </span>
          </Link>

          <nav
            className="hidden items-center rounded-2xl bg-[#0b0a32] p-1.5 text-white shadow-[0_16px_40px_rgba(11,10,50,0.18)] lg:flex"
            aria-label="Main navigation"
          >
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setSolutionsOpen((open) => !open)}
                className="flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-medium transition duration-200 hover:bg-white/10"
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
              >
                Solutions
                <ChevronDown
                  className={`size-4 transition-transform duration-300 ${
                    solutionsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-full w-[370px] pt-3 transition-all duration-200 ${
                  solutionsOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible -translate-y-3 scale-[0.97] opacity-0"
                }`}
              >
                <div className="menu-enter rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-900 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
                  <div className="px-3 pb-2 pt-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Vizo solutions
                    </p>
                  </div>

                  {solutionLinks.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={closeMenus}
                        style={{
                          animationDelay: `${index * 70 + 80}ms`,
                        }}
                        className="menu-item group flex gap-3 rounded-xl p-3 transition duration-200 hover:translate-x-1 hover:bg-slate-50"
                      >
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#f0f3ff] text-[#3438a8] transition duration-300 group-hover:rotate-3 group-hover:bg-[#11113f] group-hover:text-white">
                          <Icon className="size-5" />
                        </span>

                        <span>
                          <span className="block text-sm font-semibold text-slate-900">
                            {item.title}
                          </span>

                          <span className="mt-1 block text-xs leading-5 text-slate-500">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    );
                  })}

                  <Link
                    href="/solutions"
                    onClick={closeMenus}
                    className="mt-2 flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-[#11113f] transition duration-200 hover:border-[#11113f] hover:bg-[#11113f] hover:text-white"
                  >
                    View all solutions
                  </Link>
                </div>
              </div>
            </div>

            {navigationLinks.map((item, index) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    animationDelay: `${index * 70 + 120}ms`,
                  }}
                  className={`nav-item flex h-11 items-center rounded-xl px-5 text-sm font-medium transition duration-200 hover:-translate-y-0.5 ${
                    active ? "bg-white/10" : "hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <span className="mx-1 h-6 w-px bg-white/15" />

            <Link
              href="/login"
              className="flex h-11 items-center rounded-xl px-5 text-sm font-medium transition duration-200 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="flex h-11 items-center rounded-xl bg-white px-5 text-sm font-semibold text-[#0b0a32] transition duration-300 hover:-translate-y-0.5 hover:bg-[#eef0ff] hover:shadow-lg active:translate-y-0"
            >
              Get started
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-xl bg-[#0b0a32] text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-90 lg:hidden"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </span>
          </button>
        </div>

        <div
          className={`px-5 transition-all duration-300 sm:px-8 lg:hidden ${
            mobileMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-4 opacity-0"
          }`}
        >
          <nav
            className="mobile-menu-enter mx-auto max-w-xl rounded-3xl border border-white/10 bg-[#0b0a32] p-3 text-white shadow-2xl"
            aria-label="Mobile navigation"
          >
            <button
              type="button"
              onClick={() => setSolutionsOpen((open) => !open)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition hover:bg-white/10"
              aria-expanded={solutionsOpen}
            >
              Solutions
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${
                  solutionsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                solutionsOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mb-2 space-y-1 rounded-xl bg-white/5 p-2">
                  {solutionLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/80 transition duration-200 hover:translate-x-1 hover:bg-white/10 hover:text-white"
                      >
                        <Icon className="size-4 shrink-0" />
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {navigationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                className="block rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 hover:translate-x-1 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}

            <div className="my-2 border-t border-white/10" />

            <Link
              href="/login"
              onClick={closeMenus}
              className="block rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 hover:translate-x-1 hover:bg-white/10"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              onClick={closeMenus}
              className="mt-2 flex h-12 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#0b0a32] transition duration-300 hover:bg-[#eef0ff] active:scale-[0.98]"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <style jsx>{`
        @keyframes headerEnter {
          from {
            opacity: 0;
            transform: translateY(-24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes menuEnter {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes itemEnter {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .header-enter {
          animation: headerEnter 650ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .menu-enter,
        .mobile-menu-enter {
          animation: menuEnter 240ms cubic-bezier(0.22, 1, 0.36, 1) both;
          transform-origin: top;
        }

        .menu-item,
        .nav-item {
          opacity: 0;
          animation: itemEnter 350ms ease forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .header-enter,
          .menu-enter,
          .mobile-menu-enter,
          .menu-item,
          .nav-item {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

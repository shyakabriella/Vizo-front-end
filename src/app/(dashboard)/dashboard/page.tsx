"use client";

import Link from "next/link";
import { ArrowRight, Bot, Building2, Search, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const cards = [
  {
    title: "Business profiles",
    value: "0",
    description: "Businesses connected to your account",
    icon: Building2,
  },
  {
    title: "Search visibility",
    value: "—",
    description: "Create a business to start measuring",
    icon: Search,
  },
  {
    title: "AI readiness",
    value: "—",
    description: "Publish structured business knowledge",
    icon: Bot,
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
          Overview
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Hello, {user?.name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-slate-500">
          Manage how customers, search engines and AI assistants understand your
          business.
        </p>
      </div>

      {!user?.email_verified_at && (
        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
          <Sparkles className="mt-0.5 shrink-0" size={20} />
          <div>
            <p className="font-bold">Verify your email address</p>
            <p className="mt-1 text-sm text-amber-800">
              Open the verification email sent by Vizo to secure your account.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={21} />
                </div>
                <span className="text-3xl font-bold text-slate-950">
                  {card.value}
                </span>
              </div>
              <h2 className="mt-5 font-bold text-slate-900">{card.title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      <section className="mt-8 rounded-3xl bg-[#12204a] p-7 text-white sm:p-9">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
          Start with your business
        </p>
        <h2 className="mt-3 max-w-xl text-2xl font-bold sm:text-3xl">
          Create your first business profile on Vizo.
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-blue-100/75">
          Add your business details, services, locations and useful knowledge
          before publishing your visibility profile.
        </p>
        <Link
          href="/dashboard/businesses/create"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 font-bold text-white transition hover:bg-blue-400"
        >
          Create business
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}

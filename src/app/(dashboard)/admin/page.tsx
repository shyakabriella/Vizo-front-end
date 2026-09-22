"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Building2, CreditCard, Settings, Users } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const cards = [
  { label: "Users", value: "—", icon: Users },
  { label: "Businesses", value: "—", icon: Building2 },
  { label: "Subscriptions", value: "—", icon: CreditCard },
  { label: "System settings", value: "Active", icon: Settings },
];

export default function AdminPage() {
  const router = useRouter();
  const { isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.replace("/dashboard");
    }
  }, [isAdmin, isLoading, router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
        Administration
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-950">
        Vizo system overview
      </h1>
      <p className="mt-2 text-slate-500">
        Manage users, businesses, billing, plans and system settings.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={21} />
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-500">
                {card.label}
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-950">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

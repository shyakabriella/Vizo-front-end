"use client";

import { Building2, ChevronDown, LoaderCircle, Plus } from "lucide-react";
import Link from "next/link";

import { useBusinessWorkspace } from "@/contexts/business-workspace-context";

export function BusinessSelector() {
  const { businesses, selectedBusinessId, isLoading, selectBusiness } =
    useBusinessWorkspace();

  if (isLoading) {
    return (
      <div className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-500">
        <LoaderCircle className="animate-spin text-blue-600" size={17} />
        Loading businesses
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <Link
        href="/dashboard/businesses/create"
        className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        <Plus size={17} />
        Create business
      </Link>
    );
  }

  return (
    <div className="relative">
      <Building2
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
        size={18}
      />

      <select
        aria-label="Select business"
        value={selectedBusinessId ?? ""}
        onChange={(event) => selectBusiness(event.target.value)}
        className="h-11 min-w-52 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-10 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:min-w-64"
      >
        {businesses.map((business) => (
          <option key={business.public_id} value={business.public_id}>
            {business.name}
          </option>
        ))}
      </select>

      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={17}
      />
    </div>
  );
}

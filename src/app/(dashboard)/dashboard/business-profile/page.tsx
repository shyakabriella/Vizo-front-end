"use client";

import { Building2, LoaderCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { BusinessProfileForm } from "@/components/business-workspace/business-profile-form";
import { useBusinessWorkspace } from "@/contexts/business-workspace-context";
import { getBusinessError, updateBusiness } from "@/services/business.service";
import type { BusinessForm } from "@/types/business";

export default function BusinessProfilePage() {
  const { selectedBusiness, isLoading, refreshBusinesses } =
    useBusinessWorkspace();

  const [success, setSuccess] = useState("");
  const [pageError, setPageError] = useState("");

  const initialValues = useMemo<BusinessForm>(
    () => ({
      business_type_id: selectedBusiness?.type?.id
        ? String(selectedBusiness.type.id)
        : "",
      name: selectedBusiness?.name ?? "",
      legal_name: selectedBusiness?.legal_name ?? "",
      description: selectedBusiness?.description ?? "",
      email: selectedBusiness?.email ?? "",
      phone: selectedBusiness?.phone ?? "",
      whatsapp: selectedBusiness?.whatsapp ?? "",
      website: selectedBusiness?.website ?? "",
      currency: selectedBusiness?.currency ?? "RWF",
      timezone: selectedBusiness?.timezone ?? "Africa/Kigali",
      default_language:
        selectedBusiness?.default_language === "fr" ||
        selectedBusiness?.default_language === "rw"
          ? selectedBusiness.default_language
          : "en",
    }),
    [selectedBusiness],
  );

  if (isLoading) {
    return (
      <div className="grid min-h-[55vh] place-items-center">
        <div className="text-center text-slate-500">
          <LoaderCircle
            className="mx-auto animate-spin text-blue-600"
            size={34}
          />
          <p className="mt-3 text-sm">Loading business profile...</p>
        </div>
      </div>
    );
  }

  if (!selectedBusiness) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
          <Building2 size={25} />
        </div>

        <h1 className="mt-5 text-2xl font-black text-slate-950">
          Create your first business
        </h1>

        <p className="mx-auto mt-2 max-w-lg leading-7 text-slate-500">
          You need a business profile before adding locations, services, media
          and visibility information.
        </p>

        <Link
          href="/dashboard/businesses/create"
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 font-black text-white"
        >
          <Plus size={18} />
          Create business
        </Link>
      </div>
    );
  }

  async function save(form: BusinessForm) {
    if (!selectedBusiness) {
      return;
    }

    try {
      setSuccess("");
      setPageError("");

      await updateBusiness(selectedBusiness.public_id, form);

      await refreshBusinesses();

      setSuccess("Business profile updated successfully.");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setPageError(
        getBusinessError(error, "Unable to update the business profile."),
      );

      throw error;
    }
  }

  return (
    <>
      {success ? (
        <div className="mx-auto mb-6 max-w-5xl rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-700">
          {success}
        </div>
      ) : null}

      {pageError ? (
        <div className="mx-auto mb-6 max-w-5xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
          {pageError}
        </div>
      ) : null}

      <BusinessProfileForm
        title={`Edit ${selectedBusiness.name}`}
        description="Keep your business information accurate and consistent across your website, public Vizo profile, search engines and AI platforms."
        submitLabel="Save profile"
        initialValues={initialValues}
        onSubmit={save}
      />
    </>
  );
}

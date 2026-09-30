"use client";

import { BusinessProfileForm } from "@/components/business-workspace/business-profile-form";
import { createBusiness } from "@/services/business.service";
import type { BusinessForm } from "@/types/business";

const initialValues: BusinessForm = {
  business_type_id: "",
  name: "",
  legal_name: "",
  description: "",
  email: "",
  phone: "",
  whatsapp: "",
  website: "",
  currency: "RWF",
  timezone: "Africa/Kigali",
  default_language: "en",
};

export default function CreateBusinessPage() {
  async function create(form: BusinessForm) {
    const business = await createBusiness(form);

    window.localStorage.setItem("vizo_selected_business", business.public_id);

    /*
     * A full navigation reloads the workspace
     * provider and immediately selects the newly
     * created business.
     */
    window.location.assign("/dashboard/business-profile");
  }

  return (
    <BusinessProfileForm
      title="Create your business"
      description="Create the main profile that Vizo will use for search engines, AI assistants and your public business page."
      submitLabel="Create business"
      initialValues={initialValues}
      onSubmit={create}
    />
  );
}

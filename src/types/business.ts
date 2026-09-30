export interface BusinessTypeSummary {
  id: number;
  name: string;
  slug: string;
  schema_type: string;
  icon?: string | null;
  description?: string | null;
}

export interface BusinessOwnerSummary {
  id: number;
  name: string;
  email: string;
}

export type BusinessStatus = "draft" | "published" | "suspended";

export interface Business {
  public_id: string;
  name: string;
  slug: string;
  legal_name?: string | null;
  description?: string | null;

  type?: BusinessTypeSummary | null;
  owner?: BusinessOwnerSummary | null;

  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  website?: string | null;

  logo?: string | null;
  cover_image?: string | null;

  currency: string;
  timezone: string;
  default_language: string;

  status: BusinessStatus;
  published_at?: string | null;
  suspended_at?: string | null;

  created_at?: string | null;
  updated_at?: string | null;
}

export interface BusinessListResponse {
  success: boolean;
  data:
    | Business[]
    | {
        businesses: Business[];
      };
}

export interface BusinessResponse {
  success: boolean;
  message?: string;
  data: {
    business: Business;
  };
}

export interface BusinessForm {
  business_type_id: string;
  name: string;
  legal_name: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  currency: string;
  timezone: string;
  default_language: "en" | "fr" | "rw";
}

export interface BusinessTypeListResponse {
  data: BusinessTypeSummary[];
}

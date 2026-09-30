export type OfferingType =
  | "product"
  | "service"
  | "menu_item"
  | "room"
  | "experience"
  | "package"
  | "other";

export type OfferingPricingType =
  "fixed" | "from" | "range" | "free" | "contact";

export type OfferingStatus = "draft" | "published" | "archived";

export interface OfferingCategory {
  public_id: string;
  name: string;
  slug: string;
  description?: string | null;
  sort_order: number;
  is_active: boolean;
  offerings_count: number;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface OfferingCategoryForm {
  name: string;
  description: string;
  sort_order: string;
  is_active: boolean;
}

export interface Offering {
  public_id: string;
  type: OfferingType;
  name: string;
  slug: string;
  short_description?: string | null;
  description?: string | null;
  pricing_type: OfferingPricingType;
  price?: string | null;
  price_min?: string | null;
  price_max?: string | null;
  currency: string;
  unit?: string | null;
  duration_minutes?: number | null;
  image_url?: string | null;
  action_url?: string | null;
  is_available: boolean;
  status: OfferingStatus;
  metadata?: Record<string, unknown> | null;
  sort_order: number;
  published_at?: string | null;
  category?: {
    public_id: string;
    name: string;
    slug: string;
  } | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface OfferingForm {
  category_public_id: string;
  type: OfferingType;
  name: string;
  short_description: string;
  description: string;
  pricing_type: OfferingPricingType;
  price: string;
  price_min: string;
  price_max: string;
  currency: string;
  unit: string;
  duration_minutes: string;
  image: File | null;
  remove_image: boolean;
  action_url: string;
  is_available: boolean;
  sort_order: string;
}

export interface CategoryListResponse {
  success: boolean;
  data: {
    categories: OfferingCategory[];
  };
}

export interface CategoryResponse {
  success: boolean;
  message?: string;
  data: {
    category: OfferingCategory;
  };
}

export interface OfferingListResponse {
  success: boolean;
  data: {
    offerings: {
      items: Offering[];
      pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
      };
    };
  };
}

export interface OfferingResponse {
  success: boolean;
  message?: string;
  data: {
    offering: Offering;
  };
}

export interface OfferingMessageResponse {
  success: boolean;
  message: string;
}

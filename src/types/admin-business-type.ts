export type BusinessTypeStatusFilter = "all" | "active" | "inactive";

export interface AdminBusinessType {
  id: number;
  name: string;
  slug: string;
  schema_type: string;
  icon: string | null;
  description: string | null;
  is_active: boolean;
  sort_order: number;
  businesses_count: number | null;
  created_at: string;
  updated_at: string;
}

export interface AdminBusinessTypeForm {
  name: string;
  slug: string;
  schema_type: string;
  icon: string;
  description: string;
  is_active: boolean;
  sort_order: number;
}

export interface BusinessTypePagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface BusinessTypeListResponse {
  success: boolean;
  data: {
    business_types: AdminBusinessType[];
    pagination: BusinessTypePagination;
  };
}

export interface BusinessTypeResponse {
  success: boolean;
  message?: string;
  data: {
    business_type: AdminBusinessType;
  };
}

export interface BusinessTypeMessageResponse {
  success: boolean;
  message: string;
}

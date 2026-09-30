export type AdminBusinessStatus = "draft" | "published" | "suspended";

export interface AdminBusinessOwner {
  id: number | null;
  name: string | null;
  email: string | null;
}

export interface AdminBusinessType {
  id: number | null;
  name: string | null;
}

export interface AdminBusinessPublication {
  site_id: string | null;
  status: string | null;
}

export interface AdminBusinessSubscription {
  public_id: string;
  status: string;
  plan: string | null;
}

export interface AdminBusiness {
  public_id: string;
  name: string;
  slug: string;
  legal_name: string | null;
  description: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  currency: string;
  timezone: string;
  status: AdminBusinessStatus;
  published_at: string | null;
  suspended_at: string | null;
  owner: AdminBusinessOwner | null;
  type: AdminBusinessType | null;
  publication: AdminBusinessPublication | null;
  subscription: AdminBusinessSubscription | null;
  created_at: string;
  updated_at: string;
}

export interface AdminBusinessPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface AdminBusinessListData {
  businesses: AdminBusiness[];
  pagination: AdminBusinessPagination;
}

export interface AdminBusinessFilters {
  search?: string;
  status?: AdminBusinessStatus | "";
  business_type_id?: number;
  page?: number;
  per_page?: number;
}

export interface AdminBusinessListResponse {
  success: boolean;
  data: AdminBusinessListData;
}

export interface AdminBusinessResponse {
  success: boolean;
  message?: string;
  data: {
    business: AdminBusiness;
  };
}

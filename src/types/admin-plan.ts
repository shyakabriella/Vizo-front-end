export type PlanStatusFilter = "all" | "active" | "inactive";

export type PlanFeature =
  | "profile"
  | "schema"
  | "llms"
  | "connect_script"
  | "installation_verification"
  | "basic_analytics"
  | "advanced_analytics"
  | "priority_generation"
  | "priority_support"
  | "custom_domain";

export type PlanLimitKey =
  | "businesses"
  | "locations"
  | "offerings"
  | "media_assets"
  | "knowledge_entries"
  | "team_members";

export type PlanLimits = Record<PlanLimitKey, number | null>;

export interface AdminPlan {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  monthly_price: string;
  yearly_price: string;
  currency: string;
  trial_days: number;
  limits: PlanLimits;
  features: PlanFeature[];
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  subscriptions_count: number | null;
  created_at: string;
  updated_at: string;
}

export interface AdminPlanForm {
  name: string;
  slug: string;
  description: string;
  monthly_price: string;
  yearly_price: string;
  currency: string;
  trial_days: number;
  limits: PlanLimits;
  features: PlanFeature[];
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
}

export interface PlanPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PlanListResponse {
  success: boolean;
  data: {
    plans: AdminPlan[];
    pagination: PlanPagination;
  };
}

export interface PlanResponse {
  success: boolean;
  message?: string;
  data: {
    plan: AdminPlan;
  };
}

export interface PlanMessageResponse {
  success: boolean;
  message: string;
}

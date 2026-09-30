export type AuditStatus = "excellent" | "good" | "needs_improvement" | "poor";

export type AuditPriority = "high" | "medium" | "low";

export interface BusinessAuditCheck {
  key: string;
  title: string;
  weight: number;
  score: number;
  passed: boolean;
  count?: number;
  completed_items?: number;
  total_items?: number;
  details?: Record<string, boolean>;
  recommendation: string;
}

export interface BusinessAuditRecommendation {
  key: string;
  priority: AuditPriority;
  title: string;
  action: string;
  possible_points: number;
}

export interface BusinessAuditStatistics {
  active_locations: number;
  opening_hour_records: number;
  published_offerings: number;
  published_knowledge_entries: number;
  active_media_assets: number;
}

export interface BusinessAudit {
  business_id: string;
  business_name: string;
  score: number;
  maximum_score: number;
  percentage: number;
  grade: string;
  status: AuditStatus;
  checks: BusinessAuditCheck[];
  recommendations: BusinessAuditRecommendation[];
  statistics: BusinessAuditStatistics;
  generated_at: string;
}

export interface BusinessAuditResponse {
  success: boolean;
  data: {
    audit: BusinessAudit;
  };
}

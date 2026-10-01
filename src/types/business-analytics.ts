export interface BusinessAnalyticsPeriod {
  days: number;
  from: string;
  to: string;
}

export interface BusinessAnalyticsSummary {
  total_events: number;
  script_loads: number;
  page_views: number;
  service_views: number;
  booking_clicks: number;
  phone_clicks: number;
  whatsapp_clicks: number;
  directions_clicks: number;
  unique_sessions: number;
  unique_pages: number;
  events_today: number;
}

export interface BusinessAnalyticsDaily {
  date: string;
  events: number;
}

export interface BusinessAnalyticsPage {
  page_url: string;
  page_host?: string | null;
  events: number;
}

export interface BusinessAnalyticsRecentEvent {
  event_type: string;
  page_url?: string | null;
  page_host?: string | null;
  session_id?: string | null;
  metadata?: Record<string, unknown> | null;
  occurred_at?: string | null;
}

export interface BusinessAnalytics {
  period: BusinessAnalyticsPeriod;
  summary: BusinessAnalyticsSummary;
  daily: BusinessAnalyticsDaily[];
  top_pages: BusinessAnalyticsPage[];
  recent_events: BusinessAnalyticsRecentEvent[];
}

export interface BusinessAnalyticsResponse {
  success: boolean;
  data: {
    analytics: BusinessAnalytics;
  };
}

export type AdminAnalyticsPeriod = {
  days: number;
  from: string;
  to: string;
};

export type AdminAnalyticsPlatform = {
  total_businesses: number;
  published_businesses: number;
  total_publications: number;
  active_publications: number;
  verified_scripts: number;
  reachable_websites: number;
};

export type AdminAnalyticsSummary = {
  total_events: number;
  script_loads: number;
  page_views: number;
  unique_sessions: number;
  unique_visitors: number;
  unique_pages: number;
  events_today: number;
};

export type AdminAnalyticsDaily = {
  date: string;
  events: number;
};

export type AdminAnalyticsBusiness = {
  public_id: string;
  name: string;
  events: number;
  unique_sessions: number;
};

export type AdminAnalyticsPage = {
  page_url: string;
  page_host?: string | null;
  events: number;
};

export type AdminAnalyticsRecentEvent = {
  event_type: string;
  page_url?: string | null;
  page_host?: string | null;
  session_id?: string | null;
  visitor_id?: string | null;
  business?: {
    public_id: string;
    name: string;
  } | null;
  metadata?: Record<string, unknown> | null;
  occurred_at?: string | null;
};

export type AdminAnalytics = {
  period: AdminAnalyticsPeriod;
  platform: AdminAnalyticsPlatform;
  summary: AdminAnalyticsSummary;
  daily: AdminAnalyticsDaily[];
  top_businesses: AdminAnalyticsBusiness[];
  top_pages: AdminAnalyticsPage[];
  recent_events: AdminAnalyticsRecentEvent[];
};

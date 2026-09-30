export interface AdminUserStatistics {
  total: number;
  active: number;
  suspended: number;
}

export interface AdminBusinessStatistics {
  total: number;
  draft: number;
  published: number;
  suspended: number;
}

export interface AdminSubscriptionStatistics {
  total: number;
  trialing: number;
  active: number;
  cancelled: number;
}

export interface AdminBillingStatistics {
  invoices: number;
  payment_transactions: number;
  successful_payments: number;
}

export interface AdminDashboardStatistics {
  users: AdminUserStatistics;
  businesses: AdminBusinessStatistics;
  subscriptions: AdminSubscriptionStatistics;
  billing: AdminBillingStatistics;
}

export interface AdminDashboardData {
  statistics: AdminDashboardStatistics;
}

export interface AdminDashboardResponse {
  success: boolean;
  data: AdminDashboardData;
}

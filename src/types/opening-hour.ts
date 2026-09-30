export interface OpeningPeriod {
  opens_at: string;
  closes_at: string;
}

export interface OpeningDay {
  day_of_week: number;
  day_name: string;
  is_closed: boolean;
  periods: OpeningPeriod[];
}

export interface OpeningHoursResponse {
  success: boolean;
  message?: string;
  data: {
    days: OpeningDay[];
  };
}

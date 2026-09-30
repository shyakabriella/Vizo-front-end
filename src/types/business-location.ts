export interface BusinessLocation {
  public_id: string;
  name: string;
  is_main: boolean;
  is_active: boolean;

  address: {
    country_code?: string | null;
    country?: string | null;
    province?: string | null;
    district?: string | null;
    city?: string | null;
    sector?: string | null;
    cell?: string | null;
    village?: string | null;
    street_address?: string | null;
    postal_code?: string | null;
  };

  coordinates: {
    latitude?: string | null;
    longitude?: string | null;
  };

  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  google_maps_url?: string | null;
  offers_delivery: boolean;

  created_at?: string | null;
  updated_at?: string | null;
}

export interface BusinessLocationForm {
  name: string;
  is_main: boolean;
  is_active: boolean;

  country_code: string;
  country: string;
  province: string;
  district: string;
  city: string;
  sector: string;
  cell: string;
  village: string;
  street_address: string;
  postal_code: string;

  latitude: string;
  longitude: string;

  phone: string;
  whatsapp: string;
  email: string;
  google_maps_url: string;
  offers_delivery: boolean;
}

export interface BusinessLocationListResponse {
  data: BusinessLocation[];
}

export interface BusinessLocationResponse {
  success: boolean;
  message?: string;
  data: {
    location: BusinessLocation;
  };
}

export interface BusinessLocationMessageResponse {
  success: boolean;
  message: string;
}

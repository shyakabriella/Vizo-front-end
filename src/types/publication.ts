export interface PublicationUrls {
  profile: string;
  llms: string;
  schema: string;
  script: string;
}

export interface BusinessPublication {
  site_id: string;
  status: string;

  verification_status: string;
  website_reachable: boolean;
  script_verified: boolean;
  llms_verified: boolean;

  script_verified_at: string | null;
  llms_verified_at: string | null;
  last_verified_at: string | null;

  verification_results: Record<string, unknown> | null;
  verification_error: string | null;

  llms_enabled: boolean;
  schema_enabled: boolean;
  profile_enabled: boolean;
  script_enabled: boolean;

  include_locations: boolean;
  include_opening_hours: boolean;
  include_offerings: boolean;
  include_knowledge: boolean;
  include_media: boolean;

  default_language: string;
  custom_domain: string | null;

  published_at: string | null;
  last_generated_at: string | null;

  metadata: Record<string, unknown> | null;

  urls: PublicationUrls;
}

export interface UpdatePublicationPayload {
  llms_enabled?: boolean;
  schema_enabled?: boolean;
  profile_enabled?: boolean;
  script_enabled?: boolean;

  include_locations?: boolean;
  include_opening_hours?: boolean;
  include_offerings?: boolean;
  include_knowledge?: boolean;
  include_media?: boolean;

  default_language?: string;
  custom_domain?: string | null;

  metadata?: Record<string, unknown> | null;
}

export interface PublicationResponse {
  success: boolean;
  message: string | null;

  data: {
    publication: BusinessPublication;
  };
}

export interface InstallationVerification {
  status: string;

  website_reachable: boolean;
  script_verified: boolean;
  llms_verified: boolean;

  script_verified_at: string | null;
  llms_verified_at: string | null;
  last_verified_at: string | null;

  results: Record<string, unknown> | null;
  error: string | null;
}

export interface InstallationVerificationResponse {
  success: boolean;
  message: string;

  data: {
    verification: InstallationVerification;
  };
}

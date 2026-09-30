export type MediaType = "image" | "video" | "document";
export type MediaFilterType = "all" | MediaType;

export interface MediaUploader {
  id: number;
  name: string;
  email: string;
}

export interface MediaAsset {
  public_id: string;
  name: string;
  original_name: string;
  filename: string;
  url: string;
  type: MediaType;
  mime_type: string;
  extension?: string | null;
  size: number;
  width?: number | null;
  height?: number | null;
  alt_text?: string | null;
  caption?: string | null;
  is_active: boolean;
  metadata?: Record<string, unknown> | null;
  uploader?: MediaUploader | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface MediaPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface MediaListResponse {
  success: boolean;
  data: {
    media: {
      items: MediaAsset[];
      pagination: MediaPagination;
    };
  };
}

export interface MediaResponse {
  success: boolean;
  message?: string;
  data: {
    media: MediaAsset;
  };
}

export interface MediaMessageResponse {
  success: boolean;
  message: string;
}

export interface MediaFilters {
  search?: string;
  type?: MediaFilterType;
  is_active?: boolean | null;
  page?: number;
  per_page?: number;
}

export interface MediaUpdateForm {
  name: string;
  alt_text: string;
  caption: string;
  is_active: boolean;
}

export type KnowledgeType =
  "faq" | "fact" | "policy" | "instruction" | "announcement";

export type KnowledgeStatus = "draft" | "published" | "archived";

export interface KnowledgeCreator {
  id: number;
  name: string;
  email: string;
}

export interface KnowledgeEntry {
  public_id: string;
  type: KnowledgeType;
  category?: string | null;
  title?: string | null;
  question?: string | null;
  content: string;
  language: string;
  source_url?: string | null;
  status: KnowledgeStatus;
  is_featured: boolean;
  sort_order: number;
  valid_from?: string | null;
  valid_until?: string | null;
  published_at?: string | null;
  metadata?: Record<string, unknown> | null;
  creator?: KnowledgeCreator | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface KnowledgeForm {
  type: KnowledgeType;
  category: string;
  title: string;
  question: string;
  content: string;
  language: string;
  source_url: string;
  is_featured: boolean;
  sort_order: string;
  valid_from: string;
  valid_until: string;
}

export interface KnowledgeListResponse {
  success: boolean;
  data: {
    knowledge: {
      items: KnowledgeEntry[];
      pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
      };
    };
  };
}

export interface KnowledgeResponse {
  success: boolean;
  message?: string;
  data: {
    entry: KnowledgeEntry;
  };
}

export interface KnowledgeMessageResponse {
  success: boolean;
  message: string;
}

export interface RAGContext {
  id: string;
  content: string;
  source: string;
  relevanceScore: number;
  metadata: Record<string, any>;
}

export interface KnowledgeBase {
  bestPractices: RAGContext[];
  industryExamples: RAGContext[];
  atsGuidelines: RAGContext[];
  enhancementTemplates: RAGContext[];
}

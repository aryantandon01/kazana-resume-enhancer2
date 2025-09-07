export interface UploadedResume {
  id: string;
  filename: string;
  content: Buffer;
  type: 'pdf' | 'docx' | 'txt';
  uploadedAt: Date;
}

export interface ParsedResume {
  personalInfo: PersonalInfo;
  sections: ResumeSection[];
  originalText: string;
  structure: ResumeStructure;
}

export interface EnhancementSuggestion {
  id: string;
  agentId: string;
  sectionId: string;
  type: 'add' | 'modify' | 'remove' | 'reorder';
  original: string;
  enhanced: string;
  reasoning: string;
  confidence: number;
  accepted: boolean;
}

export interface AnalysisResult {
  overallScore: number;
  sectionScores: Record<string, number>;
  issues: Issue[];
  opportunities: Opportunity[];
  atsCompatibility: number;
}

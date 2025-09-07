export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export interface ParsedResume {
  id: string;
  personalInfo: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
  };
  sections: {
    summary?: string;
    experience: WorkExperience[];
    education: Education[];
    skills: string[];
    projects: Project[];
  };
  rawText: string;
  structure: {
    hasPersonalInfo: boolean;
    hasSummary: boolean;
    experienceCount: number;
    educationCount: number;
    skillsCount: number;
    projectsCount: number;
  };
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location?: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  graduationDate: string;
  gpa?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface AnalysisResult {
  id: string;
  resumeId: string;
  overallScore: number;
  sectionScores: {
    personalInfo: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
    projects: number;
    atsCompatibility: number;
  };
  issues: Issue[];
  opportunities: Opportunity[];
  analysisDate: Date;
}

export interface Issue {
  id: string;
  section: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  suggestion: string;
}

export interface Opportunity {
  id: string;
  section: string;
  type: 'enhancement' | 'addition' | 'restructure';
  description: string;
  impact: 'low' | 'medium' | 'high';
}

export interface Enhancement {
  id: string;
  agentId: string;
  section: string;
  type: 'add' | 'modify' | 'remove' | 'reorder';
  originalContent: string;
  enhancedContent: string;
  reasoning: string;
  confidence: number;
  accepted: boolean;
}

export interface EnhancementSession {
  id: string;
  uploadedFile: UploadedFile;
  parsedResume?: ParsedResume;
  analysis?: AnalysisResult;
  enhancements: Enhancement[];
  currentStep: 'upload' | 'parsing' | 'analysis' | 'enhancement' | 'review' | 'complete';
  createdAt: Date;
  updatedAt: Date;
}

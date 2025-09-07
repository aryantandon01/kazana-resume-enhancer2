export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
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

export interface Resume {
  id: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}

export interface AIGenerateRequest {
  type: 'summary' | 'bullets' | 'skills' | 'optimize';
  context: string;
  jobDescription?: string;
  currentContent?: string;
}

export interface ResumeScore {
  overallScore: number;
  sections: {
    personalInfo: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
  };
  feedback: string[];
  suggestions: string[];
}

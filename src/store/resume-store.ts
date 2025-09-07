import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Resume, WorkExperience, Education, Project } from '@/lib/types/resume';

const defaultResume: Resume = {
  id: '1',
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
};

interface ResumeStore {
  resume: Resume;
  updatePersonalInfo: (info: Partial<Resume['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  addExperience: (experience: Omit<WorkExperience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<WorkExperience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  updateSkills: (skills: string[]) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resume: defaultResume,
      
      updatePersonalInfo: (info) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, ...info },
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          resume: { ...state.resume, summary },
        })),

      addExperience: (experience) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [
              ...state.resume.experience,
              { ...experience, id: Date.now().toString() },
            ],
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((exp) => exp.id !== id),
          },
        })),

      addEducation: (education) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [
              ...state.resume.education,
              { ...education, id: Date.now().toString() },
            ],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((edu) => edu.id !== id),
          },
        })),

      updateSkills: (skills) =>
        set((state) => ({
          resume: { ...state.resume, skills },
        })),

      addProject: (project) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [
              ...state.resume.projects,
              { ...project, id: Date.now().toString() },
            ],
          },
        })),

      updateProject: (id, project) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((proj) =>
              proj.id === id ? { ...proj, ...project } : proj
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((proj) => proj.id !== id),
          },
        })),

      resetResume: () => set({ resume: defaultResume }),
    }),
    {
      name: 'resume-storage',
    }
  )
);

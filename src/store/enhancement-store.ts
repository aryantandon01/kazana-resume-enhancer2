import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EnhancementSession, UploadedFile, ParsedResume, AnalysisResult, Enhancement } from '@/lib/types/enhancement';

interface EnhancementStore {
  currentSession: EnhancementSession | null;
  sessions: EnhancementSession[];
  
  // Actions
  createSession: (file: UploadedFile) => void;
  updateSession: (updates: Partial<EnhancementSession>) => void;
  setParsedResume: (resume: ParsedResume) => void;
  setAnalysisResult: (analysis: AnalysisResult) => void;
  addEnhancement: (enhancement: Enhancement) => void;
  updateEnhancement: (id: string, updates: Partial<Enhancement>) => void;
  setCurrentStep: (step: EnhancementSession['currentStep']) => void;
  clearCurrentSession: () => void;
}

export const useEnhancementStore = create<EnhancementStore>()(
  persist(
    (set, get) => ({
      currentSession: null,
      sessions: [],

      createSession: (file: UploadedFile) => {
        const session: EnhancementSession = {
          id: `session_${Date.now()}`,
          uploadedFile: file,
          enhancements: [],
          currentStep: 'parsing',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          currentSession: session,
          sessions: [session, ...state.sessions],
        }));
      },

      updateSession: (updates: Partial<EnhancementSession>) => {
        set((state) => {
          if (!state.currentSession) return state;
          
          const updatedSession = {
            ...state.currentSession,
            ...updates,
            updatedAt: new Date(),
          };

          return {
            currentSession: updatedSession,
            sessions: state.sessions.map(s => 
              s.id === updatedSession.id ? updatedSession : s
            ),
          };
        });
      },

      setParsedResume: (resume: ParsedResume) => {
        get().updateSession({ 
          parsedResume: resume, 
          currentStep: 'analysis' 
        });
      },

      setAnalysisResult: (analysis: AnalysisResult) => {
        get().updateSession({ 
          analysis, 
          currentStep: 'enhancement' 
        });
      },

      addEnhancement: (enhancement: Enhancement) => {
        set((state) => {
          if (!state.currentSession) return state;
          
          const updatedEnhancements = [...state.currentSession.enhancements, enhancement];
          get().updateSession({ enhancements: updatedEnhancements });
          return state;
        });
      },

      updateEnhancement: (id: string, updates: Partial<Enhancement>) => {
        set((state) => {
          if (!state.currentSession) return state;
          
          const updatedEnhancements = state.currentSession.enhancements.map(e =>
            e.id === id ? { ...e, ...updates } : e
          );
          get().updateSession({ enhancements: updatedEnhancements });
          return state;
        });
      },

      setCurrentStep: (step: EnhancementSession['currentStep']) => {
        get().updateSession({ currentStep: step });
      },

      clearCurrentSession: () => {
        set({ currentSession: null });
      },
    }),
    {
      name: 'enhancement-storage',
    }
  )
);

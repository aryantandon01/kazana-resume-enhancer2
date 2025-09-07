'use client';

import { useState } from 'react';
import { FileUpload } from './FileUpload';
import { AnalysisDashboard } from './AnalysisDashboard';
import { EnhancementWorkspace } from './EnhancementWorkspace';
import { ComparisonView } from './ComparisonView';

type EnhancementStep = 'upload' | 'analysis' | 'enhancement' | 'comparison' | 'download';

export function ResumeEnhancer() {
  const [currentStep, setCurrentStep] = useState<EnhancementStep>('upload');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [enhancements, setEnhancements] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="w-full bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Step indicators */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'upload' && (
          <FileUpload 
            onUpload={(file) => {
              setUploadedFile(file);
              setCurrentStep('analysis');
            }}
          />
        )}
        
        {currentStep === 'analysis' && (
          <AnalysisDashboard 
            file={uploadedFile}
            onAnalysisComplete={(result) => {
              setAnalysisResult(result);
              setCurrentStep('enhancement');
            }}
          />
        )}

        {currentStep === 'enhancement' && (
          <EnhancementWorkspace 
            analysisResult={analysisResult}
            onEnhancementComplete={(enhancements) => {
              setEnhancements(enhancements);
              setCurrentStep('comparison');
            }}
          />
        )}

        {currentStep === 'comparison' && (
          <ComparisonView 
            original={analysisResult.parsedResume}
            enhanced={enhancements}
            onFinalizeEnhancement={() => setCurrentStep('download')}
          />
        )}
      </div>
    </div>
  );
}

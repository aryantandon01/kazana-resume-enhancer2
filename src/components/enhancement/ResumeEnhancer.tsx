'use client';

import { useEnhancementStore } from '@/store/enhancement-store';
import { FileUpload } from './FileUpload';
import { AnalysisDashboard } from './AnalysisDashboard';
import { EnhancementWorkspace } from './EnhancementWorkspace';
import { ComparisonView } from './ComparisonView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Upload, BarChart3, Zap, Eye, Download } from 'lucide-react';

const stepIcons = {
  upload: Upload,
  parsing: Upload,
  analysis: BarChart3,
  enhancement: Zap,
  review: Eye,
  complete: Download,
};

const stepLabels = {
  upload: 'Upload Resume',
  parsing: 'Processing',
  analysis: 'AI Analysis',
  enhancement: 'Enhancement',
  review: 'Review Changes',
  complete: 'Download',
};

export function ResumeEnhancer() {
  const { currentSession } = useEnhancementStore();
  const currentStep = currentSession?.currentStep || 'upload';

  const steps = ['upload', 'parsing', 'analysis', 'enhancement', 'review', 'complete'];
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Header */}
      <div className="w-full bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Resume Enhancer</h1>
              <p className="text-gray-600">Transform your resume with intelligent AI agents</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-8 overflow-x-auto">
            {steps.map((step, index) => {
              const Icon = stepIcons[step as keyof typeof stepIcons];
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              const isUpcoming = index > currentStepIndex;

              return (
                <div key={step} className="flex items-center space-x-3 flex-shrink-0">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : isActive
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-gray-200 border-gray-300 text-gray-500'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="text-sm">
                    <div
                      className={`font-medium ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {stepLabels[step as keyof typeof stepLabels]}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-px bg-gray-300 ml-3" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'upload' && (
          <FileUpload />
        )}

        {(currentStep === 'parsing' || currentStep === 'analysis') && (
          <AnalysisDashboard />
        )}

        {currentStep === 'enhancement' && (
          <EnhancementWorkspace />
        )}

        {(currentStep === 'review' || currentStep === 'complete') && (
          <ComparisonView />
        )}

        {/* Help Section */}
        {currentStep === 'upload' && (
          <div className="mt-12 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium mb-2">Upload Your Resume</h3>
                    <p className="text-sm text-gray-600">
                      Drop your existing resume (PDF, Word, or text file)
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-medium mb-2">AI Analysis</h3>
                    <p className="text-sm text-gray-600">
                      Our specialized agents analyze every section for improvements
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium mb-2">Smart Enhancement</h3>
                    <p className="text-sm text-gray-600">
                      Get targeted suggestions and see before/after comparisons
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

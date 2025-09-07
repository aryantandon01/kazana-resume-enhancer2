'use client';

import { useEffect, useState } from 'react';
import { useEnhancementStore } from '@/store/enhancement-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, CheckCircle, AlertTriangle, Loader2, Brain } from 'lucide-react';

export function AnalysisDashboard() {
  const { currentSession, setAnalysisResult, setCurrentStep } = useEnhancementStore();
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentSession?.parsedResume) {
      simulateAnalysis();
    }
  }, [currentSession?.parsedResume]);

  const simulateAnalysis = async () => {
    // Simulate analysis progress
    const steps = [
      'Analyzing personal information...',
      'Evaluating professional summary...',
      'Reviewing work experience...',
      'Assessing skills section...',
      'Checking ATS compatibility...',
      'Generating improvement suggestions...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(((i + 1) / steps.length) * 100);
    }

    // Mock analysis result
    const mockAnalysis = {
      id: `analysis_${Date.now()}`,
      resumeId: currentSession!.parsedResume!.id,
      overallScore: 72,
      sectionScores: {
        personalInfo: 85,
        summary: 60,
        experience: 75,
        education: 90,
        skills: 65,
        projects: 70,
        atsCompatibility: 68,
      },
      issues: [
        {
          id: '1',
          section: 'summary',
          severity: 'high' as const,
          description: 'Professional summary lacks specific achievements',
          suggestion: 'Add quantified results and industry-specific keywords'
        },
        {
          id: '2',
          section: 'experience',
          severity: 'medium' as const,
          description: 'Some bullet points are too generic',
          suggestion: 'Include specific metrics and accomplishments'
        }
      ],
      opportunities: [
        {
          id: '1',
          section: 'skills',
          type: 'enhancement' as const,
          description: 'Add trending technologies in your field',
          impact: 'high' as const
        }
      ],
      analysisDate: new Date(),
    };

    setAnalysisResult(mockAnalysis);
    setAnalyzing(false);
  };

  const handleProceedToEnhancement = () => {
    setCurrentStep('enhancement');
  };

  if (analyzing) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-6 h-6 mr-2 text-blue-600" />
              AI Analysis in Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Analyzing Your Resume
              </h3>
              <p className="text-gray-600 mb-6">
                Our AI agents are evaluating every section for improvement opportunities
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500">{Math.round(progress)}% complete</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const analysis = currentSession?.analysis;
  if (!analysis) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-6 h-6 mr-2" />
            Resume Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {analysis.overallScore}/100
            </div>
            <p className="text-gray-600">Overall Resume Score</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analysis.sectionScores).map(([section, score]) => (
              <div key={section} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-semibold text-gray-900">{score}</div>
                <div className="text-sm text-gray-600 capitalize">
                  {section.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Issues and Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-orange-600">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Priority Issues ({analysis.issues.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.issues.map((issue) => (
                <div key={issue.id} className="border-l-4 border-orange-400 pl-4">
                  <h4 className="font-medium text-gray-900">{issue.description}</h4>
                  <p className="text-sm text-gray-600 mt-1">{issue.suggestion}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                    issue.severity === 'high' ? 'bg-red-100 text-red-800' :
                    issue.severity === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {issue.severity} priority
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              Enhancement Opportunities ({analysis.opportunities.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.opportunities.map((opportunity) => (
                <div key={opportunity.id} className="border-l-4 border-green-400 pl-4">
                  <h4 className="font-medium text-gray-900">{opportunity.description}</h4>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                    opportunity.impact === 'high' ? 'bg-green-100 text-green-800' :
                    opportunity.impact === 'medium' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {opportunity.impact} impact
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <Button 
          onClick={handleProceedToEnhancement}
          size="lg"
          className="px-8"
        >
          Start AI Enhancement
        </Button>
      </div>
    </div>
  );
}

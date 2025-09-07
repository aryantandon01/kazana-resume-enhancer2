'use client';

import { useState } from 'react';
import { useEnhancementStore } from '@/store/enhancement-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, CheckCircle, X, RefreshCw } from 'lucide-react';

export function EnhancementWorkspace() {
  const { currentSession, setCurrentStep } = useEnhancementStore();
  const [processing, setProcessing] = useState(false);

  const mockEnhancements = [
    {
      id: '1',
      section: 'Professional Summary',
      original: 'Experienced software developer with knowledge of various programming languages.',
      enhanced: 'Results-driven Software Engineer with 5+ years developing scalable web applications using React, Node.js, and Python. Increased application performance by 40% and led cross-functional teams of 6+ developers.',
      reasoning: 'Added specific technologies, quantified experience, and included measurable achievements to make the summary more compelling.',
      confidence: 92
    },
    {
      id: '2',
      section: 'Work Experience',
      original: 'Worked on web development projects.',
      enhanced: 'Architected and developed 12+ responsive web applications using React and TypeScript, serving 50K+ monthly active users with 99.9% uptime.',
      reasoning: 'Transformed vague description into specific, quantified achievement with technical details and business impact.',
      confidence: 88
    }
  ];

  const handleAcceptEnhancement = (id: string) => {
    console.log(`Accepted enhancement ${id}`);
  };

  const handleRejectEnhancement = (id: string) => {
    console.log(`Rejected enhancement ${id}`);
  };

  const handleProceedToReview = () => {
    setCurrentStep('review');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Enhancement Suggestions</h2>
        <p className="text-gray-600">Review and apply AI-powered improvements to your resume</p>
      </div>

      {mockEnhancements.map((enhancement) => (
        <Card key={enhancement.id} className="border-l-4 border-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-600" />
                {enhancement.section}
              </div>
              <div className="text-sm text-gray-500">
                {enhancement.confidence}% confidence
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Before */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Current:</h4>
              <div className="p-3 bg-red-50 border-l-4 border-red-200 text-gray-700">
                {enhancement.original}
              </div>
            </div>

            {/* After */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Enhanced:</h4>
              <div className="p-3 bg-green-50 border-l-4 border-green-200 text-gray-700">
                {enhancement.enhanced}
              </div>
            </div>

            {/* Reasoning */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Why this is better:</h4>
              <p className="text-sm text-gray-600">{enhancement.reasoning}</p>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button 
                onClick={() => handleAcceptEnhancement(enhancement.id)}
                className="flex items-center"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Accept
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleRejectEnhancement(enhancement.id)}
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button 
                variant="outline"
                onClick={() => console.log('Regenerate')}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="text-center pt-6">
        <Button 
          onClick={handleProceedToReview}
          size="lg"
          className="px-8"
        >
          Review Final Resume
        </Button>
      </div>
    </div>
  );
}

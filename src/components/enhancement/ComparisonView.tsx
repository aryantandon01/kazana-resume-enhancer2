'use client';

import { useEnhancementStore } from '@/store/enhancement-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, ArrowRight } from 'lucide-react';

export function ComparisonView() {
  const { currentSession } = useEnhancementStore();

  const handleDownload = () => {
    // Mock download functionality
    console.log('Downloading enhanced resume...');
    alert('Enhanced resume download started!');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Before vs After</h2>
        <p className="text-gray-600">See how your resume has been transformed</p>
      </div>

      {/* Improvement Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Enhancement Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">+17</div>
              <div className="text-sm text-gray-600">Points Improved</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">Sections Enhanced</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">15</div>
              <div className="text-sm text-gray-600">Keywords Added</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">95%</div>
              <div className="text-sm text-gray-600">ATS Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Side by Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Before Enhancement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 border rounded-lg space-y-4 max-h-96 overflow-y-auto">
              <div className="text-center border-b pb-4">
                <h3 className="text-lg font-bold">John Doe</h3>
                <p className="text-gray-600">john@email.com | (555) 123-4567</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Professional Summary</h4>
                <p className="text-sm text-gray-700">Experienced software developer with knowledge of various programming languages.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Experience</h4>
                <div className="space-y-2">
                  <div>
                    <h5 className="font-medium">Software Developer | TechCorp</h5>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                      <li>Worked on web development projects</li>
                      <li>Collaborated with team members</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">After Enhancement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 border rounded-lg space-y-4 max-h-96 overflow-y-auto">
              <div className="text-center border-b pb-4">
                <h3 className="text-lg font-bold">John Doe</h3>
                <p className="text-gray-600">john@email.com | (555) 123-4567 | San Francisco, CA</p>
                <p className="text-gray-600">LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Professional Summary</h4>
                <p className="text-sm text-gray-700">Results-driven Software Engineer with 5+ years developing scalable web applications using React, Node.js, and Python. Increased application performance by 40% and led cross-functional teams of 6+ developers.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Professional Experience</h4>
                <div className="space-y-2">
                  <div>
                    <h5 className="font-medium">Software Engineer | TechCorp</h5>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                      <li>Architected and developed 12+ responsive web applications using React and TypeScript, serving 50K+ monthly active users</li>
                      <li>Led cross-functional team of 6 developers, implementing Agile methodologies that improved delivery speed by 30%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Actions */}
      <div className="text-center space-y-4">
        <div className="flex justify-center space-x-4">
          <Button onClick={handleDownload} size="lg" className="px-8">
            <Download className="w-5 h-5 mr-2" />
            Download Enhanced Resume
          </Button>
          <Button variant="outline" size="lg">
            <Eye className="w-5 h-5 mr-2" />
            Preview PDF
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Your enhanced resume is ready! Download in PDF format optimized for ATS systems.
        </p>
      </div>
    </div>
  );
}

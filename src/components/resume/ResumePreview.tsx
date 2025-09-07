'use client';

import { Resume } from '@/lib/types/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { generateResumeText, downloadTextFile } from '@/lib/utils/pdf-generator';

interface ResumePreviewProps {
  resume: Resume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  const handleDownload = () => {
    const content = generateResumeText(resume);
    downloadTextFile(content, `${resume.personalInfo.name || 'resume'}.txt`);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Resume Preview
          </CardTitle>
          <Button onClick={handleDownload} size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-sm space-y-4 max-h-[800px] overflow-y-auto">
          {/* Personal Information */}
          <div className="text-center border-b pb-4">
            <h1 className="text-xl font-bold text-gray-900">
              {resume.personalInfo.name || 'Your Name'}
            </h1>
            <div className="text-gray-600 mt-2 space-y-1">
              <div>{resume.personalInfo.email} | {resume.personalInfo.phone}</div>
              <div>{resume.personalInfo.location}</div>
              {resume.personalInfo.linkedin && (
                <div>LinkedIn: {resume.personalInfo.linkedin}</div>
              )}
              {resume.personalInfo.github && (
                <div>GitHub: {resume.personalInfo.github}</div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {resume.summary && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resume.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-4">
                {resume.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-gray-900">
                        {exp.position} | {exp.company}
                      </h3>
                      <div className="text-gray-600 text-xs">
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>
                    {exp.location && (
                      <div className="text-gray-600 text-xs mb-2">{exp.location}</div>
                    )}
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {exp.bullets.map((bullet, index) => (
                        <li key={index} className="text-sm">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resume.education.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                EDUCATION
              </h2>
              <div className="space-y-2">
                {resume.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-medium text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <div className="text-gray-600 text-sm">
                      {edu.institution} | {edu.graduationDate}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {resume.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                TECHNICAL SKILLS
              </h2>
              <p className="text-gray-700">{resume.skills.join(', ')}</p>
            </div>
          )}

          {/* Projects */}
          {resume.projects.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                PROJECTS
              </h2>
              <div className="space-y-3">
                {resume.projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-gray-700 text-sm mb-1">{project.description}</p>
                    <div className="text-gray-600 text-xs">
                      Technologies: {project.technologies.join(', ')}
                    </div>
                    {project.github && (
                      <div className="text-gray-600 text-xs">
                        GitHub: {project.github}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!resume.personalInfo.name && (
            <div className="text-center text-gray-500 py-8">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start building your resume by filling in the sections on the left.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

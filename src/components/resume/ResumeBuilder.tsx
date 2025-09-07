'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/resume-store';
import { ResumePreview } from './ResumePreview';
import { AIAssistant } from '../ai/AIAssistant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, FolderOpen } from 'lucide-react';

type Section = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects';

export function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState<Section>('personal');
  const {
    resume,
    updatePersonalInfo,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    updateSkills,
    addProject,
    updateProject,
    removeProject,
  } = useResumeStore();

  const sections = [
    { id: 'personal' as Section, label: 'Personal Info', icon: User },
    { id: 'summary' as Section, label: 'Summary', icon: User },
    { id: 'experience' as Section, label: 'Experience', icon: Briefcase },
    { id: 'education' as Section, label: 'Education', icon: GraduationCap },
    { id: 'skills' as Section, label: 'Skills', icon: Code },
    { id: 'projects' as Section, label: 'Projects', icon: FolderOpen },
  ];

  const handleSkillsChange = (skillsText: string) => {
    const skills = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill);
    updateSkills(skills);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">AI Resume Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Section Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>Resume Sections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? 'default' : 'outline'}
                        className="justify-start"
                        onClick={() => setActiveSection(section.id)}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {section.label}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Section Editor */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {sections.find(s => s.id === activeSection)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeSection === 'personal' && (
                  <div className="space-y-4">
                    <Input
                      placeholder="Full Name"
                      value={resume.personalInfo.name}
                      onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={resume.personalInfo.email}
                      onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                    />
                    <Input
                      placeholder="Phone"
                      value={resume.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                    />
                    <Input
                      placeholder="Location"
                      value={resume.personalInfo.location}
                      onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                    />
                    <Input
                      placeholder="LinkedIn URL"
                      value={resume.personalInfo.linkedin}
                      onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                    />
                    <Input
                      placeholder="GitHub URL"
                      value={resume.personalInfo.github}
                      onChange={(e) => updatePersonalInfo({ github: e.target.value })}
                    />
                  </div>
                )}

                {activeSection === 'summary' && (
                  <Textarea
                    placeholder="Write a compelling professional summary..."
                    value={resume.summary}
                    onChange={(e) => updateSummary(e.target.value)}
                    className="min-h-[120px]"
                  />
                )}

                {activeSection === 'experience' && (
                  <div className="space-y-4">
                    {resume.experience.map((exp) => (
                      <div key={exp.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{exp.position || 'New Position'}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExperience(exp.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Job Title"
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                          />
                          <Input
                            placeholder="Company"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            placeholder="Start Date"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          />
                          <Input
                            placeholder="End Date"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                          />
                          <Input
                            placeholder="Location"
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                          />
                        </div>
                        <Textarea
                          placeholder="• Achievement 1&#10;• Achievement 2&#10;• Achievement 3"
                          value={exp.bullets.join('\n')}
                          onChange={(e) => {
                            const bullets = e.target.value.split('\n').filter(bullet => bullet.trim());
                            updateExperience(exp.id, { bullets });
                          }}
                          className="min-h-[100px]"
                        />
                      </div>
                    ))}
                    <Button
                      onClick={() => addExperience({
                        company: '',
                        position: '',
                        startDate: '',
                        endDate: '',
                        location: '',
                        bullets: [],
                      })}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                )}

                {activeSection === 'education' && (
                  <div className="space-y-4">
                    {resume.education.map((edu) => (
                      <div key={edu.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{edu.degree || 'New Education'}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEducation(edu.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                          />
                          <Input
                            placeholder="Field of Study"
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            placeholder="Institution"
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                          />
                          <Input
                            placeholder="Graduation Date"
                            value={edu.graduationDate}
                            onChange={(e) => updateEducation(edu.id, { graduationDate: e.target.value })}
                          />
                          <Input
                            placeholder="GPA (optional)"
                            value={edu.gpa || ''}
                            onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={() => addEducation({
                        institution: '',
                        degree: '',
                        field: '',
                        graduationDate: '',
                        gpa: '',
                      })}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                )}

                {activeSection === 'skills' && (
                  <Textarea
                    placeholder="Enter skills separated by commas (e.g., JavaScript, Python, React, Node.js)"
                    value={resume.skills.join(', ')}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    className="min-h-[120px]"
                  />
                )}

                {activeSection === 'projects' && (
                  <div className="space-y-4">
                    {resume.projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{project.name || 'New Project'}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProject(project.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Project Name"
                          value={project.name}
                          onChange={(e) => updateProject(project.id, { name: e.target.value })}
                        />
                        <Textarea
                          placeholder="Project Description"
                          value={project.description}
                          onChange={(e) => updateProject(project.id, { description: e.target.value })}
                        />
                        <Input
                          placeholder="Technologies (comma-separated)"
                          value={project.technologies.join(', ')}
                          onChange={(e) => {
                            const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
                            updateProject(project.id, { technologies });
                          }}
                        />
                        <Input
                          placeholder="GitHub URL (optional)"
                          value={project.github || ''}
                          onChange={(e) => updateProject(project.id, { github: e.target.value })}
                        />
                      </div>
                    ))}
                    <Button
                      onClick={() => addProject({
                        name: '',
                        description: '',
                        technologies: [],
                        github: '',
                      })}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <AIAssistant />
          </div>

          {/* Preview Panel */}
          <div className="sticky top-8">
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}

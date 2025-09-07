import { Resume } from '@/lib/types/resume';

export function generateResumeText(resume: Resume): string {
  let text = '';

  // Personal Information
  text += `${resume.personalInfo.name}\n`;
  text += `${resume.personalInfo.email} | ${resume.personalInfo.phone}\n`;
  text += `${resume.personalInfo.location}\n`;
  if (resume.personalInfo.linkedin) text += `LinkedIn: ${resume.personalInfo.linkedin}\n`;
  if (resume.personalInfo.github) text += `GitHub: ${resume.personalInfo.github}\n`;
  text += '\n';

  // Professional Summary
  if (resume.summary) {
    text += 'PROFESSIONAL SUMMARY\n';
    text += `${resume.summary}\n\n`;
  }

  // Experience
  if (resume.experience.length > 0) {
    text += 'PROFESSIONAL EXPERIENCE\n';
    resume.experience.forEach(exp => {
      text += `${exp.position} | ${exp.company}\n`;
      text += `${exp.startDate} - ${exp.endDate} | ${exp.location}\n`;
      exp.bullets.forEach(bullet => {
        text += `• ${bullet}\n`;
      });
      text += '\n';
    });
  }

  // Education
  if (resume.education.length > 0) {
    text += 'EDUCATION\n';
    resume.education.forEach(edu => {
      text += `${edu.degree} in ${edu.field}\n`;
      text += `${edu.institution} | ${edu.graduationDate}\n`;
      if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
      text += '\n';
    });
  }

  // Skills
  if (resume.skills.length > 0) {
    text += 'TECHNICAL SKILLS\n';
    text += `${resume.skills.join(', ')}\n\n`;
  }

  // Projects
  if (resume.projects.length > 0) {
    text += 'PROJECTS\n';
    resume.projects.forEach(project => {
      text += `${project.name}\n`;
      text += `${project.description}\n`;
      text += `Technologies: ${project.technologies.join(', ')}\n`;
      if (project.github) text += `GitHub: ${project.github}\n`;
      text += '\n';
    });
  }

  return text;
}

export function downloadTextFile(content: string, filename: string = 'resume.txt') {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

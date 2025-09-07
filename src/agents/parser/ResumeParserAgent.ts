import { BaseAgent } from '../base/BaseAgent';
import { AgentResponse } from '@/lib/types/agent';
import { ParsedResume } from '@/lib/types/enhancement';
import { parsePDF } from './parsers/pdfParser';
import { parseWord } from './parsers/wordParser';
import { v4 as uuidv4 } from 'uuid';

export class ResumeParserAgent extends BaseAgent {
  constructor() {
    super({
      name: 'Resume Parser',
      role: 'Extract and structure content from resume files',
      temperature: 0.1,
      maxTokens: 2000,
    });
  }

  async execute(file: File): Promise<AgentResponse> {
    const startTime = Date.now();
    this.logActivity(`Starting to parse ${file.name}`, 'started');

    try {
      // Extract raw text based on file type
      let rawText: string;
      
      if (file.type === 'application/pdf') {
        rawText = await parsePDF(file);
      } else if (file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        rawText = await parseWord(file);
      } else {
        // Plain text file
        rawText = await file.text();
      }

      this.logActivity('Raw text extracted, structuring content...');

      // Use AI to structure the content
      const structuredContent = await this.structureContent(rawText);
      
      const parsedResume: ParsedResume = {
        id: uuidv4(),
        ...structuredContent,
        rawText,
      };

      const processingTime = Date.now() - startTime;
      this.logActivity(`Parsing completed successfully`);

      return {
        agentId: 'resume-parser',
        success: true,
        data: parsedResume,
        processingTime,
        confidence: 0.9,
      };

    } catch (error) {
      this.logActivity(`Parsing failed: ${error}`, 'error');
      return {
        agentId: 'resume-parser',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown parsing error',
        processingTime: Date.now() - startTime,
      };
    }
  }

  private async structureContent(rawText: string): Promise<Omit<ParsedResume, 'id' | 'rawText'>> {
    const systemPrompt = `You are a resume parsing specialist. Your job is to extract and structure information from resume text.

    Analyze the provided resume text and extract the following information in JSON format:
    
    {
      "personalInfo": {
        "name": "Full name",
        "email": "email@example.com",
        "phone": "phone number",
        "location": "city, state/country",
        "linkedin": "LinkedIn URL if found",
        "github": "GitHub URL if found"
      },
      "sections": {
        "summary": "Professional summary or objective",
        "experience": [
          {
            "id": "unique_id",
            "company": "Company name",
            "position": "Job title",
            "startDate": "Start date",
            "endDate": "End date",
            "location": "Job location",
            "bullets": ["Achievement 1", "Achievement 2"]
          }
        ],
        "education": [
          {
            "id": "unique_id",
            "institution": "School name",
            "degree": "Degree type",
            "field": "Field of study",
            "graduationDate": "Graduation date",
            "gpa": "GPA if mentioned"
          }
        ],
        "skills": ["Skill 1", "Skill 2", "Skill 3"],
        "projects": [
          {
            "id": "unique_id",
            "name": "Project name",
            "description": "Project description",
            "technologies": ["Tech 1", "Tech 2"],
            "link": "Project URL if found",
            "github": "GitHub URL if found"
          }
        ]
      },
      "structure": {
        "hasPersonalInfo": true/false,
        "hasSummary": true/false,
        "experienceCount": number,
        "educationCount": number,
        "skillsCount": number,
        "projectsCount": number
      }
    }

    Important:
    - Generate unique IDs for each item using timestamp + random
    - If information is not found, use empty strings or empty arrays
    - Be flexible with date formats
    - Extract all bullet points for each job
    - Identify all technical and soft skills mentioned`;

    const userPrompt = `Please parse this resume text and return structured JSON:

    ${rawText}`;

    try {
      const response = await this.callLLM(systemPrompt, userPrompt);
      
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed;
      } else {
        throw new Error('Could not extract JSON from LLM response');
      }
    } catch (error) {
      this.logActivity(`AI structuring failed, using fallback parsing`);
      return this.fallbackParsing(rawText);
    }
  }

  private fallbackParsing(rawText: string): Omit<ParsedResume, 'id' | 'rawText'> {
    // Simple fallback parsing logic
    const lines = rawText.split('\n').map(line => line.trim()).filter(line => line);
    
    // Basic email extraction
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    const emailMatch = rawText.match(emailRegex);
    
    // Basic phone extraction
    const phoneRegex = /(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/;
    const phoneMatch = rawText.match(phoneRegex);
    
    return {
      personalInfo: {
        name: lines[0] || '',
        email: emailMatch ? emailMatch[0] : '',
        phone: phoneMatch ? phoneMatch[0] : '',
        location: '',
        linkedin: rawText.includes('linkedin.com') ? 'Found in resume' : '',
        github: rawText.includes('github.com') ? 'Found in resume' : '',
      },
      sections: {
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
      },
      structure: {
        hasPersonalInfo: !!(emailMatch || phoneMatch),
        hasSummary: false,
        experienceCount: 0,
        educationCount: 0,
        skillsCount: 0,
        projectsCount: 0,
      },
    };
  }
}

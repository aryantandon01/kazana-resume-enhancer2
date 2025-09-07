import { NextRequest, NextResponse } from 'next/server';
import { ResumeParserAgent } from '@/agents/parser/ResumeParserAgent';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ 
        success: false, 
        error: 'No file provided' 
      }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|docx|doc|txt)$/)) {
      return NextResponse.json({
        success: false,
        error: 'Unsupported file type. Please upload PDF, Word, or text files.'
      }, { status: 400 });
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({
        success: false,
        error: 'File size too large. Please upload files smaller than 10MB.'
      }, { status: 400 });
    }

    console.log(`Processing file: ${file.name} (${file.type}, ${file.size} bytes)`);

    // Initialize parser agent
    const parserAgent = new ResumeParserAgent();
    
    // Parse the file
    const result = await parserAgent.execute(file);
    
    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error || 'Failed to parse resume'
      }, { status: 500 });
    }

    console.log('Resume parsed successfully:', result.data.personalInfo.name);

    return NextResponse.json({
      success: true,
      data: {
        parsedResume: result.data,
        activities: parserAgent.getActivities(),
        processingTime: result.processingTime
      }
    });

  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

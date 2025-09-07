import { NextRequest, NextResponse } from 'next/server';
import { EnhancementOrchestrator } from '@/agents/orchestrator/EnhancementOrchestrator';

export async function POST(request: NextRequest) {
  try {
    const { parsedResume, jobTarget } = await request.json();
    
    const orchestrator = new EnhancementOrchestrator();
    const analysisResult = await orchestrator.analyzeResume(parsedResume, jobTarget);
    
    return NextResponse.json({ 
      success: true, 
      data: analysisResult 
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}

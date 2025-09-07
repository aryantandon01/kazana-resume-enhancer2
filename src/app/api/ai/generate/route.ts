import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // For now, return a simple response without OpenAI
    // You can add your OpenAI API key later
    const mockResponse = `Based on your input: "${body.context}", here are some suggestions:

• Use strong action verbs like "developed," "implemented," "optimized"
• Include quantifiable results (e.g., "increased efficiency by 25%")
• Focus on achievements rather than just responsibilities
• Tailor your content to match the job requirements
• Keep bullet points concise and impactful`;
    
    return NextResponse.json({ content: mockResponse });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

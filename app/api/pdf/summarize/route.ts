import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    // In a real app, you would use an AI service (OpenAI, Anthropic, etc.)
    // For now, we'll create a simple summary by extracting key sentences
    const sentences = text.split(/[.!?]+/).filter((s: string) => s.trim().length > 20);
    const summary = sentences.slice(0, 5).join('. ') + '.';

    return NextResponse.json({
      summary,
    });
  } catch (error) {
    console.error('Summary generation error:', error);
    return NextResponse.json({ error: 'Summary generation failed' }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File;

    if (!file) {
      return NextResponse.json({ error: 'No PDF provided' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 });
    }

    // Dynamic import for pdf-parse - it's a CommonJS module
    const pdfParseModule = await import('pdf-parse');
    // pdf-parse exports the function directly, not as default
    const pdfParse = (pdfParseModule as any).default || pdfParseModule;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdfParse(buffer);

    return NextResponse.json({
      text: data.text,
      pages: data.numpages,
      info: data.info,
    });
  } catch (error) {
    console.error('PDF extraction error:', error);
    return NextResponse.json({ error: 'PDF extraction failed' }, { status: 500 });
  }
}


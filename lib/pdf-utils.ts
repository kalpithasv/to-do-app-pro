// PDF processing utilities
// Note: pdf-parse requires Node.js environment, so we'll handle it on the server side

export async function extractPDFText(file: File): Promise<string> {
  // This will be handled by an API route
  const formData = new FormData();
  formData.append('pdf', file);
  
  const response = await fetch('/api/pdf/extract', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to extract PDF text');
  }
  
  const data = await response.json();
  return data.text;
}

export async function generatePDFSummary(text: string): Promise<string> {
  // This will use an API route to generate summary
  const response = await fetch('/api/pdf/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate summary');
  }
  
  const data = await response.json();
  return data.summary;
}



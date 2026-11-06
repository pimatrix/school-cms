// Browser-side helper for the admin panel's "Auto-translate" buttons.
// Calls the session-protected /api/translate route and returns the Hindi
// text. Throws with a readable message when translation fails.
export async function translateToHindi(text: string): Promise<string> {
  const res = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Auto-translate failed. Please type the Hindi text manually.');
  }
  return String(data.translation || '');
}

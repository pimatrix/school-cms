import { cookies } from 'next/headers';
import type { Lang } from './i18n';

// Server-side read of the visitor's language choice. The EN | हिंदी toggle
// in the header stores it in a cookie named "lang"; anything other than
// "hi" means English.
export function getLang(): Lang {
  try {
    return cookies().get('lang')?.value === 'hi' ? 'hi' : 'en';
  } catch {
    return 'en';
  }
}

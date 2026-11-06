import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config';

let cached: SupabaseClient | null = null;

// Anon client for public reads (used by server components and client code).
// Row Level Security decides what this client can see — published content only.
export function getPublicClient(): SupabaseClient {
  if (!cached) {
    cached = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
    });
  }
  return cached;
}

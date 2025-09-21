import { createBrowserClient } from '@supabase/ssr';
export function createClient() {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
    throw new Error('Missing Supabase environment variables');
  }
  return createBrowserClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
}

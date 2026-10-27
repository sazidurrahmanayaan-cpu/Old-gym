import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = 
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  import.meta.env?.VITE_SUPABASE_URL ||
  'https://xxjtlymnnlazljjelpdp.supabase.co';

const supabaseKey = 
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
  import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env?.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_ZOEZHG2gDNWCOD08rg5BDQ_mGYSbs5C';

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey
  );

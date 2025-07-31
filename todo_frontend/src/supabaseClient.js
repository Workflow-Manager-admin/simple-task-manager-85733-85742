import { createClient } from '@supabase/supabase-js';

// PUBLIC_INTERFACE
/**
 * Initializes and returns the Supabase client.
 * Uses environment variables:
 *   REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY
 * This module should be imported wherever Supabase is needed.
 */
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  // eslint-disable-next-line no-console
  console.warn("Supabase URL or Key is missing. Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY in your environment.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
